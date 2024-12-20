"use client";
import { useEffect, useState } from "react";
import { getExchangeRates, Payload } from "../actions/currency";
import Currency from "./currency";

const initialValues = {
  from: {
    currency: "USD",
    value: 1,
  },
  to: {
    currency: "INR",
    value: 0,
  },
};

export default function Exchange() {
  const [rates, setRates] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<Record<string, number> | null>(null);

  const handleExchangeRates = (payload: Payload) => {
    setIsLoading(true);
    getExchangeRates(payload).then((data) => {
      setOptions(data.rates);
      setRates((prev) => ({
        from: {
          ...prev.from,
          value: data.rates[prev.from.currency] || 0,
        },
        to: {
          ...prev.to,
          value: data.rates[prev.to.currency] || 0,
        },
      }));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleExchangeRates({});
  }, []);

  const onCurrencyChange = (type: string, currency: string, value: number) => {
    setRates((prev) => ({
      ...prev,
      [type]: {
        currency,
        value,
      },
    }));

    // handleExchangeRates({ base: currency, amount: value + "" });
  };

  const onSwap = () => {
    if (isLoading) return;

    setRates((prevState) => ({
      from: {
        ...prevState.from,
        currency: prevState.to.currency,
      },
      to: {
        ...prevState.to,
        currency: prevState.from.currency,
        value:
          (prevState.from.value * prevState.from.value) / prevState.to.value,
      },
    }));
  };

  return (
    <div className="relative flex flex-col md:flex-row min-w-[320px] w-full md:w-[800px] gap-5">
      <Currency
        name="from"
        currency={rates.from.currency}
        value={rates.from.value}
        isLoading={isLoading}
        options={options}
        onCurrencyChange={onCurrencyChange}
      />
      <button
        onClick={onSwap}
        className="backdrop-blur-[5px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center border border-zinc-600 h-12 w-12 rounded-full text-sm font-medium  text-white"
      >
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
        isLoading={isLoading}
        options={options}
        onCurrencyChange={onCurrencyChange}
      />
    </div>
  );
}
