import { useState, useCallback,useMemo  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { searchFlights,searchDestinationsUser } from "../../redux/flight/flightThunk";
import { clearSearchResults } from "../../redux/flight/flightSlice";
import { SearchFlightsRequest, SearchFlightResult } from "../../redux/flight/flightTypes";
import { Destination } from "../../redux/destination/destinationType";
import { showErrorToast } from "../../utils/toast";
// import { debounce } from "../../utils/debounce";

interface UseFlightSearchReturn {
  form: SearchFlightsRequest;
  isSearching: boolean;
  searchError: string | null;
  hasSearched: boolean;
  // autocomplete
  fromResults: Destination[];
  toResults: Destination[];
  fromDisplayName: string;
  toDisplayName: string;
  handleFromSearch: (value: string) => void;
  handleToSearch: (value: string) => void;
  selectFrom: (destination: Destination) => void;
  selectTo: (destination: Destination) => void;
  clearFromResults: () => void;
  clearToResults: () => void;
  // form
  handleChange: (field: keyof SearchFlightsRequest, value: string | number) => void;
  handleSearch: () => void;
  handleClear: () => void;
maxPrice: number;
priceFilter: number;
baggageFilter: number;
stopsFilter: "all" | "direct";
setPriceFilter: (v: number) => void;
setBaggageFilter: (v: number) => void;
setStopsFilter: (v: "all" | "direct") => void;
outboundResults: SearchFlightResult[];
returnResults: SearchFlightResult[];
filteredOutbound: SearchFlightResult[];
filteredReturn: SearchFlightResult[];
searchPagination: {
  outbound: { currentPage: number; totalPages: number; totalCount: number };
  return?: { currentPage: number; totalPages: number; totalCount: number };
} | null;
handlePageChange: (page: number) => void;
}

const useFlightSearch = (): UseFlightSearchReturn => {
  const dispatch = useDispatch<AppDispatch>();

  const { searchResults, isSearching, searchError, searchPagination } = useSelector(
  (state: RootState) => state.flight
);

const outboundResults = searchResults?.outbound ?? [];
const returnResults = searchResults?.return ?? [];
const [hasSearched, setHasSearched] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [priceFilter, setPriceFilter] = useState<number>(500000);
const [baggageFilter, setBaggageFilter] = useState<number>(0);
const [stopsFilter, setStopsFilter] = useState<"all" | "direct">("all");

  const [form, setForm] = useState<SearchFlightsRequest>({
    from: "",
    to: "",
    departureDate: "",
    passengers: 1,
    tripType: "one-way",
    returnDate: "",
    page: 1,
    limit: 6,
  });

  // ─── Autocomplete local state ──────────────────────────────────────────────
  const [fromResults, setFromResults] = useState<Destination[]>([]);
  const [toResults, setToResults] = useState<Destination[]>([]);
  const [fromDisplayName, setFromDisplayName] = useState("");
  const [toDisplayName, setToDisplayName] = useState("");

  // ─── Debounced search functions ───────────────────────────────────────────
  const searchFrom = useCallback(async (value: string) => {
    if (value.trim().length > 0){
      try {
        const result = await dispatch(searchDestinationsUser({ q: value })).unwrap();
        setFromResults(result.data || []);
      } catch {
        setFromResults([]);
      }
    } else {
      setFromResults([]);
    }
  }, [dispatch]);

  const searchTo = useCallback(async (value: string) => {
    if (value.trim().length > 0) {
      try {
        const result = await dispatch(searchDestinationsUser({ q: value })).unwrap();
        setToResults(result.data || []);
      } catch {
        setToResults([]);
      }
    } else {
      setToResults([]);
    }
  }, [dispatch]);

  // const debouncedSearchFrom = useMemo(() => debounce(searchFrom, 300), [searchFrom]);
  // const debouncedSearchTo = useMemo(() => debounce(searchTo, 300), [searchTo]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  // const handleFromSearch = useCallback((value: string) => {
  //   setFromDisplayName(value);
  //   setForm((prev) => ({ ...prev, from: "" }));
  //   debouncedSearchFrom(value);
  // }, [debouncedSearchFrom]);

  // const handleToSearch = useCallback((value: string) => {
  //   setToDisplayName(value);
  //   setForm((prev) => ({ ...prev, to: "" }));
  //   debouncedSearchTo(value);
  // }, [debouncedSearchTo]);

  const handleFromSearch = useCallback((value: string) => {
  setFromDisplayName(value);
  setForm((prev) => ({ ...prev, from: "" }));
  searchFrom(value);  // call directly, not debounced
}, [searchFrom]);

const handleToSearch = useCallback((value: string) => {
  setToDisplayName(value);
  setForm((prev) => ({ ...prev, to: "" }));
  searchTo(value);  // call directly, not debounced
}, [searchTo]);

  const selectFrom = useCallback((destination: Destination) => {
    const displayName = `${destination.name} (${destination.iataCode || destination.ident})`;
    setFromDisplayName(displayName);
    setForm((prev) => ({ ...prev, from: destination.iataCode || destination.ident }));
    setFromResults([]);
  }, []);

  const selectTo = useCallback((destination: Destination) => {
    const displayName = `${destination.name} (${destination.iataCode || destination.ident})`;
    setToDisplayName(displayName);
    setForm((prev) => ({ ...prev, to: destination.iataCode || destination.ident }));
    setToResults([]);
  }, []);

  const clearFromResults = useCallback(() => setFromResults([]), []);
  const clearToResults = useCallback(() => setToResults([]), []);

  // ─── Form change (for non-autocomplete fields) ─────────────────────────────
  const handleChange = useCallback(
    (field: keyof SearchFlightsRequest, value: string | number) => {
      setForm((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "tripType" && value === "one-way" ? { returnDate: "" } : {}),
      }));
    }, []
  );

  // ─── Validation ───────────────────────────────────────────────────────────
  const validate = useCallback((): boolean => {
    if (!form.from.trim()) {
      showErrorToast("Please select a departure airport");
      return false;
    }
    if (!form.to.trim()) {
      showErrorToast("Please select an arrival airport");
      return false;
    }
    if (form.from.trim().toLowerCase() === form.to.trim().toLowerCase()) {
      showErrorToast("Departure and arrival cannot be the same");
      return false;
    }
    if (!form.departureDate) {
      showErrorToast("Please select a departure date");
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(form.departureDate) < today) {
      showErrorToast("Departure date cannot be in the past");
      return false;
    }
    if (form.passengers < 1 || form.passengers > 9) {
      showErrorToast("Passengers must be between 1 and 9");
      return false;
    }
    if (form.tripType === "round-trip" && !form.returnDate) {
      showErrorToast("Please select a return date");
      return false;
    }
    if (
      form.tripType === "round-trip" &&
      form.returnDate &&
      new Date(form.returnDate) <= new Date(form.departureDate)
    ) {
      showErrorToast("Return date must be after departure date");
      return false;
    }
    return true;
  }, [form]);

  const handleSearch = useCallback(() => {
    if (!validate()) return;
    setHasSearched(true);
    setCurrentPage(1);
    dispatch(searchFlights({ ...form, page: 1, limit: 6 }));
  }, [dispatch, form, validate]);

