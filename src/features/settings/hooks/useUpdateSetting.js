import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettinApi } from "../../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

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
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, error, updateSetting };
}
