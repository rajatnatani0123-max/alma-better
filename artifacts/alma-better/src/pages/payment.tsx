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
