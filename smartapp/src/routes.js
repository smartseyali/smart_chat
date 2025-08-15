import React from "react";

const Dashboard = React.lazy(() => import("./pages/dashboard"));
const Agents = React.lazy(() => import("./pages/agents"));
const Chat = React.lazy(() => import("./pages/chat"));
const Templates = React.lazy(() => import("./pages/templates"));
const Campaigns = React.lazy(() => import("./pages/campaigns"));
const ReplyBot = React.lazy(() => import("./pages/replyBot"));
const Contacts = React.lazy(() => import("./pages/contacts"));
const FileManager = React.lazy(() => import("./pages/fileManager"));
const Login = React.lazy(() => import("./pages/login"));
const Admin = React.lazy(() => import("./pages/admin"));

const routes = [
  { path: "/login", exact: true, name: "Login", element: Login },
  { path: "/", exact: true, name: "Home", element: Dashboard },
  { path: "/admin", exact: true, name: "Admin", element: Admin },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/chat", name: "Chat", element: Chat },
  { path: "/templates", name: "Templates", element: Templates },
  { path: "/campaigns", name: "Campaigns", element: Campaigns },
  { path: "/replyBot", name: "ReplyBot", element: ReplyBot },
  { path: "/contacts", name: "Contacts", element: Contacts },
  { path: "/fileManager", name: "FileManager", element: FileManager },
  { path: "/agents", name: "Agents", element: Agents },
];

export default routes;
