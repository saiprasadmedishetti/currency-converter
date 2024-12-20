import Exchange from "./components/exchange";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pt-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-3">
        <h1 className="text-white text-2xl text-center mx-auto font-bold">
          Currency <span className="text-blue-400">Converter</span>
        </h1>
        <Exchange />
      </main>
    </div>
  );
}
