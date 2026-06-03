
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  ShieldCheck,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import paymentQr from "@/assets/payment-qr.svg";

export default function Payment() {
  const [paid, setPaid] = useState(false);

  const enrollment = {
    name: "Rajat Natani",
    course: "AlmaBetter Placement Guarantee Program",
    totalAmount: 88999,
    baseAmount: 75422,
    gstAmount: 13577,
    email: "rajat@example.com",
  };

  const creditCardPrice = Math.round(
    enrollment.totalAmount * 0.95
  );

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);
  }, []);

  function openRazorpay() {
    const options = {
      key: "rzp_test_SwkhvnJtl5e00t",

      amount: 49900,
      currency: "INR",

      name: "AlmaBetter",

      description: "Full Course Enrollment Payment",
      image: "https://almabetter.com/favicon.ico",

      handler: function () {
        setPaid(true);
      },

      theme: {
        color: "#7C3AED",
      },
    };

    const razorpay = new (window as any).Razorpay(options);

    razorpay.open();
  }

  if (paid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-extrabold text-secondary mb-3">
            Payment Successful!
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Thank you,
            <span className="font-semibold text-secondary">
              {" "}
              {enrollment.name}
            </span>
            !
          </p>

          <div className="bg-muted/50 rounded-2xl p-6 text-left mb-8 border border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Course
              </span>

              <span className="font-semibold text-secondary text-right max-w-[60%]">
                {enrollment.course}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Amount Paid
              </span>

              <span className="font-semibold text-secondary">
                ₹
                {enrollment.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Confirmation sent to
              </span>

              <span className="font-semibold text-secondary">
                {enrollment.email}
              </span>
            </div>
          </div>

          <Button
            size="lg"
            className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-white"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
              A
            </div>

            <span className="font-bold text-xl text-secondary">
              Alma
              <span className="text-primary">Better</span>
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Heading */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
              Step 2 of 2 — Payment
            </div>

            <h1 className="text-4xl font-extrabold text-secondary mb-2">
              Complete Your Payment
            </h1>

            <p className="text-muted-foreground text-lg">
              Secure your seat now
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div className="space-y-5">
              {/* Offer Banner */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Tag className="w-6 h-6 text-white" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">
                      Yes Bank Offer
                    </span>

                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      5% OFF
                    </span>
                  </div>

                  <p className="text-white/90 text-sm leading-relaxed">
                    Pay using your Yes Bank Credit Card and get
                    5% instant cashback.
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-white/70" />

                    <span className="text-white/80 text-sm">
                      Pay just ₹
                      {creditCardPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* QR Section */}
              <div className="bg-white rounded-3xl border border-border shadow-sm p-6 flex flex-col items-center">
                <h3 className="text-secondary font-bold text-lg mb-1">
                  Scan to Pay via UPI
                </h3>

                <p className="text-muted-foreground text-sm mb-5 text-center">
                  Use GPay, PhonePe, Paytm or any UPI app
                </p>

                <img
                  src={paymentQr}
                  alt="Payment QR"
                  className="w-64 h-64 rounded-2xl border-4 border-primary/20 object-contain"
                />

                <div className="mt-5 text-center">
                  <div className="text-3xl font-extrabold text-secondary">
                    ₹
                    {enrollment.totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground mt-1">
                    Total amount including GST
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-green-50 border border-green-100">
                <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />

                <p className="text-green-800 text-sm font-medium">
                  100% secure payment. Your data is protected.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-5">
              {/* Summary */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-secondary text-lg mb-5">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Student
                    </span>

                    <span className="font-semibold text-secondary">
                      {enrollment.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Course
                    </span>

                    <span className="font-semibold text-secondary text-right max-w-[55%] leading-snug">
                      {enrollment.course}
                    </span>
                  </div>

                  <div className="border-t border-border pt-3 mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Base Fee
                      </span>

                      <span className="font-medium text-secondary">
                        ₹
                        {enrollment.baseAmount.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        GST (18%)
                      </span>

                      <span className="font-medium text-secondary">
                        ₹
                        {enrollment.gstAmount.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-bold text-secondary">
                        Total
                      </span>

                      <span className="font-extrabold text-primary text-lg">
                        ₹
                        {enrollment.totalAmount.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-secondary text-lg mb-2">
                  Card Payment
                </h3>

                <p className="text-muted-foreground text-sm mb-5">
                  Complete your payment securely using Razorpay.
                </p>

                <div className="space-y-4">
                  <Input
                    placeholder="Card Holder Name"
                    className="h-12"
                  />

                  <Input
                    placeholder="Card Number"
                    className="h-12"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="MM/YY"
                      className="h-12"
                    />

                    <Input
                      placeholder="CVV"
                      className="h-12"
                    />
                  </div>

                  ```tsx id="w8qf1x"
<div className="space-y-4">

  <div className="rounded-2xl border border-green-200 bg-green-50 p-4">

    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-green-800">
        Yes Bank Credit Card Offer Applied
      </span>

      <span className="text-xs font-bold bg-green-600 text-white px-2 py-1 rounded-full">
        VERIFIED
      </span>
    </div>

    <div className="flex justify-between text-sm mb-1">
      <span>Course Fee</span>
      <span>₹88,999</span>
    </div>

    <div className="flex justify-between text-sm mb-1 text-green-700">
      <span>Instant Bank Discount</span>
      <span>- ₹4,450</span>
    </div>

    <div className="border-t border-green-200 my-2"></div>

    <div className="flex justify-between font-bold text-lg text-secondary">
      <span>Total Payable</span>
      <span>₹84,549</span>
    </div>
  </div>

  <Button
    type="button"
    onClick={openRazorpay}
    className="w-full h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90"
  >
    Proceed to Secure Payment
  </Button>

  <p className="text-xs text-center text-muted-foreground">
  256-bit SSL encrypted payment powered by Razorpay
</p>

</div>
</div>
</div>
</motion.div>
</div>
</div>
);
}


