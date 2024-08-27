import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "../Components/Sidebar.css";
import GradientIcon from "./GradientIcon";
import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ handleClick }) => {
  const userData = useSelector((state) => state.user.user);
  const user = userData?.user;

  return (
    <div className="sidebar-wrapper">
      <div
        className="sidebar"
        style={{
          display: "flex",
          height: "100%",
          overflow: "scroll initial",
          hover: "#ffff",
        }}
      >
        <CDBSidebar
          textColor="rgb(134, 132, 132)"
          backgroundColor="rgb(29, 28, 28)"
        >
          <CDBSidebarHeader
            style={{ border: "none" }}
            prefix={<i className="fa fa-bars fa-large"></i>}
          >
            <NavLink to="/home" className="active">
              Home
            </NavLink>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              {user ? (
                <NavLink to="/profile" className="active">
                  <CDBSidebarMenuItem className="menuItem" icon="id-badge">
                    Profile
                  </CDBSidebarMenuItem>
                </NavLink>
              ) : (
                <NavLink to="/login" className="active">
                  <CDBSidebarMenuItem className="menuItem" icon="user">
                    Login
                  </CDBSidebarMenuItem>
                </NavLink>
              )}

              <NavLink to="/signup" className="active">
                {!user ? (
                  <CDBSidebarMenuItem className="menuItem" icon="user-plus">
                    Register
                  </CDBSidebarMenuItem>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink to="/changename" className="active">
                {user ? (
                  <CDBSidebarMenuItem className="menuItem" icon="pen">
                    Change Name
                  </CDBSidebarMenuItem>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink to="/changepassword" className="active">
                {user ? (
                  <CDBSidebarMenuItem className="menuItem" icon="keyboard">
                    Change Password
                  </CDBSidebarMenuItem>
                ) : (
                  ""
                )}
              </NavLink>
              <NavLink to="#" className="active">
                {user ? <LogoutButton /> : ""}
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              <GradientIcon />
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default Sidebar;
