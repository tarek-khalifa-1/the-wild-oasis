import { useDeleteCabin } from "./hooks/useDeleteCabin";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { HiTrash } from "react-icons/hi2";
import Confirm from "../../ui/Confirm";

function DeleteCabinModal({ id }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Modal.Window name="cabin-confirm-delete">
      <Confirm disabled={isDeleting} onConfirm={() => deleteCabin(id)} />
    </Modal.Window>
  );
}

export default DeleteCabinModal;
