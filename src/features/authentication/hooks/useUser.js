import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });
  const isAuth = user?.role === "authenticated";

  return { isLoading, user, isAuth };
}
