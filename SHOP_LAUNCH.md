# BBX Shop Launch Standard

## Release Order

1. Launch one digital pilot product through Gumroad.
2. Complete a real external purchase with a different buyer account.
3. Confirm payment, receipt email, download delivery, payout status, and refund flow.
4. Only then change the product to `live` in `shop-config.js`.
5. Keep all unverified physical products as `COMING SOON`.

## Digital Pilot Package

- Product: `BBX Digital Art Pack - Vol. 01`
- Introductory price: USD 15
- Delivery: ZIP download through Gumroad
- Contents:
  - 3-5 collector artwork files
  - Desktop wallpapers: 3840x2160
  - Mobile wallpapers: 2160x3840
  - Social preview images: 1600px long edge
  - `LICENSE.pdf`
  - `README.pdf`
- License: personal use only; no resale, redistribution, AI training, commercial use, or merchandise production.

## Image Master Requirements

- Keep sale masters outside the public website repository.
- Archive the uncropped original separately.
- Recommended print master: TIFF or maximum-quality PNG/JPEG, sRGB or Adobe RGB, 300 PPI.
- Minimum long edge for a print candidate: 6000px.
- Minimum for 20x30 inch printing at 300 PPI: 6000x9000px.
- Website preview: 1600-2000px long edge, sRGB, typically under 500KB.
- Never upscale a 1200px website image and call it a print master.

Run:

```bash
node check-shop-images.js path/to/master-1.jpg path/to/master-2.png
```

`PRINT READY` is the minimum automated pixel check. Physical print quality still requires a vendor proof.

## Physical Product Release Gates

### Signed Canvas

- 6000px+ master verified
- Print product selected
- Physical proof approved by JungKing
- Edition count, signature, certificate, packaging, price, shipping regions, and return policy confirmed

### Hoodie

- Transparent 300 PPI artwork prepared to the vendor template
- One physical sample approved
- Size chart and garment details published
- Shipping and return costs tested

### Vinyl

- Final audio master and rights confirmed
- Manufacturer quote, minimum order, sleeve proof, inventory storage, and fulfillment plan confirmed

## Gumroad Activation

After the Gumroad product is published and tested, edit `shop-config.js`:

```js
"digital-art-pack": {
    status: "live",
    checkoutUrl: "https://YOUR-STORE.gumroad.com/l/YOUR-PRODUCT"
}
```

The website will change the pilot button from `CHECKOUT SETUP` to `BUY NOW`.
