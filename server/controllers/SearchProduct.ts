import scrapePrice from "../actions/scrapePrice";

function linkToName(link: string) {
  try {
    const match = link.match(/\.com\/(.+)/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (error: any) {
    console.error("Error:", error.message);
  }
  return "";
}

const SearchProduct = async (req: any, res: any) => {
  try {
    const { productLink } = req.body;
    if (!productLink) {
      return res
        .status(400)
        .json({ success: false, message: "Product link is required" });
    }

    const name = linkToName(productLink);
    const { numericPrice, titleText, imgSrc } = (await scrapePrice(name)) || {
      numericPrice: Number.MAX_SAFE_INTEGER,
      titleText: "",
      imgSrc: "",
    };

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
