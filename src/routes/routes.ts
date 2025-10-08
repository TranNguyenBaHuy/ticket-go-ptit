import Home from "../pages/Home";
import About from "../pages/About";
import MyTickets from "../pages/MyTickets";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import Contact from "../pages/Contact";
import AllEvents from "../pages/AllEvents";
import EventDetail from "../components/EventDetail";
import SelectTicket from "../pages/SelectTicket";

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
    layout: DefaultLayout,
  },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
