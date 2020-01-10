# -*- coding: utf-8 -*-

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

import ccxtpro
import ccxt.async_support as ccxt


class coinbasepro(ccxtpro.Exchange, ccxt.coinbasepro):

    def describe(self):
        return self.deep_extend(super(coinbasepro, self).describe(), {
            'has': {
                'ws': True,
                'watchOrderBook': True,
            },
            'urls': {
                'api': {
                    'ws': 'wss://ws-feed.pro.coinbase.com',
                },
            },
        })

    async def watch_order_book(self, symbol, limit=None, params={}):
        await self.load_markets()
        market = self.market(symbol)
        name = 'level2'
        messageHash = name + ':' + market['id']
        url = self.urls['api']['ws']
        subscribe = {
            'type': 'subscribe',
            'product_ids': [
                market['id'],
            ],
            'channels': [
                name,
            ],
        }
        request = self.extend(subscribe, params)
        # print(request)
        # sys.exit()
        future = self.watch(url, messageHash, request, messageHash)
        return await self.after(future, self.limit_order_book, symbol, limit, params)

    def limit_order_book(self, orderbook, symbol, limit=None, params={}):
        return orderbook.limit(limit)

    def handle_delta(self, bookside, delta):
        price = self.safe_float(delta, 0)
        amount = self.safe_float(delta, 1)
        bookside.store(price, amount)

    def handle_deltas(self, bookside, deltas):
        for i in range(0, len(deltas)):
            self.handle_delta(bookside, deltas[i])

    def handle_order_book(self, client, message):
        #
        # first message(snapshot)
        #
        #     {
        #         "type": "snapshot",
        #         "product_id": "BTC-USD",
        #         "bids": [
        #             ["10101.10", "0.45054140"]
        #         ],
        #         "asks": [
        #             ["10102.55", "0.57753524"]
        #         ]
        #     }
        #
        # subsequent updates
        #
        #     {
        #         "type": "l2update",
        #         "product_id": "BTC-USD",
        #         "time": "2019-08-14T20:42:27.265Z",
        #         "changes": [
        #             ["buy", "10101.80000000", "0.162567"]
        #         ]
        #     }
        #
        type = self.safe_string(message, 'type')
        marketId = self.safe_string(message, 'product_id')
        if marketId is not None:
            symbol = None
            market = None
            if marketId in self.markets_by_id:
                market = self.markets_by_id[marketId]
                symbol = market['symbol']
            else:
                baseId, quoteId = marketId.split('-')
                base = self.safe_currency_code(baseId)
                quote = self.safe_currency_code(quoteId)
                symbol = base + '/' + quote
            name = 'level2'
            messageHash = name + ':' + marketId
            if type == 'snapshot':
                depth = 50  # default depth is 50
                self.orderbooks[symbol] = self.order_book({}, depth)
                orderbook = self.orderbooks[symbol]
                self.handle_deltas(orderbook['asks'], self.safe_value(message, 'asks', []))
                self.handle_deltas(orderbook['bids'], self.safe_value(message, 'bids', []))
                orderbook['timestamp'] = None
                orderbook['datetime'] = None
                client.resolve(orderbook, messageHash)
            elif type == 'l2update':
                orderbook = self.orderbooks[symbol]
                timestamp = self.parse8601(self.safe_string(message, 'time'))
                changes = self.safe_value(message, 'changes', [])
                sides = {
                    'sell': 'asks',
                    'buy': 'bids',
                }
                for i in range(0, len(changes)):
                    change = changes[i]
                    key = self.safe_string(change, 0)
                    side = self.safe_string(sides, key)
                    price = self.safe_float(change, 1)
                    amount = self.safe_float(change, 2)
                    bookside = orderbook[side]
                    bookside.store(price, amount)
                orderbook['timestamp'] = timestamp
                orderbook['datetime'] = self.iso8601(timestamp)
                client.resolve(orderbook, messageHash)

    def sign_message(self, client, messageHash, message, params={}):
        # todo: implement coinbasepro signMessage() via parent sign()
        return message

    def handle_subscription_status(self, client, message):
        #
        #     {
        #         type: 'subscriptions',
        #         channels: [
        #             {
        #                 name: 'level2',
        #                 product_ids: ['ETH-BTC']
        #             }
        #         ]
        #     }
        #
        return message

    def handle_message(self, client, message):
        type = self.safe_string(message, 'type')
        methods = {
            'snapshot': self.handle_order_book,
            'l2update': self.handle_order_book,
            'subscribe': self.handle_subscription_status,
        }
        method = self.safe_value(methods, type)
        if method is None:
            return message
        else:
            return self.call(method, client, message)
