import React, { lazy, Suspense, useEffect } from "react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { sendDestinations } from "./store";
let isInitial = true;
const Home = lazy(() => import("./Pages/Home"));
const Favourits = lazy(() => import("./Pages/Favourits"));
const Error = lazy(() => import("./Pages/Error"));
function App() {
  const { wishList, destinations } = useSelector((state) => state);
  const dispatchHandler = useDispatch();
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatchHandler(sendDestinations(wishList, "wishlist"));
  }, [wishList, dispatchHandler]);
  useEffect(() => {
    if (destinations.length !== 0) {
      dispatchHandler(sendDestinations(destinations, "destinations"));
    }
  }, [destinations, dispatchHandler]);

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<p className="text-center col-12">Loading...</p>}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/wishlist" element={<Favourits />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
