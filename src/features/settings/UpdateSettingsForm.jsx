import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./hooks/useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./hooks/useUpdateSetting";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Row from "../../ui/Row";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  const { register, reset } = useForm({
    defaultValues: settings,
  });

  useEffect(() => {
    if (settings) {
      reset(settings);
    }
  }, [settings, reset]);

  function handleBlur(e, field) {
    const value = Number(e.target.value);
    if (!value || settings[field] === value) return;
    updateSetting({ [field]: value });
  }

  function handleReset() {
    const confirm = window.confirm("Are you sure want to reset settings");
    if (!confirm) return;
    const defaultValues = {
      minBookingLength: 3,
      maxBookingLength: 90,
      maxGuestsPerBooking: 8,
      breakfastPrice: 15,
    };

    updateSetting(defaultValues);
    reset(defaultValues);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength")}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength")}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking")}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfastPrice")}
          disabled={isUpdating}
          onBlur={(e) => handleBlur(e, "breakfastPrice")}
        />
      </FormRow>
      <div style={{ marginTop: "3rem" }}>
        <Button
          type="button"
          onClick={handleReset}
          disabled={isUpdating}
          $variation="primary"
          $size="medium"
        >
          Reset to default settings
        </Button>
      </div>
    </Form>
  );
}

export default UpdateSettingsForm;
