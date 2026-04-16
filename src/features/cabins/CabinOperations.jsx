import { useCreateCabin } from "./hooks/useCreateCabin";
import { HiMiniSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import UpdateCabinModal from "./UpdateCabinModal";
import DeleteCabinModal from "./DeleteCabinModal";

function CabinOperations({ cabin }) {
  const { createCabin } = useCreateCabin();
  function handleDuplicate() {
    const { id, ...cabinDataWithoutID } = cabin;
    createCabin({ ...cabinDataWithoutID, name: `copy of ${cabin.name}` });
  }
  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={cabin?.id} />
        <Menus.List id={cabin?.id}>
          <Menus.Button icon={<HiMiniSquare2Stack />} onClick={handleDuplicate}>
            Duplicate
          </Menus.Button>

          <Modal.Open opens="cabin-update-form">
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
          </Modal.Open>

          <Modal.Open opens="cabin-confirm-delete">
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <UpdateCabinModal cabin={cabin} />
        <DeleteCabinModal id={cabin.id} />
      </Menus.Menu>
    </Modal>
  );
}

export default CabinOperations;
