import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./hooks/useCreateCabin";
import EditCabinModal from "./EditCabinModal";
import DeleteCabinModal from "./DeleteCabinModal";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const MaxCapacity = styled.div``;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, describtion, image } =
    cabin;

  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    const { id, ...cabinDataWithoutID } = cabin;
    createCabin({ ...cabinDataWithoutID, name: `copy of ${name}` });
  }

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <MaxCapacity>Fits up to {maxCapacity}</MaxCapacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </Button>
        <EditCabinModal cabin={cabin} />
        <DeleteCabinModal id={cabin.id} />
      </div>
    </TableRow>
  );
}

export default CabinRow;
