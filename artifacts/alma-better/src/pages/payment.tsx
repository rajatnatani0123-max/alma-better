import { useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  CheckCircle2,
  Download,
  ShieldCheck,
  CreditCard,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import yesbank from "@/assets/yesbank.png";
import hdfc from "@/assets/hdfc.png";
import icici from "@/assets/icici.png";
import sbi from "@/assets/sbi.png";
import upi from "@/assets/upi.png";

export default function Payment() {

  const [paymentMethod, setPaymentMethod] =
    useState("cards");

  const [cardName, setCardName] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [showOtp, setShowOtp] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const [paid, setPaid] =
    useState(false);

  const [isVerifiedCard, setIsVerifiedCard] =
    useState(false);

  const originalAmount = 88999;

  const discountedAmount = 84549;

  const amount = isVerifiedCard
    ? discountedAmount
    : originalAmount;

  const transactionId =
    "pay_" +
    Math.random()
      .toString(36)
      .substring(2, 12)
      .toUpperCase();

  const utr =
    Math.floor(
      100000000000 +
      Math.random() * 900000000000
    ).toString();

  function payNow() {

    setShowOtp(true);

  }

  function verifyOtp() {

    setProcessing(true);

    setTimeout(() => {

      setProcessing(false);

      setPaid(true);

    }, 3500);

  }

  async function downloadReceipt() {

    const input =
      document.getElementById(
        "receipt"
      ) as HTMLElement;

    const canvas =
      await html2canvas(input);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      210,
      297
    );

    pdf.save("payment-receipt.pdf");

  }

  // PROCESSING
  if (processing) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-6">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md text-center"
        >

          <div className="w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

          <h1 className="text-3xl font-bold text-[#111827] mb-3">
            Processing Payment
          </h1>

          <p className="text-gray-500">
            Please wait while we securely process your payment...
          </p>

        </motion.div>

      </div>

    );

  }

  // SUCCESS PAGE
  if (paid) {

    return (

      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6 py-10">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
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
                  {cardName || "Rajat Natani"}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Course</span>

                <span className="font-semibold text-right max-w-[60%]">
                  AlmaBetter Placement Guarantee Program
                </span>

              </div>

              <div className="flex justify-between">

                <span>Card Used</span>

                <span>
                  **** **** ****{" "}
                  {cardNumber
                    .replace(/\s/g, "")
                    .slice(-4)}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Original Amount</span>

                <span>
                  ₹88,999
                </span>

              </div>

              <div className="flex justify-between text-green-700">

                <span>
                  Yes Bank Discount
                </span>

                <span>
                  - ₹4,450
                </span>

              </div>

              <div className="border-t pt-3 flex justify-between text-lg font-bold">

                <span>
                  Amount Paid
                </span>

                <span>
                  ₹
                  {discountedAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>

            <div className="border rounded-2xl p-6 mb-6 space-y-4">

              <div className="flex justify-between">

                <span>
                  Transaction ID
                </span>

                <span>
                  {transactionId}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  UTR Number
                </span>

                <span>
                  {utr}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Payment Method
                </span>

                <span>
                  {paymentMethod.toUpperCase()}
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
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
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
            placeholder="Enter OTP"
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

  return (

    <div className="min-h-screen bg-[#f5f5f5]">

      {/* NAVBAR */}
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

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-5">

            {/* OFFER BOX */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">

              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">

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
                  Pay using eligible cards and get instant cashback.
                </p>

                <div className="mt-3 font-bold text-3xl">

                  ₹
                  {amount.toLocaleString(
                    "en-IN"
                  )}

                </div>

              </div>

            </div>

            {/* BANK OFFERS */}
            <div className="bg-white rounded-3xl border p-6">

              <h3 className="font-bold text-xl mb-4">
                Available Bank Offers
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                {/* YES BANK */}
                <div className="border rounded-2xl p-5 min-h-[120px] flex items-center gap-4">

                  <img
                    src={yesbank}
                    className="h-6 w-auto object-contain"
                  />

                  <div>

                    <p className="font-semibold">
                      Yes Bank
                    </p>

                    <p className="text-sm text-green-600">
                      5% Instant Discount
                    </p>

                  </div>

                </div>

                {/* HDFC */}
                <div className="border rounded-2xl p-5 min-h-[120px] flex items-center gap-4">

                  <img
                    src={hdfc}
                    className="h-5 w-auto object-contain"
                  />

                  <div>

                    <p className="font-semibold">
                      HDFC Bank
                    </p>

                    <p className="text-sm text-gray-500">
                      No Cost EMI
                    </p>

                  </div>

                </div>

                {/* ICICI */}
                <div className="border rounded-2xl p-5 min-h-[120px] flex items-center gap-4">

                  <img
                    src={icici}
                    className="h-4 w-auto object-contain"
                  />

                  <div>

                    <p className="font-semibold">
                      ICICI Bank
                    </p>

                    <p className="text-sm text-gray-500">
                      Cashback Offers
                    </p>

                  </div>

                </div>

                {/* SBI */}
                <div className="border rounded-2xl p-5 min-h-[120px] flex items-center gap-4">

                  <img
                    src={sbi}
                    className="h-6 w-auto object-contain"
                  />

                  <div>

                    <p className="font-semibold">
                      SBI Cards
                    </p>

                    <p className="text-sm text-gray-500">
                      Reward Points
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-3xl border shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-2">
              Payment Options
            </h2>

            <p className="text-gray-500 mb-6">
              Choose your preferred payment method
            </p>

            {/* PAYMENT TABS */}
            <div className="grid grid-cols-4 gap-3 mb-6">

              <button
                onClick={() =>
                  setPaymentMethod("cards")
                }
                className={`rounded-2xl p-4 flex flex-col items-center justify-center border ${
                  paymentMethod === "cards"
                    ? "border-2 border-orange-500 bg-orange-50"
                    : ""
                }`}
              >

                <CreditCard className="w-6 h-6 text-orange-500 mb-2" />

                <p className="font-semibold text-sm">
                  Cards
                </p>

              </button>

              <button
                onClick={() =>
                  setPaymentMethod("upi")
                }
                className={`rounded-2xl p-4 flex flex-col items-center justify-center border ${
                  paymentMethod === "upi"
                    ? "border-2 border-orange-500 bg-orange-50"
                    : ""
                }`}
              >

                <img
                  src={upi}
                  className="h-5 w-auto object-contain mb-2"
                />

                <p className="font-semibold text-sm">
                  UPI
                </p>

              </button>

              <button
                onClick={() =>
                  setPaymentMethod("cred")
                }
                className={`rounded-2xl p-4 flex flex-col items-center justify-center border ${
                  paymentMethod === "cred"
                    ? "border-2 border-orange-500 bg-orange-50"
                    : ""
                }`}
              >

                <CreditCard className="w-6 h-6 text-black mb-2" />

                <p className="font-semibold text-sm">
                  CRED
                </p>

              </button>

              <button
                onClick={() =>
                  setPaymentMethod("banking")
                }
                className={`rounded-2xl p-4 flex flex-col items-center justify-center border ${
                  paymentMethod === "banking"
                    ? "border-2 border-orange-500 bg-orange-50"
                    : ""
                }`}
              >

                <ShieldCheck className="w-6 h-6 text-gray-700 mb-2" />

                <p className="font-semibold text-sm">
                  Banking
                </p>

              </button>

            </div>

            {/* CARD FORM */}
            {paymentMethod === "cards" && (

              <div className="space-y-4">

                <Input
                  placeholder="Card Holder Name"
                  value={cardName}
                  onChange={(e) =>
                    setCardName(
                      e.target.value
                    )
                  }
                  className="h-14"
                />

                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => {

                    const rawValue =
                      e.target.value.replace(
                        /\D/g,
                        ""
                      );

                    const formattedValue =
                      rawValue
                        .substring(0, 16)
                        .replace(
                          /(.{4})/g,
                          "$1 "
                        )
                        .trim();

                    setCardNumber(
                      formattedValue
                    );

                    if (
                      rawValue.length === 16
                    ) {

                      setIsVerifiedCard(
                        true
                      );

                    } else {

                      setIsVerifiedCard(
                        false
                      );

                    }

                  }}
                  className="h-14 text-lg tracking-[2px]"
                />

                {isVerifiedCard && (

                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between">

                    <div>

                      <p className="font-semibold text-green-700">
                        Yes Bank Card Verified
                      </p>

                      <p className="text-sm text-green-600">
                        5% Instant Discount Applied
                      </p>

                    </div>

                    <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      VERIFIED
                    </div>

                  </div>

                )}

                <div className="grid grid-cols-2 gap-4">

                  <Input
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) =>
                      setExpiry(
                        e.target.value
                      )
                    }
                    className="h-14"
                  />

                  <Input
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(
                        e.target.value
                      )
                    }
                    className="h-14"
                  />

                </div>

                <Input
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  className="h-14"
                />

                <Button
                  onClick={payNow}
                  className="w-full h-14 text-lg rounded-2xl bg-orange-500 hover:bg-orange-600"
                >

                  <CreditCard className="w-5 h-5 mr-2" />

                  Pay ₹
                  {amount.toLocaleString(
                    "en-IN"
                  )}

                </Button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}
