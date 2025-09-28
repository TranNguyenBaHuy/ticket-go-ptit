import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/MyTickets";
import DefaultLayout from "../components/Layouts/DefaultLayout/DefaultLayout";
import Contact from "../pages/Contact";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/about", component: About, layout: DefaultLayout },
  { path: "/my-tickets", component: Products, layout: DefaultLayout },
  { path: "/contact", component: Contact, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
