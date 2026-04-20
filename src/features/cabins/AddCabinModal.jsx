import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabinModal() {
  return (
    <Modal>
      <Modal.Open opens="cabin-add-form">
        <Button $size="medium" $variation="primary">
          Add new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-add-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabinModal;
