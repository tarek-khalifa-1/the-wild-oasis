import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../../services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  // CREATE CABIN
  const { isPending: isCreating, mutate: createBooking } = useMutation({
    mutationFn: (newBooking) => createBookingApi(newBooking),
    onSuccess: (newBooking) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success(`Booking ${newBooking.id} has been created successfuly`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createBooking };
}
