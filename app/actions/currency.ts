"use server";

export type Payload = {
  base?: string;
  amount?: string;
};

const API_URL = process.env.API_URL;

export const getExchangeRates = async ({
  base = "USD",
  amount = "1",
}: Payload) => {
  const resp = await fetch(`${API_URL}?base=${base}&amount=${amount}`);
  const data = await resp.json();
  return {
    rates: { ...data.rates, [base]: +amount },
  };
};
