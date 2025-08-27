import React, { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  _id: string;
  name: string;
  phone: string;
}

interface Props {
  onSelect: (customer: Customer) => void;
}

const CustomerSearch: React.FC<Props> = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Customer[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // fetch customers from backend based on search input
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered([]);
      return;
    }

    const fetchCustomers = async () => {
      try {
        const res = await axios.get(`/api/customers?search=${search}`);
        setFiltered(res.data); // backend should return a filtered array
      } catch (err) {
        console.error(err);
      }
    };

    fetchCustomers();
  }, [search]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        className="w-full px-3 py-2 border rounded-md"
      />

      {showDropdown && filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md shadow max-h-48 overflow-y-auto">
          {filtered.map((cust) => (
            <li
              key={cust._id}
              onClick={() => {
                onSelect(cust);
                setSearch("");
                setShowDropdown(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {cust.name} — {cust.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerSearch;
