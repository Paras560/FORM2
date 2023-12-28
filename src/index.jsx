import ReactDOM from "react-dom/client";

import "@fontsource-variable/open-sans";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/m-plus-1";
import "./index.css";

import React from "react";

import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
