import React, { Suspense } from "react";
import PaymentHistoryPage from "../../_components/customer/payment-history";
import { getPaymentsMe } from "../../_actions/get-payment-history";
import PaymentSummarySkeleton from "../../_components/customer/payment-summery-skeleton";

const page = async () => {
  const payments = await getPaymentsMe();
  return (
    <Suspense fallback={<PaymentSummarySkeleton />}>
      <PaymentHistoryPage payments={payments?.data} />
    </Suspense>
  );
};

export default page;
