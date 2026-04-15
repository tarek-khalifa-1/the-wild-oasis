import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettinApi } from "../../../services/apiSettings";
import toast from "react-hot-toast";
import { useState } from "react";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const [closeModal, setCloseModal] = useState(false);
  const {
    isPending: isUpdating,
    error,
    mutate: updateSetting,
  } = useMutation({
    mutationFn: (newSetting) => updateSettinApi(newSetting),
    onSuccess: () => {
      toast.success("Settings has been updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      setCloseModal(true);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, error, updateSetting, closeModal };
}
