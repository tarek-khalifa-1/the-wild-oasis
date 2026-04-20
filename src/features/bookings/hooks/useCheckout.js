import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingFn } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // UPDATE Booking
  const { isPending: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBookingFn(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({
        refetchType: "active",
      });
      navigate(`/bookings/${booking.id}`);
      toast.success(`Booking ${booking.id} has been checked out successfuly`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingOut, checkOut };
}
