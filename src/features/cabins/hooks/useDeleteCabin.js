import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as DeleteCabinApi } from "../../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: DeleteCabinApi,
    onSuccess: ({ name }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success(`Cabin ${name} has been deleted successfully`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
