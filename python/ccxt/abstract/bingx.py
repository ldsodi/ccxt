from ccxt.base.types import Entry


class ImplicitAPI:
    spot_v1_public_get_common_symbols = spotV1PublicGetCommonSymbols = Entry('common/symbols', ['spot', 'v1', 'public'], 'GET', {'cost': 3})
    spot_v1_public_get_market_trades = spotV1PublicGetMarketTrades = Entry('market/trades', ['spot', 'v1', 'public'], 'GET', {'cost': 3})
    spot_v1_public_get_market_depth = spotV1PublicGetMarketDepth = Entry('market/depth', ['spot', 'v1', 'public'], 'GET', {'cost': 3})
    spot_v1_public_get_market_kline = spotV1PublicGetMarketKline = Entry('market/kline', ['spot', 'v1', 'public'], 'GET', {'cost': 3})
    spot_v1_public_get_ticker_24hr = spotV1PublicGetTicker24hr = Entry('ticker/24hr', ['spot', 'v1', 'public'], 'GET', {'cost': 1})
    spot_v1_private_get_trade_query = spotV1PrivateGetTradeQuery = Entry('trade/query', ['spot', 'v1', 'private'], 'GET', {'cost': 3})
    spot_v1_private_get_trade_openorders = spotV1PrivateGetTradeOpenOrders = Entry('trade/openOrders', ['spot', 'v1', 'private'], 'GET', {'cost': 3})
    spot_v1_private_get_trade_historyorders = spotV1PrivateGetTradeHistoryOrders = Entry('trade/historyOrders', ['spot', 'v1', 'private'], 'GET', {'cost': 3})
    spot_v1_private_get_account_balance = spotV1PrivateGetAccountBalance = Entry('account/balance', ['spot', 'v1', 'private'], 'GET', {'cost': 3})
    spot_v1_private_post_trade_order = spotV1PrivatePostTradeOrder = Entry('trade/order', ['spot', 'v1', 'private'], 'POST', {'cost': 3})
    spot_v1_private_post_trade_cancel = spotV1PrivatePostTradeCancel = Entry('trade/cancel', ['spot', 'v1', 'private'], 'POST', {'cost': 3})
    spot_v1_private_post_trade_batchorders = spotV1PrivatePostTradeBatchOrders = Entry('trade/batchOrders', ['spot', 'v1', 'private'], 'POST', {'cost': 3})
    spot_v1_private_post_trade_cancelorders = spotV1PrivatePostTradeCancelOrders = Entry('trade/cancelOrders', ['spot', 'v1', 'private'], 'POST', {'cost': 3})
    spot_v3_private_get_get_asset_transfer = spotV3PrivateGetGetAssetTransfer = Entry('get/asset/transfer', ['spot', 'v3', 'private'], 'GET', {'cost': 3})
    spot_v3_private_get_asset_transfer = spotV3PrivateGetAssetTransfer = Entry('asset/transfer', ['spot', 'v3', 'private'], 'GET', {'cost': 3})
    spot_v3_private_get_capital_deposit_hisrec = spotV3PrivateGetCapitalDepositHisrec = Entry('capital/deposit/hisrec', ['spot', 'v3', 'private'], 'GET', {'cost': 3})
    spot_v3_private_get_capital_withdraw_history = spotV3PrivateGetCapitalWithdrawHistory = Entry('capital/withdraw/history', ['spot', 'v3', 'private'], 'GET', {'cost': 3})
    spot_v3_private_post_post_asset_transfer = spotV3PrivatePostPostAssetTransfer = Entry('post/asset/transfer', ['spot', 'v3', 'private'], 'POST', {'cost': 3})
    swap_v2_public_get_server_time = swapV2PublicGetServerTime = Entry('server/time', ['swap', 'v2', 'public'], 'GET', {'cost': 3})
    swap_v2_public_get_quote_contracts = swapV2PublicGetQuoteContracts = Entry('quote/contracts', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_price = swapV2PublicGetQuotePrice = Entry('quote/price', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_depth = swapV2PublicGetQuoteDepth = Entry('quote/depth', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_trades = swapV2PublicGetQuoteTrades = Entry('quote/trades', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_premiumindex = swapV2PublicGetQuotePremiumIndex = Entry('quote/premiumIndex', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_fundingrate = swapV2PublicGetQuoteFundingRate = Entry('quote/fundingRate', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_klines = swapV2PublicGetQuoteKlines = Entry('quote/klines', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_openinterest = swapV2PublicGetQuoteOpenInterest = Entry('quote/openInterest', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_ticker = swapV2PublicGetQuoteTicker = Entry('quote/ticker', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_public_get_quote_bookticker = swapV2PublicGetQuoteBookTicker = Entry('quote/bookTicker', ['swap', 'v2', 'public'], 'GET', {'cost': 1})
    swap_v2_private_get_user_balance = swapV2PrivateGetUserBalance = Entry('user/balance', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_user_positions = swapV2PrivateGetUserPositions = Entry('user/positions', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_user_income = swapV2PrivateGetUserIncome = Entry('user/income', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_trade_openorders = swapV2PrivateGetTradeOpenOrders = Entry('trade/openOrders', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_trade_order = swapV2PrivateGetTradeOrder = Entry('trade/order', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_trade_margintype = swapV2PrivateGetTradeMarginType = Entry('trade/marginType', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_trade_leverage = swapV2PrivateGetTradeLeverage = Entry('trade/leverage', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_trade_forceorders = swapV2PrivateGetTradeForceOrders = Entry('trade/forceOrders', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_trade_allorders = swapV2PrivateGetTradeAllOrders = Entry('trade/allOrders', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_trade_allfillorders = swapV2PrivateGetTradeAllFillOrders = Entry('trade/allFillOrders', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_user_income_export = swapV2PrivateGetUserIncomeExport = Entry('user/income/export', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_user_commissionrate = swapV2PrivateGetUserCommissionRate = Entry('user/commissionRate', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_get_quote_bookticker = swapV2PrivateGetQuoteBookTicker = Entry('quote/bookTicker', ['swap', 'v2', 'private'], 'GET', {'cost': 3})
    swap_v2_private_post_trade_order = swapV2PrivatePostTradeOrder = Entry('trade/order', ['swap', 'v2', 'private'], 'POST', {'cost': 3})
    swap_v2_private_post_trade_batchorders = swapV2PrivatePostTradeBatchOrders = Entry('trade/batchOrders', ['swap', 'v2', 'private'], 'POST', {'cost': 3})
    swap_v2_private_post_trade_closeallpositions = swapV2PrivatePostTradeCloseAllPositions = Entry('trade/closeAllPositions', ['swap', 'v2', 'private'], 'POST', {'cost': 3})
    swap_v2_private_post_trade_margintype = swapV2PrivatePostTradeMarginType = Entry('trade/marginType', ['swap', 'v2', 'private'], 'POST', {'cost': 3})
    swap_v2_private_post_trade_leverage = swapV2PrivatePostTradeLeverage = Entry('trade/leverage', ['swap', 'v2', 'private'], 'POST', {'cost': 3})
    swap_v2_private_post_trade_positionmargin = swapV2PrivatePostTradePositionMargin = Entry('trade/positionMargin', ['swap', 'v2', 'private'], 'POST', {'cost': 3})
    swap_v2_private_post_trade_order_test = swapV2PrivatePostTradeOrderTest = Entry('trade/order/test', ['swap', 'v2', 'private'], 'POST', {'cost': 3})
    swap_v2_private_delete_trade_order = swapV2PrivateDeleteTradeOrder = Entry('trade/order', ['swap', 'v2', 'private'], 'DELETE', {'cost': 3})
    swap_v2_private_delete_trade_batchorders = swapV2PrivateDeleteTradeBatchOrders = Entry('trade/batchOrders', ['swap', 'v2', 'private'], 'DELETE', {'cost': 3})
    swap_v2_private_delete_trade_allopenorders = swapV2PrivateDeleteTradeAllOpenOrders = Entry('trade/allOpenOrders', ['swap', 'v2', 'private'], 'DELETE', {'cost': 3})
    swap_v3_public_get_quote_klines = swapV3PublicGetQuoteKlines = Entry('quote/klines', ['swap', 'v3', 'public'], 'GET', {'cost': 1})
    contract_v1_private_get_allposition = contractV1PrivateGetAllPosition = Entry('allPosition', ['contract', 'v1', 'private'], 'GET', {'cost': 3})
    contract_v1_private_get_allorders = contractV1PrivateGetAllOrders = Entry('allOrders', ['contract', 'v1', 'private'], 'GET', {'cost': 3})
    contract_v1_private_get_balance = contractV1PrivateGetBalance = Entry('balance', ['contract', 'v1', 'private'], 'GET', {'cost': 3})
    wallets_v1_private_get_capital_config_getall = walletsV1PrivateGetCapitalConfigGetall = Entry('capital/config/getall', ['wallets', 'v1', 'private'], 'GET', {'cost': 3})
    wallets_v1_private_get_capital_deposit_address = walletsV1PrivateGetCapitalDepositAddress = Entry('capital/deposit/address', ['wallets', 'v1', 'private'], 'GET', {'cost': 1})
    wallets_v1_private_get_capital_innertransfer_records = walletsV1PrivateGetCapitalInnerTransferRecords = Entry('capital/innerTransfer/records', ['wallets', 'v1', 'private'], 'GET', {'cost': 1})
    wallets_v1_private_get_capital_subaccount_deposit_address = walletsV1PrivateGetCapitalSubAccountDepositAddress = Entry('capital/subAccount/deposit/address', ['wallets', 'v1', 'private'], 'GET', {'cost': 1})
    wallets_v1_private_get_capital_deposit_subhisrec = walletsV1PrivateGetCapitalDepositSubHisrec = Entry('capital/deposit/subHisrec', ['wallets', 'v1', 'private'], 'GET', {'cost': 1})
    wallets_v1_private_get_capital_subaccount_innertransfer_records = walletsV1PrivateGetCapitalSubAccountInnerTransferRecords = Entry('capital/subAccount/innerTransfer/records', ['wallets', 'v1', 'private'], 'GET', {'cost': 1})
    wallets_v1_private_post_capital_withdraw_apply = walletsV1PrivatePostCapitalWithdrawApply = Entry('capital/withdraw/apply', ['wallets', 'v1', 'private'], 'POST', {'cost': 3})
    wallets_v1_private_post_capital_innertransfer_apply = walletsV1PrivatePostCapitalInnerTransferApply = Entry('capital/innerTransfer/apply', ['wallets', 'v1', 'private'], 'POST', {'cost': 3})
    wallets_v1_private_post_capital_subaccountinnertransfer_apply = walletsV1PrivatePostCapitalSubAccountInnerTransferApply = Entry('capital/subAccountInnerTransfer/apply', ['wallets', 'v1', 'private'], 'POST', {'cost': 3})
    wallets_v1_private_post_capital_deposit_createsubaddress = walletsV1PrivatePostCapitalDepositCreateSubAddress = Entry('capital/deposit/createSubAddress', ['wallets', 'v1', 'private'], 'POST', {'cost': 1})
    subaccount_v1_private_get_list = subAccountV1PrivateGetList = Entry('list', ['subAccount', 'v1', 'private'], 'GET', {'cost': 3})
    subaccount_v1_private_get_assets = subAccountV1PrivateGetAssets = Entry('assets', ['subAccount', 'v1', 'private'], 'GET', {'cost': 3})
    subaccount_v1_private_get_apikey_query = subAccountV1PrivateGetApiKeyQuery = Entry('apiKey/query', ['subAccount', 'v1', 'private'], 'GET', {'cost': 1})
    subaccount_v1_private_post_create = subAccountV1PrivatePostCreate = Entry('create', ['subAccount', 'v1', 'private'], 'POST', {'cost': 3})
    subaccount_v1_private_post_apikey_create = subAccountV1PrivatePostApiKeyCreate = Entry('apiKey/create', ['subAccount', 'v1', 'private'], 'POST', {'cost': 3})
    subaccount_v1_private_post_apikey_edit = subAccountV1PrivatePostApiKeyEdit = Entry('apiKey/edit', ['subAccount', 'v1', 'private'], 'POST', {'cost': 3})
    subaccount_v1_private_post_apikey_del = subAccountV1PrivatePostApiKeyDel = Entry('apiKey/del', ['subAccount', 'v1', 'private'], 'POST', {'cost': 3})
    subaccount_v1_private_post_updatestatus = subAccountV1PrivatePostUpdateStatus = Entry('updateStatus', ['subAccount', 'v1', 'private'], 'POST', {'cost': 3})
    account_v1_private_get_uid = accountV1PrivateGetUid = Entry('uid', ['account', 'v1', 'private'], 'GET', {'cost': 1})
    account_v1_private_post_innertransfer_authorizesubaccount = accountV1PrivatePostInnerTransferAuthorizeSubAccount = Entry('innerTransfer/authorizeSubAccount', ['account', 'v1', 'private'], 'POST', {'cost': 3})
    user_auth_private_post_userdatastream = userAuthPrivatePostUserDataStream = Entry('userDataStream', ['user', 'auth', 'private'], 'POST', {'cost': 1})
    copytrading_v1_private_get_swap_trace_currenttrack = copyTradingV1PrivateGetSwapTraceCurrentTrack = Entry('swap/trace/currentTrack', ['copyTrading', 'v1', 'private'], 'GET', {'cost': 1})
    copytrading_v1_private_post_swap_trace_closetrackorder = copyTradingV1PrivatePostSwapTraceCloseTrackOrder = Entry('swap/trace/closeTrackOrder', ['copyTrading', 'v1', 'private'], 'POST', {'cost': 1})
    copytrading_v1_private_post_swap_trace_settpsl = copyTradingV1PrivatePostSwapTraceSetTPSL = Entry('swap/trace/setTPSL', ['copyTrading', 'v1', 'private'], 'POST', {'cost': 1})
    api_v3_private_get_asset_transfer = apiV3PrivateGetAssetTransfer = Entry('asset/transfer', ['api', 'v3', 'private'], 'GET', {'cost': 1})
    api_v3_private_get_capital_deposit_hisrec = apiV3PrivateGetCapitalDepositHisrec = Entry('capital/deposit/hisrec', ['api', 'v3', 'private'], 'GET', {'cost': 1})
    api_v3_private_get_capital_withdraw_history = apiV3PrivateGetCapitalWithdrawHistory = Entry('capital/withdraw/history', ['api', 'v3', 'private'], 'GET', {'cost': 1})
    api_v3_private_post_post_asset_transfer = apiV3PrivatePostPostAssetTransfer = Entry('post/asset/transfer', ['api', 'v3', 'private'], 'POST', {'cost': 1})
