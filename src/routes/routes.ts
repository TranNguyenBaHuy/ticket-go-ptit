import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import DefaultLayout from "../components/Layout/DefaultLayout/DefaultLayout";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout },
  { path: "/about", component: About, layout: DefaultLayout },
  { path: "/products", component: Products, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
