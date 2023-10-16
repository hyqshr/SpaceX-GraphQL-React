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
import CapsulePage from "pages/Capsule";
import Report from "pages/Report";
import { Provider } from "react-redux";
import store from './store/store'; 
import * as Sentry from "@sentry/react";
import ReportPanel from "pages/ReportPanel";

process.env.NODE_ENV === "production" && Sentry.init({
  dsn: "https://f4c7f260c9fea0e71927a249d5966a2f@o4506039707172864.ingest.sentry.io/4506039709270016",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 0.2, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="detail/:id" element={<LaunchDetail />} />
            <Route path="launch-pads" element={<LaunchPads />} />
            <Route path="launches" element={<Launches />} />
            <Route path="upcoming-launches" element={<UpcomingLaunches />} />
            <Route path="company" element={<Company />} />
            <Route path="capsule" element={<CapsulePage />} />
            <Route path="submit-report" element={<Report />} />
            <Route path="reports" element={<ReportPanel />} />
          </Route>
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <DarkModeToggle />
    </Provider>
  </ApolloProvider>
);
