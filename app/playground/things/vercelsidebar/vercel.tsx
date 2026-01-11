"use client";

import "./vercel.css";
export default function VercelSidebar() {
  return (
    <div className="cont">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-badge">Preview</span>
          <h2>Edge Deployments</h2>
          <p>
            Monitor rollouts, health, and performance across every environment
            at a glance.
          </p>
        </div>

        <div className="sidebar-section">
          <h3>Active Project</h3>
          <div className="sidebar-card">
            <div>
              <p className="sidebar-title">newsamschneider.com</p>
              <p className="sidebar-subtitle">Main · updated 2m ago</p>
            </div>
            <span className="sidebar-status">Live</span>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Quick Links</h3>
          <ul className="sidebar-actions">
            <li>View deployment logs</li>
            <li>Promote to production</li>
            <li>Manage environment variables</li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <div>
            <p className="sidebar-usage-label">Build minutes</p>
            <p className="sidebar-usage-value">65% of monthly quota</p>
          </div>
          <button type="button" className="sidebar-button">
            New Deployment
          </button>
        </div>
      </aside>
      <div className="content">
        <input type="checkbox" className="toggle"></input>
      </div>
    </div>
  );
}
