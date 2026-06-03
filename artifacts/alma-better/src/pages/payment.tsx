import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Download,
  ShieldCheck,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import paymentQr from "@/assets/payment-qr.svg";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Payment() {
  const [showOtp, setShowOtp] = useState(false);
  const [paid, setPaid] = useState(false);
  const [otp, setOtp] = useState("");

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

  const transactionId =
    "pay_" +
    Math.random()
      .toString(36)
      .substring(2, 12)
      .toUpperCase();

  const utr =
    Math.floor(
      100000000000 + Math.random() * 900000000000
    ).toString();

  function openDemoPayment() {
    setShowOtp(true);
  }

  async function downloadReceipt() {
    const input = document.getElementById(
      "receipt"
    ) as HTMLElement;

    const canvas = await html2canvas(input);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;

    const pageHeight = 295;

    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;
    }

    pdf.save("payment-receipt.pdf");
  }

  // OTP SCREEN
  if (showOtp && !paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-border p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>

            <h1 className="text-3xl font-bold text-secondary mb-2">
              OTP Verification
            </h1>

            <p className="text-muted-foreground">
              Enter OTP to complete payment
            </p>
          </div>

          <div className="bg-muted rounded-2xl p-5 text-center mb-5">
            <p className="text-sm text-muted-foreground mb-2">
              OTP Sent Successfully
            </p>

            <p className="text-4xl font-bold tracking-[12px] text-primary">
              123456
            </p>
          </div>

          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="h-14 text-center text-2xl tracking-[10px] mb-5"
          />

          <Button
            onClick={() => {
              if (otp === "123456") {
                setPaid(true);
              } else {
                alert("Invalid OTP");
              }
            }}
            className="w-full h-14 text-lg rounded-2xl"
          >
            Verify Payment
          </Button>
        </motion.div>
      </div>
    );
  }

  // SUCCESS RECEIPT
  if (paid) {
    return (
      <div className="min-h-screen bg-background px-6 py-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <div
            id="receipt"
            className="bg-white rounded-3xl shadow-xl border border-border p-8"
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-4xl font-extrabold text-secondary mb-2">
                Payment Successful
              </h1>

              <p className="text-muted-foreground">
                Transaction Completed Successfully
              </p>
            </div>

            <div className="space-y-4 text-sm border rounded-2xl p-6 mb-6">
              <div className="flex justify-between">
                <span>Student Name</span>
                <span className="font-semibold">
                  {enrollment.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Course</span>
                <span className="font-semibold text-right max-w-[60%]">
                  {enrollment.course}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Original Amount</span>
                <span>₹88,999</span>
              </div>

              <div className="flex justify-between text-green-700">
                <span>Yes Bank Discount</span>
                <span>- ₹4,450</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Amount Paid</span>
                <span>
                  ₹
                  {creditCardPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>
            </div>

            <div className="space-y-3 border rounded-2xl p-6 mb-6 text-sm">
              <div className="flex justify-between">
                <span>Transaction ID</span>

                <span className="font-medium">
                  {transactionId}
                </span>
              </div>

              <div className="flex justify-between">
                <span>UTR Number</span>

                <span className="font-medium">
                  {utr}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Payment Method</span>

                <span className="font-medium">
                  Yes Bank Credit Card
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span className="text-green-600 font-bold">
                  SUCCESS
                </span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>

                <span className="font-medium">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">
                Course Conditions
              </h3>

              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>
                  Placement guarantee applicable after
                  successful course completion.
                </li>

                <li>
                  Student must complete all assignments
                  and assessments.
                </li>

                <li>
                  Minimum attendance criteria must be
                  maintained.
                </li>

                <li>
                  Refund applicable only as per company
                  policy.
                </li>

                <li>
                  Interview participation is mandatory.
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={downloadReceipt}
                className="flex-1 h-14 text-lg rounded-2xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>

              <Button
                variant="outline"
                className="flex-1 h-14 text-lg rounded-2xl"
              >
                Back Home
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // MAIN PAYMENT PAGE
  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <span className="text-primary">
                Better
              </span>
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
            <div className="space-y-5">
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

                  <p className="text-white/90 text-sm">
                    Pay using your Yes Bank Credit Card
                    and get 5% instant cashback.
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-white/70" />

                    <span className="text-white/80 text-sm">
                      Pay just ₹
                      {creditCardPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white rounded-3xl border border-border shadow-sm p-6 flex flex-col items-center">
                <h3 className="text-secondary font-bold text-lg mb-1">
                  Scan to Pay via UPI
                </h3>

                <p className="text-muted-foreground text-sm mb-5 text-center">
                  Use GPay, PhonePe, Paytm or any UPI
                  app
                </p>

                <img
                  src={paymentQr}
                  alt="Payment QR"
                  className="w-64 h-64 rounded-2xl border-4 border-primary/20 object-contain"
                />

                <div className="mt-5 text-center">
                  <div className="text-3xl font-extrabold text-secondary">
                    ₹
                    {creditCardPrice.toLocaleString(
                      "en-IN"
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground mt-1">
                    Discounted amount after 5% Yes
                    Bank offer
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-green-50 border border-green-100">
                <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />

                <p className="text-green-800 text-sm font-medium">
                  100% secure payment. Your data is
                  protected.
                </p>
              </div>
            </div>

            <div className="space-y-5">
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

                    <span className="font-semibold text-secondary text-right max-w-[55%]">
                      {enrollment.course}
                    </span>
                  </div>

                  <div className="border-t border-border pt-3 mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Base Fee
                      </span>

                      <span>
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

                      <span>
                        ₹
                        {enrollment.gstAmount.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-green-700">
                      <span>
                        Yes Bank Instant Discount
                      </span>

                      <span>- ₹4,450</span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-bold text-secondary">
                        Final Payable
                      </span>

                      <span className="font-extrabold text-primary text-lg">
                        ₹
                        {creditCardPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-secondary text-lg mb-2">
                  Card Payment
                </h3>

                <p className="text-muted-foreground text-sm mb-5">
                  Complete your payment securely.
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

                  <Button
                    type="button"
                    onClick={openDemoPayment}
                    className="w-full h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90"
                  >
                    Pay ₹
                    {creditCardPrice.toLocaleString(
                      "en-IN"
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    256-bit SSL encrypted payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
