import toast from "react-hot-toast";
import { useForm, useWatch } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { useCreateBooking } from "./hooks/useCreateBooking";
import { useUpdateBooking } from "./hooks/useUpdateBooking";
import { useEffect } from "react";
import { useCabins } from "../cabins/hooks/useCabins";
import Spinner from "../../ui/Spinner";
import SelectStyle from "../../ui/SelectStyle";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/hooks/useSettings";

function CreateBookingForm({ newGuest, cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createBooking } = useCreateBooking();
  const { isUpdating, updateCabin } = useUpdateBooking();
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const isPending =
    isCreating || isUpdating || isLoadingCabins || isLoadingSettings;
  const { id: editId, ...editValues } = cabinToEdit;
  const isBookingToUpdate = Boolean(editId); // if id exists will be true
  const { register, handleSubmit, reset, setValue, control } = useForm({
    defaultValues: isBookingToUpdate ? editValues : {},
  });

  const startDate = useWatch({ control, name: "startDate" });
  const endDate = useWatch({ control, name: "endDate" });

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setValue("numNights", diffDays > 0 ? diffDays : 0);
    }
  }, [startDate, endDate, setValue]);

  if (isPending) return <Spinner />;

  function onSubmit(data) {
    const selectedCabin = cabins.find((c) => c.id === Number(data.cabinId));

    let extrasPrice = 0;
    if (data.hasBreakfast) {
      extrasPrice =
        settings.breakfastPrice * (data.numGuests + 1) * data.numNights;
    }
    const totalPrice = selectedCabin.regularPrice + extrasPrice;
    // A) Create new Cabin
    if (!isBookingToUpdate)
      createBooking(
        {
          ...data,
          cabinPrice: selectedCabin.regularPrice,
          extrasPrice,
          totalPrice,
          status: "unconfirmed",
          guestId: newGuest.id,
        },
        // this onSuccess come from mutate function
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );

    // B) Update Cabin
    if (isBookingToUpdate)
      updateCabin(
        { updatedCabin: { ...data }, editId },
        { onSuccess: () => onCloseModal?.() },
      );
  }

  function onError(errors) {
    const errorsArr = Object.values(errors);
    toast.error(errorsArr[0].message);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modalForm" : "regularForm"}
    >
      <FormRow label={"Guest"}>
        <h3>{newGuest.name}</h3>
      </FormRow>
      <FormRow label={"Start Date"}>
        <Input
          id="startDate"
          type="date"
          {...register("startDate", {
            required: "Start date is required",
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label={"End Date"}>
        <Input
          id="endDate"
          type="date"
          {...register("endDate", {
            required: "End date is required",
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label={"Number of nights"}>
        <Input
          type="number"
          id="numNights"
          {...register("numNights", {
            required: "Number of nights is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Number of nights should be at least 1",
            },
          })}
          disabled
        />
      </FormRow>
      <FormRow label={"Number of guests"}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "Number of guests is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Number of guests should be at least 1",
            },
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label={"Cabin"}>
        {/* <Input
          type="number"
          id="cabinPrice"
          {...register("cabinPrice", {
            required: "Cabin price is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Cabin price should be at least 1",
            },
          })}
          disabled={isPending}
        /> */}

        <SelectStyle
          {...register("cabinId", { required: true, valueAsNumber: true })}
        >
          {cabins?.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {`${cabin.name} - ${cabin.maxCapacity} persons - ${formatCurrency(cabin.regularPrice)}`}
            </option>
          ))}
        </SelectStyle>
      </FormRow>

      <FormRow label={"Has breakfast"}>
        <SelectStyle
          {...register("hasBreakfast", { required: true, valueAsNumber: true })}
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </SelectStyle>
      </FormRow>

      <FormRow label={"Is Paid"}>
        <SelectStyle
          {...register("isPaid", { required: true, valueAsNumber: true })}
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </SelectStyle>
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $size="medium"
          $variation="secondary"
          disabled={isPending}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button $size="medium" $variation="primary" disabled={isPending}>
          {isBookingToUpdate ? "Update" : "Create new"} booking
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
