import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import CityList from "./components/CityList";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import City from "./components/City";
import { CityContexProvider } from "./contexts/cityContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/HomePage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import Homepage from "./pages/HomePage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <div>
      <CityContexProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="product" element={<Product />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />

                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CityContexProvider>
    </div>
  );
}

export default App;

// To run the server npm run server
