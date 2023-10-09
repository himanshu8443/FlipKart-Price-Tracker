import { Data } from "../App";
import { search } from "../api/api";
import linkToName from "../utils/getproductArgument";

interface SetData {
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const SearchProduct = ({ setData }: SetData) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productArgument = linkToName(e.currentTarget.floating_search.value);
    console.log("url", productArgument);
    const res = await search(productArgument);
    console.log("res", res);
    if (res.success) {
      setData({
        src: res.data.imgSrc,
        titleText: res.data.titleText,
        priceText: res.data.numericPrice,
        productArgument: productArgument,
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 min-h-[400px] min-w-[600px] p-5 mt-6 justify-center items-center">
      <h2 className="text-2xl font-semibold text-center text-white bg-red-400 p-4 rounded">
        {" "}
        If you have installed the extension open any FlipKart product page and
        click on the extension icon to track the price
      </h2>
      <p className=" font-semibold text-center text-2xl text-blue-500 mt-8">
        {" "}
        or{" "}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-start mt-8 justify-start font-semibold ml-24"
      >
        <div className="relative z-0 w-full mb-6 group min-w-[70vw]">
          <input
            type="search"
            name="floating_search"
            id="floating_search"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_search"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter FlipKart Product URL
          </label>
        </div>
        <div className="flex gap-2 items-center mt-2 justify-center w-full">
          <button
            type="submit"
            className="bg-[#FB641B] active:bg-opacity-70 hover:bg-opacity-90 items-center flex gap-2 text-white font-bold py-2.5 px-5  mt-4 max-md:ml-24"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchProduct;
