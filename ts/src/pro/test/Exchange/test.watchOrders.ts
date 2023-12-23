
import assert from 'assert';
import testOrder from '../../../test/Exchange/base/test.order.js';
import testSharedMethods from '../../../test/Exchange/base/test.sharedMethods.js';

async function testWatchOrders (exchange, skippedProperties, symbol) {
    const method = 'watchOrders';
    let now = exchange.milliseconds ();
    const ends = now + 15000;
    while (now < ends) {
        let response = undefined;
        try {
            response = await exchange.watchOrders (symbol);
        } catch (e) {
            if (!testSharedMethods.isTemporaryFailure (e)) {
                throw e;
            }
            now = exchange.milliseconds ();
            continue;
        }
        assert (Array.isArray (response), exchange.id + ' ' + method + ' ' + symbol + ' must return an array. ' + exchange.json (response));
        now = exchange.milliseconds ();
        for (let i = 0; i < response.length; i++) {
            testOrder (exchange, skippedProperties, method, response[i], symbol, now);
        }
        testSharedMethods.assertTimestampOrder (exchange, method, symbol, response);
    }
}

export default testWatchOrders;
