import Product from "../models/product";
import User from "../models/user";
import { mailSender } from "../utils/mailSender";
import scrapePrice from "../actions/scrapePrice";

const SendAlerts = async (req: any, res: any) => {
  try {
    const allProducts = await Product.find({}).populate("users");
    allProducts.forEach(async (product: any) => {
      const { name, users } = product;
      const currentPrice = (await scrapePrice(name)) || Number.MAX_SAFE_INTEGER;
      users.forEach(async (user: any) => {
        const { email, price: minPrice } = user;
        if (currentPrice <= minPrice) {
          console.log("currentPrice", currentPrice);
          console.log("minPrice", minPrice);
          const body = `The price of ${name} has dropped to ${currentPrice}`;
          await mailSender(email, "Price drop", body);
          console.log("Email sent", email);
        }
      });
    });
    return res
      .status(200)
      .json({ success: true, message: "Alerts sent successfully" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default SendAlerts;
