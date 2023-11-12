# FlipTrack
 Flipkart product price Tracker and sends alert when price drops.


# Get it on
Not available publicly as I can't afford residential proxies cost is increasing with users
<!--[![Image Description](https://i.imgur.com/sEB2m5m.png)](https://microsoftedge.microsoft.com/addons/detail/fliptrack-flipkart-pric/bnpdinlljjfikbfieldlipidieagnmep)
   [![Available Chrome Web Store](https://i.imgur.com/dsKixGv.png)](https://chromewebstore.google.com/detail/fliptrack-flipkart-price/pekpfcghlbljghaojdlajgpceebobokd?hl=en)-->

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
