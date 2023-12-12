//  ---------------------------------------------------------------------------

import bitgetRest from '../bitget.js';
import { AuthenticationError, BadRequest, ArgumentsRequired, NotSupported, InvalidNonce, ExchangeError, RateLimitExceeded } from '../base/errors.js';
import { Precise } from '../base/Precise.js';
import { ArrayCache, ArrayCacheBySymbolById, ArrayCacheBySymbolBySide, ArrayCacheByTimestamp } from '../base/ws/Cache.js';
import { sha256 } from '../static_dependencies/noble-hashes/sha256.js';
import { Int, OHLCV, Str, Strings, OrderBook, Order, Trade, Ticker, Tickers, Position } from '../base/types.js';
import Client from '../base/ws/Client.js';

//  ---------------------------------------------------------------------------

/**
 * @class bitget
 * @augments Exchange
 * @description watching delivery future markets is not yet implemented (perpertual future / swap is implemented)
 */

export default class bitget extends bitgetRest {
    describe () {
        return this.deepExtend (super.describe (), {
            'has': {
                'ws': true,
                'createOrderWs': false,
                'editOrderWs': false,
                'fetchOpenOrdersWs': false,
                'fetchOrderWs': false,
                'cancelOrderWs': false,
                'cancelOrdersWs': false,
                'cancelAllOrdersWs': false,
                'watchBalance': true,
                'watchMyTrades': true,
                'watchOHLCV': true,
                'watchOHLCVForSymbols': true,
                'watchOrderBook': true,
                'watchOrderBookForSymbols': true,
                'watchOrders': true,
                'watchTicker': true,
                'watchTickers': true,
                'watchTrades': true,
                'watchTradesForSymbols': true,
                'watchPositions': true,
            },
            'urls': {
                'api': {
                    'ws': 'wss://ws.bitget.com/spot/v1/stream',
                },
            },
            'options': {
                'tradesLimit': 1000,
                'OHLCVLimit': 1000,
                // WS timeframes differ from REST timeframes
                'timeframes': {
                    '1m': '1m',
                    '5m': '5m',
                    '15m': '15m',
                    '30m': '30m',
                    '1h': '1H',
                    '4h': '4H',
                    '6h': '6H',
                    '12h': '12H',
                    '1d': '1D',
                    '1w': '1W',
                },
            },
            'streaming': {
                'ping': this.ping,
            },
            'exceptions': {
                'ws': {
                    'exact': {
                        '30001': BadRequest, // {"event":"error","code":30001,"msg":"instType:sp,channel:candleundefined,instId:BTCUSDT doesn't exist"}
                        '30002': AuthenticationError, // illegal request
                        '30003': BadRequest, // invalid op
                        '30004': AuthenticationError, // requires login
                        '30005': AuthenticationError, // login failed
                        '30006': RateLimitExceeded, // too many requests
                        '30007': RateLimitExceeded, // request over limit,connection close
                        '30011': AuthenticationError, // invalid ACCESS_KEY
                        '30012': AuthenticationError, // invalid ACCESS_PASSPHRASE
                        '30013': AuthenticationError, // invalid ACCESS_TIMESTAMP
                        '30014': BadRequest, // Request timestamp expired
                        '30015': AuthenticationError, // { event: 'error', code: 30015, msg: 'Invalid sign' }
                        '30016': BadRequest, // { event: 'error', code: 30016, msg: 'Param error' }
                    },
                },
            },
        });
    }

    getWsMarketId (market) {
        // WS don't use the same 'id'
        // as the rest version
        const sandboxMode = this.safeValue (this.options, 'sandboxMode', false);
        if (market['spot']) {
            return market['info']['symbolName'];
        } else {
            if (!sandboxMode) {
                return market['id'].replace ('_UMCBL', '').replace ('_DMCBL', '').replace ('_CMCBL', '');
            } else {
                return market['id'].replace ('_SUMCBL', '').replace ('_SDMCBL', '').replace ('_SCMCBL', '');
            }
        }
    }

    getMarketIdFromArg (arg) {
        //
        // { arg: { instType: 'sp', channel: "ticker", instId: "BTCUSDT" }
        //
        const instType = this.safeString (arg, 'instType');
        const sandboxMode = this.safeValue (this.options, 'sandboxMode', false);
        let marketId = this.safeString (arg, 'instId');
        if (instType === 'sp') {
            marketId = marketId + '_SPBL';
        } else {
            let extension = sandboxMode ? '_S' : '_';
            const splitByUSDT = marketId.split ('USDT');
            const splitByPERP = marketId.split ('PERP');
            const splitByUSDTLength = splitByUSDT.length;
            const splitByPERPLength = splitByPERP.length;
            if (splitByUSDTLength > 1) {
                extension += 'UMCBL';
            } else if (splitByPERPLength > 1) {
                extension += 'CMCBL';
            } else {
                extension += 'DMCBL';
            }
            marketId = marketId + extension;
        }
        return marketId;
    }

