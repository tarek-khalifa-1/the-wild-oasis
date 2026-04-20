import { useState } from "react";
import CreateGuestForm from "../guests/CreateGuestForm";
import CreateBookingForm from "./CreateBookingForm";

function NewBooking({ onCloseModal }) {
  const [newGuest, setNewGuest] = useState("");

  return (
    <>
      {!newGuest && (
        <CreateGuestForm
          setNewGuest={setNewGuest}
          onCloseModal={onCloseModal}
        />
      )}
      {newGuest && (
        <CreateBookingForm newGuest={newGuest} onCloseModal={onCloseModal} />
      )}
    </>
  );
}

export default NewBooking;
