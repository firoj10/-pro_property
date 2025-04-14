import { createBrowserRouter } from "react-router-dom"; 
import Member from "../Features/Members/Member";
import Logindummy from "../Authentication/Login/Logindummy";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import MemberList from "../Features/Members/page/MemberList/MemberList";
import AddMember from "../Features/Members/page/MemberList/AddMember/AddMember";

// Define your router with nested routes
export const router = createBrowserRouter([

  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/", // This will be "/main/members"
        element: <Dashboard />,
      },
      {
        path: "member-list", // This will be "/main/members"
        element: <MemberList />,
      },
      {
        path: "add-member", // This will be "/main/members"
        element: <AddMember />,
      },
    ],
  },
  {
    path: "/login",
    element: <Logindummy />
  },
]);
