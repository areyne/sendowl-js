# sendowl-js
### A Node.JS Wrapper for the SendOwl API

sendowl-js is currently in a development state. All available functionality in the SendOwl API will be supported.

## Features
- Basic CRUD functionality through the SendOwl API for
	- Orders
	- Products
	- Subscriptions
	- Discounts
		- Discount Codes
- License Management
	- Issue Product & Subscription Licenses
	- Validate individual licenses
	- Index all valid or invalid licenses for product.

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