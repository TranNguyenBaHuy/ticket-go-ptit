import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import type { ComponentType, PropsWithChildren } from "react";
import DefaultLayout from "./components/Layouts/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout: ComponentType<PropsWithChildren> = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </AuthProvider>
  );
}

export default App;
