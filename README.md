# FlipTrack
 Flipkart product price Tracker and sends alert when price drops.


# Get it on
Not available publicly as I can't afford residential proxies cost is increasing with users
<!--[![Image Description](https://i.imgur.com/sEB2m5m.png)](https://microsoftedge.microsoft.com/addons/detail/fliptrack-flipkart-pric/bnpdinlljjfikbfieldlipidieagnmep)
   [![Available Chrome Web Store](https://i.imgur.com/dsKixGv.png)](https://chromewebstore.google.com/detail/fliptrack-flipkart-price/pekpfcghlbljghaojdlajgpceebobokd?hl=en)-->

# Build your

### client (Extension)
```
git clone https://github.com/himanshu8443/FlipKart-Price-Tracker.git
cd FlipKart-Price-Tracker
npm install
```
env
```
VITE_API_URL = backend api url
```
build (extension will be in build in dist folder)
```
npm run build
```

### server (for scrapping prices)
```
cd server
npm install
npm run dev 
```
env
```
MAIL_HOST = smtp.gmail.com  (host for nodemailer)
MAIL_USER = kumarhimanshusangwan@gmail.com (sender mail for nodmailer)
MAIL_PASS = pass for nodemailer

Proxy_URL = http://brd-cd:22020 (works without proxy in local but to deploy API on server proxy is required most VPS IPs are banned by Flipkart only residential proxies will work)
```


build
```
npm run build
```

# usage
Send get request on ```your_API_URL/api/send-alerts ``` ```(e.g.- http://localhost:4000/api/send-alerts)``` to check price and send email alerts if the price is below user set price.
set a cron job at https://cron-job.org for automatic price checking.
