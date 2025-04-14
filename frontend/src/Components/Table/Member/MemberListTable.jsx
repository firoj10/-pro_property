import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import user1 from "../../../assets/user/user.png";

const MemberListTable = ({ member, error }) => {
  // Check if member is an array and has data
  const hasMembers = Array.isArray(member) && member.length > 0;

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="bg-subprimary shadow-lg border-b border-subprimary">
          <tr>
            <th className="px-3 font-[700] py-2 text-base text-left">Name</th>
            <th className="px-3 font-[700] py-2 text-base text-left">Contact</th>
            <th className="px-3 font-[700] py-2 text-base text-left">Email</th>
            <th className="px-3 font-[700] py-2 text-base text-left">Type</th>
            <th className="px-3 font-[700] py-2 text-base text-left">Role</th>
            <th className="px-3 font-[700] py-2 text-base text-left">Status</th>
            <th className="px-3 font-[700] py-2 text-base text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {!hasMembers ? (
            // If there are no members or error message from backend
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                {error?.message === "No results found" ? "No results found" : "No members available "}
              </td>
            </tr>
          ) : (
            member?.map((member, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-3 py-[10px] font-medium flex items-center">
                  <img
                    src={member.photo ? member.photo : user1}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  {member.full_name}
                </th>
                <td className="px-3 py-2 text-base text-left">{member.general_contact}</td>
                <td className="px-3 py-2 text-base text-left">{member.general_email}</td>
                <td className="px-3 py-2 text-base text-left">{member.member_type_name}</td>
                <td className="px-3 py-2 text-base text-left">
                  {member?.member_roles?.map((role) => role.role_name).join(", ")}
                </td>
                <td className="px-3 py-2 text-base text-left">
                  <button
                    size="small"
                    className={`mx-2 font-[600] py-1 px-2 rounded-8 text-white ${
                      Number(member.is_org_member) === 1 ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {Number(member.is_org_member) === 1 ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-3 py-2 text-base text-left">
                  <Link to={`/member-profile/${member.id}`}>
                    <FaEye color="#3D9D9B" className="w-[25px] h-[20px]" />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemberListTable;
