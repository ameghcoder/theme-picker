# theme-picker

Open-source CSS-based theme picker that lets you integrate theme switching into any web project with ease.

## 🚀 Overview
theme-picker gives developers a clean and simple way to add theme selection to their websites or apps. It uses plain CSS themes and lightweight JavaScript logic so you can plug it into any stack.

## 📂 Folder Structure
```
/
├── app/
├── components/
├── docs/
├── lib/
├── public/
├── themes/
├── types/
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── next.config.ts
├── eslint.config.mjs
└── README.md
```

## 💡 Getting Started

### Install dependencies
```
npm install
```

### Run dev server
```
npm run dev
```

### Use theme picker
```js
import { applyTheme } from 'theme-picker/lib';

import 'theme-picker/themes/dark.css';
import 'theme-picker/themes/light.css';

applyTheme('light'); // or 'dark'
```

## 🎯 Features
- Easy runtime theme switching
- CSS-based themes
- Works with any JS framework
- Extendable theme system
- Light and clean structure

## 🛠️ Contributing
Pull requests and issues are welcome.

## 📄 License
This project is open-source and free to use.
