import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    isPending: isUpdating,
    error,
    mutate: updateUser,
  } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateUserApi({ fullName, avatar, password }),
    onSuccess: () => {
      toast.success("User account has been updated successfully");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, error, updateUser };
}
