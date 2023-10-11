import { useState, useEffect } from "react";
import "./App.css";
import alert from "./assets/alert.svg";
import SearchProduct from "./components/SearchProduct";
import { addProductTracking } from "./api/api";
import linkToName from "./utils/getproductArgument";
import { toast } from "react-toastify";

export interface Data {
  src: string;
  titleText: string;
  priceText: string;
  productArgument?: string;
}

function App() {
  const [data, setData] = useState<Data>({
    src: "",
    titleText: "",
    priceText: "",
  });
  const [userData, setUserData] = useState<any>({
    email: localStorage.getItem("email") || "",
    price: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    localStorage.setItem("email", userData.email);
    e.preventDefault();
    const product = {
      email: userData.email,
      price: userData.price,
      productName: data.productArgument!,
    };
    setLoading(true);
    const res = await addProductTracking(product);
    setLoading(false);
    if (res.success === true) {
      toast.success(res.message);
    } else {
      toast.error(res.message || "Error in adding product, Try again");
    }

    console.log(res);
  };

  useEffect(() => {
    console.log("useEffect");
    async function getUrl() {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tab.id) {
        setData((prev) => ({
          ...prev,
          productArgument: linkToName(tab.url!),
        }));
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: () => {
              console.log("executed");
              const img = document.querySelector(
                "._396cs4"
              ) as HTMLImageElement;
              const img2 = document.querySelector(
                "._2r_T1I"
              ) as HTMLImageElement;

              const src =
                img?.getAttribute("src") || img2?.getAttribute("src") || "";

              const title = document.querySelector(".B_NuCI") as HTMLElement;
              const titleText = title?.innerText;

              const price = document.querySelector("._30jeq3") as HTMLElement;
              const priceText = price?.innerText;

              const data = {
                src,
                titleText,
                priceText,
              };
              return data;
            },
          },
          (result) => {
            if (result && result[0].result.priceText) {
              setData((prev) => ({ ...prev, ...result[0].result }));
            }
          }
        );
      }
    }
    getUrl();
  }, []);

  return data?.priceText !== "" ? (
    <div className="flex flex-col gap-3 min-h-[400px] min-w-[600px] p-5 mt-6 justify-center items-center">
      <div className="flex gap-4 justify-start items-center text-sm">
        <div className="w-24 h-24">
          <img src={data.src} alt="" className=" aspect-auto" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-gray-800 font-semibold text-xl">
            {data.titleText}
          </p>
          <p className="text-gray-500 font-bold text-lg flex items-center gap-1">
            Current Price{" "}
            <span className=" text-[#FB641B] text-xl">{data.priceText}</span>
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-start mt-14 justify-start font-semibold max-md:ml-24"
      >
        <div className="relative z-0 w-full mb-6 group max-w-sm">
          <input
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div>
          <p className="font-semibold text-base">
            Alert me when price drops to
          </p>
          <div className="flex gap-2 items-center mt-2">
            <span className="text-lg mb-4">₹</span>
            <div className="relative z-0 w-full mb-6 group max-w-xs">
              <input
                value={userData.price}
                onChange={(e) =>
                  setUserData({ ...userData, price: e.target.value })
                }
                type="number"
                name="price"
                id="price"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="price"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>
            <span className="text-base font-semibold mb-4 whitespace-nowrap">
              or less
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center w-full min-h-[100px] ">
          {loading ? (
            <div className="loader mr-8"></div>
          ) : (
            <button
              type="submit"
              className="bg-[#FB641B] items-center flex gap-2 text-white font-bold py-2.5 px-5  mt-4 mr-8"
            >
              Start Tracking
              <img src={alert} alt="" className="w-5 h-5 filter_white" />
            </button>
          )}
        </div>
      </form>
    </div>
  ) : (
    <SearchProduct setData={setData} />
  );
}

export default App;
