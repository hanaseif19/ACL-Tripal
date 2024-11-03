import AdminDashboard from "../pages/admin/AdminHome";
import ActivityCategoryDetails from "../pages/admin/ActivityCategoryDetails";
import TagManager from "../pages/admin/PreferenceTags";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminViewProduct from "../pages/admin/AdminViewProduct";
import AdminViewUsers from "../pages/admin/AdminViewUsers";
import CreateNewGovernor from "../pages/admin/CreateNewGovernor";
import CreateNewAdmin from "../pages/admin/CreateNewAdmin";
import ComplaintsPage from "../pages/admin/Complaints";

const adminRoutes = [
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/activity-categories", element: <ActivityCategoryDetails /> },
  { path: "/preference-tags", element: <TagManager /> },
  { path: "/admin/view-products", element: <AdminProducts /> },
  { path: "/admin/view-products/product/:id", element: <AdminViewProduct /> },
  { path: "/admin/delete-user", element: <AdminViewUsers /> },
  { path: "/admin/new-governor", element: <CreateNewGovernor /> },
  { path: "/admin/new-admin", element: <CreateNewAdmin /> },
  { path: "/admin/complaints", element: <ComplaintsPage /> },



];

export default adminRoutes;
