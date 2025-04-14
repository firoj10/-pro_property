import React from "react";
import NoData from "../../../Components/Table/NoData";
import ViewButton from "../../../Components/Buttons/ViewButton";
import UserThumbnailGroup from "../../../Components/Thumbnails/UserThumbnailGroup";
import { useNavigate } from "react-router-dom";
import Status from "../../../Components/Text/Status";
import TableCellText from "../../../Components/Table/TableCellText";
import TableCell from "../../../Components/Table/TableCell";

const GroupTable = ({ groupList }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto max-h-[70vh]">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-100 shadow-lg border-b border-BorderPrimary sticky top-0 z-10">
          <tr>
            <th className="w-[20%] px-3 font-[700] py-3 text-base">
              Group Members
            </th>
            <th className="w-[22%] px-3 font-[700] py-3 text-base">Name</th>
            <th className="w-[27%] px-3 font-[700] py-3 text-base">
              Description
            </th>
            <th className="w-[20%] px-3 font-[700] py-3 text-base">Roles</th>
            <th className="w-[6%] px-3 font-[700] py-3 text-base text-center">
              Status
            </th>
            <th className="w-[5%] px-3 font-[700] py-3 text-base text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {groupList.length === 0 ? (
            <NoData message="There are no groups" />
          ) : (
            groupList.map((group, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50 cursor-pointer min-h-[100px]"
                onClick={() => navigate(`/groupProfile/${group.id}`)}
              >
                <TableCell>
                  {group?.members?.length === 0 ? (
                    <p className="py-1 text-sm text-gray-500">No members</p>
                  ) : (
                    <UserThumbnailGroup
                      userPhotos={group.members.map((member) => member.photo_low_quality)}
                    />

                  )}
                </TableCell>

                <TableCellText data={group?.group_name} />
                <TableCellText data={group?.group_description} />
                <TableCellText
                  data={group?.roles.map((role) => role.role_name)}
                />
                <TableCell>
                  {group.is_active ? (
                    <Status color="primary" text="Active" />
                  ) : (
                    <Status color="red" text="Inactive" />
                  )}
                </TableCell>
                <TableCell>
                  <ViewButton url={`/groupProfile/${group.id}`} />
                </TableCell>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupTable;
