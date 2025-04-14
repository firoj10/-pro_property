import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMemberTypes,
  fetchGroupMembers,
  setSelectedMemberIds,
  toggleSelectAll
} from "../../../redux/slices/groups/groupSlice";
import "./GroupTable.css";
import FilterSelect1 from "../../FilterSelect1/FilterSelect1";
import SearchBar from "../../Search/SearchBar";
import Heading from "../../HeadingComponent/Heading";
import CheckboxComponent from "../../FormComponent/CheckboxComponent";

const MemberGroupAsignTable = ({ onSelectionChange }) => {
  const dispatch = useDispatch();

  // Get members, roles, member types, loading flag, and selected member IDs from Redux.
  const members = useSelector((state) => state.group.members);
  const rolesFromRedux = useSelector((state) => state.group.roles);
  const memberTypesFromRedux = useSelector((state) => state.group.memberTypes);
  const selectedMemberIds = useSelector((state) => state.group.selectedMemberIds);
  const loading = useSelector((state) => state.group.loading);

  // Local state for search and filter controls.
  const [search, setSearch] = useState("");
  const [appliedMemberType, setAppliedMemberType] = useState("");
  const [appliedRole, setAppliedRole] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  // Fetch member types on mount.
  useEffect(() => {
    dispatch(fetchMemberTypes());
  }, [dispatch]);

  // Fetch members whenever filters or search change.
  useEffect(() => {
    dispatch(
      fetchGroupMembers({
        member_type: appliedMemberType,
        role: appliedRole,
        search: search
      })
    )
      .unwrap()
      .catch((error) => {
        console.error("Error fetching group members:", error);
      });
  }, [dispatch, appliedMemberType, appliedRole, search]);

  // --- Selection Handlers ---
  const handleSelectAllToggle = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const newSelected = newSelectAll ? members.map((member) => member.id) : [];
    dispatch(toggleSelectAll(newSelected));
    if (onSelectionChange) onSelectionChange(newSelected);
  };

  const handleCheckboxChange = (e, memberId) => {
    const { checked } = e.target;
    let newSelected;
    if (checked) {
      newSelected = [...selectedMemberIds, memberId];
    } else {
      newSelected = selectedMemberIds.filter((id) => id !== memberId);
      setSelectAll(false);
    }
    dispatch(setSelectedMemberIds(newSelected));
    if (onSelectionChange) onSelectionChange(newSelected);
  };

  // Build member types options for the filter.
  const memberTypesOptions = memberTypesFromRedux.map((type) => ({
    label: type.type_name,
    value: type.id
  }));
  
  // Build role options including "Other" and "All" to support new filtering.
  const memberRoleOptions = [
    ...rolesFromRedux.filter(role => role.is_active).map((role) => ({
      label: role.role_name,
      value: role.id.toString()
    })),
    { label: "Other", value: "other" },
  ];

  return (
    <div className="bg-white rounded-27 py-[24px] px-[24px]">
      <div className="pb-4">
        <div className="flex justify-between items-center py-2">
          <Heading color="black" size="lg" title="Select Members" />
          <div className="flex items-center space-x-4">
            <FilterSelect1
              placeholder="Member type"
              options={memberTypesOptions}
              paramKey="member-type"
              useUrlParams={false}
              onApply={setAppliedMemberType}
            />
            <FilterSelect1
              placeholder="Role"
              options={memberRoleOptions}
              paramKey="role"
              useUrlParams={false}
              onApply={setAppliedRole}
            />
            <SearchBar updateUrl={false} onSearch={setSearch} />
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-[#3C9D9B1A] shadow-lg border-b border-[#E2E8F0]">
          <tr>
            <th className="px-3 py-3 text-[16px] text-[#14181F] text-left">
              <CheckboxComponent
                checked={selectAll}
                onChange={handleSelectAllToggle}
                value="all"
              />
            </th>
            <th className="px-3 py-3 text-[16px] text-[#14181F] text-left">
              Name
            </th>
            <th className="px-3 py-3 text-[16px] text-[#14181F] text-left">
              Contact
            </th>
            <th className="px-3 py-3 text-[16px] text-[#14181F] text-left">
              Type
            </th>
            <th className="px-3 py-3 text-[16px] text-[#14181F] text-left">
              Email
            </th>
            <th className="px-3 py-3 text-[16px] text-[#14181F] text-left">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : members.length > 0 ? (
            members.map((member) => (
              <tr key={member.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-3 py-2">
                  <CheckboxComponent
                    checked={selectedMemberIds.includes(member.id)}
                    onChange={(e) => handleCheckboxChange(e, member.id)}
                    value="all"
                  />
                </td>
                <td className="px-3 py-2 flex items-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-8 h-8 rounded-full mx-2"
                  />
                  {member.name}
                </td>
                <td className="px-3 py-2">{member.general_contact}</td>
                <td className="px-3 py-2">{member.type}</td>
                <td className="px-3 py-2">{member.general_email}</td>
                <td className="px-3 py-2">{member.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemberGroupAsignTable;
