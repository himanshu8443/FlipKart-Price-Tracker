import Product from "../models/product";
import User from "../models/user";
import { mailSender } from "../utils/mailSender";
import scrapePrice from "../actions/scrapePrice";
import Alert from "../templates/alert";

const SendAlerts = async (req: any, res: any) => {
  try {
    const allProducts = await Product.find({}).populate("users");
    allProducts?.forEach(async (product: any) => {
      const { name, users } = product;
      if (!users?.length) await Product.findByIdAndDelete(product._id);
      const {
        numericPrice: currentPrice,
        titleText,
        imgSrc,
      } = (await scrapePrice(name)) || {
        numericPrice: Number.MAX_SAFE_INTEGER,
        titleText: "",
        imgSrc: "",
      };
      users?.forEach(async (user: any) => {
        const { email, price: minPrice, _id } = user;
        console.log("currentPrice", currentPrice);
        console.log("minPrice", minPrice);
        if (currentPrice <= minPrice) {
          const body = Alert(imgSrc, name, currentPrice, titleText);
          const mail = await mailSender(email, "Price drop", body);
          console.log("Email sent", email);
          if (mail) {
            await User.findByIdAndDelete(_id);
            await Product.findByIdAndUpdate(product._id, {
              $pull: { users: _id },
            });
          }
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
