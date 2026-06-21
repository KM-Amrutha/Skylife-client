import { useState, useCallback } from "react";
import { PassengerFormData } from "../../redux/booking/bookingType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const createEmptyPassenger = (): PassengerFormData => ({
  passengerId: crypto.randomUUID(),
  name: "",
  dob: "",
  gender: "male",
  address: "",
  mobile: "",
  extraLuggageKg: 0,
});

const validatePassenger = (p: PassengerFormData): string | null => {
  if (!p.name.trim()) return `Passenger name is required`;
  if (!p.dob) return `Date of birth is required`;
  if (!p.address.trim()) return `Address is required`;
  if (!p.mobile.trim()) return `Mobile number is required`;
  if (!/^[6-9]\d{9}$/.test(p.mobile.trim()))
    return `Enter a valid 10-digit mobile number`;
  if (p.extraLuggageKg < 0) return `Extra luggage cannot be negative`;
  return null;
};

const usePassengerForm = (
  passengerCount: number,
  savedPassengers: PassengerFormData[]
) => {
  const [passengers, setPassengers] = useState<PassengerFormData[]>(() => {
  if (savedPassengers.length > 0) {
    return savedPassengers;
  }

  return Array.from(
    { length: passengerCount },
    createEmptyPassenger
  );
});

  // ─── Sync passenger list when passengerCount changes ─────────────────────
  const syncPassengerCount = useCallback((count: number) => {
    setPassengers((prev) => {
      if (count > prev.length) {
        const extras = Array.from(
          { length: count - prev.length },
          createEmptyPassenger
        );
        return [...prev, ...extras];
      }
      return prev.slice(0, count);
    });
  }, []);

  // ─── Update a single field for a passenger ────────────────────────────────
  const updatePassenger = useCallback(
    (index: number, field: keyof PassengerFormData, value: string | number) => {
      setPassengers((prev) =>
        prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
      );
    },
    []
  );

  // ─── Validate all passengers ──────────────────────────────────────────────
  const validateAll = useCallback((): string | null => {
    for (let i = 0; i < passengers.length; i++) {
      const error = validatePassenger(passengers[i]!);
      if (error) return `Passenger ${i + 1}: ${error}`;
    }
    return null;
  }, [passengers]);

  return {
    passengers,
    updatePassenger,
    syncPassengerCount,
    validateAll,
  };
};

export default usePassengerForm;