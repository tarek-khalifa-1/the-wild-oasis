import Sort from "../../ui/Sort";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
const filterOptions = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
];

const sortByOptions = [
  { value: "startDate-desc", label: "Sort by date (recent first)" },
  { value: "startDate-asc", label: "Sort by date (earlier first)" },
  {
    value: "totalPrice-desc",
    label: "Sort by amount (high first)",
  },
  { value: "totalPrice-asc", label: "Sort by amount (low first)" },
];
function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterBy="status" filterOptions={filterOptions} />
      <Sort options={sortByOptions} />
    </TableOperations>
  );
}

export default BookingTableOperations;
