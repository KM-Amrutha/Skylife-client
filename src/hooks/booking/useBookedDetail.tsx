import { useEffect, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getBookingById,
  cancelPassenger,
  getTicket,
} from "../../redux/booking/bookingThunk";
import { clearBookingDetail } from "../../redux/booking/bookingSlice";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const RETRY_WINDOW_MS = 30 * 60 * 1000;

const useBookedDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  const ticketRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [retrySecondsLeft, setRetrySecondsLeft] = useState<number>(0);

  const {
    bookingDetail,
    isLoadingBookingDetail,
    bookingDetailError,
    isCancellingPassenger,
    cancelPassengerError,
    tickets,
    isLoadingTicket,
    ticketError,
  } = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    if (!bookingId) return;
    dispatch(getBookingById(bookingId)).unwrap().then((booking) => {
      if (booking?.status === "confirmed") {
        dispatch(getTicket(bookingId));
      }
    });
    return () => {
      dispatch(clearBookingDetail());
    };
  }, [bookingId, dispatch]);

  const handleCancelPassenger = useCallback(
    async (passengerId: string) => {
      if (!bookingId) return;
      try {
        const result = await dispatch(
          cancelPassenger({ bookingId, passengerId })
        ).unwrap();
        showSuccessToast(
          `Passenger cancelled. ₹${result.refundAmount.toLocaleString("en-IN")} credited to your wallet.`
        );
        dispatch(getBookingById(bookingId));
      } catch (err: any) {
        showErrorToast(err || "Failed to cancel passenger");
      }
    },
    [bookingId, dispatch]
  );

  useEffect(() => {
    if (!bookingDetail || bookingDetail.status !== "payment_failed") return;

    const expiresAt =
      new Date(bookingDetail.createdAt).getTime() + RETRY_WINDOW_MS;

    const tick = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiresAt - Date.now()) / 1000)
      );
      setRetrySecondsLeft(remaining);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [bookingDetail]);

  const handleRetryPayment = useCallback(() => {
    navigate(`/user/bookings/${bookingId}/failed`);
  }, [bookingId, navigate]);

  const handleDownloadTickets = useCallback(async () => {
    if (!tickets.length) return;

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      for (let i = 0; i < ticketRefs.current.length; i++) {
        const ref = ticketRefs.current[i];
        if (!ref) continue;

        const canvas = await html2canvas(ref, {
          scale: 2,
          backgroundColor: "#001233",
          useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`SkyLife-Tickets-${bookingId}.pdf`);
    } catch {
      showErrorToast("Failed to download tickets");
    }
  }, [tickets, bookingId]);

  const handleGoToBookings = useCallback(() => {
    navigate("/user/bookings");
  }, [navigate]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return {
    bookingId,
    bookingDetail,
    isLoadingBookingDetail,
    bookingDetailError,
    isCancellingPassenger,
    cancelPassengerError,
    tickets,
    isLoadingTicket,
    ticketError,
    ticketRefs,
    handleCancelPassenger,
    handleDownloadTickets,
    handleGoToBookings,
    formatDate,
    formatTime,
    formatDateTime,
    retrySecondsLeft,
    handleRetryPayment,
  };
};

export default useBookedDetail;