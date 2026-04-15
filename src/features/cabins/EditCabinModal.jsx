import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { HiPencil } from "react-icons/hi2";

function EditCabinModal({ cabin }) {
  return (
    <Modal>
      <Modal.Open opens="cabin-edit-form">
        <Button>
          <HiPencil />
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-edit-form">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>
    </Modal>
  );
}

export default EditCabinModal;
