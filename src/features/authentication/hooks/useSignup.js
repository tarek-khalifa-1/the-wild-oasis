import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const {
    isPending: isCreating,
    mutate: signup,
    error,
  } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: () => {
      toast.success(`Account has been created successfully`);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, signup, error };
}
