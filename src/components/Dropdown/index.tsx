import { ReactNode, useEffect, useRef, useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./styles.css";

interface IDropdownProps<T> {
  placeHolderText: string;
  options: Array<T>;
  displayOptionsList(
    list: Array<T>,
    handleSelection: (item: T) => void
  ): ReactNode;
  searchValue: string;
  onSearch(searchedText: string): void;
  onClearSelection(): void;
  onOptionSelection?: (item: T) => void;
}

interface IComponentState<T> {
  searchText: string;
  selectedResult: T | null;
  showResultList: boolean;
}

function Dropdown<T>({
  placeHolderText,
  onOptionSelection,
  options,
  displayOptionsList,
  onSearch,
  searchValue,
  onClearSelection,
}: IDropdownProps<T>) {
  const [componentState, setComponentState] = useState<IComponentState<T>>({
    searchText: "",
    selectedResult: null,
    showResultList: false,
  });
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function handleClearSelection() {
    onClearSelection();
    setComponentState((prevComponentState) => ({
      ...prevComponentState,
      searchText: "",
      selectedResult: null,
    }));
  }

  function handleSelection(selectedItem: T) {
    setComponentState((prevState) => ({
      ...prevState,
      selectedResult: selectedItem,
      showResultList: false,
    }));
    if (onOptionSelection) {
      onOptionSelection(selectedItem);
    }
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value);
    setComponentState((prevState) => ({
      ...prevState,
      showResultList: true,
    }));
  }

  function handleFocus() {
    setComponentState((prevState) => ({ ...prevState, showResultList: true }));
  }

  // to close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setComponentState((prevState) => ({
          ...prevState,
          showResultList: false,
        }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="typeahead-wrapper">
      {/* Input with cross for clearing selection/search */}
      <div
        className="input-wrapper"
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder={placeHolderText}
          onFocus={handleFocus}
        />
        {searchValue && <CloseCircleOutlined onClick={handleClearSelection} />}
      </div>
      {componentState.showResultList && options.length > 0 && (
        <div className="search-result-list">
          {displayOptionsList(options, handleSelection)}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
