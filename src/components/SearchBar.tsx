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
    console.log("value!!", value)
    const selectedSortBy = value.split(":")[0] as SortBy;
    const field = value.split(":")[1];
    setSortBy(selectedSortBy);
    sortData(selectedSortBy, field);
  };

  const sortData = (selectedSortBy: SortBy | null, field: string) => {
    // Sort number and date field by ASCENDING or DESCENDING
    if (!sortableFields) return;
    if (selectedSortBy === SortBy.ASCENDING) {
      setFilteredData([...data].sort((a, b) => {
        if (typeof a[field] === "number" && typeof b[field] === "number") {
          return a[field] - b[field];
        } else if (typeof a[field] === "string" && typeof b[field] === "string") {
          return a[field].localeCompare(b[field]);
        }
        return 0;
      }));
    } else if (selectedSortBy === SortBy.DESCENDING) {
      setFilteredData([...data].sort((a, b) => {
        if (typeof a[field] === "number" && typeof b[field] === "number") {
          return b[field] - a[field];
        } else if (typeof a[field] === "string" && typeof b[field] === "string") {
          return b[field].localeCompare(a[field]);
        }
        return 0;
      }));
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
    const filteredItems = data?.filter((item: any) => {
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
  <div className="flex items-center justify-around bg-gray-800 rounded-lg p-4 my-4">
    <label className='text-white text-lg'>Search:</label>
    <input
      id="search-input"
      type="text"
      placeholder="Search..."
      className='py-2 px-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 shadow-inner w-64'
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
    />
    <label htmlFor="sort-select" className='text-white text-lg'>Sort:</label>
    <select id="sort-select" onChange={(e) => handleSortChange(e.target.value)} className='py-2 px-3 rounded-lg bg-gray-700 text-white shadow-inner w-64'>
      <option value="">Sort By</option>
      {sortableFields?.map((field) => (
        <React.Fragment key={field}>
          <option value={`${SortBy.ASCENDING}:${field}`}>Sort by {field} (Ascending)</option>
          <option value={`${SortBy.DESCENDING}:${field}`}>Sort by {field} (Descending)</option>
        </React.Fragment>
      ))}
    </select>
  </div>

  );
};

export default SearchBar;