const handlePageChange = useCallback((page: number) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
  dispatch(searchFlights({ ...form, page, limit: 6 }));
}, [dispatch, form]);

const handleClear = useCallback(() => {
  dispatch(clearSearchResults());
  setHasSearched(false);
  setFromDisplayName("");
  setToDisplayName("");
  setFromResults([]);
  setToResults([]);
  setCurrentPage(1);
  setPriceFilter(500000);
  setBaggageFilter(0);
  setStopsFilter("all");
  setForm({
    from: "",
    to: "",
    departureDate: "",
    passengers: 1,
    tripType: "one-way",
    returnDate: "",
    page: 1,  
    limit: 6,
  });
}, [dispatch]);

  const filteredOutbound = useMemo(() => {
  return outboundResults.filter((flight) => {
    const lowestFare = Math.min(...Object.values(flight.baseFare).filter(Boolean) as number[]);
    if (lowestFare > priceFilter) return false;
    if (baggageFilter > 0 && (flight.baggageRules?.freeCabinKg ?? 0) < baggageFilter) return false;
    return true;
  });
}, [outboundResults, priceFilter, baggageFilter]);

const filteredReturn = useMemo(() => {
  return returnResults.filter((flight) => {
    const lowestFare = Math.min(...Object.values(flight.baseFare).filter(Boolean) as number[]);
    if (lowestFare > priceFilter) return false;
    if (baggageFilter > 0 && (flight.baggageRules?.freeCabinKg ?? 0) < baggageFilter) return false;
    return true;
  });
}, [returnResults, priceFilter, baggageFilter]);

const maxPrice = useMemo(() => {
  const all = [...outboundResults, ...returnResults];
  if (!all.length) return 500000;
  return Math.max(
    ...all.map((f) => Math.min(...Object.values(f.baseFare).filter(Boolean) as number[]))
  );
}, [outboundResults, returnResults]);
  

  return {
    form,
    isSearching,
    searchError,
    hasSearched,
    fromResults,
    toResults,
    fromDisplayName,
    toDisplayName,
    handleFromSearch,
    handleToSearch,
    selectFrom,
    selectTo,
    clearFromResults,
    clearToResults,
    handleChange,
    handleSearch,
    handleClear,
    outboundResults,
  returnResults,
  filteredOutbound,
  filteredReturn,
  maxPrice,
priceFilter,
baggageFilter,
stopsFilter,
setPriceFilter,
setBaggageFilter,
setStopsFilter,
searchPagination,
handlePageChange,
  };
};

export default useFlightSearch;