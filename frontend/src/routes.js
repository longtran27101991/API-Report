import React from "react";


const ViewProject = React.lazy(() => import("./views/Projects/View/ViewProjects"));
const ApiReport = React.lazy(() => import("./views/ApiReport/ApiReport"));
const ResetPassword = React.lazy(() => import("./views/Pages/ResetPassword"));


const routes = [
  {path: "/", exact: true, name: "API Report", component: ApiReport},
  {path: "/apireport", exact: true, name: "API Report", component: ApiReport},
  {path: "/account", name: "View List", component: ViewProject},
  {path: "/resetPassword", name: "Reset Password", component: ResetPassword},
];

export default routes;
