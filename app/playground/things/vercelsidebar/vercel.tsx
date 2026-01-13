"use client";

import { Tweet } from "react-tweet";
// import { ptSerif } from "../../../fonts";
import "./vercel.css";
export default function VercelSidebar() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Experience", href: "/#career" },
    { label: "Games", href: "/#games" },
    { label: "Projects", href: "/#projects" },
    { label: "Fun Facts", href: "/#fun-facts" },
  ];

  return (
    <div className="cont">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">SS</div>
            <a
              href="https://github.com/Beasleydog"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sam Schneider
            </a>
          </div>
        </div>
      </div>
      <div className="content light">
        <input type="checkbox" className="toggle"></input>
        {/* <div className="text-2xl" style={ptSerif.style}>
          this was cool so i remade it
        </div> */}
        <a
          href="https://twitter.com/iamsahaj_xyz/status/1976334761569534024"
          target="_blank"
          className="w-full flex justify-center"
        >
          <Tweet id="1976334761569534024" />
        </a>
      </div>
    </div>
  );
}
