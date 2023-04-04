import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { suppliersList } from "../../services/suppliers";
import { ISupplierSerializer } from "../../interface/common";

interface ISupplierSearchTypeAheadProps {
  onSelection(itemId: number | null): void;
  preSelectedSupplierId: number | null;
}

const SupplierSearchTypeAhead = ({
  onSelection,
  preSelectedSupplierId,
}: ISupplierSearchTypeAheadProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedContact, setSelectedContact] =
    useState<ISupplierSerializer | null>(null);
  const [searchResults, setSearchResults] = useState<
    Array<ISupplierSerializer>
  >([]);

  function handleSearch(searchedText: string) {
    setSearchValue(searchedText);
  }

  function handleOptionSelection(item: ISupplierSerializer) {
    setSelectedContact(item);
    onSelection(item.id);
  }

  function handleClearSelection() {
    setSearchValue("");
    setSelectedContact(null);
    onSelection(null);
  }

  useEffect(() => {
    const fetchSuppliers = async () => {
      let queryObj: Record<string, any> = searchValue
        ? { search: searchValue }
        : {};
      if (preSelectedSupplierId) {
        queryObj = { ...queryObj, id: preSelectedSupplierId };
      }
      try {
        const response = await suppliersList({
          query: queryObj,
        });
        setSearchResults(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuppliers();
  }, [searchValue, preSelectedSupplierId]);

  useEffect(() => {
    if (preSelectedSupplierId) {
      const result = searchResults.filter(
        (item) => item.id === preSelectedSupplierId
      );
      if (result.length > 0) {
        setSelectedContact(result[0]);
      }
    }
  }, [preSelectedSupplierId, searchResults, searchResults.length]);

  return (
    <Dropdown
      placeHolderText="Search Supplier"
      options={searchResults}
      onSearch={handleSearch}
      displayOptionsList={(options, handleSelection) =>
        options.map((item) => (
          <div
            key={`${item.company_name}-${item.first_name}-${item.last_name}`}
            className="search-result-list-item"
            onClick={() => handleSelection(item)}
          >
            <div>{`${item.first_name} ${item.last_name}`}</div>
            <div>Company : {item.company_name}</div>
          </div>
        ))
      }
      searchValue={selectedContact?.company_name || searchValue}
      onOptionSelection={handleOptionSelection}
      onClearSelection={handleClearSelection}
    />
  );
};

export default SupplierSearchTypeAhead;
