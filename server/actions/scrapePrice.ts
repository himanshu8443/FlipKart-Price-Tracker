import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();
// Function to extract numeric price
function extractNumericPrice(priceText: string) {
  // Remove any non-numeric characters, including the rupee symbol
  const numericPrice = priceText.replace(/[^0-9.]/g, "");

  return Number(numericPrice);
}

// Function to scrape the price
async function scrapePrice(argument: string) {
  try {
    const url = `https://www.flipkart.com/${argument}`;
    // Make an HTTP GET request to the page

    const options = {
      auth: {
        username: process.env.PROXY_USERNAME!,
        password: process.env.PROXY_PASSWORD!,
      },
      host: process.env.PROXY_HOST,
      port: process.env.PROXY_PORT,
      rejectUnauthorized: false,
    };
    const response = await axios.get(url, options);

    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);

    // Find the element with both classes "_16Jk6d" and "_30jeq3" and extract its text
    const priceElement = $("._16Jk6d"); // Replace with the actual selector

    // Extract the text and apply the extractNumericPrice function to get the numeric value
    const priceText = priceElement.text().trim();
    const numericPrice =
      extractNumericPrice(priceText) || Number.MAX_SAFE_INTEGER;

    const titleElement = $(".B_NuCI");
    const titleText = titleElement.text().trim() || "";

    const imgElement = $("._396cs4");
    const imgSrc = imgElement.attr("src") || "";

    return { numericPrice, titleText, imgSrc };
  } catch (error: any) {
    console.error("Error:", error.message);
    return null;
  }
}

export default scrapePrice;
