import { useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { createFlight } from "../../redux/flight/flightThunk";
import { searchDestinations } from "../../redux/destination/destinationThunk";
import { CreateFlightDTO } from "../../redux/flight/flightTypes";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { debounce } from "../../utils/debounce";
import { Destination } from "../../redux/destination/destinationType";

interface UseFlightsReturn {
  formik: FormikProps<CreateFlightDTO>;
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
}

const flightValidationSchema = Yup.object().shape({
  flightId: Yup.string().trim().required("Flight ID is required"),
  flightNumber: Yup.string()
    .trim()
    .matches(/^[A-Z0-9]{2,6}$/, "Invalid flight number (e.g., AI101, 6E234)")
    .required("Flight number is required"),
  aircraftId: Yup.string().required("Please select an available aircraft"),
  departureDestinationId: Yup.string().required("Departure airport is required"),
  arrivalDestinationId: Yup.string()
    .required("Arrival airport is required")
    .test("not-equal-departure", "Departure and arrival cannot be the same airport", function (value) {
      return value !== this.parent.departureDestinationId;
    }),
  departureTime: Yup.string()
    .required("Departure time is required")
    .test("is-future", "Departure time must be in the future", (value) => {
      if (!value) return false;
      return new Date(value) > new Date();
    }),
  durationMinutes: Yup.number()
    .required("Flight duration is required")
    .min(30, "Minimum duration is 30 minutes")
    .max(1440, "Maximum duration is 24 hours (1440 minutes)")
    .integer("Duration must be a whole number"),
    bufferMinutes: Yup.number()
  .required("Buffer time is required")
  .min(60, "Minimum buffer time is 60 minutes")
  .max(480, "Maximum buffer time is 8 hours (480 minutes)")
  .integer("Buffer must be a whole number"),
  gate: Yup.string().trim().max(10, "Gate too long").optional(),
  baseFare: Yup.object({
    economy: Yup.number().required("Economy base fare is required").min(1, "Economy fare must be greater than 0"),
    premium_economy: Yup.number().min(0).default(0).nullable(),
    business: Yup.number().min(0).default(0).nullable(),
    first: Yup.number().min(0).default(0).nullable(),
  }).required(),
  seatSurcharge: Yup.object({
    window: Yup.number().min(0).default(0),
    aisle: Yup.number().min(0).default(0),
    extraLegroom: Yup.number().min(0).default(0),
  }).default({}),
  baggageRules: Yup.object({
    freeCabinKg: Yup.number().min(0).integer().default(7),
    extraChargePerKg: Yup.number().required("Extra charge per kg is required").min(1, "Extra charge must be greater than 0"),
    maxExtraKg: Yup.number().min(0).integer().default(20),
  }).required(),
});

const useFlights = (): UseFlightsReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const providerId = useSelector((state: RootState) => state.auth.provider?._id ?? "");

  const [departureSearchResults, setDepartureSearchResults] = useState<Destination[]>([]);
  const [arrivalSearchResults, setArrivalSearchResults] = useState<Destination[]>([]);
  const [departureDisplayName, setDepartureDisplayName] = useState<string>("");
  const [arrivalDisplayName, setArrivalDisplayName] = useState<string>("");

  const formik = useFormik<CreateFlightDTO>({
    initialValues: {
      flightId: "",
      flightNumber: "",
      providerId,
      aircraftId: "",
      departureDestinationId: "",
      arrivalDestinationId: "",
      departureTime: "",
      durationMinutes: 120,
      bufferMinutes: 60,
      gate: "",
      baseFare: { economy: 5000, premium_economy: 0, business: 0, first: 0 },
      seatSurcharge: { window: 0, aisle: 0, extraLegroom: 0 },
      baggageRules: { freeCabinKg: 7, extraChargePerKg: 500, maxExtraKg: 20 },
      aircraftName: undefined,
      luggageRuleId: undefined,
      foodMenuId: [],
    },
    validationSchema: flightValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const cleanedValues: CreateFlightDTO = {
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
        await dispatch(createFlight(cleanedValues)).unwrap();
        showSuccessToast("Flight scheduled successfully!");
        resetForm();
        setDepartureDisplayName("");
        setArrivalDisplayName("");
      } catch (err: any) {
        showErrorToast(err?.message || "Failed to schedule flight");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const searchDeparture = useCallback(async (value: string) => {
    if (value.trim().length > 2) {
      try {
        const result = await dispatch(searchDestinations({ q: value.trim() })).unwrap();
        setDepartureSearchResults(result.data ?? []);
      } catch { setDepartureSearchResults([]); }
    } else { setDepartureSearchResults([]); }
  }, [dispatch]);

  const searchArrival = useCallback(async (value: string) => {
    if (value.trim().length > 2) {
      try {
        const result = await dispatch(searchDestinations({ q: value.trim() })).unwrap();
        setArrivalSearchResults(result.data ?? []);
      } catch { setArrivalSearchResults([]); }
    } else { setArrivalSearchResults([]); }
  }, [dispatch]);

  const debouncedSearchDeparture = useMemo(() => debounce(searchDeparture, 300), [searchDeparture]);
  const debouncedSearchArrival = useMemo(() => debounce(searchArrival, 300), [searchArrival]);

  const handleDepartureSearch = useCallback((value: string) => {
    setDepartureDisplayName(value);
    formik.setFieldValue("departureDestinationId", "");
    debouncedSearchDeparture(value);
  }, [debouncedSearchDeparture, formik]);

  const handleArrivalSearch = useCallback((value: string) => {
    setArrivalDisplayName(value);
    formik.setFieldValue("arrivalDestinationId", "");
    debouncedSearchArrival(value);
  }, [debouncedSearchArrival, formik]);

  const selectDeparture = useCallback((destination: Destination) => {
    setDepartureDisplayName(`${destination.name} (${destination.iataCode || destination.ident})`);
    formik.setFieldValue("departureDestinationId", destination._id);
    formik.setFieldTouched("departureDestinationId", true);
    setDepartureSearchResults([]);
  }, [formik]);

  const selectArrival = useCallback((destination: Destination) => {
    setArrivalDisplayName(`${destination.name} (${destination.iataCode || destination.ident})`);
    formik.setFieldValue("arrivalDestinationId", destination._id);
    formik.setFieldTouched("arrivalDestinationId", true);
    setArrivalSearchResults([]);
  }, [formik]);

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
  };
};

export default useFlights;