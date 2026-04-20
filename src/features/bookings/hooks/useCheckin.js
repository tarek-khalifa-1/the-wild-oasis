import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingFn } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // UPDATE Booking
  const { isPending: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBookingFn(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({
        refetchType: "active",
      });
      navigate(`/bookings/${booking.id}`);
      toast.success(`Booking ${booking.id} has been checked in successfuly`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingIn, checkIn };
}
