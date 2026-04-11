import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

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
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success(`Cabin ${name} has been deleted successfully`);
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <MaxCapacity>Fits up to {maxCapacity}</MaxCapacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Button
        $variation="danger"
        onClick={() => mutate(id)}
        disabled={isPending}
      >
        {isPending ? "Deleting" : "Delete"}
      </Button>
    </TableRow>
  );
}

export default CabinRow;
