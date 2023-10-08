type Product = {
  email: string;
  productName: string;
  price: number;
};

export const search = async (link: string) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/search-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productLink: link }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export const addProduct = async (product: Product) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/add-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
  }
};
