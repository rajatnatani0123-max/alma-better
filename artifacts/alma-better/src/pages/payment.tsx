import { useState } from "react";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  CheckCircle2,
  Download,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

export default function Payment() {
  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [showOtp, setShowOtp] = useState(false);

  const [paid, setPaid] = useState(false);

  const amount = 84549;

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

  function sendOtp() {
    if (phone.length < 10) {
      alert("Enter valid mobile number");
      return;
    }

    setShowOtp(true);
  }

  function verifyOtp() {
    if (otp.length === 6) {
      setPaid(true);
    } else {
      alert("Enter valid OTP");
    }
  }

  async function downloadReceipt() {
    const input = document.getElementById(
      "receipt"
    ) as HTMLElement;

    const canvas = await html2canvas(input);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

    pdf.save("payment-receipt.pdf");
  }

  // SUCCESS PAGE
  if (paid) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <div
            id="receipt"
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-4xl font-bold text-[#111827] mb-2">
                Payment Successful
              </h1>

              <p className="text-gray-500">
                Transaction Completed Successfully
              </p>
            </div>

            <div className="border rounded-2xl p-6 mb-6 space-y-4">
              <div className="flex justify-between">
                <span>Student Name</span>

                <span className="font-semibold">
                  Rajat Natani
                </span>
              </div>

              <div className="flex justify-between">
                <span>Course</span>

                <span className="font-semibold text-right max-w-[60%]">
                  AlmaBetter Placement Guarantee
                  Program
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

              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Amount Paid</span>

                <span>
                  ₹
                  {amount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="border rounded-2xl p-6 mb-6 space-y-4">
              <div className="flex justify-between">
                <span>Transaction ID</span>

                <span>{transactionId}</span>
              </div>

              <div className="flex justify-between">
                <span>UTR Number</span>

                <span>{utr}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Method</span>

                <span>
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

                <span>
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="border rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">
                Course Conditions
              </h3>

              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
                <li>
                  Placement guarantee applicable
                  after successful course completion.
                </li>

                <li>
                  Student must complete all
                  assignments and assessments.
                </li>

                <li>
                  Attendance criteria mandatory.
                </li>

                <li>
                  Interview participation
                  compulsory.
                </li>

                <li>
                  Refund subject to company policy.
                </li>
              </ul>
            </div>

            <Button
              onClick={downloadReceipt}
              className="w-full h-14 text-lg rounded-2xl bg-orange-500 hover:bg-orange-600"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Receipt PDF
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // OTP PAGE
  if (showOtp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-10 h-10 text-orange-500" />
            </div>

            <h1 className="text-3xl font-bold text-[#111827] mb-2">
              OTP Verification
            </h1>

            <p className="text-gray-500">
              OTP sent to +91 {phone}
            </p>
          </div>

          <Input
            placeholder="••••••"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            className="h-14 text-center text-2xl tracking-[10px] mb-5"
          />

          <Button
            onClick={verifyOtp}
            className="w-full h-14 text-lg rounded-2xl bg-orange-500 hover:bg-orange-600"
          >
            Verify Payment
          </Button>
        </motion.div>
      </div>
    );
  }

  // MAIN PAYMENT PAGE
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <nav className="sticky top-0 z-50 w-full bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className="font-bold text-2xl">
            AlmaBetter
          </h1>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 border"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 text-[#111827]">
              Complete Payment
            </h1>

            <p className="text-gray-500">
              Secure your enrollment now
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 border border-green-200 p-5 mb-6">
            <div className="flex justify-between mb-2">
              <span>Original Price</span>

              <span>₹88,999</span>
            </div>

            <div className="flex justify-between text-green-700 mb-2">
              <span>Yes Bank Discount</span>

              <span>- ₹4,450</span>
            </div>

            <div className="border-t border-green-200 pt-3 flex justify-between font-bold text-lg">
              <span>Total Payable</span>

              <span>
                ₹
                {amount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <Input
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="h-14 mb-5"
          />

          <Button
            onClick={sendOtp}
            className="w-full h-14 text-lg rounded-2xl bg-orange-500 hover:bg-orange-600"
          >
            Pay ₹
            {amount.toLocaleString("en-IN")}
          </Button>

          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-green-700">
            <ShieldCheck className="w-4 h-4" />

            <span>
              256-bit SSL encrypted payment
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
