import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateCabin } from "../../../services/apiCabins";

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  // UPDATE CABIN
  const { isPending: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ updatedCabin, editId }) =>
      createOrUpdateCabin(updatedCabin, editId),
    onSuccess: (newCabin) => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset();
      toast.success(`Cabin ${newCabin.name} has been updated successfuly`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateCabin };
}
