import { FaUserGroup } from "react-icons/fa6";
import Button from "../../../Components/FormComponent/ButtonComponent/Button";
import { Div } from "../../../Components/Ui/Div";
import { Paragraph } from "../../../Components/Ui/Paragraph";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkPermission } from "../../../utils/permissionUtils"; 

const GroupProfile = ({ groupDetail }) => {
  const navigate = useNavigate();
  
  // Permission state
  const [hasPermission, setHasPermission] = useState(false);
  const [loadingPermission, setLoadingPermission] = useState(true);

  const { group_name, group_description, roles, members, is_active } = groupDetail;

  useEffect(() => {
    const fetchPermission = async () => {
      // Check if the user has permission to view the group
      const permissionGranted = await checkPermission("org", 9); // You can adjust the arguments as needed
      setHasPermission(permissionGranted);
      setLoadingPermission(false);
    };
    fetchPermission();
  }, []);

  if (loadingPermission) {
    return <div></div>;  
  }

  if (!hasPermission) {
    navigate("/not-authorized");  
  }

  return (
    <>
      <Div className="py-2">
        <Paragraph className="text-primary">Group Name</Paragraph>
        <Paragraph className="text-base font-medium">{group_name}</Paragraph>
      </Div>
      <Div className="py-2">
        <Paragraph className="text-primary">Group Description</Paragraph>
        <Paragraph className="font-medium">
          {group_description?.length === 0 ? (
            <p className="text-sm text-gray-500">---</p>
          ) : (
            group_description
          )}
        </Paragraph>
      </Div>
      <Div className="py-2">
        <Paragraph className="text-primary pb-1">Roles</Paragraph>
        <Div className="flex flex-wrap gap-2">
          {roles && roles.length > 0 ? (
            roles.map((role) => (
              <Button key={role.id} size="small" variant="black">
                {role.role_name}{" "}
                <span className="px-2 text-[#8080808C]">
                  <FaUserGroup />
                </span>
              </Button>
            ))
          ) : (
            <Paragraph>No roles assigned</Paragraph>
          )}
        </Div>
      </Div>
      <Div className="py-2">
        <Paragraph className="text-primary pb-1">Group Members</Paragraph>
      </Div>

      <Div>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="bg-[#3C9D9B1A] shadow-lg border-b border-[#E2E8F0]">
            <tr>
              <th className="px-3 font-[700] py-2 text-base text-left">Name</th>
              <th className="px-3 font-[700] py-2 text-base text-left">Member Type</th>
              <th className="px-3 font-[700] py-2 text-base text-left">Contact</th>
              <th className="px-3 font-[700] py-2 text-base text-left">Email</th>
              <th className="px-3 font-[700] py-2 text-base text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {members && members.length > 0 ? (
              members.map((member) => (
                <tr
                  key={member.id}
                  className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/member-profile/${member.id}`)}
                >
                  <td className="px-3 py-[10px] font-medium flex items-center">
                    <img
                      src={member.photo || "/user.jpg"}
                      alt={member.full_name}
                      className="w-8 h-8 rounded-full mx-2"
                    />
                    {member.full_name}
                  </td>
                  <td className="px-3 py-[10px] text-[14px] text-left">
                    {member.member_type || "N/A"}
                  </td>
                  <td className="px-3 py-[8px] text-[14px] text-left">
                    {member.general_contact}
                  </td>
                  <td className="px-3 py-[8px] text-[14px] text-left">
                    {member.general_email}
                  </td>
                  <td className="px-3 py-[8px] text-[14px] text-left">
                    {member.roles && member.roles.length > 0
                      ? member.roles.join(", ")
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No members in this group.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Div>
    </>
  );
};

export default GroupProfile;
