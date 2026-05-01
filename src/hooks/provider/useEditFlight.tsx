import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { updateFlight, getFlightById } from "../../redux/flight/flightThunk";
import {clearSelectedFlight } from "../../redux/flight/flightSlice";
import { searchDestinations } from "../../redux/destination/destinationThunk";
import { FlightDetails } from "../../redux/flight/flightTypes";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { debounce } from "../../utils/debounce";
import { Destination } from "../../redux/destination/destinationType";

const editFlightValidationSchema = Yup.object().shape({
  flightNumber: Yup.string()
    .trim()
    .matches(/^[A-Z0-9]{2,6}$/, "Invalid flight number (e.g., AI101)")
    .optional(),
  gate: Yup.string().trim().max(10, "Gate too long").optional(),
  durationMinutes: Yup.number()
    .min(30, "Minimum 30 minutes")
    .max(1440, "Maximum 24 hours")
    .integer("Must be whole number")
    .optional(),
  arrivalDestinationId: Yup.string().optional(),
  baseFare: Yup.object({
    economy: Yup.number().min(1, "Must be > 0").optional(),
    premium_economy: Yup.number().min(0).nullable().optional(),
    business: Yup.number().min(0).nullable().optional(),
    first: Yup.number().min(0).nullable().optional(),
  }).optional(),
  seatSurcharge: Yup.object({
    window: Yup.number().min(0).optional(),
    aisle: Yup.number().min(0).optional(),
    extraLegroom: Yup.number().min(0).optional(),
  }).optional(),
  baggageRules: Yup.object({
    freeCabinKg: Yup.number().min(0).integer().optional(),
    extraChargePerKg: Yup.number().min(1).optional(),
    maxExtraKg: Yup.number().min(0).integer().optional(),
  }).optional(),
});

interface UseEditFlightReturn {
  flight: FlightDetails | null;
  isLoading: boolean;
  error: string | null;
  formik: FormikProps<Partial<FlightDetails>>;
  arrivalDisplayName: string;
  arrivalSearchResults: Destination[];
  handleArrivalSearch: (value: string) => void;
  selectArrival: (destination: Destination) => void;
  clearArrivalResults: () => void;
  isRecurringOrReturn: boolean;
}

const useEditFlight = (): UseEditFlightReturn => {
  const { flightId } = useParams<{ flightId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    selectedFlight,
    isLoadingSelectedFlight,
    selectedFlightError,
  } = useSelector((state: RootState) => state.flight);

  const flight = selectedFlight;
  const isLoading = isLoadingSelectedFlight;
  const error = selectedFlightError;

  // fetch flight on mount, clear on unmount
  useEffect(() => {
    if (flightId) {
      dispatch(getFlightById(flightId));
    }
    return () => {
      dispatch(clearSelectedFlight());
    };
  }, [flightId, dispatch]);

  const isRecurringOrReturn =
    flight?.flightType === "recurring" || flight?.flightType === "return";

  const [arrivalDisplayName, setArrivalDisplayName] = useState<string>("");
  const [arrivalSearchResults, setArrivalSearchResults] = useState<Destination[]>([]);

  // set arrival display name once flight loads
  useEffect(() => {
    if (flight) {
      const name = flight.arrivalDestination?.name ?? "";
      const code = flight.arrivalDestination?.iataCode ?? "";
      setArrivalDisplayName(name && code ? `${name} (${code})` : flight.arrivalDestinationId);
    }
  }, [flight]);

  const formik = useFormik<Partial<FlightDetails>>({
    initialValues: {
      flightNumber: flight?.flightNumber || "",
      gate: flight?.gate || "",
      durationMinutes: flight?.durationMinutes,
      arrivalDestinationId: flight?.arrivalDestinationId || "",
      baseFare: flight?.baseFare || { economy: 0 },
      seatSurcharge: flight?.seatSurcharge || {},
      baggageRules: flight?.baggageRules || { extraChargePerKg: 0 },
    },
    validationSchema: editFlightValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      if (!flightId || !flight) return;

      // check departed
      if (new Date(flight.departureTime) <= new Date()) {
        showErrorToast("Cannot edit a flight that has already departed");
        setSubmitting(false);
        return;
      }

      try {
        const updateData: Partial<FlightDetails> = {
          flightNumber: values.flightNumber?.trim() || undefined,
          gate: values.gate?.trim() || undefined,
          // only send duration/arrival for outbound flights
          ...(!isRecurringOrReturn && {
            durationMinutes: values.durationMinutes,
            arrivalDestinationId:
              values.arrivalDestinationId === flight.arrivalDestinationId
                ? undefined
                : values.arrivalDestinationId,
          }),
          baseFare: values.baseFare,
          seatSurcharge: values.seatSurcharge,
          baggageRules: values.baggageRules,
        };

        await dispatch(updateFlight({ flightId, data: updateData })).unwrap();
        showSuccessToast("Flight updated successfully! Awaiting admin approval.");
        navigate("/provider/flight-list");
      } catch (err: any) {
        showErrorToast(err || "Failed to update flight");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const searchArrival = useCallback(async (query: string) => {
    if (query.trim().length < 3) {
      setArrivalSearchResults([]);
      return;
    }
    try {
      const result = await dispatch(searchDestinations({ q: query.trim() })).unwrap();
      setArrivalSearchResults(result.data ?? []);
    } catch {
      setArrivalSearchResults([]);
    }
  }, [dispatch]);

  const debouncedSearchArrival = useMemo(() => debounce(searchArrival, 300), [searchArrival]);

  const handleArrivalSearch = useCallback((value: string) => {
    setArrivalDisplayName(value);
    formik.setFieldValue("arrivalDestinationId", "");
    debouncedSearchArrival(value);
  }, [debouncedSearchArrival, formik]);

  const selectArrival = useCallback((destination: Destination) => {
    setArrivalDisplayName(`${destination.name} (${destination.iataCode || destination.ident})`);
    formik.setFieldValue("arrivalDestinationId", destination._id);
    setArrivalSearchResults([]);
  }, [formik]);

  const clearArrivalResults = useCallback(() => setArrivalSearchResults([]), []);

  return {
    flight,
    isLoading,
    error,
    formik,
    arrivalDisplayName,
    arrivalSearchResults,
    handleArrivalSearch,
    selectArrival,
    clearArrivalResults,
    isRecurringOrReturn,
  };
};

export default useEditFlight;