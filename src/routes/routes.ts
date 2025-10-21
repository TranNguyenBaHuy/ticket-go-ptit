import Home from "../pages/Home";
import About from "../pages/About";
import MyTickets from "../pages/MyTickets";
import DefaultLayout from "../components/Layouts/Client/DefaultLayout/DefaultLayout";
import Contact from "../pages/Contact";
import AllEvents from "../pages/AllEvents";
import SelectTicket from "../pages/SelectTicket";
import EventDetail from "../components/Layouts/Client/EventDetail";
import NotFound from "../pages/NotFound";
// @ts-expect-error - JSX file without type declarations
import AdminLayout from "../components/Layouts/admin/LayoutAdmin";
// @ts-expect-error - JSX file without type declarations
import Dashboard from "../pages/admin/dashboard/Dashboard";
// @ts-expect-error - JSX file without type declarations
import UserShow from "../pages/admin/user/UserShow";
// @ts-expect-error - JSX file without type declarations
import UserDetail from "../pages/admin/user/UserDetail";
// @ts-expect-error - JSX file without type declarations
import UserCreate from "../pages/admin/user/UserCreate";
// @ts-expect-error - JSX file without type declarations
import EventShow from "../pages/admin/event/EventShow";
// @ts-expect-error - JSX file without type declarations
import EventDetailAdmin from "../pages/admin/event/EventDetail";
// @ts-expect-error - JSX file without type declarations
import EventCreate from "../pages/admin/event/EventCreate";
// @ts-expect-error - JSX file without type declarations
import OrderShow from "../pages/admin/order/OrderShow";
// @ts-expect-error - JSX file without type declarations
import OrderDetail from "../pages/admin/order/OrderDetail";
import SelectTicketLayout from "../components/Layouts/Client/SelectTicketLayout/SelectTicketLayout";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/about", component: About, layout: DefaultLayout },
  { path: "/my-tickets", component: MyTickets, layout: DefaultLayout },
  { path: "/contact", component: Contact, layout: DefaultLayout },
  { path: "/all-events", component: AllEvents, layout: DefaultLayout },
  { path: "/events/:id", component: EventDetail, layout: DefaultLayout },
  {
    path: "/events/:id/select-ticket",
    component: SelectTicket,
    layout: SelectTicketLayout,
  },
  { path: "*", component: NotFound, layout: null },
];
const privateRoutes = [
  { path: "/admin", component: Dashboard, layout: AdminLayout },
  { path: "/admin/users", component: UserShow, layout: AdminLayout },
  {
    path: "/admin/user-detail/:id",
    component: UserDetail,
    layout: AdminLayout,
  },
  { path: "/admin/user-create", component: UserCreate, layout: AdminLayout },
  { path: "/admin/events", component: EventShow, layout: AdminLayout },
  {
    path: "/admin/event-detail/:id",
    component: EventDetail,
    layout: AdminLayout,
  },
  { path: "/admin/event-create", component: EventCreate, layout: AdminLayout },
  { path: "/admin/orders", component: OrderShow, layout: AdminLayout },
  {
    path: "/admin/order-detail/:id",
    component: OrderDetail,
    layout: AdminLayout,
  },
  { path: "*", component: NotFound, layout: null },
];

export { publicRoutes, privateRoutes };
