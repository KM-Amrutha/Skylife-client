import { useEffect, useState, useMemo } from 'react';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import {
  getProviderAircrafts,
  createAircraft,
} from '../../redux/aircraft/aircraftThunk';
import { searchDestinations } from '../../redux/destination/destinationThunk';
import { Aircraft, CreateAircraftDTO } from '../../redux/aircraft/aircraftTypes';
import { Destination } from '../../redux/destination/destinationType';
import { showSuccessToast, showErrorToast } from '../../utils/toast';
import { debounce } from '../../utils/debounce';

interface UseAircraftReturn {
  aircrafts: Aircraft[];
  isLoading: boolean;
  error: string | null;
  formik: FormikProps<CreateAircraftDTO>;
  baseStationSearchResults: Destination[];
  currentLocationSearchResults: Destination[];
  baseStationDisplayName: string;
  currentLocationDisplayName: string;
  handleBaseStationSearch: (value: string) => void;
  handleCurrentLocationSearch: (value: string) => void;
  selectBaseStation: (destination: Destination) => void;
  selectCurrentLocation: (destination: Destination) => void;
  clearBaseStationResults: () => void;
  clearCurrentLocationResults: () => void;
}

const aircraftValidationSchema = Yup.object().shape({
  aircraftType: Yup.string().required('Aircraft type is required'),
  aircraftName: Yup.string().required('Aircraft name is required'),
  manufacturer: Yup.string().required('Manufacturer is required'),
  buildYear: Yup.number()
    .required('Build year is required')
    .min(1950, 'Build year must be 1950 or later')
    .max(new Date().getFullYear(), 'Build year cannot be in the future'),
  seatCapacity: Yup.number()
    .required('Seat capacity is required')
    .min(1, 'Must have at least 1 seat'),
  flyingRangeKm: Yup.number()
    .required('Flying range is required')
    .min(1, 'Flying range must be positive'),
  engineCount: Yup.number()
    .required('Engine count is required')
    .min(1, 'Must have at least 1 engine'),
  lavatoryCount: Yup.number()
    .required('Lavatory count is required')
    .min(0, 'Cannot be negative'),
  baseStationId: Yup.string().required('Base station is required'),
  currentLocationId: Yup.string().required('Current location is required'),
  availableFrom: Yup.date().required('Availability date is required'),
  status: Yup.string()
    .oneOf(['active', 'inactive', 'maintenance'])
    .required('Status is required'),
});

const useAircraft = (): UseAircraftReturn => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [baseStationSearchResults, setBaseStationSearchResults] = useState<Destination[]>([]);
  const [currentLocationSearchResults, setCurrentLocationSearchResults] = useState<Destination[]>([]);
  const [baseStationDisplayName, setBaseStationDisplayName] = useState('');
  const [currentLocationDisplayName, setCurrentLocationDisplayName] = useState('');

  const { aircrafts, isLoading, error } = useSelector((state: RootState) => state.aircraft);
  const providerId = useSelector((state: RootState) => state.auth.provider?._id);

  useEffect(() => {
    dispatch(getProviderAircrafts({}));
  }, [dispatch]);

  const formik = useFormik<CreateAircraftDTO>({
    initialValues: {
      providerId: providerId || '',
      aircraftType: '',
      aircraftName: '',
      manufacturer: '',
      buildYear: '',
      seatCapacity: '',
      flyingRangeKm: '',
      engineCount: '',
      lavatoryCount: '',
      baseStationId: '',
      currentLocationId: '',
      availableFrom: new Date(),
      status: 'active',
    },
    validationSchema: aircraftValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(createAircraft(values)).unwrap();
        showSuccessToast(response.message || 'Aircraft created successfully!');
        resetForm();
        setBaseStationDisplayName('');
        setCurrentLocationDisplayName('');
        navigate(`/provider/aircraft/${response.data._id}/seat-layout`);
      } catch (err: any) {
        showErrorToast(err || 'Failed to create aircraft');
      }
    },
  });

  // Debounced search function for base station
  const searchBaseStation = async (value: string) => {
    if (value.length > 2) {
      try {
        const result = await dispatch(searchDestinations({ q: value })).unwrap();
        setBaseStationSearchResults(result.data || []);
      } catch {
        setBaseStationSearchResults([]);
      }
    } else {
      setBaseStationSearchResults([]);
    }
  };

  // Debounced search function for current location
  const searchCurrentLocation = async (value: string) => {
    if (value.length > 2) {
      try {
        const result = await dispatch(searchDestinations({ q: value })).unwrap();
        setCurrentLocationSearchResults(result.data || []);
      } catch {
        setCurrentLocationSearchResults([]);
      }
    } else {
      setCurrentLocationSearchResults([]);
    }
  };

  // Create debounced versions (only once)
  const debouncedSearchBaseStation = useMemo(
    () => debounce(searchBaseStation, 300),
    [dispatch]
  );

  const debouncedSearchCurrentLocation = useMemo(
    () => debounce(searchCurrentLocation, 300),
    [dispatch]
  );

  // Handle search input changes
  const handleBaseStationSearch = (value: string) => {
    setBaseStationDisplayName(value);
    formik.setFieldValue('baseStationId', '');
    debouncedSearchBaseStation(value);
  };

  const handleCurrentLocationSearch = (value: string) => {
    setCurrentLocationDisplayName(value);
    formik.setFieldValue('currentLocationId', '');
    debouncedSearchCurrentLocation(value);
  };

  const selectBaseStation = (destination: Destination) => {
    const displayName = `${destination.name} (${destination.iataCode || destination.ident})`;
    setBaseStationDisplayName(displayName);
    formik.setFieldValue('baseStationId', destination._id);
    formik.setFieldTouched('baseStationId', true);
    setBaseStationSearchResults([]);
  };

  const selectCurrentLocation = (destination: Destination) => {
    const displayName = `${destination.name} (${destination.iataCode || destination.ident})`;
    setCurrentLocationDisplayName(displayName);
    formik.setFieldValue('currentLocationId', destination._id);
    formik.setFieldTouched('currentLocationId', true);
    setCurrentLocationSearchResults([]);
  };

  const clearBaseStationResults = () => setBaseStationSearchResults([]);
  const clearCurrentLocationResults = () => setCurrentLocationSearchResults([]);

  return {
    aircrafts,
    isLoading,
    error,
    formik,
    baseStationSearchResults,
    currentLocationSearchResults,
    baseStationDisplayName,
    currentLocationDisplayName,
    handleBaseStationSearch,
    handleCurrentLocationSearch,
    selectBaseStation,
    selectCurrentLocation,
    clearBaseStationResults,
    clearCurrentLocationResults,
  };
};

export default useAircraft;