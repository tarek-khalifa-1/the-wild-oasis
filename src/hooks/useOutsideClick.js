import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listnerCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listnerCapturing); // true:event will be in capturing face to down tree not up
    return () =>
      document.removeEventListener("click", handleClick, listnerCapturing);
  }, [handler, listnerCapturing]);

  return ref;
}
