
import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

import "./index.css";

const queryClient = new QueryClient();

const razorpayScript = document.createElement("script");

razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";

razorpayScript.async = true;

document.body.appendChild(razorpayScript);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>

      <App />

    </QueryClientProvider>

  </React.StrictMode>
);


