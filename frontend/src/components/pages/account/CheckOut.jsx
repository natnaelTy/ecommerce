export default function CheckOut() {
  return (
    <div className="flex max-w-[1000px] w-full items-center justify-between border-1 border-gray-300 p-3 mx-auto">
      <div className="flex items-center flex-col gap-4">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Shopping Address
        </h1>
        <form action="">
            <label htmlFor="">Full name
                <input type="text" />
            </label>
        </form>
      </div>
    </div>
  );
}
