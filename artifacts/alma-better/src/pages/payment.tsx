import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, ShieldCheck, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetEnrollment, useConfirmPayment, getGetEnrollmentQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import paymentQr from "@/assets/payment-qr.svg";

const utrSchema = z.object({
  utrNumber: z.string().min(4, "Enter a valid UTR / transaction reference number"),
});

type UtrForm = z.infer<typeof utrSchema>;

export default function Payment() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id ?? "0", 10);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [paid, setPaid] = useState(false);

  const { data: enrollment, isLoading, isError } = useGetEnrollment(id, {
    query: { queryKey: getGetEnrollmentQueryKey(id), enabled: !!id },
  });

  const confirmPayment = useConfirmPayment();

  const form = useForm<UtrForm>({
    resolver: zodResolver(utrSchema),
    defaultValues: { utrNumber: "" },
  });

  async function onSubmit(values: UtrForm) {
    confirmPayment.mutate(
      { id, data: { utrNumber: values.utrNumber } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetEnrollmentQueryKey(id) });
          setPaid(true);
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !enrollment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="text-lg text-muted-foreground">Enrollment not found.</p>
        <Button onClick={() => setLocation("/")} variant="outline">Go Back Home</Button>
      </div>
    );
  }

  const creditCardPrice = Math.round(enrollment.totalAmount * 0.95);
  function openRazorpay() {

  const options = {

    key: "rzp_test_SwkhvnJtl5e00t",

    amount: creditCardPrice * 100,

    currency: "INR",

    name: "AlmaBetter",

    description: enrollment.course,

    handler: function (response: any) {

      console.log(response);

      setPaid(true);
    },

    theme: {
      color: "#7C3AED"
    }
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
          <h1 className="text-4xl font-extrabold text-secondary mb-3">Payment Submitted!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you, <span className="font-semibold text-secondary">{enrollment.name}</span>! We have received your payment reference. Our team will verify and confirm your enrollment within 24 hours.
          </p>
          <div className="bg-muted/50 rounded-2xl p-6 text-left mb-8 border border-border space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Course</span>
              <span className="font-semibold text-secondary text-right max-w-[60%]">{enrollment.course}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-semibold text-secondary">₹{enrollment.totalAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Confirmation will be sent to</span>
              <span className="font-semibold text-secondary">{enrollment.email}</span>
            </div>
          </div>
          <Button
            size="lg"
            data-testid="button-go-home"
            onClick={() => setLocation("/")}
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
          <button
            onClick={() => setLocation("/enroll")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-enroll"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold">A</div>
            <span className="font-bold text-xl text-secondary">Alma<span className="text-primary">Better</span></span>
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
            <h1 className="text-4xl font-extrabold text-secondary mb-2">Complete Your Payment</h1>
            <p className="text-muted-foreground text-lg">Scan the QR below and enter your transaction ID to confirm.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: QR + offer */}
            <div className="space-y-5">
              {/* Yes Bank Offer Banner */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg"
                data-testid="card-yes-bank-offer"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Tag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg">Yes Bank Offer</span>
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">5% OFF</span>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    Pay using your <span className="font-semibold">Yes Bank Credit Card</span> and get <span className="font-bold text-yellow-300">5% instant cashback</span>.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-white/70" />
                    <span className="text-white/80 text-sm">
                      Pay just <span className="font-bold text-white">₹{creditCardPrice.toLocaleString("en-IN")}</span> with Yes Bank Credit Card
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* QR Code */}
              <div className="bg-white rounded-3xl border border-border shadow-sm p-6 flex flex-col items-center">
                <h3 className="text-secondary font-bold text-lg mb-1">Scan to Pay via UPI</h3>
                <p className="text-muted-foreground text-sm mb-5 text-center">Use any UPI app — GPay, PhonePe, Paytm, or Yes Bank app</p>
                <div className="relative">
                  <img
                    src={paymentQr}
                    alt="Payment QR Code"
                    data-testid="img-payment-qr"
                    className="w-64 h-64 rounded-2xl border-4 border-primary/20 object-contain"
                  />
                </div>
                <div className="mt-5 text-center">
                  <div className="text-3xl font-extrabold text-secondary">₹{enrollment.totalAmount.toLocaleString("en-IN")}</div>
                  <div className="text-sm text-muted-foreground mt-1">Total amount (incl. 18% GST)</div>
                </div>
              </div>

              {/* Security badge */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-green-50 border border-green-100">
                <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
                <p className="text-green-800 text-sm font-medium">100% secure payment. Your data is encrypted and protected.</p>
              </div>
            </div>

            {/* Right: Order summary + UTR form */}
            <div className="space-y-5">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm" data-testid="card-order-summary">
                <h3 className="font-bold text-secondary text-lg mb-5">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student</span>
                    <span className="font-semibold text-secondary">{enrollment.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course</span>
                    <span className="font-semibold text-secondary text-right max-w-[55%] leading-snug">{enrollment.course}</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Fee</span>
                      <span className="font-medium text-secondary">₹{enrollment.baseAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span className="font-medium text-secondary">₹{enrollment.gstAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-bold text-secondary">Total</span>
                      <span className="font-extrabold text-primary text-lg">₹{enrollment.totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between bg-blue-50 rounded-lg px-3 py-2">
                      <span className="text-blue-700 font-medium text-xs">With Yes Bank CC (5% off)</span>
                      <span className="font-bold text-blue-700 text-sm">₹{creditCardPrice.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* UTR Confirmation Form */}
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-secondary text-lg mb-2">Confirm Your Payment</h3>
                <p className="text-muted-foreground text-sm mb-5">
                  After scanning and paying, enter the <span className="font-semibold">UTR number</span> or transaction reference from your UPI app.
                </p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="utrNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UTR / Transaction Reference</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 432156789012"
                              data-testid="input-utr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
  onClick={openRazorpay}
  className="w-full h-14 text-lg font-bold rounded-2xl"
>
  Pay ₹{creditCardPrice.toLocaleString()}
</Button>
                    {confirmPayment.isError && (
                      <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
