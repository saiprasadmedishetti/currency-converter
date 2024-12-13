"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { getExchangeRates, Payload } from "../actions/currency";
import Currency from "./currency";

const initialValues = {
  from: {
    currency: "INR",
    value: 100,
  },
  to: {
    currency: "USD",
    value: 0,
  },
};

export default function Exchange() {
  const [rates, setRates] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(true);

  const handleExchangeRates = (payload: Payload) => {
    setIsLoading(true);
    getExchangeRates(payload).then((data) => {
      setRates((prev) => ({
        from: {
          ...prev.from,
          value: data.rates[prev.from.currency],
        },
        to: {
          ...prev.to,
          value: data.rates[prev.to.currency],
        },
      }));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleExchangeRates({});
  }, []);

  let timerId: NodeJS.Timeout;
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const payload = { base: e.target.name, amount: e.target.value };
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      handleExchangeRates(payload);
    }, 200);
  };

  return (
    <div className="relative flex flex-col md:flex-row min-w-[300px] w-full md:w-[600px] gap-5">
      <Currency
        name="from"
        currency={rates.from.currency}
        value={rates.from.value}
        onChange={handleValueChange}
        isLoading={isLoading}
      />
      <button className="bg-zinc-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border border-zinc-600 h-12 w-12 rounded-full text-sm font-medium  text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 17"
          className="h-4 w-4"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <Currency
        name="to"
        currency={rates.to.currency}
        value={rates.to.value}
        onChange={handleValueChange}
        isLoading={isLoading}
      />
    </div>
  );
}
