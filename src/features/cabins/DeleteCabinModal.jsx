import { useDeleteCabin } from "./hooks/useDeleteCabin";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";

function DeleteCabinModal({ cabin }) {
  const { id, name } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();

  return (
    <Modal>
      <Modal.Open opens="confirm-delete">
        <Button>
          <HiTrash />
        </Button>
      </Modal.Open>

      <Modal.Window name="confirm-delete">
        <ConfirmDelete
          resourceName={`Cabin ${name}`}
          disabled={isDeleting}
          onConfirm={() => deleteCabin(id)}
        />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteCabinModal;
