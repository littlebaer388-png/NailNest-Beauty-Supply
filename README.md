# NailNest Beauty Supply — Website

A responsive, static product-catalogue website for **NailNest Beauty Supply**. The catalogue uses the 153 product images supplied in the original ZIP. Product photos are included as compressed WebP files for the website and original image files are also preserved in `original-images/`.

## Open the website

1. Extract `NailNest-Beauty-Supply-Website.zip` to a folder on your computer.
2. Open the folder and double-click `index.html`.
3. The website should open in Chrome, Edge, Firefox or another modern browser. A server is not required for local preview.

The site does not have a database, payment checkout, customer accounts or server-side code. It is an enquiry-first catalogue; customers place enquiries directly through WhatsApp.

## WhatsApp ordering

Every product has an **ORDER ON WHATSAPP** link. It opens `https://wa.me/27710331241` with a message containing that product's name. The links use the international South African number format for 071 033 1241.

## Edit product information

Open `products.js` in a text editor such as Notepad or Visual Studio Code. Each entry has fields similar to:

```js
{
  "id": "nn-001",
  "number": 1,
  "name": "Nail Essentials Assortment",
  "category": "Kits & Bundles",
  "image": "assets/products/001.webp",
  "description": "The photo shows a kit or assortment. Message us for an item breakdown, pricing, and availability.",
  "price": null,
  "priceLabel": "Ask for price",
  "variantNote": "",
  "featured": false,
  "whatsappMessage": "Hello, I am interested in ordering Nail Essentials Assortment. Please provide more information about the price, availability, and delivery."
}
```

- Change `name`, `category` or `description` to update the catalogue label.
- Add a numeric `price`, for example `price: 89.99`, if you have confirmed a price. Keep `price: null` until it is confirmed.
- Change `variantNote` to mention options only when you have confirmed them. The current notes invite customers to ask about styles/colours rather than claiming unverified stock.
- Set `featured: true` for products to include them in Featured Finds (the first four featured products are shown).
- Keep `image` pointed to an existing file under `assets/products/`. Product IDs should remain unique.
- If you change the product name, update the `whatsappMessage` to match. The generated order link uses this message.

The original photos are preserved under `original-images/`; the website loads the lighter `.webp` versions in `assets/products/`. If replacing an image, create a WebP copy in `assets/products/` and update its `image` path in `products.js`.

## Edit the business details or design

- `index.html`: brand name, homepage copy, contact details, address, navigation, and page sections.
- `styles.css`: colours, typography, spacing, responsive layout, and product-card styling. Red is set by `--red` near the top.
- `app.js`: catalogue rendering, search, category filters, and WhatsApp message construction.
- `assets/favicon.svg`: simple red-and-white site icon.

The Maps link currently points to the supplied address: 58 Peter Place, Lyme Park, Sandton, Johannesburg, 2091, South Africa. The page advises customers to confirm arrangements before visiting and does not claim that this is a walk-in shop.

## Publish free with GitHub Pages

1. Create or sign in to a GitHub account at https://github.com/.
2. Create a new **public** repository, for example `nailnest-beauty-supply`.
3. Extract the website ZIP on your computer. Upload the *contents* of the extracted folder (including `index.html`, `styles.css`, `app.js`, `products.js`, `assets/`, and `original-images/`) to the root of the repository. Do not upload only the ZIP file.
4. On GitHub, open the repository and choose **Settings** → **Pages**.
5. In **Build and deployment**, choose **Deploy from a branch**. Set the branch to `main` and folder to `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site and use the URL shown in **Settings → Pages**. It will usually look like `https://YOUR-USERNAME.github.io/nailnest-beauty-supply/`.
7. After updates, commit or upload the changed files to the same repository. GitHub Pages will rebuild the static website automatically.

The site uses relative image paths and is compatible with GitHub Pages. All 153 product photos are included in the bundle. The Google Fonts import is optional; if internet access is blocked, the page falls back to system fonts.

## File guide

- `index.html` — website structure and page content.
- `styles.css` — responsive layout and visual styles.
- `app.js` — search, category filtering, product rendering and navigation interactions.
- `products.js` — editable catalogue data for all 153 products.
- `assets/products/` — web-optimized product images used by the website.
- `original-images/` — all original image files extracted from the supplied ZIP.
- `original-image-manifest.csv` — maps original filenames to catalogue numbers, categories and optimized image paths.
