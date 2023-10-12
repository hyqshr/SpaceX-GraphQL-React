import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import client from "./apollo/apollo-client";
import { Home, Error, LaunchDetail } from "./pages";
import DarkModeToggle from "components/util/DarkModeToggle";
import LaunchPads from "pages/LaunchPads";
import Launches from "pages/Launches";
import UpcomingLaunches from "pages/UpcomingLaunches";
import Company from "pages/Company";
import Capsule from "pages/Capsule";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/spacex-launches">
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<LaunchDetail />} />
          <Route path="launch-pads" element={<LaunchPads />} />
          <Route path="launches" element={<Launches />} />
          <Route path="upcoming-launches" element={<UpcomingLaunches />} />
          <Route path="company" element={<Company />} />
          <Route path="capsule" element={<Capsule />} />
        </Route>
        <Route path="/spacex-launches/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
    <DarkModeToggle />
  </ApolloProvider>
);
