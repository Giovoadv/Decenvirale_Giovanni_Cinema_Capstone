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

const Sidebar = ({ handleClick }) => {
  return (
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
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Home
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="#" className="active">
              <CDBSidebarMenuItem
                onClick={(e) => handleClick(e, "now_playing")}
                className="menuItem"
                icon="columns"
              >
                Now Playing
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#" className="active">
              <CDBSidebarMenuItem
                onClick={(e) => handleClick(e, "popular")}
                className="menuItem"
                icon="film"
              >
                Popular
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#" className="active">
              <CDBSidebarMenuItem
                onClick={(e) => handleClick(e, "top_rated")}
                className="menuItem"
                icon="film"
              >
                Top Rate
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="#" className="active">
              <CDBSidebarMenuItem
                onClick={(e) => handleClick(e, "upcoming")}
                className="menuItem"
                icon="chart-line"
              >
                Upcoming
              </CDBSidebarMenuItem>
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
  );
};

export default Sidebar;
