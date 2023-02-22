'use strict'

const assert = require ('assert');
const testTransaction = require ('./test.transaction.js');
const sharedMethods = require ('./test.sharedMethods.js');

async function testFetchTransactions (exchange, code) {
    const method = 'fetchTransactions';
    const skippedExchanges = [];
    if (exchange.inArray(exchange.id, skippedExchanges)) {
        console.log (exchange.id, method, 'found in ignored exchanges, skipping ...');
        return;
    }
    const transactions = await exchange[method] (code);
    assert (Array.isArray(transactions), exchange.id + ' ' + method + ' ' + code + ' must return an array. ' + exchange.json(transactions));
    console.log (exchange.id, method, 'fetched', transactions.length, 'entries, asserting each ...');
    const now = exchange.milliseconds ();
    for (let i = 0; i < transactions.length; i++) {
        testTransaction (exchange, method, transactions[i], code, now);
    }
    sharedMethods.reviseSortedTimestamps (exchange, method, transactions);
}

module.exports = testFetchTransactions;