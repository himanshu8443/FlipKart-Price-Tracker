export default function Alert(
  imgSrc: string,
  argument: string,
  price: number,
  productName: string
) {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  
  <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: white;">
      <div  bgcolor="#FFFFFF" style=" padding: 20px; background-color: white ;">
          <div bgcolor="#FFFFFF" style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
              <div style="align-items: center; margin-bottom: 20px;">
                  <h1 style="font-size: 30px; margin: 0;">Price Alert</h1>
                  <img src=${imgSrc} alt="Product Image"
                      style="width: 200px; height: 200px; object-fit: contain; margin-right: 20px;" />
              </div>
              <p style="font-size: 16px; margin-bottom: 20px;">${productName}</p>
              <p style="font-size: 20px; margin-bottom: 20px;">Price dropped to<span
                      style="font-weight: bold;font-size: 20px; color:red "> ₹${price}</span></p>
                      <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
              <a href=https://www.flipkart.com/${argument}
                  style="background-color: #f0c040; padding: 10px 20px; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">Buy
                  Now</a>
                      </div>
          </div>
      </div>
  </body>
  
  </html>`;
}
