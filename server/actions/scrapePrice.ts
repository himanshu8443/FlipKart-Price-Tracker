import axios from "axios";
import * as cheerio from "cheerio";

// Function to extract numeric price
function extractNumericPrice(priceText: string) {
  // Remove any non-numeric characters, including the rupee symbol
  const numericPrice = priceText.replace(/[^0-9.]/g, "");

  return numericPrice;
}

// Function to scrape the price
async function scrapePrice(argument: string) {
  try {
    const url = `https://www.flipkart.com/${argument}`;
    // Make an HTTP GET request to the page
    const response = await axios.get(url);

    // Load the HTML content into cheerio
    const $ = cheerio.load(response.data);

    // Find the element with both classes "_16Jk6d" and "_30jeq3" and extract its text
    const priceElement = $("._16Jk6d"); // Replace with the actual selector

    // Extract the text and apply the extractNumericPrice function to get the numeric value
    const priceText = priceElement.text().trim();
    const numericPrice = extractNumericPrice(priceText);

    return numericPrice;
  } catch (error: any) {
    console.error("Error:", error.message);
    return null;
  }
}

export default scrapePrice;
