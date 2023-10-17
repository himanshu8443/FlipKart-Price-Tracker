import scrapePrice from "../actions/scrapePrice";

const SearchProduct = async (req: any, res: any) => {
  try {
    const { productArgument } = req.body;
    if (!productArgument) {
      return res
        .status(400)
        .json({ success: false, message: "Product link is required" });
    }

    const { numericPrice, titleText, imgSrc } = (await scrapePrice(
      productArgument
    )) || {
      numericPrice: Number.MAX_SAFE_INTEGER,
      titleText: "",
      imgSrc: "",
    };
    console.log(numericPrice, titleText, imgSrc);
    if (numericPrice === Number.MAX_SAFE_INTEGER) {
      return res
        .status(400)
        .json({ success: false, message: "Error, Please try again" });
    }

    return res.status(200).json({
      success: true,
      message: "Product found",
      data: { numericPrice, titleText, imgSrc },
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export default SearchProduct;
