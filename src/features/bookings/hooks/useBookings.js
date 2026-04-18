import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../utils/config";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // A) FILTER by api
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "totalPrice", value: 1855, method: "gte" };

  // B) SORT by api
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // C) PAGINATION
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const {
    isLoading,
    error,
    data: { data: bookings, count, page: safePage } = {},
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  // PRE-FETCHING NEXT AND PREV PAGES
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () => getBookings({ filter, sortBy, page: currentPage + 1 }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () => getBookings({ filter, sortBy, page: currentPage - 1 }),
    });
  }

  return { isLoading, error, bookings, count, safePage };
}