    async watchTicker (symbol: string, params = {}): Promise<Ticker> {
        /**
         * @method
         * @name bitget#watchTicker
         * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        symbol = market['symbol'];
        const messageHash = 'ticker:' + symbol;
        const instType = market['spot'] ? 'sp' : 'mc';
        const args = {
            'instType': instType,
            'channel': 'ticker',
            'instId': this.getWsMarketId (market),
        };
        return await this.watchPublic (messageHash, args, params);
    }

    async watchTickers (symbols: Strings = undefined, params = {}): Promise<Tickers> {
        /**
         * @method
         * @name bitget#watchTickers
         * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for all markets of a specific list
         * @param {string[]} symbols unified symbol of the market to fetch the ticker for
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets ();
        symbols = this.marketSymbols (symbols, undefined, false);
        const market = this.market (symbols[0]);
        const instType = market['spot'] ? 'sp' : 'mc';
        const messageHash = 'tickers::' + symbols.join (',');
        const marketIds = this.marketIds (symbols);
        const topics = [ ];
        for (let i = 0; i < marketIds.length; i++) {
            const marketId = marketIds[i];
            const marketInner = this.market (marketId);
            const args = {
                'instType': instType,
                'channel': 'ticker',
                'instId': this.getWsMarketId (marketInner),
            };
            topics.push (args);
        }
        const tickers = await this.watchPublicMultiple (messageHash, topics, params);
        if (this.newUpdates) {
            return tickers;
        }
        return this.filterByArray (this.tickers, 'symbol', symbols);
    }

    handleTicker (client: Client, message) {
        //
        //   {
        //       "action": "snapshot",
        //       "arg": { instType: 'sp', channel: "ticker", instId: "BTCUSDT" },
        //       "data": [
        //         {
        //           "instId": "BTCUSDT",
        //           "last": "21150.53",
        //           "open24h": "20759.65",
        //           "high24h": "21202.29",
        //           "low24h": "20518.82",
        //           "bestBid": "21150.500000",
        //           "bestAsk": "21150.600000",
        //           "baseVolume": "25402.1961",
        //           "quoteVolume": "530452554.2156",
        //           "ts": 1656408934044,
        //           "labeId": 0
        //         }
        //       ]
        //   }
        //
        const ticker = this.parseWsTicker (message);
        const symbol = ticker['symbol'];
        this.tickers[symbol] = ticker;
        const messageHash = 'ticker:' + symbol;
        client.resolve (ticker, messageHash);
        // watchTickers part
        const messageHashes = this.findMessageHashes (client, 'tickers::');
        for (let i = 0; i < messageHashes.length; i++) {
            const messageHashTicker = messageHashes[i];
            const parts = messageHashTicker.split ('::');
            const symbolsString = parts[1];
            const symbols = symbolsString.split (',');
            if (this.inArray (symbol, symbols)) {
                client.resolve (ticker, messageHashTicker);
            }
        }
        return message;
    }

    parseWsTicker (message, market = undefined) {
        //
        // spot
        //     {
        //         "action": "snapshot",
        //         "arg": { instType: 'sp', channel: "ticker", instId: "BTCUSDT" },
        //         "data": [
        //           {
        //             "instId": "BTCUSDT",
        //             "last": "21150.53",
        //             "open24h": "20759.65",
        //             "high24h": "21202.29",
        //             "low24h": "20518.82",
        //             "bestBid": "21150.500000",
        //             "bestAsk": "21150.600000",
        //             "baseVolume": "25402.1961",
        //             "quoteVolume": "530452554.2156",
        //             "ts": 1656408934044,
        //             "labeId": 0
        //           }
        //         ]
        //     }
        //
        // contract
        //
        //     {
        //         "action":"snapshot",
        //         "arg":{
        //            "instType":"mc",
        //            "channel":"ticker",
        //            "instId":"LTCUSDT"
        //         },
        //         "data":[
        //            {
        //               "instId":"LTCUSDT",
        //               "last":"52.77",
        //               "bestAsk":"52.78",
        //               "bestBid":"52.75",
        //               "high24h":"54.83",
        //               "low24h":"51.32",
        //               "priceChangePercent":"-0.02",
        //               "capitalRate":"-0.000100",
        //               "nextSettleTime":1656514800000,
        //               "systemTime":1656513146169,
        //               "markPrice":"52.77",
        //               "indexPrice":"52.80",
        //               "holding":"269813.9",
        //               "baseVolume":"75422.0",
        //               "quoteVolume":"3986579.8"
        //            }
        //         ]
        //     }
        //
        const arg = this.safeValue (message, 'arg', {});
        const data = this.safeValue (message, 'data', []);
        const ticker = this.safeValue (data, 0, {});
        const timestamp = this.safeInteger2 (ticker, 'ts', 'systemTime');
        const marketId = this.getMarketIdFromArg (arg);
        market = this.safeMarket (marketId, market);
        const close = this.safeString (ticker, 'last');
        const open = this.safeString (ticker, 'open24h');
        const high = this.safeString (ticker, 'high24h');
        const low = this.safeString (ticker, 'low24h');
        const baseVolume = this.safeString (ticker, 'baseVolume');
        const quoteVolume = this.safeString (ticker, 'quoteVolume');
        const bid = this.safeString (ticker, 'bestBid');
        const ask = this.safeString (ticker, 'bestAsk');
        return this.safeTicker ({
            'symbol': market['symbol'],
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': high,
            'low': low,
            'bid': bid,
            'bidVolume': undefined,
            'ask': ask,
            'askVolume': undefined,
            'vwap': undefined,
            'open': open,
            'close': close,
            'last': close,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        }, market);
    }

    async watchOHLCV (symbol: string, timeframe = '1m', since: Int = undefined, limit: Int = undefined, params = {}): Promise<OHLCV[]> {
        /**
         * @method
         * @name bitget#watchOHLCV
         * @description watches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int} [since] timestamp in ms of the earliest candle to fetch
         * @param {int} [limit] the maximum amount of candles to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        symbol = market['symbol'];
        const timeframes = this.safeValue (this.options, 'timeframes');
        const interval = this.safeString (timeframes, timeframe);
        const messageHash = 'candles:' + timeframe + ':' + symbol;
        const instType = market['spot'] ? 'sp' : 'mc';
        const args = {
            'instType': instType,
            'channel': 'candle' + interval,
            'instId': this.getWsMarketId (market),
        };
        const ohlcv = await this.watchPublic (messageHash, args, params);
        if (this.newUpdates) {
            limit = ohlcv.getLimit (symbol, limit);
        }
        return this.filterBySinceLimit (ohlcv, since, limit, 0, true);
    }

    async watchOHLCVForSymbols (symbolsAndTimeframes: string[][], since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bitget#watchOHLCVForSymbols
         * @description watches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @param {string[][]} symbolsAndTimeframes array of arrays containing unified symbols and timeframes to fetch OHLCV data for, example [['BTC/USDT', '1m'], ['LTC/USDT', '5m']]
         * @param {int} [since] timestamp in ms of the earliest candle to fetch
         * @param {int} [limit] the maximum amount of candles to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets ();
        const topics = [];
        const hashes = [];
        for (let i = 0; i < symbolsAndTimeframes.length; i++) {
            const data = symbolsAndTimeframes[i];
            const currentSymbol = this.safeString (data, 0);
            const currentTimeframe = this.safeString (data, 1);
            const market = this.market (currentSymbol);
            const interval = this.safeString (this.options['timeframes'], currentTimeframe);
            const instType = market['spot'] ? 'sp' : 'mc';
            const args = {
                'instType': instType,
                'channel': 'candle' + interval,
                'instId': this.getWsMarketId (market),
            };
            topics.push (args);
            hashes.push (currentSymbol + '#' + currentSymbol);
        }
        const messageHash = 'multipleOHLCV::' + hashes.join (',');
        const [ symbol, timeframe, stored ] = await this.watchPublicMultiple (messageHash, topics, params);
        if (this.newUpdates) {
            limit = stored.getLimit (symbol, limit);
        }
        const filtered = this.filterBySinceLimit (stored, since, limit, 0, true);
        return this.createOHLCVObject (symbol, timeframe, filtered);
    }

    handleOHLCV (client: Client, message) {
        //
        //   {
        //       "action":"snapshot",
        //       "arg":{
        //          "instType":"sp",
        //          "channel":"candle1W",
        //          "instId":"BTCUSDT"
        //       },
        //       "data":[
        //          [
        //             "1595779200000",
        //             "9960.05",
        //             "12099.95",
        //             "9839.7",
        //             "11088.68",
        //             "462484.9738"
        //          ],
        //          [
        //             "1596384000000",
        //             "11088.68",
        //             "11909.89",
        //             "10937.54",
        //             "11571.88",
        //             "547596.6484"
        //          ]
        //       ]
        //   }
        //
        const arg = this.safeValue (message, 'arg', {});
        const marketId = this.getMarketIdFromArg (arg);
        const channel = this.safeString (arg, 'channel');
        const interval = channel.replace ('candle', '');
        const timeframes = this.safeValue (this.options, 'timeframes');
        const timeframe = this.findTimeframe (interval, timeframes);
        const market = this.safeMarket (marketId);
        const symbol = market['symbol'];
        this.ohlcvs[symbol] = this.safeValue (this.ohlcvs, symbol, {});
        let stored = this.safeValue (this.ohlcvs[symbol], timeframe);
        if (stored === undefined) {
            const limit = this.safeInteger (this.options, 'OHLCVLimit', 1000);
            stored = new ArrayCacheByTimestamp (limit);
            this.ohlcvs[symbol][timeframe] = stored;
        }
        const data = this.safeValue (message, 'data', []);
        for (let i = 0; i < data.length; i++) {
            const parsed = this.parseWsOHLCV (data[i]);
            stored.append (parsed);
        }
        const messageHash = 'candles:' + timeframe + ':' + symbol;
        client.resolve (stored, messageHash);
        this.resolveMultipleOHLCV (client, 'multipleOHLCV::', symbol, timeframe, stored);
    }

    parseWsOHLCV (ohlcv, market = undefined): OHLCV {
        //
        //   [
        //      "1595779200000", // timestamp
        //      "9960.05", // open
        //      "12099.95", // high
        //      "9839.7", // low
        //      "11088.68", // close
        //      "462484.9738" // volume
        //   ]
        //
        return [
            this.safeInteger (ohlcv, 0),
            this.safeNumber (ohlcv, 1),
            this.safeNumber (ohlcv, 2),
            this.safeNumber (ohlcv, 3),
            this.safeNumber (ohlcv, 4),
            this.safeNumber (ohlcv, 5),
        ];
    }

    async watchOrderBook (symbol: string, limit: Int = undefined, params = {}): Promise<OrderBook> {
        /**
         * @method
         * @name bitget#watchOrderBook
         * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int} [limit] the maximum amount of order book entries to return
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        symbol = market['symbol'];
        const messageHash = 'orderbook' + ':' + symbol;
        const instType = market['spot'] ? 'sp' : 'mc';
        let channel = 'books';
        let incrementalFeed = true;
        if ((limit === 1) || (limit === 5) || (limit === 15)) {
            channel += limit.toString ();
            incrementalFeed = false;
        }
        const args = {
            'instType': instType,
            'channel': channel,
            'instId': this.getWsMarketId (market),
        };
        const orderbook = await this.watchPublic (messageHash, args, params);
        if (incrementalFeed) {
            return orderbook.limit ();
        } else {
            return orderbook;
        }
    }

    async watchOrderBookForSymbols (symbols: string[], limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bitget#watchOrderBookForSymbols
         * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @param {string[]} symbols unified array of symbols
         * @param {int} [limit] the maximum amount of order book entries to return
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets ();
        symbols = this.marketSymbols (symbols);
        let channel = 'books';
        let incrementalFeed = true;
        if ((limit === 5) || (limit === 15)) {
            channel += limit.toString ();
            incrementalFeed = false;
        }
        const topics = [];
        for (let i = 0; i < symbols.length; i++) {
            const market = this.market (symbols[i]);
            const instType = market['spot'] ? 'sp' : 'mc';
            const args = {
                'instType': instType,
                'channel': channel,
                'instId': this.getWsMarketId (market),
            };
            topics.push (args);
        }
        const messageHash = 'multipleOrderbooks::' + symbols.join (',');
        const orderbook = await this.watchPublicMultiple (messageHash, topics, params);
        if (incrementalFeed) {
            return orderbook.limit ();
        } else {
            return orderbook;
        }
    }

    handleOrderBook (client: Client, message) {
        //
        //   {
        //       "action":"snapshot",
        //       "arg":{
        //          "instType":"sp",
        //          "channel":"books5",
        //          "instId":"BTCUSDT"
        //       },
        //       "data":[
        //          {
        //             "asks":[
        //                ["21041.11","0.0445"],
        //                ["21041.16","0.0411"],
        //                ["21041.21","0.0421"],
        //                ["21041.26","0.0811"],
        //                ["21041.65","1.9465"]
        //             ],
        //             "bids":[
        //                ["21040.76","0.0417"],
        //                ["21040.71","0.0434"],
        //                ["21040.66","0.1141"],
        //                ["21040.61","0.3004"],
        //                ["21040.60","1.3357"]
        //             ],
        //             "ts":"1656413855484"
        //          }
        //       ]
        //   }
        //
        const arg = this.safeValue (message, 'arg');
        const channel = this.safeString (arg, 'channel');
        const marketId = this.getMarketIdFromArg (arg);
        const market = this.safeMarket (marketId);
        const symbol = market['symbol'];
        const messageHash = 'orderbook:' + symbol;
        const data = this.safeValue (message, 'data');
        const rawOrderBook = this.safeValue (data, 0);
        const timestamp = this.safeInteger (rawOrderBook, 'ts');
        const incrementalBook = channel === 'books';
        let storedOrderBook = undefined;
        if (incrementalBook) {
            storedOrderBook = this.safeValue (this.orderbooks, symbol);
            if (storedOrderBook === undefined) {
                storedOrderBook = this.countedOrderBook ({});
                storedOrderBook['symbol'] = symbol;
            }
            const asks = this.safeValue (rawOrderBook, 'asks', []);
            const bids = this.safeValue (rawOrderBook, 'bids', []);
            this.handleDeltas (storedOrderBook['asks'], asks);
            this.handleDeltas (storedOrderBook['bids'], bids);
            storedOrderBook['timestamp'] = timestamp;
            storedOrderBook['datetime'] = this.iso8601 (timestamp);
            const checksum = this.safeValue (this.options, 'checksum', true);
            const isSnapshot = this.safeString (message, 'action') === 'snapshot'; // snapshot does not have a checksum
            if (!isSnapshot && checksum) {
                const storedAsks = storedOrderBook['asks'];
                const storedBids = storedOrderBook['bids'];
                const asksLength = storedAsks.length;
                const bidsLength = storedBids.length;
                const payloadArray = [];
                for (let i = 0; i < 25; i++) {
                    if (i < bidsLength) {
                        payloadArray.push (storedBids[i][2][0]);
                        payloadArray.push (storedBids[i][2][1]);
                    }
                    if (i < asksLength) {
                        payloadArray.push (storedAsks[i][2][0]);
                        payloadArray.push (storedAsks[i][2][1]);
                    }
                }
                const payload = payloadArray.join (':');
                const calculatedChecksum = this.crc32 (payload, true);
                const responseChecksum = this.safeInteger (rawOrderBook, 'checksum');
                if (calculatedChecksum !== responseChecksum) {
                    const error = new InvalidNonce (this.id + ' invalid checksum');
                    client.reject (error, messageHash);
                }
            }
        } else {
            storedOrderBook = this.parseOrderBook (rawOrderBook, symbol, timestamp);
        }
        this.orderbooks[symbol] = storedOrderBook;
        client.resolve (storedOrderBook, messageHash);
        this.resolvePromiseIfMessagehashMatches (client, 'multipleOrderbooks::', symbol, storedOrderBook);
    }

    handleDelta (bookside, delta) {
        const bidAsk = this.parseBidAsk (delta, 0, 1);
        // we store the string representations in the orderbook for checksum calculation
        // this simplifies the code for generating checksums as we do not need to do any complex number transformations
        bidAsk.push (delta);
        bookside.storeArray (bidAsk);
    }

    handleDeltas (bookside, deltas) {
        for (let i = 0; i < deltas.length; i++) {
            this.handleDelta (bookside, deltas[i]);
        }
    }

    async watchTrades (symbol: string, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        /**
         * @method
         * @name bitget#watchTrades
         * @description get the list of most recent trades for a particular symbol
         * @see https://bitgetlimited.github.io/apidoc/en/spot/#trades-channel
         * @see https://bitgetlimited.github.io/apidoc/en/mix/#trades-channel
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int} [since] timestamp in ms of the earliest trade to fetch
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        symbol = market['symbol'];
        const messageHash = 'trade:' + symbol;
        const instType = market['spot'] ? 'sp' : 'mc';
        const args = {
            'instType': instType,
            'channel': 'trade',
            'instId': this.getWsMarketId (market),
        };
        const trades = await this.watchPublic (messageHash, args, params);
        if (this.newUpdates) {
            limit = trades.getLimit (symbol, limit);
        }
        return this.filterBySinceLimit (trades, since, limit, 'timestamp', true);
    }

    async watchTradesForSymbols (symbols: string[], since: Int = undefined, limit: Int = undefined, params = {}) {
        /**
         * @method
         * @name bitget#watchTradesForSymbols
         * @description get the list of most recent trades for a particular symbol
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int} [since] timestamp in ms of the earliest trade to fetch
         * @param {int} [limit] the maximum amount of trades to fetch
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
         */
        const symbolsLength = symbols.length;
        if (symbolsLength === 0) {
            throw new ArgumentsRequired (this.id + ' watchTradesForSymbols() requires a non-empty array of symbols');
        }
        await this.loadMarkets ();
        symbols = this.marketSymbols (symbols);
        const topics = [];
        for (let i = 0; i < symbols.length; i++) {
            const market = this.market (symbols[i]);
            const instType = market['spot'] ? 'sp' : 'mc';
            const args = {
                'instType': instType,
                'channel': 'trade',
                'instId': this.getWsMarketId (market),
            };
            topics.push (args);
        }
        const messageHash = 'multipleTrades::' + symbols.join (',');
        const trades = await this.watchPublicMultiple (messageHash, topics, params);
        if (this.newUpdates) {
            const first = this.safeValue (trades, 0);
            const tradeSymbol = this.safeString (first, 'symbol');
            limit = trades.getLimit (tradeSymbol, limit);
        }
        return this.filterBySinceLimit (trades, since, limit, 'timestamp', true);
    }

