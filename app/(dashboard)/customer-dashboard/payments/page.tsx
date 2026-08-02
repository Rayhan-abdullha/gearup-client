import React, { Suspense } from "react";
import PaymentHistoryPage from "../../_components/customer/payment-history";
import { getPaymentsMe } from "../../_actions/get-payment-history";

const page = async () => {
  const payments = await getPaymentsMe();
  console.log(payments);
  return (
    <Suspense>
      <PaymentHistoryPage payments={payments?.data} />
    </Suspense>
  );
};

export default page;
