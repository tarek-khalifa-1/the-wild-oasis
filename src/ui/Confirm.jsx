import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useEffect } from "react";

const StyledConfirm = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function Confirm({ onConfirm, disabled, onCloseModal, closeModal = false }) {
  useEffect(() => {
    if (closeModal) onCloseModal();
  }, [closeModal, onCloseModal]);

  return (
    <StyledConfirm>
      <Heading as="h3">Confirmation</Heading>
      <p>Are you sure you want to do that? This action cannot be undone.</p>

      <div>
        <Button
          $variation="secondary"
          $size="medium"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          $variation="danger"
          $size="medium"
          disabled={disabled}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </StyledConfirm>
  );
}

export default Confirm;