    handleTrades (client: Client, message) {
        //
        //    {
        //        "action": "snapshot",
        //        "arg": { instType: 'sp', channel: "trade", instId: "BTCUSDT" },
        //        "data": [
        //          [ '1656411148032', '21047.78', "2.2294", "buy" ],
        //          [ '1656411142030', '21047.85', "2.1225", "buy" ],
        //          [ '1656411133064', '21045.88', "1.7704", "sell" ],
        //          [ '1656411126037', '21052.39', "2.6905", "buy" ],
        //          [ '1656411118029', '21056.87', "1.2308", "sell" ],
        //          [ '1656411108028', '21060.01', "1.7186", "sell" ],
        //          [ '1656411100027', '21060.4', "1.3641", "buy" ],
        //          [ '1656411093030', '21058.76', "1.5049", "sell" ]
        //        ]
        //    }
        //
        const arg = this.safeValue (message, 'arg', {});
        const marketId = this.getMarketIdFromArg (arg);
        const market = this.safeMarket (marketId);
        const symbol = market['symbol'];
        let stored = this.safeValue (this.trades, symbol);
        if (stored === undefined) {
            const limit = this.safeInteger (this.options, 'tradesLimit', 1000);
            stored = new ArrayCache (limit);
            this.trades[symbol] = stored;
        }
        const data = this.safeValue (message, 'data', []);
        for (let j = 0; j < data.length; j++) {
            const rawTrade = data[j];
            const parsed = this.parseWsTrade (rawTrade, market);
            stored.append (parsed);
        }
        const messageHash = 'trade:' + symbol;
        client.resolve (stored, messageHash);
        this.resolvePromiseIfMessagehashMatches (client, 'multipleTrades::', symbol, stored);
    }

