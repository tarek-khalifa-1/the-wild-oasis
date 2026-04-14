import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateCabin } from "../../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  // CREATE CABIN
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createOrUpdateCabin(newCabin),
    onSuccess: (newCabin) => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success(`Cabin ${newCabin.name} has been created successfuly`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
