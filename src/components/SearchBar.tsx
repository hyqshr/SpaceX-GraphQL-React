import React, { useEffect, useState } from "react";

type SearchBarProps = {
  data: any;
  setFilteredData: React.Dispatch<React.SetStateAction<any>>;
  sortableFields?: string[];
};

enum SortBy {
    ASCENDING = "ascending",
    DESCENDING = "descending",
}

const SearchBar: React.FC<SearchBarProps> = ({ data, setFilteredData, sortableFields }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  const handleSortChange = (value: string) => {
    const selectedSortBy = value as SortBy;
    setSortBy(selectedSortBy);
    sortData(selectedSortBy);
  };
  const sortData = (selectedSortBy: SortBy | null) => {
    if (selectedSortBy === SortBy.ASCENDING) {
      setFilteredData([...data].sort((a, b) => new Date(a.launch_date_utc).getTime() - new Date(b.launch_date_utc).getTime()));
    } else if (selectedSortBy === SortBy.DESCENDING) {
      setFilteredData([...data].sort((a, b) => new Date(b.launch_date_utc).getTime() - new Date(a.launch_date_utc).getTime()));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterData(query);
  };

  useEffect(() => {
    // trigger filter only when searchQuery is not empty
    if (searchQuery !== "") {
      filterData(searchQuery);
    } else {
      setFilteredData(data); // Reset filtered data to original data
    }
  }, [data, searchQuery]);

  const filterData = (query: string) => {
    const filteredItems = data.filter((item: any) => {
      return Object.values(item).some((value) => {
        if (typeof value === "string") {
          const fieldValue = value.toLowerCase();
          return fieldValue.includes(query.toLowerCase());
        }
        return false;
      });
    });
    setFilteredData(filteredItems);
  };

  return (
    <div className="flex justify-around">
    <label htmlFor="search-input">Search:</label>
    <input
      id="search-input"
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
    <label htmlFor="sort-select">Sort:</label>
    <select id="sort-select" onChange={(e) => handleSortChange(e.target.value)}>
      <option value="">Sort By</option>
      <option value={SortBy.ASCENDING}>Sort by Date (Ascending)</option>
      <option value={SortBy.DESCENDING}>Sort by Date (Descending)</option>
    </select>
  </div>
  );
};

export default SearchBar;
