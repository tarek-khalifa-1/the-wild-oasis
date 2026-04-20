import Row from "../ui/Row";
import Heading from "../ui/Heading";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import BookingTable from "../features/bookings/BookingTable";
import AddBookingModal from "../features/bookings/AddBookingModal";
import CreateGuestForm from "../features/guests/CreateGuestForm";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>
      <Row type="horizontal">
        <AddBookingModal />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
