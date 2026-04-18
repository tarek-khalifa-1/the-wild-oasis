import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useSafePage(safePage) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!safePage) return;
    if (safePage !== currentPage) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set("page", safePage);
        return newParams;
      });
    }
  }, [safePage, currentPage, setSearchParams]);
}
