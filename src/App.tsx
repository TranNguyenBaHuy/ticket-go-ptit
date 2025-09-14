import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import Header from "./components/header/Header";
function App() {
  return (
    <>
      <Header />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
    </>
  );
}

export default App;
