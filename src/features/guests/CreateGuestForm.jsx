import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateGuest } from "./hooks/useCreateGuest";

function CreateGuestForm({ onCloseModal }) {
  const { isCreating, createGuest } = useCreateGuest();
  const isPending = isCreating;
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    createGuest(data);
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
      <FormRow label={"Full name"}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "full name is required",
          })}
          disabled={isPending}
          defaultValue={"Tarek Mohamed"}
        />
      </FormRow>

      <FormRow label={"Email"}>
        <Input
          type="text"
          id="email"
          {...register("email", {
            required: "Email is required",
          })}
          disabled={isPending}
          defaultValue={"tarek@yahoo.com"}
        />
      </FormRow>

      <FormRow label={"National ID"}>
        <Input
          type="number"
          id="nationalID"
          {...register("nationalID", {
            required: "National Id is required",
            valueAsNumber: true,
          })}
          disabled={isPending}
          defaultValue={"29651523654"}
        />
      </FormRow>

      <FormRow label={"Nationality"}>
        <Input
          type="text"
          id="nationality"
          {...register("nationality", {
            required: "Nationality is required",
          })}
          disabled={isPending}
          defaultValue={"Egyptian"}
        />
      </FormRow>
      <FormRow label={"Country flag"}>
        <Input
          type="text"
          id="countryFlag"
          {...register("countryFlag", {
            required: "Country flag is required",
          })}
          disabled={isPending}
          defaultValue={"https://flagcdn.com/eg.svg"}
        />
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
          Create guest
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
