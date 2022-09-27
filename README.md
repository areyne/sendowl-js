# sendowl-js
### A barebones, updated Node.JS Wrapper for the SendOwl API

sendowl-js is currently in development, and will have more features added in the coming weeks.

 - Discounts are currently in a development state, but have index, search, update, and delete functions.

## Features

- Index all orders. (with filtering)
- Search, retrieve, and update orders.
- Index all products and subscriptions. (no filtering)
- Search, retrieve, update, delete, and issue products and subscriptions.
- Retrieve all keys associated with a product. (Available, used, or both)
- Check for license validity of specific products.

## Planned Features

- Add support for Bundles and Drip Items.
- ~~Add support for license checks.~~
- Add support for product creation.
- Make better documentation.

## Installation

sendowl-js requires [Node.js](https://nodejs.org/) v10+ to run.
```sh
npm install sendowl-js
```

## Usage

```js
import { SendOwl } from 'sendowl-js'

const sendOwl = new SendOwl({
    host: 'www.sendowl.com', // this is always your host
    key: 'Your_SendOwl_Key',
    secret: 'Your_SendOwl_Secret',
});
```

Filter for orders.index()
```js
filter = {
    from: '2022-09-01',     // starting date when filtering a date range
    to: '2022-09-03',       // ending date when filtering a date range
    orderable: 'Product-[productId]',   // replace [productId] with your product's ID to filter by product
    state: 'complete',      // filters orders by state
    referred_by: '500',     // filter by referral user id
    sort: 'newest_first'    // how to sort the data
}
```

Filter for orders.search()
```js
filter = {
    // These are mutually exclusive - you can only use one or the other, not both.
    term: 'searchTerm',     // Search for this term in all order fields
    email: 'searchEmail'    // Search for this specifically in the email field.
}
```

Updating an order with orders.update()
```js
orderUpdate = {
    // The full list of fields can be found on SendOwl's API documentation.
    order: {
        "buyer_name": "Johnny Appleseed"
    }
}
```

The product search API simply does not work on SendOwl's end. I don't know why. I put in a ticket.

Updating a product with products.update()
```js
productUpdate = {
    // The full list of fields can be found on SendOwl's API documentation.
    product: {
        "name": "Johnny Appleseed's Favorite Axe"
    }
}
```

Retrieving licenses for products
```js
const productId = [productId]; // replace [productId] with your product ID
sendowl.products.licenses(productId, true); // this will only return AVAILABLE licenses
sendowl.products.licenses(productId, false); // this will only return USED licenses
sendowl.products.licenses(productId); // this will return ALL licenses
```

Checking if a product license is valid
```js
keyObject = {
    key: 'license_code_here',
}

sendowl.products.checkLicense(productId, keyObject);
```
## Dependencies

`axios` - that's it.

## License

Apache License 2.0