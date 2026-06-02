const razorpayScript = document.createElement("script");

razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";

razorpayScript.async = true;

document.body.appendChild(razorpayScript);

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
