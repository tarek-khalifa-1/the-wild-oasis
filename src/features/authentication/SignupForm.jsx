import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./hooks/useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { isCreating, signup } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();
    const data = { fullName, email, password };
    signup(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Full name" error={""}>
        <Input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Email address" error={""}>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={""}>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Repeat password" error={""}>
        <Input
          type="password"
          id="passwordConfirm"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $size="medium"
          $variation="secondary"
          type="reset"
          disabled={isCreating}
        >
          Cancel
        </Button>
        <Button $size="medium" $variation="primary" disabled={isCreating}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
