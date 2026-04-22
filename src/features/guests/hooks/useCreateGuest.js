import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createGuest } = useMutation({
    mutationFn: (data) => createGuestApi(data),
    onSuccess: (data) => {
      // save guest data in cache
      queryClient.setQueryData(["guest"], data);
      // toast.success(`${data.fullName} has been created successully`);
    },
  });

  return { isCreating, createGuest };
}
