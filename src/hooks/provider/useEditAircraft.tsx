import { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { updateAircraft } from "../../redux/aircraft/aircraftThunk";
import { searchDestinations } from '../../redux/destination/destinationThunk';
import { Aircraft, CreateAircraftDTO } from '../../redux/aircraft/aircraftTypes';
import { Destination } from '../../redux/destination/destinationType';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import { debounce } from '../../utils/debounce';

const editAircraftValidationSchema = Yup.object().shape({
  aircraftName: Yup.string().trim().optional(),
  buildYear: Yup.number().min(1900).max(new Date().getFullYear()).integer().optional(),
  seatCapacity: Yup.number().min(1).max(1000).integer().optional(),
  flyingRangeKm: Yup.number().min(1).optional(),
  engineCount: Yup.number().min(1).max(8).integer().optional(),
  lavatoryCount: Yup.number().min(0).integer().optional(),
  baseStationId: Yup.string().optional(),
  currentLocationId: Yup.string().optional(),
  availableFrom: Yup.string().optional(),
  status: Yup.string().oneOf(["active", "inactive", "maintenance"]).optional(),
});

interface UseEditAircraftReturn {
  aircraft: Aircraft | null;
  isLoading: boolean;
  error: string | null;
  formik: FormikProps<Partial<CreateAircraftDTO>>;
  baseStationDisplayName: string;
  baseStationResults: Destination[];
  currentLocationDisplayName: string;
  currentLocationResults: Destination[];
  handleBaseStationSearch: (value: string) => void;
  handleCurrentLocationSearch: (value: string) => void;
  selectBaseStation: (destination: Destination) => void;
  selectCurrentLocation: (destination: Destination) => void;
  clearBaseStationResults: () => void;
  clearCurrentLocationResults: () => void;
}

const useEditAircraft = (): UseEditAircraftReturn => {
  const { aircraftId } = useParams<{ aircraftId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { aircrafts, isLoading, error } = useSelector(
    (state: RootState) => state.aircraft
  );

  const aircraft = aircrafts.find((a) => a.id === aircraftId) || null;

  const [initialized, setInitialized] = useState(false);
  const [baseStationDisplayName, setBaseStationDisplayName] = useState("");
  const [baseStationResults, setBaseStationResults] = useState<Destination[]>([]);
  const [currentLocationDisplayName, setCurrentLocationDisplayName] = useState("");
  const [currentLocationResults, setCurrentLocationResults] = useState<Destination[]>([]);

  const formik = useFormik<Partial<CreateAircraftDTO>>({
    initialValues: {
      aircraftName: "",
      buildYear: 2000,
      seatCapacity: 0,
      flyingRangeKm: 0,
      engineCount: 2,
      lavatoryCount: 0,
      baseStationId: "",
      currentLocationId: "",
      availableFrom:new Date(),
      status: "active",
    },
    validationSchema: editAircraftValidationSchema,
    enableReinitialize: false,
    onSubmit: async (values, { setSubmitting }) => {
      if (!aircraftId || !aircraft) return;
      try {
        const cleanValues = {
          ...values,
          baseStationId: values.baseStationId || aircraft.baseStation?.id || undefined,
          currentLocationId: values.currentLocationId || aircraft.currentLocation?.id || undefined,
        };
        await dispatch(updateAircraft({ aircraftId, update: cleanValues })).unwrap();
        showSuccessToast("Aircraft updated successfully");
        navigate(`/provider/aircraft/${aircraftId}/seat-layout`);
      } catch (err: any) {
        showErrorToast(err || "Failed to update aircraft");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // initialize form only once when aircraft loads
 useEffect(() => {
  if (aircraft && !initialized) {
    formik.setValues({
      aircraftName: aircraft.aircraftName || "",
      buildYear: aircraft.buildYear || 2000,
      seatCapacity: aircraft.seatCapacity || 0,
      flyingRangeKm: aircraft.flyingRangeKm || 0,
      engineCount: aircraft.engineCount || 2,
      lavatoryCount: aircraft.lavatoryCount || 0,
      baseStationId: aircraft.baseStation?.id || "",
      currentLocationId: aircraft.currentLocation?.id || "",
      availableFrom: aircraft.availableFrom
        ? new Date(aircraft.availableFrom)  // ← Date, not string
        : new Date(),
      status: aircraft.status || "active",
    });
    setBaseStationDisplayName(aircraft.baseStation?.name || "");
    setCurrentLocationDisplayName(aircraft.currentLocation?.name || "");
    setInitialized(true);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [aircraft, initialized]);

  // Base station search
  const searchBase = useCallback(async (query: string) => {
    if (query.trim().length === 0) { setBaseStationResults([]); return; }
    try {
      const result = await dispatch(searchDestinations({ q: query })).unwrap();
      setBaseStationResults(result.data ?? []);
    } catch { setBaseStationResults([]); }
  }, [dispatch]);

  const debouncedSearchBase = useMemo(() => debounce(searchBase, 300), [searchBase]);

  const handleBaseStationSearch = useCallback((value: string) => {
    setBaseStationDisplayName(value);
    formik.setFieldValue("baseStationId", "");
    debouncedSearchBase(value);
  }, [debouncedSearchBase, formik]);

  const selectBaseStation = useCallback((destination: Destination) => {
    setBaseStationDisplayName(`${destination.name} (${destination.iataCode || destination.ident})`);
    formik.setFieldValue("baseStationId", destination.id);
    setBaseStationResults([]);
  }, [formik]);

  // Current location search
  const searchCurrentLoc = useCallback(async (query: string) => {
    if (query.trim().length === 0) { setCurrentLocationResults([]); return; }
    try {
      const result = await dispatch(searchDestinations({ q: query })).unwrap();
      setCurrentLocationResults(result.data ?? []);
    } catch { setCurrentLocationResults([]); }
  }, [dispatch]);

  const debouncedSearchCurrentLoc = useMemo(() => debounce(searchCurrentLoc, 300), [searchCurrentLoc]);

  const handleCurrentLocationSearch = useCallback((value: string) => {
    setCurrentLocationDisplayName(value);
    formik.setFieldValue("currentLocationId", "");
    debouncedSearchCurrentLoc(value);
  }, [debouncedSearchCurrentLoc, formik]);

  const selectCurrentLocation = useCallback((destination: Destination) => {
    setCurrentLocationDisplayName(`${destination.name} (${destination.iataCode || destination.ident})`);
    formik.setFieldValue("currentLocationId", destination.id);
    setCurrentLocationResults([]);
  }, [formik]);

  const clearBaseStationResults = useCallback(() => setBaseStationResults([]), []);
  const clearCurrentLocationResults = useCallback(() => setCurrentLocationResults([]), []);

  return {
    aircraft,
    isLoading,
    error,
    formik,
    baseStationDisplayName,
    baseStationResults,
    currentLocationDisplayName,
    currentLocationResults,
    handleBaseStationSearch,
    handleCurrentLocationSearch,
    selectBaseStation,
    selectCurrentLocation,
    clearBaseStationResults,
    clearCurrentLocationResults,
  };
};

export default useEditAircraft; 