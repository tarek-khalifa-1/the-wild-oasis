import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../../services/apiAuth";
import { replace, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLogingOut, mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      // naviate to login page
      navigate("/login", { replace: true });
      // remove all cached queries
      queryClient.removeQueries();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLogingOut, logout };
}
