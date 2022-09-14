import axios from 'axios';

class Resource {
    constructor (options) {
        this.host = options.host;
        this.key = options.key;
        this.secret = options.secret;
        this.uri = `https://${this.key}:${this.secret}@${this.host}`;
    }

    async req (method, path, params, data) {
        const options = {
            method,
            url: `${this.uri}${path}`,
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            params,
            data,
        };

        const res = await axios(options);

        return res.data;
    }
}


class Orders extends Resource {
    index (filter) { // from, to, orderable, state, referred_by, sort | nothing exclusive
        const urlParams = new URLSearchParams(filter);

        const path = '/api/v1_3/orders';

        const res = this.req('GET', path, urlParams);

        return res;
    }

    search (filter) { // term OR email | exclusive
        const urlParams = new URLSearchParams(filter);

        const path = '/api/v1_3/orders/search';

        const res = this.req('GET', path, urlParams);

        return res;
    }

    get (orderId) {
        const path = `/api/v1_3/orders/${orderId}`;

        const res = this.req('GET', path);

        return res;
    }

    update (orderId, data) {
        const path = `/api/v1_3/orders/${orderId}`;

        const res = this.req('PUT', path, undefined, data);

        return res;
    }
}

class Products extends Resource {
    index () {
        const path = '/api/v1_2/products';

        const res = this.req('GET', path);

        return res;
    }

    search (filter) { // term OR email | exclusive
        const urlParams = new URLSearchParams(filter);

        const path = '/api/v1_2/products/search';

        const res = this.req('GET', path, urlParams);

        return res;
    }

    get (productId) {
        const path = `/api/v1_2/products/${productId}`;

        const res = this.req('GET', path);

        return res;
    }

    update (productId, data) {
        const path = `/api/v1_2/products/${productId}`;

        const res = this.req('PUT', path, undefined, data);

        return res;
    }

    delete (productId) {
        const path = `/api/v1_2/products/${productId}`;

        const res = this.req('DELETE', path);

        return res;
    }

    issue (productId, data) {
        const path = `/api/v1_2/products/${productId}/issue`;

        const res = this.req('POST', path, undefined, data);

        return res;
    }

    checkLicense (productId, keyObj) {
        const urlParams = new URLSearchParams(keyObj);
        const path = `/api/v1/products/${productId}/licenses/check_valid`;

        const res = this.req('POST', path, urlParams);

        return res;
    }

    // avail truthy = only available keys, avail false = only used keys, no avail = all keys

    async licenses (productId, avail) {
        const keys = [];
        const path = `/api/v1/products/${productId}/licenses`;

        const res = await this.req('GET', path);

        if (avail) {
            for (let i = 0; i < res.length; i++) {
                const e = res[i];

                if (e.license.order_id == null)
                    keys.push(e);
            }

            return keys;
        } else if (avail === false) {
            for (let i = 0; i < res.length; i++) {
                const e = res[i];

                if (e.license.order_id !== null)
                    keys.push(e);
            }

            return keys;
        }

        return res;
    }
}

class Subscriptions extends Resource {
    index () {
        const path = '/api/v1_3/subscriptions';

        const res = this.req('GET', path);

        return res;
    }

    search (filter) { // term only
        const urlParams = new URLSearchParams(filter);

        const path = '/api/v1_3/subscriptions/search';

        const res = this.req('GET', path, urlParams);

        return res;
    }

    get (subscriptionId) {
        const path = `/api/v1_3/subscriptions/${subscriptionId}`;

        const res = this.req('GET', path);

        return res;
    }

    update (subscriptionId, data) {
        const path = `/api/v1_3/subscriptions/${subscriptionId}`;

        const res = this.req('PUT', path, undefined, data);

        return res;
    }

    delete (subscriptionId) {
        const path = `/api/v1_3/subscriptions/${subscriptionId}`;

        const res = this.req('DELETE', path);

        return res;
    }

    // data must be in proper format from the sendowl api page, update readme to include this.
    issue (subscriptionId, data) {
        const path = `/api/v1_3/subscriptions/${subscriptionId}/issue`;

        const res = this.req('POST', path, undefined, data);

        return res;
    }
}
export const SendOwl = function (options = {}) {
    this.orders = new Orders(options);
    this.products = new Products(options);
    this.subscriptions = new Subscriptions(options);
};

export default {
    data: SendOwl,
};
