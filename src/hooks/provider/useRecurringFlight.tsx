import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { RRule, Weekday } from "rrule";
import { AppDispatch, RootState } from "../../redux/store";
import { createRecurringFlight } from "../../redux/flight/flightThunk";
import { searchDestinations } from "../../redux/destination/destinationThunk";
import { getAvailableAircraftsForSchedule } from "../../redux/aircraft/aircraftThunk";
import { CreateRecurringFlightDTO } from "../../redux/flight/flightTypes";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { debounce } from "../../utils/debounce";
import { Destination } from "../../redux/destination/destinationType";
import { Aircraft } from "../../redux/aircraft/aircraftTypes";

const RRULE_WEEKDAYS: Weekday[] = [
  RRule.SU,
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA,
];

const recurringValidationSchema = Yup.object().shape({
  baseFlightId: Yup.string().trim().required("Base Flight ID is required"),
  baseFlightNumber: Yup.string()
    .trim()
    .matches(/^[A-Z0-9]{2,6}$/, "Invalid flight number (e.g., AI101)")
    .required("Base flight number is required"),
  aircraftId: Yup.string().required("Please select an available aircraft"),
  departureDestinationId: Yup.string().required("Departure airport is required"),
  arrivalDestinationId: Yup.string()
    .required("Arrival airport is required")
    .test("not-same", "Departure and arrival cannot be the same", function (value) {
      return value !== this.parent.departureDestinationId;
    }),
  departureTimeOfDay: Yup.string().required("Departure time is required"),
  startDate: Yup.string()
    .required("Start date is required")
    .test("is-future", "Start date must be in the future", (value) => {
      if (!value) return false;
      return new Date(value) > new Date();
    }),
  endDate: Yup.string()
    .required("End date is required")
    .test("after-start", "End date must be after start date", function (value) {
      if (!value || !this.parent.startDate) return false;
      return new Date(value) > new Date(this.parent.startDate);
    })
    .test("max-30-days", "Date range cannot exceed 30 days", function (value) {
      if (!value || !this.parent.startDate) return false;
      const diff = Math.ceil(
        (new Date(value).getTime() - new Date(this.parent.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return diff <= 30;
    }),
  weekdays: Yup.array()
    .of(Yup.number())
    .min(1, "Select at least one weekday")
    .required("Weekdays are required"),
  durationMinutes: Yup.number()
    .required("Duration is required")
    .min(30, "Minimum 30 minutes")
    .max(1440, "Maximum 24 hours")
    .integer("Must be a whole number"),
  bufferMinutes: Yup.number()
    .required("Buffer time is required")
    .min(60, "Minimum 60 minutes")
    .max(480, "Maximum 8 hours")
    .integer("Must be a whole number"),
  baseFare: Yup.object({
    economy: Yup.number().required("Economy fare is required").min(1, "Must be greater than 0"),
    premium_economy: Yup.number().min(0).nullable(),
    business: Yup.number().min(0).nullable(),
    first: Yup.number().min(0).nullable(),
  }).required(),
  seatSurcharge: Yup.object({
    window: Yup.number().min(0).default(0),
    aisle: Yup.number().min(0).default(0),
    extraLegroom: Yup.number().min(0).default(0),
  }).default({}),
  baggageRules: Yup.object({
    freeCabinKg: Yup.number().min(0).integer().default(7),
    extraChargePerKg: Yup.number().required("Extra charge per kg is required").min(1, "Must be greater than 0"),
    maxExtraKg: Yup.number().min(0).integer().default(20),
  }).required(),
});

interface UseRecurringFlightReturn {
  formik: FormikProps<CreateRecurringFlightDTO>;
  departureSearchResults: Destination[];
  arrivalSearchResults: Destination[];
  departureDisplayName: string;
  arrivalDisplayName: string;
  handleDepartureSearch: (value: string) => void;
  handleArrivalSearch: (value: string) => void;
  selectDeparture: (destination: Destination) => void;
  selectArrival: (destination: Destination) => void;
  clearDepartureResults: () => void;
  clearArrivalResults: () => void;
  toggleWeekday: (day: number) => void;
  previewDates: Date[];
  availableAircrafts: Aircraft[];
  isLoadingAircrafts: boolean;
  fetchAvailableAircrafts: () => void;
  isCreatingRecurring: boolean;
}

const useRecurringFlight = (): UseRecurringFlightReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const providerId = useSelector((state: RootState) => state.auth.provider?.id ?? "");
  const { availableForSchedule: availableAircrafts, isLoadingAvailableForSchedule: isLoadingAircrafts } =
    useSelector((state: RootState) => state.aircraft);
  const { isCreatingRecurring } = useSelector((state: RootState) => state.flight);

  const [departureSearchResults, setDepartureSearchResults] = useState<Destination[]>([]);
  const [arrivalSearchResults, setArrivalSearchResults] = useState<Destination[]>([]);
  const [departureDisplayName, setDepartureDisplayName] = useState("");
  const [arrivalDisplayName, setArrivalDisplayName] = useState("");

  const formik = useFormik<CreateRecurringFlightDTO>({
    initialValues: {
      baseFlightId: "",
      baseFlightNumber: "",
      aircraftId: "",
      departureDestinationId: "",
      arrivalDestinationId: "",
      departureTimeOfDay: "10:00",
      startDate: "",
      endDate: "",
      weekdays: [],
      durationMinutes: 120,
      bufferMinutes: 120,
      gate: "",
      baseFare: { economy: 5000, premium_economy: 0, business: 0, first: 0 },
      seatSurcharge: { window: 0, aisle: 0, extraLegroom: 0 },
      baggageRules: { freeCabinKg: 7, extraChargePerKg: 500, maxExtraKg: 20 },
    },
    validationSchema: recurringValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const cleanedValues: CreateRecurringFlightDTO = {
          ...values,
          gate: values.gate?.trim() || undefined,
          baseFare: {
            economy: values.baseFare.economy,
            ...(values.baseFare.premium_economy! > 0 && { premium_economy: values.baseFare.premium_economy }),
            ...(values.baseFare.business! > 0 && { business: values.baseFare.business }),
            ...(values.baseFare.first! > 0 && { first: values.baseFare.first }),
          },
          seatSurcharge: {
            ...(values.seatSurcharge.window! > 0 && { window: values.seatSurcharge.window }),
            ...(values.seatSurcharge.aisle! > 0 && { aisle: values.seatSurcharge.aisle }),
            ...(values.seatSurcharge.extraLegroom! > 0 && { extraLegroom: values.seatSurcharge.extraLegroom }),
          },
          baggageRules: {
            freeCabinKg: values.baggageRules.freeCabinKg!,
            extraChargePerKg: values.baggageRules.extraChargePerKg!,
            ...(values.baggageRules.maxExtraKg! > 0 && { maxExtraKg: values.baggageRules.maxExtraKg }),
          },
        };
        const result = await dispatch(createRecurringFlight(cleanedValues)).unwrap();
        showSuccessToast(
          `${result.data.totalCreated} recurring flights scheduled successfully!`
        );
        if (result.data.totalSkipped > 0) {
          showErrorToast(`${result.data.totalSkipped} dates skipped due to conflicts`);
        }
        resetForm();
        setDepartureDisplayName("");
        setArrivalDisplayName("");
      } catch (err: any) {
        showErrorToast(err?.message || "Failed to schedule recurring flights");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ── rrule live date preview ──────────────────────────────────────────────
  const previewDates = useMemo(() => {
    const { startDate, endDate, weekdays } = formik.values;
    if (!startDate || !endDate || weekdays.length === 0) return [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) return [];

    try {
      const rule = new RRule({
        freq: RRule.WEEKLY,
        byweekday: weekdays.map((d) => RRULE_WEEKDAYS[d]),
        dtstart: start,
        until: end,
      });
      return rule.all();
    } catch {
      return [];
    }
  }, [formik.values.startDate, formik.values.endDate, formik.values.weekdays]);

  // ── weekday toggle ───────────────────────────────────────────────────────
  const toggleWeekday = useCallback(
    (day: number) => {
      const current = formik.values.weekdays;
      const updated = current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day].sort((a, b) => a - b);
      formik.setFieldValue("weekdays", updated);
    },
    [formik]
  );

  // ── fetch available aircrafts ────────────────────────────────────────────
  const fetchAvailableAircrafts = useCallback(async () => {
    const { departureDestinationId, departureTimeOfDay, startDate, durationMinutes, bufferMinutes } =
      formik.values;

    if (!departureDestinationId || !departureTimeOfDay || !startDate || !durationMinutes || !bufferMinutes)
      return;

    // combine startDate + departureTimeOfDay into ISO string for the check
    const combinedDateTime = new Date(`${startDate}T${departureTimeOfDay}:00`);
    if (isNaN(combinedDateTime.getTime())) return;

    await dispatch(
      getAvailableAircraftsForSchedule({
        departureDestinationId,
        departureTime: combinedDateTime.toISOString(),
        durationMinutes: Number(durationMinutes),
        bufferMinutes: Number(bufferMinutes),
      })
    );
  }, [
    dispatch,
    formik.values.departureDestinationId,
    formik.values.departureTimeOfDay,
    formik.values.startDate,
    formik.values.durationMinutes,
    formik.values.bufferMinutes,
  ]);

  // ── destination search ───────────────────────────────────────────────────
  const searchDeparture = useCallback(
    async (value: string) => {
      if (value.trim().length > 2) {
        try {
          const result = await dispatch(searchDestinations({ q: value.trim() })).unwrap();
          setDepartureSearchResults(result.data ?? []);
        } catch {
          setDepartureSearchResults([]);
        }
      } else {
        setDepartureSearchResults([]);
      }
    },
    [dispatch]
  );

  const searchArrival = useCallback(
    async (value: string) => {
      if (value.trim().length > 2) {
        try {
          const result = await dispatch(searchDestinations({ q: value.trim() })).unwrap();
          setArrivalSearchResults(result.data ?? []);
        } catch {
          setArrivalSearchResults([]);
        }
      } else {
        setArrivalSearchResults([]);
      }
    },
    [dispatch]
  );

  const debouncedSearchDeparture = useMemo(() => debounce(searchDeparture, 300), [searchDeparture]);
  const debouncedSearchArrival = useMemo(() => debounce(searchArrival, 300), [searchArrival]);

  const handleDepartureSearch = useCallback(
    (value: string) => {
      setDepartureDisplayName(value);
      formik.setFieldValue("departureDestinationId", "");
      debouncedSearchDeparture(value);
    },
    [debouncedSearchDeparture, formik]
  );

  const handleArrivalSearch = useCallback(
    (value: string) => {
      setArrivalDisplayName(value);
      formik.setFieldValue("arrivalDestinationId", "");
      debouncedSearchArrival(value);
    },
    [debouncedSearchArrival, formik]
  );

  const selectDeparture = useCallback(
    (destination: Destination) => {
      setDepartureDisplayName(`${destination.name} (${destination.iataCode || destination.ident})`);
      formik.setFieldValue("departureDestinationId", destination.id);
      formik.setFieldTouched("departureDestinationId", true);
      setDepartureSearchResults([]);
    },
    [formik]
  );

  const selectArrival = useCallback(
    (destination: Destination) => {
      setArrivalDisplayName(`${destination.name} (${destination.iataCode || destination.ident})`);
      formik.setFieldValue("arrivalDestinationId", destination.id);
      formik.setFieldTouched("arrivalDestinationId", true);
      setArrivalSearchResults([]);
    },
    [formik]
  );

  const clearDepartureResults = useCallback(() => setDepartureSearchResults([]), []);
  const clearArrivalResults = useCallback(() => setArrivalSearchResults([]), []);

  return {
    formik,
    departureSearchResults,
    arrivalSearchResults,
    departureDisplayName,
    arrivalDisplayName,
    handleDepartureSearch,
    handleArrivalSearch,
    selectDeparture,
    selectArrival,
    clearDepartureResults,
    clearArrivalResults,
    toggleWeekday,
    previewDates,
    availableAircrafts,
    isLoadingAircrafts,
    fetchAvailableAircrafts,
    isCreatingRecurring,
  };
};

export default useRecurringFlight;