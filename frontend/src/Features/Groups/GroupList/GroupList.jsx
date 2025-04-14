import React, { useEffect, useState } from "react";
import Heading from "../../../Components/HeadingComponent/Heading";
import Button from "../../../Components/FormComponent/ButtonComponent/Button";
import { FaPlus } from "react-icons/fa";
import Row from "../../../Components/Ui/Row";
import GroupTable from "./GroupTable";
import { useNavigate } from "react-router-dom";
import FilterSelect1 from "../../../Components/FilterSelect1/FilterSelect1";
import SearchBar from "../../../Components/Search/SearchBar";
import TableSkeleton from "../../../Components/Loaders/TableSkeleton";
import useGroupList from "../useGroupList";
import { checkPermission } from "../../../utils/permissionUtils";  

const GroupList = () => {
  const navigate = useNavigate();

  const [hasPermission, setHasPermission] = useState(false);
  const [loadingPermission, setLoadingPermission] = useState(true);

  // Hook to get group list data
  const { groupList, loading } = useGroupList();

  const statusOptions = [
    { label: "Active", value: "1" },
    { label: "Inactive", value: "0" }
  ];

  useEffect(() => {
    const fetchPermission = async () => {
      const permissionGranted = await checkPermission("org", 9);  // Check for org type and ID 9
      setHasPermission(permissionGranted);
      setLoadingPermission(false);
    };
    fetchPermission();
  }, []);

  if (loadingPermission) {
    // You can return a loading state while checking for permission
    return <div className="flex items-center justify-center my-12"><TableSkeleton /></div>;
  }

  if (!hasPermission) {
    navigate("/not-authorized");  
  }


  return (
    <div className="sticky top-0 z-10 bg-white">
      <Row className="my-6 items-center justify-between">
        <Heading title="Group List" size="2xl" color="black" />
        <Row className="space-x-2 items-center">
          <FilterSelect1
            placeholder="Status"
            options={statusOptions}
            paramKey="status"
            onApply={(filters) => console.log("Applied Filters:", filters)}
          />
          <SearchBar />
          <Button icon={FaPlus} onClick={() => navigate(`/addGroup`)}>
            Add Group
          </Button>
        </Row>
      </Row>
      <div className="my-4">
        {loading ? (
          <div className="flex items-center justify-center my-12">
            <TableSkeleton />
          </div>
        ) : (
          <GroupTable groupList={groupList} />
        )}
      </div>
    </div>
  );
};

export default GroupList;
