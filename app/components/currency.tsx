"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

type CurrencyProps = {
  currency: string;
  name: string;
  value: number;
  isLoading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const IMAGE_URL = process.env.IMAGE_URL;

export default function Currency({
  currency,
  value,
  name,
  onChange,
  isLoading,
}: CurrencyProps) {
  const [currentTarget, setCurrentTarget] = useState("");
  const imageUrl = IMAGE_URL
    ? `${IMAGE_URL}/${currency.toLocaleLowerCase()}.static.svg`
    : "";

  return (
    <div className="flex items-center justify-between bg-zinc-900 border border-zinc-600 p-8 rounded-xl flex-1">
      {currentTarget !== name && isLoading ? (
        <span className="line h-8 w-full mr-2" />
      ) : (
        <input
          id={name}
          name={currency}
          type="text"
          className="bg-transparent text-2xl font-semibold outline-none border-none w-12 flex-1"
          defaultValue={Number(value).toLocaleString()}
          autoComplete="off"
          inputMode="numeric"
          onChange={(e) => {
            setCurrentTarget(name);
            onChange(e);
          }}
        />
      )}
      <div className="inline-flex gap-2 items-center ">
        <div className="inline-block rounded-full h-6 w-6 overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              className="h-full w-full object-cover"
              height={0}
              width={0}
              alt={currency}
            />
          )}
        </div>
        <span className="text-xl font-semibold">{currency}</span>
      </div>
    </div>
  );
}
