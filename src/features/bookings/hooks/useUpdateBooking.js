import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking as updateBookingFn } from "../../../services/apiBookings";

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  // UPDATE Booking
  const { isPending: isUpdating, mutate: updateBooking } = useMutation({
    mutationFn: ({ editId, updatedBooking }) =>
      updateBookingFn(editId, updatedBooking),
    onSuccess: (booking) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      // reset();
      toast.success(`Booking ${booking.id} has been updated successfuly`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateBooking };
}
