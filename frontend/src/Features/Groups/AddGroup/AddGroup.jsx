import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TextInputComponent from "Components/FormComponent/TextInputComponent";
import TextareaComponent from "Components/FormComponent/TextareaComponent";
import CheckboxComponent from "Components/FormComponent/CheckboxComponent";
import { BiArrowBack } from "react-icons/bi";
import MemberGroupAsignTable from "Components/Table/Group/MemberGroupAsignTable";
import MessageBox from "Components/MessageBox/MessageBox";
import {
  createGroup,
  updateGroup,
  fetchGroupDetail,
  fetchRoles,
  clearGroupMessage,
  setGroupError,
  setSelectedMemberIds,
  updateGroupFormField,
  setGroupFormData,
  clearGroupFormData
} from "../../../redux/slices/groups/groupSlice";
import { Div } from "Components/Ui/Div";
import { Paragraph } from "Components/Ui/Paragraph";
import { Heading } from "Components/Ui/Heading";
import SubmitButton from "Components/FormComponent/ButtonComponent/SubmitButton";
import { groupFields } from "../../../utils/formFields";
import ArrowHeading from "../../../Components/HeadingComponent/ArrowHeading";
import { checkPermission } from "../../../utils/permissionUtils";

const AddGroup = () => {
  const { id } = useParams(); // If id exists, we’re in edit mode.
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roles, error, message, groupFormData } = useSelector(
    (state) => state.group
  );

  const [initialPayload, setInitialPayload] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [loadingPermission, setLoadingPermission] = useState(true);

  // Check permission when the component mounts.
  // If in add mode then pass 7; if in edit mode (id exists) then pass 8.
  useEffect(() => {
    const fetchPermission = async () => {
      const permissionId = id ? 8 : 7;
      const permissionGranted = await checkPermission("org", permissionId);
      setHasPermission(permissionGranted);
      setLoadingPermission(false);
    };
    fetchPermission();
  }, [id]);

  // Redirect after permission check if the user is not authorized.
  useEffect(() => {
    if (!loadingPermission && !hasPermission) {
      navigate("/not-authorized");
    }
  }, [loadingPermission, hasPermission, navigate]);

  // Clear any pre‑existing messages when the component mounts.
  useEffect(() => {
    dispatch(clearGroupMessage());
  }, [dispatch]);

  // Fetch roles on mount.
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // Clear form data when in create mode and on unmount to avoid stale state.
  useEffect(() => {
    if (!id) {
      dispatch(clearGroupFormData());
      dispatch(setSelectedMemberIds([]));
    }
    return () => {
      dispatch(clearGroupFormData());
      dispatch(setSelectedMemberIds([]));
    };
  }, [id, dispatch]);

  // When editing, fetch the group details and initialize Redux form state.
  useEffect(() => {
    if (id) {
      dispatch(fetchGroupDetail(id)).then((action) => {
        if (action.payload) {
          const {
            group_name,
            group_description,
            roles: groupRoles,
            members
          } = action.payload;
          const role_ids = groupRoles.map((role) => role.id);
          const member_ids = members.map((member) => member.id);

          // Save initial data for later comparison.
          const initialData = {
            group_name,
            group_description,
            role_ids,
            member_ids
          };
          setInitialPayload(initialData);

          dispatch(
            setGroupFormData({
              group_name,
              group_description,
              role_ids,
              member_ids,
              selectAll: false // We'll update this flag in a separate effect below.
            })
          );
          dispatch(setSelectedMemberIds(member_ids));
        }
      });
    }
  }, [id, dispatch]);

  // In edit mode, update the selectAll flag once roles are loaded.
  useEffect(() => {
    if (id && roles && roles.length > 0) {
      dispatch(
        updateGroupFormField({
          field: "selectAll",
          value: groupFormData.role_ids.length === roles.length
        })
      );
    }
  }, [roles, groupFormData.role_ids, id, dispatch]);

  // Handle text input changes.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateGroupFormField({ field: name, value }));
    // Clear the inline error for group_name if the user starts typing.
    if (name === "group_name" && error === "Group name is required.") {
      dispatch(clearGroupMessage());
    }
  };

  // Handle role checkbox changes.
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    const roleId = parseInt(value, 10);
    if (checked) {
      dispatch(
        updateGroupFormField({
          field: "role_ids",
          value: [...groupFormData.role_ids, roleId]
        })
      );
    } else {
      dispatch(
        updateGroupFormField({
          field: "role_ids",
          value: groupFormData.role_ids.filter((id) => id !== roleId)
        })
      );
      dispatch(
        updateGroupFormField({
          field: "selectAll",
          value: false
        })
      );
    }
  };

  // Handle the “select all” for roles.
  const handleSelectAll = (e) => {
    const { checked } = e.target;
    dispatch(
      updateGroupFormField({
        field: "selectAll",
        value: checked
      })
    );
    dispatch(
      updateGroupFormField({
        field: "role_ids",
        value: checked ? roles.map((role) => role.id) : []
      })
    );
  };

  // Ensure that if selectAll is checked, role_ids are all set.
  useEffect(() => {
    if (groupFormData.selectAll && roles && roles.length > 0) {
      dispatch(
        updateGroupFormField({
          field: "role_ids",
          value: roles.map((role) => role.id)
        })
      );
    }
  }, [roles, groupFormData.selectAll, dispatch]);

  // Handle changes from the MemberGroupAsignTable.
  const handleMemberSelectionChange = useCallback(
    (selectedMemberIds) => {
      const filtered = selectedMemberIds.filter(
        (id) => id !== undefined && id !== null
      );
      dispatch(updateGroupFormField({ field: "member_ids", value: filtered }));
    },
    [dispatch]
  );

  const clearMessage = () => {
    dispatch(clearGroupMessage());
  };

  // Form submission handler.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupFormData.group_name.trim()) {
      dispatch(setGroupError("Group name is required."));
      return;
    }

    const payload = {
      group_name: groupFormData.group_name,
      group_description: groupFormData.group_description,
      role_ids: groupFormData.role_ids,
      member_ids: groupFormData.member_ids
    };

    // If in edit mode and no changes have been made, do nothing.
    if (
      id &&
      initialPayload &&
      JSON.stringify(payload) === JSON.stringify(initialPayload)
    ) {
      console.log("No changes made. Update aborted.");
      return;
    }

    console.log("Submitting payload:", payload);
    try {
      if (id) {
        dispatch(updateGroup({ id, payload }));
      } else {
        dispatch(createGroup(payload));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // onOk callback for MessageBox.
  const handleOk = () => {
    if (id) {
      navigate(`/groupProfile/${id}`);
    } else {
      navigate("/groups");
    }
  };

  // Show a loader until permission state is determined.
  if (loadingPermission) {
    return <div>Loading...</div>;
  }

  return (
    <Div className="h-full">
      <Div className="container">
        <form onSubmit={handleSubmit}>
          <Div className="md:flex justify-between py-2">
            <ArrowHeading
              title={`${id ? "Edit Group" : "Add Group"}`}
              size="xl"
              color="black"
              onNext={() => navigate(-1)}
              fontWeight="semibold"
            />
            <Div>
              <SubmitButton
                text={id ? "Update" : "Create"}
                loading={false}
                disabled={false}
                onClick={handleSubmit}
                width="auto"
              />
            </Div>
          </Div>
          <Div className="bg-white border p-3 pt-2 rounded-27 mx-auto">
            <Div className="mb-[24px]">
              <TextInputComponent
                {...groupFields.group_name}
                name="group_name"
                value={groupFormData.group_name}
                onChange={handleInputChange}
                required
                error={error === "Group name is required." ? error : ""}
              />
            </Div>
            <Div className="flex justify-center gap-4">
              <Div className="w-[40%]">
                <Heading level={1} className="my-2 text-sm font-medium">
                  Roles
                </Heading>
                <Div className="max-h-[300px] overflow-y-auto border w-full border-BorderSecondary p-2 rounded-md shadow-sm">
                  <Div className="mb-2">
                    <CheckboxComponent
                      {...groupFields.selectAll}
                      checked={groupFormData.selectAll}
                      onChange={handleSelectAll}
                      value="all"
                    />
                  </Div>
                  {roles.map((role) => (
                    <Div key={role.id} className="mb-2">
                      <CheckboxComponent
                        name="role_ids"
                        label={role.role_name}
                        checked={groupFormData.role_ids.includes(role.id)}
                        onChange={handleRoleChange}
                        value={role.id}
                      />
                    </Div>
                  ))}
                </Div>
              </Div>
              <Div className="w-[60%]">
                <Paragraph className="my-3 text-sm font-medium">
                  Group Description
                </Paragraph>
                <TextareaComponent
                  {...groupFields.group_description}
                  name="group_description"
                  value={groupFormData.group_description}
                  onChange={handleInputChange}
                />
              </Div>
            </Div>
            <Div className="p-1.5">
              <MemberGroupAsignTable
                onSelectionChange={handleMemberSelectionChange}
                selectedMemberIds={groupFormData.member_ids}
              />
            </Div>
          </Div>
        </form>
      </Div>
      {((error && error !== "Group name is required.") || message) && (
        <MessageBox
          message={message}
          error={error && error !== "Group name is required." ? error : null}
          clearMessage={clearMessage}
          onOk={!error && message ? handleOk : undefined}
        />
      )}
    </Div>
  );
};

export default AddGroup;
