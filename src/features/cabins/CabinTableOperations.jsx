import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import TableOperations from "../../ui/TableOperations";

const filterOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "With Discount",
    value: "with-discount",
  },
  {
    label: "No Discount",
    value: "no-discount",
  },
];
const sortByOptions = [
  { value: "name-asc", label: "Sort By Name (A-Z)" },
  { value: "name-desc", label: "Sort By Name (Z-A)" },
  { value: "regularPrice-asc", label: "Sort By Price (low first)" },
  { value: "regularPrice-desc", label: "Sort By Price (high first)" },
  { value: "maxCapacity-asc", label: "Sort By Capacity (small first)" },
  { value: "maxCapacity-desc", label: "Sort By Capacity (large first)" },
  { value: "created_at-asc", label: "Sort By Created Cabin (old first)" },
  { value: "created_at-desc", label: "Sort By Created Cabin (new first)" },
];

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterBy="discount" filterOptions={filterOptions} />
      <Sort options={sortByOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
