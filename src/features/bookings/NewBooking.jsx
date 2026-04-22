import CreateGuestForm from "../guests/CreateGuestForm";
import CreateBookingForm from "./CreateBookingForm";
import { useQuery } from "@tanstack/react-query";

function NewBooking({ onCloseModal }) {
  const { data: currentGuest } = useQuery({
    queryKey: ["guest"],
    // only read from cache
    queryFn: () => null,
    enabled: false,
  });

  return (
    <>
      {!currentGuest && <CreateGuestForm onCloseModal={onCloseModal} />}
      {currentGuest && (
        <CreateBookingForm guest={currentGuest} onCloseModal={onCloseModal} />
      )}
    </>
  );
}

export default NewBooking;
