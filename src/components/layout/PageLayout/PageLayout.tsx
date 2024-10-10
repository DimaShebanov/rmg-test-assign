import React, { PropsWithChildren, ReactNode } from "react";
import CartSummaryButton from "../../cart/CartSummaryButton/CartSummaryButton";

interface Props {
  title: ReactNode;
}

const PageLayout = ({ title, children }: PropsWithChildren<Props>) => (
  <div className="flex flex-col h-full">
    <div className="sticky border-b top-0 bg-white">
      <div className="flex flex-col sm:flex-row gap-2 mx-auto container justify-between items-center p-4 pt-2 sm:pt-4 ">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <div className="ml-auto sm:m-0">
          <CartSummaryButton />
        </div>
      </div>
    </div>
    <div className="grow mx-auto p-4 container overflow-auto">{children}</div>
  </div>
);

export default PageLayout;
