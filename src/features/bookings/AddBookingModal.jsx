import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
import CreateGuestForm from "../guests/CreateGuestForm";
import NewBooking from "./NewBooking";
function AddBookingModal() {
  return (
    <Modal>
      <Modal.Open opens="booking-add-form">
        <Button $size="medium" $variation="primary">
          Add new booking
        </Button>
      </Modal.Open>
      <Modal.Window name="booking-add-form">
        <NewBooking />
      </Modal.Window>
    </Modal>
  );
}

export default AddBookingModal;
