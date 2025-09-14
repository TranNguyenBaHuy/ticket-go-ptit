import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/products", component: Products },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
