import Product from "../models/product";
import User from "../models/user";

const addProduct = async (req: any, res: any) => {
  try {
    const { productName, price, email } = req.body;
    if (!productName || !price || !email) {
      return res.status(400).json({
        success: false,
        message: "Product name, price and email are required",
      });
    }

    const product = await Product.findOne({ name: productName }).populate(
      "users"
    );
    if (product) {
      const user = product.users.find((user: any) => user.email === email);
      if (user) {
        await User.findByIdAndUpdate(user._id, { price });
        return res
          .status(200)
          .json({ success: true, message: "Price updated successfully" });
      } else {
        const newUser = await User.create({ email, price });
        await Product.findByIdAndUpdate(product._id, {
          $push: { users: newUser._id },
        });
        return res
          .status(200)
          .json({ success: true, message: "Tracking started successfully" });
      }
    } else {
      const newProduct = await Product.create({ name: productName });
      const newUser = await User.create({ email, price });

      await Product.findByIdAndUpdate(newProduct._id, {
        $push: { users: newUser._id },
      });
      return res
        .status(200)
        .json({ success: true, message: "Tracking started successfully" });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default addProduct;
