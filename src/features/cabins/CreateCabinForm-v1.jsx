import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues } = useForm();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addCabin,
    onSuccess: (newCabin) => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success(`Cabin ${newCabin.name} has been added successfuly`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
    reset();
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
          disabled={isPending}
        />
      </FormRow>
      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "Image is required",
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        <Button
          $size="medium"
          $variation="secondary"
          type="reset"
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button $size="medium" $variation="primary" disabled={isPending}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
