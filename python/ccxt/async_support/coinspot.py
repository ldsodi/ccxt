# -*- coding: utf-8 -*-

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

from ccxt.async_support.base.exchange import Exchange
from ccxt.abstract.coinspot import ImplicitAPI
import hashlib
from ccxt.base.types import OrderSide
from ccxt.base.types import OrderType
from typing import Optional
from typing import List
from ccxt.base.errors import ExchangeError
from ccxt.base.errors import ArgumentsRequired
from ccxt.base.decimal_to_precision import TICK_SIZE
from ccxt.base.precise import Precise


class coinspot(Exchange, ImplicitAPI):

    def describe(self):
        return self.deep_extend(super(coinspot, self).describe(), {
            'id': 'coinspot',
            'name': 'CoinSpot',
            'countries': ['AU'],  # Australia
            'rateLimit': 1000,
            'pro': False,
            'has': {
                'CORS': None,
                'spot': True,
                'margin': False,
                'swap': False,
                'future': False,
                'option': False,
                'addMargin': False,
                'cancelOrder': True,
                'createMarketOrder': False,
                'createOrder': True,
                'createReduceOnlyOrder': False,
                'createStopLimitOrder': False,
                'createStopMarketOrder': False,
                'createStopOrder': False,
                'fetchBalance': True,
                'fetchBorrowRate': False,
                'fetchBorrowRateHistories': False,
                'fetchBorrowRateHistory': False,
                'fetchBorrowRates': False,
                'fetchBorrowRatesPerSymbol': False,
                'fetchFundingHistory': False,
                'fetchFundingRate': False,
                'fetchFundingRateHistory': False,
                'fetchFundingRates': False,
                'fetchIndexOHLCV': False,
                'fetchLeverage': False,
                'fetchLeverageTiers': False,
                'fetchMarginMode': False,
                'fetchMarkOHLCV': False,
                'fetchMyTrades': True,
                'fetchOpenInterestHistory': False,
                'fetchOrderBook': True,
                'fetchPosition': False,
                'fetchPositionMode': False,
                'fetchPositions': False,
                'fetchPositionsRisk': False,
                'fetchPremiumIndexOHLCV': False,
                'fetchTicker': True,
                'fetchTickers': True,
                'fetchTrades': True,
                'fetchTradingFee': False,
                'fetchTradingFees': False,
                'reduceMargin': False,
                'setLeverage': False,
                'setMarginMode': False,
                'setPositionMode': False,
                'ws': False,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28208429-3cacdf9a-6896-11e7-854e-4c79a772a30f.jpg',
                'api': {
                    'public': 'https://www.coinspot.com.au/pubapi',
                    'private': 'https://www.coinspot.com.au/api',
                },
                'www': 'https://www.coinspot.com.au',
                'doc': 'https://www.coinspot.com.au/api',
                'referral': 'https://www.coinspot.com.au/register?code=PJURCU',
            },
            'api': {
                'public': {
                    'get': [
                        'latest',
                    ],
                },
                'private': {
                    'post': [
                        'orders',
                        'orders/history',
                        'my/coin/deposit',
                        'my/coin/send',
                        'quote/buy',
                        'quote/sell',
                        'my/balances',
                        'my/orders',
                        'my/buy',
                        'my/sell',
                        'my/buy/cancel',
                        'my/sell/cancel',
                        'ro/my/balances',
                        'ro/my/balances/{cointype}',
                        'ro/my/deposits',
                        'ro/my/withdrawals',
                        'ro/my/transactions',
                        'ro/my/transactions/{cointype}',
                        'ro/my/transactions/open',
                        'ro/my/transactions/{cointype}/open',
                        'ro/my/sendreceive',
                        'ro/my/affiliatepayments',
                        'ro/my/referralpayments',
                    ],
                },
            },
            'markets': {
                'ADA/AUD': self.safe_market_structure({'id': 'ada', 'symbol': 'ADA/AUD', 'base': 'ADA', 'quote': 'AUD', 'baseId': 'ada', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'BTC/AUD': self.safe_market_structure({'id': 'btc', 'symbol': 'BTC/AUD', 'base': 'BTC', 'quote': 'AUD', 'baseId': 'btc', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'ETH/AUD': self.safe_market_structure({'id': 'eth', 'symbol': 'ETH/AUD', 'base': 'ETH', 'quote': 'AUD', 'baseId': 'eth', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'XRP/AUD': self.safe_market_structure({'id': 'xrp', 'symbol': 'XRP/AUD', 'base': 'XRP', 'quote': 'AUD', 'baseId': 'xrp', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'LTC/AUD': self.safe_market_structure({'id': 'ltc', 'symbol': 'LTC/AUD', 'base': 'LTC', 'quote': 'AUD', 'baseId': 'ltc', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'DOGE/AUD': self.safe_market_structure({'id': 'doge', 'symbol': 'DOGE/AUD', 'base': 'DOGE', 'quote': 'AUD', 'baseId': 'doge', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'RFOX/AUD': self.safe_market_structure({'id': 'rfox', 'symbol': 'RFOX/AUD', 'base': 'RFOX', 'quote': 'AUD', 'baseId': 'rfox', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'POWR/AUD': self.safe_market_structure({'id': 'powr', 'symbol': 'POWR/AUD', 'base': 'POWR', 'quote': 'AUD', 'baseId': 'powr', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'NEO/AUD': self.safe_market_structure({'id': 'neo', 'symbol': 'NEO/AUD', 'base': 'NEO', 'quote': 'AUD', 'baseId': 'neo', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'TRX/AUD': self.safe_market_structure({'id': 'trx', 'symbol': 'TRX/AUD', 'base': 'TRX', 'quote': 'AUD', 'baseId': 'trx', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'EOS/AUD': self.safe_market_structure({'id': 'eos', 'symbol': 'EOS/AUD', 'base': 'EOS', 'quote': 'AUD', 'baseId': 'eos', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'XLM/AUD': self.safe_market_structure({'id': 'xlm', 'symbol': 'XLM/AUD', 'base': 'XLM', 'quote': 'AUD', 'baseId': 'xlm', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'RHOC/AUD': self.safe_market_structure({'id': 'rhoc', 'symbol': 'RHOC/AUD', 'base': 'RHOC', 'quote': 'AUD', 'baseId': 'rhoc', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
                'GAS/AUD': self.safe_market_structure({'id': 'gas', 'symbol': 'GAS/AUD', 'base': 'GAS', 'quote': 'AUD', 'baseId': 'gas', 'quoteId': 'aud', 'type': 'spot', 'spot': True}),
            },
            'commonCurrencies': {
                'DRK': 'DASH',
            },
            'options': {
                'fetchBalance': 'private_post_my_balances',
            },
            'precisionMode': TICK_SIZE,
        })

    def parse_balance(self, response):
        result = {'info': response}
        balances = self.safe_value_2(response, 'balance', 'balances')
        if isinstance(balances, list):
            for i in range(0, len(balances)):
                currencies = balances[i]
                currencyIds = list(currencies.keys())
                for j in range(0, len(currencyIds)):
                    currencyId = currencyIds[j]
                    balance = currencies[currencyId]
                    code = self.safe_currency_code(currencyId)
                    account = self.account()
                    account['total'] = self.safe_string(balance, 'balance')
                    result[code] = account
        else:
            currencyIds = list(balances.keys())
            for i in range(0, len(currencyIds)):
                currencyId = currencyIds[i]
                code = self.safe_currency_code(currencyId)
                account = self.account()
                account['total'] = self.safe_string(balances, currencyId)
                result[code] = account
        return self.safe_balance(result)

    async def fetch_balance(self, params={}):
        """
        query for balance and get the amount of funds available for trading or funds locked in orders
        :param dict [params]: extra parameters specific to the coinspot api endpoint
        :returns dict: a `balance structure <https://github.com/ccxt/ccxt/wiki/Manual#balance-structure>`
        """
        await self.load_markets()
        method = self.safe_string(self.options, 'fetchBalance', 'private_post_my_balances')
        response = await getattr(self, method)(params)
        #
        # read-write api keys
        #
        #     ...
        #
        # read-only api keys
        #
        #     {
        #         "status":"ok",
        #         "balances":[
        #             {
        #                 "LTC":{"balance":0.1,"audbalance":16.59,"rate":165.95}
        #             }
        #         ]
        #     }
        #
        return self.parse_balance(response)

    async def fetch_order_book(self, symbol: str, limit: Optional[int] = None, params={}):
        """
        fetches information on open orders with bid(buy) and ask(sell) prices, volumes and other data
        :param str symbol: unified symbol of the market to fetch the order book for
        :param int [limit]: the maximum amount of order book entries to return
        :param dict [params]: extra parameters specific to the coinspot api endpoint
        :returns dict: A dictionary of `order book structures <https://github.com/ccxt/ccxt/wiki/Manual#order-book-structure>` indexed by market symbols
        """
        await self.load_markets()
        market = self.market(symbol)
        request = {
            'cointype': market['id'],
        }
        orderbook = await self.privatePostOrders(self.extend(request, params))
        return self.parse_order_book(orderbook, market['symbol'], None, 'buyorders', 'sellorders', 'rate', 'amount')

    def parse_ticker(self, ticker, market=None):
        #
        #     {
        #         "btc":{
        #             "bid":"51970",
        #             "ask":"53000",
        #             "last":"52806.47"
        #         }
        #     }
        #
        symbol = self.safe_symbol(None, market)
        last = self.safe_string(ticker, 'last')
        return self.safe_ticker({
            'symbol': symbol,
            'timestamp': None,
            'datetime': None,
            'high': None,
            'low': None,
            'bid': self.safe_string(ticker, 'bid'),
            'bidVolume': None,
            'ask': self.safe_string(ticker, 'ask'),
            'askVolume': None,
            'vwap': None,
            'open': None,
            'close': last,
            'last': last,
            'previousClose': None,
            'change': None,
            'percentage': None,
            'average': None,
            'baseVolume': None,
            'quoteVolume': None,
            'info': ticker,
        }, market)

    async def fetch_ticker(self, symbol: str, params={}):
        """
        fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
        :param str symbol: unified symbol of the market to fetch the ticker for
        :param dict [params]: extra parameters specific to the coinspot api endpoint
        :returns dict: a `ticker structure <https://github.com/ccxt/ccxt/wiki/Manual#ticker-structure>`
        """
        await self.load_markets()
        market = self.market(symbol)
        response = await self.publicGetLatest(params)
        id = market['id']
        id = id.lower()
        prices = self.safe_value(response, 'prices')
        #
        #     {
        #         "status":"ok",
        #         "prices":{
        #             "btc":{
        #                 "bid":"52732.47000022",
        #                 "ask":"53268.0699976",
        #                 "last":"53284.03"
        #             }
        #         }
        #     }
        #
        ticker = self.safe_value(prices, id)
        return self.parse_ticker(ticker, market)

    async def fetch_tickers(self, symbols: Optional[List[str]] = None, params={}):
        """
        fetches price tickers for multiple markets, statistical calculations with the information calculated over the past 24 hours each market
        :see: https://www.coinspot.com.au/api#latestprices
        :param str[]|None symbols: unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
        :param dict [params]: extra parameters specific to the coinspot api endpoint
        :returns dict: a dictionary of `ticker structures <https://github.com/ccxt/ccxt/wiki/Manual#ticker-structure>`
        """
        await self.load_markets()
        response = await self.publicGetLatest(params)
        #
        #    {
        #        "status": "ok",
        #        "prices": {
        #        "btc": {
        #        "bid": "25050",
        #        "ask": "25370",
        #        "last": "25234"
        #        },
        #        "ltc": {
        #        "bid": "79.39192993",
        #        "ask": "87.98",
        #        "last": "87.95"
        #        }
        #      }
        #    }
        #
        result = {}
        prices = self.safe_value(response, 'prices')
        ids = list(prices.keys())
        for i in range(0, len(ids)):
            id = ids[i]
            market = self.safe_market(id)
            if market['spot']:
                symbol = market['symbol']
                ticker = prices[id]
                result[symbol] = self.parse_ticker(ticker, market)
        return self.filter_by_array_tickers(result, 'symbol', symbols)

    async def fetch_trades(self, symbol: str, since: Optional[int] = None, limit: Optional[int] = None, params={}):
        """
        get the list of most recent trades for a particular symbol
        :param str symbol: unified symbol of the market to fetch trades for
        :param int [since]: timestamp in ms of the earliest trade to fetch
        :param int [limit]: the maximum amount of trades to fetch
        :param dict [params]: extra parameters specific to the coinspot api endpoint
        :returns Trade[]: a list of `trade structures <https://github.com/ccxt/ccxt/wiki/Manual#public-trades>`
        """
        await self.load_markets()
        market = self.market(symbol)
        request = {
            'cointype': market['id'],
        }
        response = await self.privatePostOrdersHistory(self.extend(request, params))
        #
        #     {
        #         "status":"ok",
        #         "orders":[
        #             {"amount":0.00102091,"rate":21549.09999991,"total":21.99969168,"coin":"BTC","solddate":1604890646143,"market":"BTC/AUD"},
        #         ],
        #     }
        #
        trades = self.safe_value(response, 'orders', [])
        return self.parse_trades(trades, market, since, limit)

    async def fetch_my_trades(self, symbol: Optional[str] = None, since: Optional[int] = None, limit: Optional[int] = None, params={}):
        """
        fetch all trades made by the user
        :param str symbol: unified market symbol
        :param int [since]: the earliest time in ms to fetch trades for
        :param int [limit]: the maximum number of trades structures to retrieve
        :param dict [params]: extra parameters specific to the bitbank api endpoint
        :returns Trade[]: a list of `trade structures <https://github.com/ccxt/ccxt/wiki/Manual#trade-structure>`
        """
        await self.load_markets()
        request = {}
        market = None
        if symbol is not None:
            market = self.market(symbol)
        if since is not None:
            request['startdate'] = self.yyyymmdd(since)
        response = await self.privatePostRoMyTransactions(self.extend(request, params))
        #  {
        #   status: 'ok',
        #   buyorders: [
        #     {
        #       otc: False,
        #       market: 'ALGO/AUD',
        #       amount: 386.95197925,
        #       created: '2022-10-20T09:56:44.502Z',
        #       audfeeExGst: 1.80018002,
        #       audGst: 0.180018,
        #       audtotal: 200
        #     },
        #   ],
        #   sellorders: [
        #     {
        #       otc: False,
        #       market: 'SOLO/ALGO',
        #       amount: 154.52345614,
        #       total: 115.78858204658796,
        #       created: '2022-04-16T09:36:43.698Z',
        #       audfeeExGst: 1.08995731,
        #       audGst: 0.10899573,
        #       audtotal: 118.7
        #     },
        #   ]
        # }
        buyTrades = self.safe_value(response, 'buyorders', [])
        for i in range(0, len(buyTrades)):
            buyTrades[i]['side'] = 'buy'
        sellTrades = self.safe_value(response, 'sellorders', [])
        for i in range(0, len(sellTrades)):
            sellTrades[i]['side'] = 'sell'
        trades = self.array_concat(buyTrades, sellTrades)
        return self.parse_trades(trades, market, since, limit)

    def parse_trade(self, trade, market=None):
        #
        # public fetchTrades
        #
        #     {
        #         "amount":0.00102091,
        #         "rate":21549.09999991,
        #         "total":21.99969168,
        #         "coin":"BTC",
        #         "solddate":1604890646143,
        #         "market":"BTC/AUD"
        #     }
        #
        # private fetchMyTrades
        #     {
        #       otc: False,
        #       market: 'ALGO/AUD',
        #       amount: 386.95197925,
        #       created: '2022-10-20T09:56:44.502Z',
        #       audfeeExGst: 1.80018002,
        #       audGst: 0.180018,
        #       audtotal: 200,
        #       total: 200,
        #       side: 'buy',
        #       price: 0.5168600000125209
        #     }
        timestamp = None
        priceString = None
        fee = None
        audTotal = self.safe_string(trade, 'audtotal')
        costString = self.safe_string(trade, 'total', audTotal)
        side = self.safe_string(trade, 'side')
        amountString = self.safe_string(trade, 'amount')
        marketId = self.safe_string(trade, 'market')
        symbol = self.safe_symbol(marketId, market, '/')
        solddate = self.safe_integer(trade, 'solddate')
        if solddate is not None:
            priceString = self.safe_string(trade, 'rate')
            timestamp = solddate
        else:
            priceString = Precise.string_div(costString, amountString)
            createdString = self.safe_string(trade, 'created')
            timestamp = self.parse8601(createdString)
            audfeeExGst = self.safe_string(trade, 'audfeeExGst')
            audGst = self.safe_string(trade, 'audGst')
            # The transaction fee which consumers pay is inclusive of GST by default
            feeCost = Precise.string_add(audfeeExGst, audGst)
            feeCurrencyId = 'AUD'
            fee = {
                'cost': self.parse_number(feeCost),
                'currency': self.safe_currency_code(feeCurrencyId),
            }
        return self.safe_trade({
            'info': trade,
            'id': None,
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'order': None,
            'type': None,
            'side': side,
            'takerOrMaker': None,
            'price': self.parse_number(priceString),
            'amount': self.parse_number(amountString),
            'cost': self.parse_number(costString),
            'fee': fee,
        }, market)

    async def create_order(self, symbol: str, type: OrderType, side: OrderSide, amount, price=None, params={}):
        """
        create a trade order
        :see: https://www.coinspot.com.au/api#placebuyorder
        :param str symbol: unified symbol of the market to create an order in
        :param str type: must be 'limit'
        :param str side: 'buy' or 'sell'
        :param float amount: how much of currency you want to trade in units of base currency
        :param float [price]: the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
        :param dict [params]: extra parameters specific to the coinspot api endpoint
        :returns dict: an `order structure <https://github.com/ccxt/ccxt/wiki/Manual#order-structure>`
        """
        await self.load_markets()
        method = 'privatePostMy' + self.capitalize(side)
        if type == 'market':
            raise ExchangeError(self.id + ' createOrder() allows limit orders only')
        market = self.market(symbol)
        request = {
            'cointype': market['id'],
            'amount': amount,
            'rate': price,
        }
        return await getattr(self, method)(self.extend(request, params))

    async def cancel_order(self, id: str, symbol: Optional[str] = None, params={}):
        """
        cancels an open order
        :param str id: order id
        :param str symbol: not used by coinspot cancelOrder()
        :param dict [params]: extra parameters specific to the coinspot api endpoint
        :returns dict: An `order structure <https://github.com/ccxt/ccxt/wiki/Manual#order-structure>`
        """
        side = self.safe_string(params, 'side')
        if side != 'buy' and side != 'sell':
            raise ArgumentsRequired(self.id + ' cancelOrder() requires a side parameter, "buy" or "sell"')
        params = self.omit(params, 'side')
        method = 'privatePostMy' + self.capitalize(side) + 'Cancel'
        request = {
            'id': id,
        }
        return await getattr(self, method)(self.extend(request, params))

    def sign(self, path, api='public', method='GET', params={}, headers=None, body=None):
        url = self.urls['api'][api] + '/' + path
        if api == 'private':
            self.check_required_credentials()
            nonce = self.nonce()
            body = self.json(self.extend({'nonce': nonce}, params))
            headers = {
                'Content-Type': 'application/json',
                'key': self.apiKey,
                'sign': self.hmac(self.encode(body), self.encode(self.secret), hashlib.sha512),
            }
        return {'url': url, 'method': method, 'body': body, 'headers': headers}
