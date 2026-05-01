import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormikProps } from "formik";
import { AppDispatch } from "../../redux/store";
import { searchDestinations } from "../../redux/destination/destinationThunk";
import { Destination } from "../../redux/destination/destinationType";
import { CreateFlightDTO } from "../../redux/flight/flightTypes";

interface UseFlightDestinationsReturn {
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

const useFlightDestinations = (
  formik: FormikProps<CreateFlightDTO>
): UseFlightDestinationsReturn => {
  const dispatch = useDispatch<AppDispatch>();

  const [departureSearchResults, setDepartureSearchResults] = useState<Destination[]>([]);
  const [arrivalSearchResults, setArrivalSearchResults] = useState<Destination[]>([]);
  const [departureDisplayName, setDepartureDisplayName] = useState("");
  const [arrivalDisplayName, setArrivalDisplayName] = useState("");

  const handleDepartureSearch = async (value: string) => {
    setDepartureDisplayName(value);
    if (value.length <= 2) {
      setDepartureSearchResults([]);
      return;
    }
    try {
      const result = await dispatch(searchDestinations({ q: value })).unwrap();
      setDepartureSearchResults(result.data || []);
    } catch {
      setDepartureSearchResults([]);
    }
  };

  const handleArrivalSearch = async (value: string) => {
    setArrivalDisplayName(value);
    if (value.length <= 2) {
      setArrivalSearchResults([]);
      return;
    }
    try {
      const result = await dispatch(searchDestinations({ q: value })).unwrap();
      setArrivalSearchResults(result.data || []);
    } catch {
      setArrivalSearchResults([]);
    }
  };

  const selectDeparture = (destination: Destination) => {
    const displayName = `${destination.name} (${destination.iataCode || destination.ident})`;
    setDepartureDisplayName(displayName);
    formik.setFieldValue("departureDestinationId", destination._id);
    setDepartureSearchResults([]);
  };

  const selectArrival = (destination: Destination) => {
    const displayName = `${destination.name} (${destination.iataCode || destination.ident})`;
    setArrivalDisplayName(displayName);
    formik.setFieldValue("arrivalDestinationId", destination._id);
    setArrivalSearchResults([]);
  };

  const clearDepartureResults = () => setDepartureSearchResults([]);
  const clearArrivalResults = () => setArrivalSearchResults([]);

  return {
    departureSearchResults,
    arrivalSearchResults,
    departureDisplayName,
    arrivalDisplayName,
    handleDepartureSearch,
    handleArrivalSearch,
    selectDeparture,
    selectArrival,
    clearDepartureResults,
    clearArrivalResults
  };
};

export default useFlightDestinations;
