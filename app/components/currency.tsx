"use client";

import { ChangeEvent, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type CurrencyProps = {
  currency: string;
  name: string;
  value: number;
  isLoading: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onCurrencyChange: (type: string, option: string, value: number) => void;
  options: Record<string, number> | null;
};

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function Currency({
  currency,
  value,
  name,
  onCurrencyChange,
  isLoading,
  options,
}: CurrencyProps) {
  const [currentTarget, setCurrentTarget] = useState("");

  const getImage = (value: string) => {
    if (!IMAGE_URL) return "";
    return `${IMAGE_URL}/${value.toLocaleLowerCase()}.static.svg`;
  };
  let timerId: NodeJS.Timeout;
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.focus();
    setCurrentTarget(name);
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      onCurrencyChange(name, currency, +e.target.value);
    }, 300);
  };

  return (
    <div className="flex flex-col backdrop-blur-[5px] border border-zinc-600 pl-8 pr-6 py-6 rounded-xl flex-1">
      <div className="text-slate-300 mb-2">
        {name === "from" ? "You send" : "Recipient gets"}
      </div>
      <div className="flex items-center justify-between">
        {currentTarget !== name && isLoading ? (
          <span className="line h-8 w-full mr-2" />
        ) : (
          <input
            key={value}
            // id={name}
            name={currency}
            type="text"
            className="bg-transparent caret-blue-400 text-white text-3xl font-semibold outline-none border-none w-12 flex-1"
            defaultValue={Number(value.toFixed(2)).toLocaleString()}
            autoComplete="off"
            inputMode="numeric"
            autoFocus={name === currentTarget}
            onChange={onInputChange}
          />
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none border-none">
            <span className="inline-flex gap-2 items-center text-white">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  className="object-cover"
                  src={getImage(currency)}
                />
                <AvatarFallback className="text-gray-600">
                  {currency.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-2xl font-semibold">{currency}</span>
              <ChevronDown />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="backdrop-blur-md bg-transparent h-64 overflow-y-auto text-white border border-zinc-600">
            {options &&
              Object.keys(options).map((option) => {
                if (option === currency) return;
                return (
                  <DropdownMenuItem
                    className="cursor-pointer text-xl font-medium pl-3 pr-7 py-2"
                    key={option}
                    onClick={() => onCurrencyChange(name, option, value)}
                  >
                    <Avatar className="h-8 w-8 mr-1">
                      <AvatarImage
                        className="object-cover"
                        src={getImage(option)}
                      />
                      <AvatarFallback className="text-gray-600">
                        {option.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {option}
                  </DropdownMenuItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
