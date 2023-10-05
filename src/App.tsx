import { useState, useEffect } from "react";
import "./App.css";
import alert from "./assets/alert.svg";

function App() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function getUrl() {
      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tab) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id! },
            func: () => {
              const img = document.querySelector(
                "._396cs4  "
              ) as HTMLImageElement;
              const src = img.getAttribute("src");

              const title = document.querySelector(".B_NuCI") as HTMLElement;
              const titleText = title.innerText;

              const price = document.querySelector("._30jeq3") as HTMLElement;
              const priceText = price.innerText;

              const data = {
                src,
                titleText,
                priceText,
              };
              return data;
            },
          },
          (result) => {
            setData(result[0].result);
            sessionStorage.setItem("src", JSON.stringify(result[0].result));
          }
        );
      }
    }
    getUrl();
  }, []);

  return (
    <>
      <div className="bg-[#2874F0] font-bold text-xl text-white p-3 ">
        <span className="title">FlipTrack</span>-{" "}
        <span className="font-semibold text-base">FlipKart Price Tracker</span>
      </div>
      <div className="flex flex-col gap-3 min-h-[400px] min-w-[600px] p-5 mt-6">
        <div className="flex gap-4 justify-start items-center text-sm">
          <img
            src={data.src}
            alt=""
            className="w-[110px] h-[90px] aspect-auto"
          />
          <div className="flex flex-col gap-3">
            <p className="text-gray-800 font-semibold">{data.titleText}</p>
            <p className="text-gray-500 font-bold">
              Current Price{" "}
              <span className=" text-black">{data.priceText}</span>
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-2 items-start mt-8 justify-start font-semibold ml-24">
          <div className="relative z-0 w-full mb-6 group max-w-sm">
            <input
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
          <button className="bg-[#FB641B] items-center flex gap-2 text-white font-bold py-2.5 px-5  mt-4 ml-24">
            Start Tracking
            <img src={alert} alt="" className="w-5 h-5 filter_white" />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
