import { useMutation } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../../services/apiGuests";

export function useCreateGuest() {
  const { isPending: isCreating, mutate: createGuest } = useMutation({
    mutationFn: (data) => createGuestApi(data),
    onSuccess: () => {
      // toast.success(`${data.fullName} has been created successully`);
    },
  });

  return { isCreating, createGuest };
}
