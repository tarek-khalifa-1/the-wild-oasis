import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useUpdateCabin } from "./hooks/useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  const isPending = isCreating || isUpdating;
  const { id: editId, ...editValues } = cabinToEdit;
  const isCabinToUpdate = Boolean(editId); // if id exists will be true
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: isCabinToUpdate ? editValues : {},
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // A) Create new Cabin
    if (!isCabinToUpdate)
      createCabin(
        { ...data, image },
        // this onSuccess come from mutate function
        {
          onSuccess: () => reset(),
        },
      );

    // B) Update Cabin
    if (isCabinToUpdate)
      updateCabin({ updatedCabin: { ...data, image }, editId });
  }

  function onError(errors) {
    const errorsArr = Object.values(errors);
    toast.error(errorsArr[0].message);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin name"}>
        <Input
          id="name"
          type="text"
          {...register("name", {
            required: "Cabin name is required",
          })}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label={"Maximum capacity"}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label={"Regular price"}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label={"Discount"}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            valueAsNumber: true,
            min: {
              value: 0,
              message: "Discount should be at least 0",
            },
            validate: (value) => {
              return (
                value <= getValues("regularPrice") ||
                "Discount should be less than regular price"
              );
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow label={"Description"}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>
      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isCabinToUpdate ? false : "Image is required",
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $size="medium"
          $variation="secondary"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button $size="medium" $variation="primary" disabled={isPending}>
          {isCabinToUpdate ? "Update" : "Create new"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
