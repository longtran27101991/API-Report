import React from "react";


const ViewProject = React.lazy(() => import("./views/Projects/View/ViewProjects"));
const History = React.lazy(() => import("./views/History/History"));
const ResetPassword = React.lazy(() => import("./views/Pages/ResetPassword"));


const routes = [
  {path: "/", exact: true, name: "History", component: History},
  {path: "/history", exact: true, name: "History", component: History},
  {path: "/history/:id", exact: true, name: "History", component: History},
  {path: "/account", name: "View List", component: ViewProject},
  {path: "/resetPassword", name: "Reset Password", component: ResetPassword},
];

export default routes;
