import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className="card shadow-card p-3 mb-4">

      <div className="input-group">

        <span className="input-group-text bg-primary text-white">
          <FaSearch />
        </span>

        <input
          type="text"
          className="form-control"
          placeholder="Search by Product Name, SKU or Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

    </div>
  );
}

export default SearchBar;