    parseWsTrade (trade, market = undefined) {
        //
        // public trade
        //
        //   [
        //       "1656411148032", // timestamp
        //       "21047.78", // price
        //       "2.2294", // size
        //       "buy", // side
        //   ]
        //
        market = this.safeMarket (undefined, market);
        const timestamp = this.safeInteger (trade, 0);
        const side = this.safeString (trade, 3);
        const price = this.safeString (trade, 1);
        const amount = this.safeString (trade, 2);
        return this.safeTrade ({
            'info': trade,
            'id': undefined,
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': side,
            'takerOrMaker': undefined,
            'price': price,
            'amount': amount,
            'cost': undefined,
            'fee': undefined,
        }, market);
    }

    async watchPositions (symbols: Strings = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Position[]> {
        /**
         * @method
         * @name bitget#watchPositions
         * @description watch all open positions
         * @see https://bitgetlimited.github.io/apidoc/en/mix/#positions-channel
         * @param {string[]|undefined} symbols list of unified market symbols
         * @param {object} params extra parameters specific to the exchange API endpoint
         * @param {string} params.instType Instrument Type umcbl:USDT Perpetual Contract Private Channel; dmcbl:Coin Margin Perpetual Contract Private Channel; cmcbl: USDC margin Perpetual Contract Private Channel
         * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/en/latest/manual.html#position-structure}
         */
        await this.loadMarkets ();
        let market = undefined;
        let messageHash = '';
        const subscriptionHash = 'positions';
        let instType = 'umcbl';
        symbols = this.marketSymbols (symbols);
        if (!this.isEmpty (symbols)) {
            instType = 'dmcbl';
            market = this.getMarketFromSymbols (symbols);
            messageHash = '::' + symbols.join (',');
            if (market['settle'] === 'USDT') {
                instType = 'umcbl';
            } else if (market['settle'] === 'USDC') {
                instType = 'cmcbl';
            }
        }
        [ instType, params ] = this.handleOptionAndParams (params, 'watchPositions', 'instType', instType);
        messageHash = instType + ':positions' + messageHash;
        const args = {
            'instType': instType,
            'channel': 'positions',
            'instId': 'default',
        };
        const newPositions = await this.watchPrivate (messageHash, subscriptionHash, args, params);
        if (this.newUpdates) {
            return newPositions;
        }
        return this.filterBySymbolsSinceLimit (newPositions, symbols, since, limit, true);
    }

    handlePositions (client: Client, message) {
        //
        //    {
        //        action: 'snapshot',
        //        arg: {
        //            instType: 'umcbl',
        //            channel: 'positions',
        //            instId: 'default'
        //        },
        //        data: [{
        //                posId: '926036334386778112',
        //                instId: 'LTCUSDT_UMCBL',
        //                instName: 'LTCUSDT',
        //                marginCoin: 'USDT',
        //                margin: '9.667',
        //                marginMode: 'crossed',
        //                holdSide: 'long',
        //                holdMode: 'double_hold',
        //                total: '0.3',
        //                available: '0.3',
        //                locked: '0',
        //                averageOpenPrice: '64.44',
        //                leverage: 2,
        //                achievedProfits: '0',
        //                upl: '0.0759',
        //                uplRate: '0.0078',
        //                liqPx: '-153.32',
        //                keepMarginRate: '0.010',
        //                marginRate: '0.005910309637',
        //                cTime: '1656510187717',
        //                uTime: '1694880005480',
        //                markPrice: '64.7',
        //                autoMargin: 'off'
        //            },
        //            ...
        //        ]
        //    }
        //
        const arg = this.safeValue (message, 'arg', {});
        const instType = this.safeString (arg, 'instType', '');
        if (this.positions === undefined) {
            this.positions = {};
        }
        if (!(instType in this.positions)) {
            this.positions[instType] = new ArrayCacheBySymbolBySide ();
        }
        const cache = this.positions[instType];
        const rawPositions = this.safeValue (message, 'data', []);
        const dataLength = rawPositions.length;
        if (dataLength === 0) {
            return;
        }
        const newPositions = [];
        for (let i = 0; i < rawPositions.length; i++) {
            const rawPosition = rawPositions[i];
            const position = this.parseWsPosition (rawPosition);
            newPositions.push (position);
            cache.append (position);
        }
        const messageHashes = this.findMessageHashes (client, instType + ':positions::');
        for (let i = 0; i < messageHashes.length; i++) {
            const messageHash = messageHashes[i];
            const parts = messageHash.split ('::');
            const symbolsString = parts[1];
            const symbols = symbolsString.split (',');
            const positions = this.filterByArray (newPositions, 'symbol', symbols, false);
            if (!this.isEmpty (positions)) {
                client.resolve (positions, messageHash);
            }
        }
        client.resolve (newPositions, instType + ':positions');
    }

    parseWsPosition (position, market = undefined) {
        //
        //    {
        //        posId: '926036334386778112',
        //        instId: 'LTCUSDT_UMCBL',
        //        instName: 'LTCUSDT',
        //        marginCoin: 'USDT',
        //        margin: '9.667',
        //        marginMode: 'crossed',
        //        holdSide: 'long',
        //        holdMode: 'double_hold',
        //        total: '0.3',
        //        available: '0.3',
        //        locked: '0',
        //        averageOpenPrice: '64.44',
        //        leverage: 2,
        //        achievedProfits: '0',
        //        upl: '0.0759',
        //        uplRate: '0.0078',
        //        liqPx: '-153.32',
        //        keepMarginRate: '0.010',
        //        marginRate: '0.005910309637',
        //        cTime: '1656510187717',
        //        uTime: '1694880005480',
        //        markPrice: '64.7',
        //        autoMargin: 'off'
        //    }
        //
        const marketId = this.safeString (position, 'instId');
        const marginModeId = this.safeString (position, 'marginMode');
        const marginMode = this.getSupportedMapping (marginModeId, {
            'crossed': 'cross',
            'fixed': 'isolated',
        });
        const hedgedId = this.safeString (position, 'holdMode');
        const hedged = this.getSupportedMapping (hedgedId, {
            'double_hold': true,
            'single_hold': false,
        });
        const timestamp = this.safeInteger2 (position, 'uTime', 'cTime');
        return this.safePosition ({
            'info': position,
            'id': this.safeString (position, 'posId'),
            'symbol': this.safeSymbol (marketId, market),
            'notional': undefined,
            'marginMode': marginMode,
            'liquidationPrice': undefined,
            'entryPrice': this.safeNumber (position, 'averageOpenPrice'),
            'unrealizedPnl': this.safeNumber (position, 'upl'),
            'percentage': this.safeNumber (position, 'uplRate'),
            'contracts': this.safeNumber (position, 'total'),
            'contractSize': undefined,
            'markPrice': this.safeNumber (position, 'markPrice'),
            'side': this.safeString (position, 'holdSide'),
            'hedged': hedged,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'maintenanceMargin': undefined,
            'maintenanceMarginPercentage': this.safeNumber (position, 'keepMarginRate'),
            'collateral': undefined,
            'initialMargin': undefined,
            'initialMarginPercentage': undefined,
            'leverage': this.safeNumber (position, 'leverage'),
            'marginRatio': this.safeNumber (position, 'marginRate'),
        });
    }

    async watchOrders (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Order[]> {
        /**
         * @method
         * @name bitget#watchOrders
         * @see https://bitgetlimited.github.io/apidoc/en/spot/#order-channel
         * @see https://bitgetlimited.github.io/apidoc/en/mix/#order-channel
         * @see https://bitgetlimited.github.io/apidoc/en/mix/#plan-order-channel
         * @description watches information on multiple orders made by the user
         * @param {string} symbol unified market symbol of the market orders were made in
         * @param {int} [since] the earliest time in ms to fetch orders for
         * @param {int} [limit] the maximum number of  orde structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure
         */
        await this.loadMarkets ();
        let market = undefined;
        let marketId = undefined;
        const isStop = this.safeValue (params, 'stop', false);
        params = this.omit (params, 'stop');
        let messageHash = (isStop) ? 'triggerOrder' : 'order';
        let subscriptionHash = 'order:trades';
        if (symbol !== undefined) {
            market = this.market (symbol);
            symbol = market['symbol'];
            marketId = market['id'];
            messageHash = messageHash + ':' + symbol;
        }
        let type = undefined;
        [ type, params ] = this.handleMarketTypeAndParams ('watchOrders', market, params);
        if ((type === 'spot') && (symbol === undefined)) {
            throw new ArgumentsRequired (this.id + ' watchOrders requires a symbol argument for ' + type + ' markets.');
        }
        if (isStop && type === 'spot') {
            throw new NotSupported (this.id + ' watchOrders does not support stop orders for ' + type + ' markets.');
        }
        const sandboxMode = this.safeValue (this.options, 'sandboxMode', false);
        let instType = undefined;
        if (type === 'spot') {
            instType = 'spbl';
            subscriptionHash = subscriptionHash + ':' + symbol;
        } else {
            if (!sandboxMode) {
                instType = 'UMCBL';
            } else {
                instType = 'SUMCBL';
            }
        }
        if (isStop) {
            subscriptionHash = subscriptionHash + ':stop'; // we don't want to re-use the same subscription hash for stop orders
        }
        const instId = (type === 'spot') ? marketId : 'default'; // different from other streams here the 'rest' id is required for spot markets, contract markets require default here
        const channel = isStop ? 'ordersAlgo' : 'orders';
        const args = {
            'instType': instType,
            'channel': channel,
            'instId': instId,
        };
        const orders = await this.watchPrivate (messageHash, subscriptionHash, args, params);
        if (this.newUpdates) {
            limit = orders.getLimit (symbol, limit);
        }
        return this.filterBySymbolSinceLimit (orders, symbol, since, limit, true);
    }

    handleOrder (client: Client, message, subscription = undefined) {
        //
        //
        // spot order
        //    {
        //        "action": "snapshot",
        //        "arg": { instType: 'spbl', channel: 'orders', instId: "LTCUSDT_SPBL" // instId="default" for contracts },
        //        "data": [
        //          {
        //            "instId": "LTCUSDT_SPBL",
        //            "ordId": "925999649898545152",
        //            "clOrdId": "8b2aa69a-6a09-46c0-a50d-7ed50277394c",
        //            "px": "20.00",
        //            "sz": "0.3000",
        //            "notional": "6.000000",
        //            "ordType": "limit",
        //            "force": "normal",
        //            "side": "buy",
        //            "accFillSz": "0.0000",
        //            "avgPx": "0.00",
        //            "status": "new",
        //            "cTime": 1656501441454,
        //            "uTime": 1656501441454,
        //            "orderFee": []
        //          }
        //        ]
        //    }
        //
        //    {
        //        "action": "snapshot",
        //        "arg": { instType: 'umcbl', channel: "ordersAlgo", instId: "default" },
        //        "data": [
        //          {
        //            "actualPx": "55.000000000",
        //            "actualSz": "0.000000000",
        //            "cOid": "1104372235724890112",
        //            "cTime": "1699028779917",
        //            "eps": "web",
        //            "hM": "double_hold",
        //            "id": "1104372235724890113",
        //            "instId": "BTCUSDT_UMCBL",
        //            "key": "1104372235724890113",
        //            "ordPx": "55.000000000",
        //            "ordType": "limit",
        //            "planType": "pl",
        //            "posSide": "long",
        //            "side": "buy",
        //            "state": "not_trigger",
        //            "sz": "3.557000000",
        //            "tS": "open_long",
        //            "tgtCcy": "USDT",
        //            "triggerPx": "55.000000000",
        //            "triggerPxType": "last",
        //            "triggerTime": "1699028779917",
        //            "uTime": "1699028779917",
        //            "userId": "3704614084",
        //            "version": 1104372235586478100
        //          }
        //        ],
        //        "ts": 1699028780327
        //    }
        //
        const arg = this.safeValue (message, 'arg', {});
        const channel = this.safeString (arg, 'channel');
        const instType = this.safeString (arg, 'instType');
        const sandboxMode = this.safeValue (this.options, 'sandboxMode', false);
        const isContractUpdate = (!sandboxMode) ? (instType === 'umcbl') : (instType === 'sumcbl');
        const data = this.safeValue (message, 'data', []);
        if (this.orders === undefined) {
            const limit = this.safeInteger (this.options, 'ordersLimit', 1000);
            this.orders = new ArrayCacheBySymbolById (limit);
            this.triggerOrders = new ArrayCacheBySymbolById (limit);
        }
        const stored = (channel === 'ordersAlgo') ? this.triggerOrders : this.orders;
        const messageHash = (channel === 'ordersAlgo') ? 'triggerOrder' : 'order';
        const marketSymbols = {};
        for (let i = 0; i < data.length; i++) {
            const order = data[i];
            const execType = this.safeString (order, 'execType');
            if ((execType === 'T') && isContractUpdate) {
                // partial order updates have the trade info inside
                this.handleMyTrades (client, order);
            }
            const parsed = this.parseWsOrder (order);
            stored.append (parsed);
            const symbol = parsed['symbol'];
            marketSymbols[symbol] = true;
        }
        const keys = Object.keys (marketSymbols);
        for (let i = 0; i < keys.length; i++) {
            const symbol = keys[i];
            const innerMessageHash = messageHash + ':' + symbol;
            client.resolve (stored, innerMessageHash);
        }
        client.resolve (stored, messageHash);
    }

    parseWsOrder (order, market = undefined) {
        //
        // spot order
        //     {
        //         "instId": "LTCUSDT_SPBL",
        //         "ordId": "925999649898545152",
        //         "clOrdId": "8b2aa69a-6a09-46c0-a50d-7ed50277394c",
        //         "px": "20.00",
        //         "sz": "0.3000",
        //         "notional": "6.000000",
        //         "ordType": "limit",
        //         "force": "normal",
        //         "side": "buy",
        //         "accFillSz": "0.0000",
        //         "avgPx": "0.00",
        //         "status": "new",
        //         "cTime": 1656501441454,
        //         "uTime": 1656501441454,
        //         "orderFee": []
        //     }
        // partial fill
        //
        //    {
        //        "instId": "LTCUSDT_SPBL",
        //        "ordId": "926006174213914625",
        //        "clOrdId": "7ce28714-0016-46d0-a971-9a713a9923c5",
        //        "notional": "5.000000",
        //        "ordType": "market",
        //        "force": "normal",
        //        "side": "buy",
        //        "fillPx": "52.11",
        //        "tradeId": "926006174514073601",
        //        "fillSz": "0.0959",
        //        "fillTime": "1656502997043",
        //        "fillFee": "-0.0000959",
        //        "fillFeeCcy": "LTC",
        //        "execType": "T",
        //        "accFillSz": "0.0959",
        //        "avgPx": "52.11",
        //        "status": "partial-fill",
        //        "cTime": 1656502996972,
        //        "uTime": 1656502997119,
        //        "orderFee": [Array]
        //    }
        //
        // contract order
        //    {
        //        "accFillSz": "0",
        //        "cTime": 1656510642518,
        //        "clOrdId": "926038241960431617",
        //        "force": "normal",
        //        "instId": "LTCUSDT_UMCBL",
        //        "lever": "20",
        //        "notionalUsd": "7.5",
        //        "ordId": "926038241859768320",
        //        "ordType": "limit",
        //        "orderFee": [
        //             {feeCcy: "USDT", fee: "0"}
        //        ]
        //        "posSide": "long",
        //        "px": "25",
        //        "side": "buy",
        //        "status": "new",
        //        "sz": "0.3",
        //        "tdMode": "cross",
        //        "tgtCcy": "USDT",
        //        "uTime": 1656510642518
        //    }
        // algo order
        //    {
        //        "actualPx":"50.000000000",
        //        "actualSz":"0.000000000",
        //        "cOid":"1041588152132243456",
        //        "cTime":"1684059887917",
        //        "eps":"api",
        //        "hM":"double_hold",
        //        "id":"1041588152132243457",
        //        "instId":"LTCUSDT_UMCBL",
        //        "key":"1041588152132243457",
        //        "ordPx":"55.000000000",
        //        "ordType":"limit",
        //        "planType":"pl",
        //        "posSide":"long",
        //        "side":"buy",
        //        "state":"not_trigger",
        //        "sz":"0.100000000",
        //        "tS":"open_long",
        //        "tgtCcy":"USDT",
        //        "triggerPx":"55.000000000",
        //        "triggerPxType":"mark",
        //        "triggerTime":"1684059887917",
        //        "userId":"3704614084",
        //        "version":1041588152090300400
        //    }
        //
        const marketId = this.safeString (order, 'instId');
        market = this.safeMarket (marketId, market);
        const id = this.safeString2 (order, 'ordId', 'id');
        const clientOrderId = this.safeString2 (order, 'clOrdId', 'cOid');
        const price = this.safeString2 (order, 'px', 'actualPx');
        const filled = this.safeString (order, 'fillSz');
        const amount = this.safeString (order, 'sz');
        const cost = this.safeString2 (order, 'notional', 'notionalUsd');
        const average = this.omitZero (this.safeString (order, 'avgPx'));
        const type = this.safeString (order, 'ordType');
        const timestamp = this.safeInteger (order, 'cTime');
        const symbol = market['symbol'];
        let side = this.safeString2 (order, 'side', 'posSide');
        if ((side === 'open_long') || (side === 'close_short')) {
            side = 'buy';
        } else if ((side === 'close_long') || (side === 'open_short')) {
            side = 'sell';
        }
        const rawStatus = this.safeString2 (order, 'status', 'state');
        const timeInForce = this.safeString (order, 'force');
        const status = this.parseWsOrderStatus (rawStatus);
        const orderFee = this.safeValue (order, 'orderFee', []);
        const fee = this.safeValue (orderFee, 0);
        const feeAmount = this.safeString (fee, 'fee');
        let feeObject = undefined;
        if (feeAmount !== undefined) {
            const feeCurrency = this.safeString (fee, 'feeCcy');
            feeObject = {
                'cost': Precise.stringAbs (feeAmount),
                'currency': this.safeCurrencyCode (feeCurrency),
            };
        }
        const stopPrice = this.safeString (order, 'triggerPx');
        return this.safeOrder ({
            'info': order,
            'symbol': symbol,
            'id': id,
            'clientOrderId': clientOrderId,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'lastTradeTimestamp': undefined,
            'type': type,
            'timeInForce': timeInForce,
            'postOnly': undefined,
            'side': side,
            'price': price,
            'stopPrice': stopPrice,
            'triggerPrice': stopPrice,
            'amount': amount,
            'cost': cost,
            'average': average,
            'filled': filled,
            'remaining': undefined,
            'status': status,
            'fee': feeObject,
            'trades': undefined,
        }, market);
    }

    parseWsOrderStatus (status) {
        const statuses = {
            'new': 'open',
            'partial-fill': 'open',
            'full-fill': 'closed',
            'filled': 'closed',
            'cancelled': 'canceled',
            'not_trigger': 'open',
        };
        return this.safeString (statuses, status, status);
    }

    async watchMyTrades (symbol: Str = undefined, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        /**
         * @method
         * @name bitget#watchMyTrades
         * @description watches trades made by the user
         * @param {str} symbol unified market symbol
         * @param {int} [since] the earliest time in ms to fetch trades for
         * @param {int} [limit] the maximum number of trades structures to retrieve
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        // only contracts stream provides the trade info consistently in between order updates
        // the spot stream only provides on limit orders updates so we can't support it for spot
        await this.loadMarkets ();
        let market = undefined;
        let messageHash = 'myTrades';
        if (symbol !== undefined) {
            market = this.market (symbol);
            symbol = market['symbol'];
            messageHash = messageHash + ':' + symbol;
        }
        let type = undefined;
        [ type, params ] = this.handleMarketTypeAndParams ('watchMyTrades', market, params);
        if (type === 'spot') {
            throw new NotSupported (this.id + ' watchMyTrades is not supported for ' + type + ' markets.');
        }
        const sandboxMode = this.safeValue (this.options, 'sandboxMode', false);
        const subscriptionHash = 'order:trades';
        const args = {
            'instType': (!sandboxMode) ? 'umcbl' : 'sumcbl',
            'channel': 'orders',
            'instId': 'default',
        };
        const trades = await this.watchPrivate (messageHash, subscriptionHash, args, params);
        if (this.newUpdates) {
            limit = trades.getLimit (symbol, limit);
        }
        return this.filterBySymbolSinceLimit (trades, symbol, since, limit, true);
    }

    handleMyTrades (client: Client, message) {
        //
        // order and trade mixin (contract)
        //
        //   {
        //       "accFillSz": "0.1",
        //       "avgPx": "52.81",
        //       "cTime": 1656511777208,
        //       "clOrdId": "926043001195237376",
        //       "execType": "T",
        //       "fillFee": "-0.0031686",
        //       "fillFeeCcy": "USDT",
        //       "fillNotionalUsd": "5.281",
        //       "fillPx": "52.81",
        //       "fillSz": "0.1",
        //       "fillTime": "1656511777266",
        //       "force": "normal",
        //       "instId": "LTCUSDT_UMCBL",
        //       "lever": "1",
        //       "notionalUsd": "5.281",
        //       "ordId": "926043001132322816",
        //       "ordType": "market",
        //       "orderFee": [Array],
        //       "pnl": "0.004",
        //       "posSide": "long",
        //       "px": "0",
        //       "side": "sell",
        //       "status": "full-fill",
        //       "sz": "0.1",
        //       "tdMode": "cross",
        //       "tgtCcy": "USDT",
        //       "tradeId": "926043001438552105",
        //       "uTime": 1656511777266
        //   }
        //
        if (this.myTrades === undefined) {
            const limit = this.safeInteger (this.options, 'tradesLimit', 1000);
            this.myTrades = new ArrayCache (limit);
        }
        const stored = this.myTrades;
        const parsed = this.parseWsMyTrade (message);
        stored.append (parsed);
        const symbol = parsed['symbol'];
        const messageHash = 'myTrades';
        client.resolve (stored, messageHash);
        const symbolSpecificMessageHash = 'myTrades:' + symbol;
        client.resolve (stored, symbolSpecificMessageHash);
    }

    parseWsMyTrade (trade, market = undefined) {
        //
        // order and trade mixin (contract)
        //
        //   {
        //       "accFillSz": "0.1",
        //       "avgPx": "52.81",
        //       "cTime": 1656511777208,
        //       "clOrdId": "926043001195237376",
        //       "execType": "T",
        //       "fillFee": "-0.0031686",
        //       "fillFeeCcy": "USDT",
        //       "fillNotionalUsd": "5.281",
        //       "fillPx": "52.81",
        //       "fillSz": "0.1",
        //       "fillTime": "1656511777266",
        //       "force": "normal",
        //       "instId": "LTCUSDT_UMCBL",
        //       "lever": "1",
        //       "notionalUsd": "5.281",
        //       "ordId": "926043001132322816",
        //       "ordType": "market",
        //       "orderFee": [Array],
        //       "pnl": "0.004",
        //       "posSide": "long",
        //       "px": "0",
        //       "side": "sell",
        //       "status": "full-fill",
        //       "sz": "0.1",
        //       "tdMode": "cross",
        //       "tgtCcy": "USDT",
        //       "tradeId": "926043001438552105",
        //       "uTime": 1656511777266
        //   }
        //
        const id = this.safeString (trade, 'tradeId');
        const orderId = this.safeString (trade, 'ordId');
        const marketId = this.safeString (trade, 'instId');
        market = this.safeMarket (marketId, market);
        const timestamp = this.safeInteger (trade, 'fillTime');
        const side = this.safeString (trade, 'side');
        const price = this.safeString (trade, 'fillPx');
        const amount = this.safeString (trade, 'fillSz');
        const type = this.safeString (trade, 'ordType');
        const cost = this.safeString (trade, 'notional');
        const feeCurrency = this.safeString (trade, 'fillFeeCcy');
        const feeAmount = Precise.stringAbs (this.safeString (trade, 'fillFee'));
        const fee = {
            'code': this.safeCurrencyCode (feeCurrency),
            'cost': feeAmount,
        } as any;
        return this.safeTrade ({
            'info': trade,
            'id': id,
            'order': orderId,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': market['symbol'],
            'type': type,
            'side': side,
            'takerOrMaker': undefined,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': fee,
        }, market);
    }

    async watchBalance (params = {}) {
        /**
         * @method
         * @name bitget#watchBalance
         * @description watch balance and get the amount of funds available for trading or funds locked in orders
         * @param {object} [params] extra parameters specific to the exchange API endpoint
         * @param {str} [params.type] spot or contract if not provided this.options['defaultType'] is used
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
         */
        let type = undefined;
        [ type, params ] = this.handleMarketTypeAndParams ('watchOrders', undefined, params);
        const sandboxMode = this.safeValue (this.options, 'sandboxMode', false);
        let instType = 'spbl';
        if (type === 'swap') {
            instType = 'UMCBL';
            if (sandboxMode) {
                instType = 'S' + instType;
            }
        }
        const args = {
            'instType': instType,
            'channel': 'account',
            'instId': 'default',
        };
        const messageHash = 'balance:' + instType.toLowerCase ();
        return await this.watchPrivate (messageHash, messageHash, args, params);
    }

    handleBalance (client: Client, message) {
        // spot
        //
        //    {
        //        "action": "snapshot",
        //        "arg": { instType: 'spbl', channel: "account", instId: "default" },
        //        "data": [
        //          { coinId: '5', coinName: "LTC", available: "0.1060938000000000" },
        //          { coinId: '2', coinName: "USDT", available: "13.4498240000000000" }
        //        ]
        //    }
        //
        // swap
        //    {
        //      "action": "snapshot",
        //      "arg": {
        //        "instType": "umcbl",
        //        "channel": "account",
        //        "instId": "default"
        //      },
        //      "data": [
        //        {
        //          "marginCoin": "USDT",
        //          "locked": "0.00000000",
        //          "available": "3384.58046492",
        //          "maxOpenPosAvailable": "3384.58046492",
        //          "maxTransferOut": "3384.58046492",
        //          "equity": "3384.58046492",
        //          "usdtEquity": "3384.580464925690"
        //        }
        //      ]
        //    }
        //
        const data = this.safeValue (message, 'data', []);
        for (let i = 0; i < data.length; i++) {
            const rawBalance = data[i];
            const currencyId = this.safeString2 (rawBalance, 'coinName', 'marginCoin');
            const code = this.safeCurrencyCode (currencyId);
            const account = (code in this.balance) ? this.balance[code] : this.account ();
            account['free'] = this.safeString (rawBalance, 'available');
            account['total'] = this.safeString (rawBalance, 'equity');
            account['used'] = this.safeString (rawBalance, 'frozen');
            this.balance[code] = account;
        }
        this.balance = this.safeBalance (this.balance);
        const arg = this.safeValue (message, 'arg');
        const instType = this.safeStringLower (arg, 'instType');
        const messageHash = 'balance:' + instType;
        client.resolve (this.balance, messageHash);
    }

    async watchPublic (messageHash, args, params = {}) {
        const url = this.urls['api']['ws'];
        const request = {
            'op': 'subscribe',
            'args': [ args ],
        };
        const message = this.extend (request, params);
        return await this.watch (url, messageHash, message, messageHash);
    }

    async watchPublicMultiple (messageHash, argsArray, params = {}) {
        const url = this.urls['api']['ws'];
        const request = {
            'op': 'subscribe',
            'args': argsArray,
        };
        const message = this.extend (request, params);
        return await this.watch (url, messageHash, message, messageHash);
    }

    async authenticate (params = {}) {
        this.checkRequiredCredentials ();
        const url = this.urls['api']['ws'];
        const client = this.client (url);
        const messageHash = 'authenticated';
        const future = client.future (messageHash);
        const authenticated = this.safeValue (client.subscriptions, messageHash);
        if (authenticated === undefined) {
            const timestamp = this.seconds ().toString ();
            const auth = timestamp + 'GET' + '/user/verify';
            const signature = this.hmac (this.encode (auth), this.encode (this.secret), sha256, 'base64');
            const operation = 'login';
            const request = {
                'op': operation,
                'args': [
                    {
                        'apiKey': this.apiKey,
                        'passphrase': this.password,
                        'timestamp': timestamp,
                        'sign': signature,
                    },
                ],
            };
            const message = this.extend (request, params);
            this.watch (url, messageHash, message, messageHash);
        }
        return future;
    }

    async watchPrivate (messageHash, subscriptionHash, args, params = {}) {
        await this.authenticate ();
        const url = this.urls['api']['ws'];
        const request = {
            'op': 'subscribe',
            'args': [ args ],
        };
        const message = this.extend (request, params);
        return await this.watch (url, messageHash, message, subscriptionHash);
    }

    handleAuthenticate (client: Client, message) {
        //
        //  { event: "login", code: 0 }
        //
        const messageHash = 'authenticated';
        const future = this.safeValue (client.futures, messageHash);
        future.resolve (true);
    }

    handleErrorMessage (client: Client, message) {
        //
        //    { event: "error", code: 30015, msg: "Invalid sign" }
        //
        const event = this.safeString (message, 'event');
        try {
            if (event === 'error') {
                const code = this.safeString (message, 'code');
                const feedback = this.id + ' ' + this.json (message);
                this.throwExactlyMatchedException (this.exceptions['ws']['exact'], code, feedback);
                const msg = this.safeString (message, 'msg', '');
                this.throwBroadlyMatchedException (this.exceptions['ws']['broad'], msg, feedback);
                throw new ExchangeError (feedback);
            }
            return false;
        } catch (e) {
            if (e instanceof AuthenticationError) {
                const messageHash = 'authenticated';
                client.reject (e, messageHash);
                if (messageHash in client.subscriptions) {
                    delete client.subscriptions[messageHash];
                }
            } else {
                // Note: if error happens on a subscribe event, user will have to close exchange to resubscribe. Issue #19041
                client.reject (e);
            }
            return true;
        }
    }

    handleMessage (client: Client, message) {
        //
        //   {
        //       "action": "snapshot",
        //       "arg": { instType: 'sp', channel: "ticker", instId: "BTCUSDT" },
        //       "data": [
        //         {
        //           "instId": "BTCUSDT",
        //           "last": "21150.53",
        //           "open24h": "20759.65",
        //           "high24h": "21202.29",
        //           "low24h": "20518.82",
        //           "bestBid": "21150.500000",
        //           "bestAsk": "21150.600000",
        //           "baseVolume": "25402.1961",
        //           "quoteVolume": "530452554.2156",
        //           "ts": 1656408934044,
        //           "labeId": 0
        //         }
        //       ]
        //   }
        // pong message
        //    "pong"
        //
        // login
        //
        //     { event: "login", code: 0 }
        //
        // subscribe
        //
        //    {
        //        "event": "subscribe",
        //        "arg": { instType: 'spbl', channel: "account", instId: "default" }
        //    }
        //
        if (this.handleErrorMessage (client, message)) {
            return;
        }
        const content = this.safeString (message, 'message');
        if (content === 'pong') {
            this.handlePong (client, message);
            return;
        }
        if (message === 'pong') {
            this.handlePong (client, message);
            return;
        }
        const event = this.safeString (message, 'event');
        if (event === 'login') {
            this.handleAuthenticate (client, message);
            return;
        }
        if (event === 'subscribe') {
            this.handleSubscriptionStatus (client, message);
            return;
        }
        const methods = {
            'ticker': this.handleTicker,
            'trade': this.handleTrades,
            'orders': this.handleOrder,
            'ordersAlgo': this.handleOrder,
            'account': this.handleBalance,
            'positions': this.handlePositions,
        };
        const arg = this.safeValue (message, 'arg', {});
        const topic = this.safeValue (arg, 'channel', '');
        const method = this.safeValue (methods, topic);
        if (method !== undefined) {
            method.call (this, client, message);
        }
        if (topic.indexOf ('candle') >= 0) {
            this.handleOHLCV (client, message);
        }
        if (topic.indexOf ('books') >= 0) {
            this.handleOrderBook (client, message);
        }
    }

    ping (client) {
        return 'ping';
    }

    handlePong (client: Client, message) {
        client.lastPong = this.milliseconds ();
        return message;
    }

    handleSubscriptionStatus (client: Client, message) {
        //
        //    {
        //        "event": "subscribe",
        //        "arg": { instType: 'spbl', channel: "account", instId: "default" }
        //    }
        //
        return message;
    }
}
