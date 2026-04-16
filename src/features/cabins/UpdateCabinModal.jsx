import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { HiPencil } from "react-icons/hi2";

function UpdateCabinModal({ cabin }) {
  return (
    <Modal.Window name="cabin-update-form">
      <CreateCabinForm cabinToEdit={cabin} />
    </Modal.Window>
  );
}

export default UpdateCabinModal;
