import React, { useEffect, useState } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from '../../../redux/slices/roles/rolesSlice';
import FilterSelect1 from "../../../Components/FilterSelect1/FilterSelect1";
import SearchBar from "../../../Components/Search/SearchBar";
import Status from '../../Text/Status';
import Button from '../../FormComponent/ButtonComponent/Button';

// Sample status options for FilterSelect1
const statusOptions = [
  { label: 'Active', value: '1' },
  { label: 'Inactive', value: '0' },
];

const RoleListTable = ({ addRole, roleProfile }) => {
  const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.role);

  // Local states for filters
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState([]); // expects an array of "1" or "0"

  // Called when the search button in SearchBar is clicked.
  const handleSearch = (value) => {
    // Only update the applied search if the term is empty or has at least 3 characters.
    if (value.length === 0 || value.length >= 3) {
      setAppliedSearch(value);
    }
  };

  // Fetch roles whenever the status filter or applied search term changes.
  useEffect(() => {
    const filters = {};
    if (statusFilter && statusFilter.length > 0) {
      filters.status = statusFilter;
    }
    if (appliedSearch) {
      filters.search = appliedSearch;
    }
    dispatch(fetchRoles(filters));
  }, [dispatch, statusFilter, appliedSearch]);

  return (
    <div className="relative overflow-x-auto bg-white rounded-[27px] py-[24px] px-[24px]">
      <div className="pb-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <p className="text-[24px] font-semibold">Role List</p>
          </div>
          <div className="flex items-center space-x-4">
            <FilterSelect1
              placeholder="Status"
              options={statusOptions}
              paramKey="status"
              onApply={(selected) => setStatusFilter(selected)}
            />
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={handleSearch}
              placeholder="Search list..."
              updateUrl={false}
            />
            <Link to={`/${addRole}`}>
              <Button
                size="small"
                className="flex items-center justify-between text-sm font-medium bg-[#3D9D9B] text-white hover:bg-[#34977A] transition-all duration-300 px-4 py-2 rounded"
              >
                <FaPlus className="mr-2" />
                Add Role
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading roles...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="bg-[#3C9D9B1A] shadow-lg border-b border-[#E2E8F0]">
            <tr>
              <th className="px-3 font-bold py-[11px] text-[16px] text-[#14181F] text-left">
                Role Name
              </th>
              <th className="px-3 font-bold py-[11px] text-[16px] text-[#14181F] text-left">
                Role Description
              </th>
              <th className="px-3 font-bold py-[11px] text-[16px] text-[#14181F] text-left">
                Permissions
              </th>
              <th className="px-3 font-bold py-[11px] text-[16px] text-[#14181F] text-left">
                Status
              </th>
              <th className="px-3 font-bold py-[11px] text-[16px] text-[#14181F] text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {roles && roles.length > 0 ? (
              roles.map((role) => (
                <tr key={role.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-3 py-[8px] text-[14px]">
                    {typeof role.role_name === 'object'
                      ? role.role_name.role_name // adjust this based on your actual data structure
                      : role.role_name}
                  </td>
                  <td className="px-3 py-[8px] text-[14px]">{role.role_description}</td>
                  <td className="px-3 py-[8px] text-[14px]">
                    {role.permissions_list && role.permissions_list.join(', ')}
                  </td>
                  <td className="px-3 py-[8px] text-[14px]">
                    {role.is_active ? (
                      <Status color="primary" text="Active" />
                    ) : (
                      <Status color="red" text="Inactive" />
                    )}
                  </td>
                  <td className="flex justify-center">
                    <Link to={`/${roleProfile}/${role.id}`}>
                      <FaEye color="#3D9D9B" className="w-[25px] h-[20px]" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-3 py-[8px] text-[14px] text-center">
                  No result found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleListTable;
