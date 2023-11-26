import Link from "next/link";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="side-bar-menu">
      <p className="heading2">Team Work</p>
      <ul className="side-bar-links">
        <li>
          <Link className="side-bar-link" href="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link className="side-bar-link" href="/dashboard/projects">
            Projects
          </Link>
        </li>
        <li>
          <Link className="side-bar-link" href="/dashboard/about">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
