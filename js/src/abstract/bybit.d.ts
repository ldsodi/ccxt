import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';
interface Exchange {
    publicGetSpotV3PublicSymbols(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicQuoteDepth(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicQuoteDepthMerged(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicQuoteTrades(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicQuoteKline(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicQuoteTicker24hr(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicQuoteTickerPrice(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicQuoteTickerBookTicker(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicServerTime(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicInfos(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicMarginProductInfos(params?: {}): Promise<implicitReturnType>;
    publicGetSpotV3PublicMarginEnsureTokens(params?: {}): Promise<implicitReturnType>;
    publicGetV3PublicTime(params?: {}): Promise<implicitReturnType>;
    publicGetContractV3PublicCopytradingSymbolList(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicOrderBookL2(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicKline(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicTickers(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicInstrumentsInfo(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicMarkPriceKline(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicIndexPriceKline(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicFundingHistoryFundingRate(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicRiskLimitList(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicDeliveryPrice(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicRecentTrade(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicOpenInterest(params?: {}): Promise<implicitReturnType>;
    publicGetDerivativesV3PublicInsurance(params?: {}): Promise<implicitReturnType>;
    publicGetV5AnnouncementsIndex(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketTime(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketKline(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketMarkPriceKline(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketIndexPriceKline(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketPremiumIndexPriceKline(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketInstrumentsInfo(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketOrderbook(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketTickers(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketFundingHistory(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketRecentTrade(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketOpenInterest(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketHistoricalVolatility(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketInsurance(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketRiskLimit(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketDeliveryPrice(params?: {}): Promise<implicitReturnType>;
    publicGetV5MarketAccountRatio(params?: {}): Promise<implicitReturnType>;
    publicGetV5SpotLeverTokenInfo(params?: {}): Promise<implicitReturnType>;
    publicGetV5SpotLeverTokenReference(params?: {}): Promise<implicitReturnType>;
    publicGetV5SpotMarginTradeData(params?: {}): Promise<implicitReturnType>;
    publicGetV5SpotCrossMarginTradeData(params?: {}): Promise<implicitReturnType>;
    publicGetV5SpotCrossMarginTradePledgeToken(params?: {}): Promise<implicitReturnType>;
    publicGetV5SpotCrossMarginTradeBorrowToken(params?: {}): Promise<implicitReturnType>;
    publicGetV5InsLoanProductInfos(params?: {}): Promise<implicitReturnType>;
    publicGetV5InsLoanEnsureTokensConvert(params?: {}): Promise<implicitReturnType>;
    privateGetV2PrivateWalletFundRecords(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateOrder(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateOpenOrders(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateHistoryOrders(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateMyTrades(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateAccount(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateReference(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateRecord(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateCrossMarginOrders(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateCrossMarginAccount(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateCrossMarginLoanInfo(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateCrossMarginRepayHistory(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateMarginLoanInfos(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateMarginRepaidInfos(params?: {}): Promise<implicitReturnType>;
    privateGetSpotV3PrivateMarginLtv(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateTransferInterTransferListQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateTransferSubMemberListQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateTransferSubMemberTransferListQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateTransferUniversalTransferListQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateCoinInfoQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateDepositAddressQuery(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateCopytradingOrderList(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateCopytradingPositionList(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateCopytradingWalletBalance(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivatePositionLimitInfo(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateOrderUnfilledOrders(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateOrderList(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivatePositionList(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateExecutionList(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivatePositionClosedPnl(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateAccountWalletBalance(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateAccountFeeRate(params?: {}): Promise<implicitReturnType>;
    privateGetContractV3PrivateAccountWalletFundRecords(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateOrderUnfilledOrders(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateOrderList(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivatePositionList(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateExecutionList(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateDeliveryRecord(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateSettlementRecord(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateAccountWalletBalance(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateAccountTransactionLog(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateAccountBorrowHistory(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateAccountBorrowRate(params?: {}): Promise<implicitReturnType>;
    privateGetUnifiedV3PrivateAccountInfo(params?: {}): Promise<implicitReturnType>;
    privateGetUserV3PrivateFrozenSubMember(params?: {}): Promise<implicitReturnType>;
    privateGetUserV3PrivateQuerySubMembers(params?: {}): Promise<implicitReturnType>;
    privateGetUserV3PrivateQueryApi(params?: {}): Promise<implicitReturnType>;
    privateGetUserV3PrivateGetMemberType(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateTransferTransferCoinListQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateTransferAccountCoinBalanceQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateTransferAccountCoinsBalanceQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateTransferAssetInfoQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PublicDepositAllowedDepositListQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateDepositRecordQuery(params?: {}): Promise<implicitReturnType>;
    privateGetAssetV3PrivateWithdrawRecordQuery(params?: {}): Promise<implicitReturnType>;
    privateGetV5OrderRealtime(params?: {}): Promise<implicitReturnType>;
    privateGetV5OrderHistory(params?: {}): Promise<implicitReturnType>;
    privateGetV5OrderSpotBorrowCheck(params?: {}): Promise<implicitReturnType>;
    privateGetV5PositionList(params?: {}): Promise<implicitReturnType>;
    privateGetV5ExecutionList(params?: {}): Promise<implicitReturnType>;
    privateGetV5PositionClosedPnl(params?: {}): Promise<implicitReturnType>;
    privateGetV5PositionMoveHistory(params?: {}): Promise<implicitReturnType>;
    privateGetV5PreUpgradeOrderHistory(params?: {}): Promise<implicitReturnType>;
    privateGetV5PreUpgradeExecutionList(params?: {}): Promise<implicitReturnType>;
    privateGetV5PreUpgradePositionClosedPnl(params?: {}): Promise<implicitReturnType>;
    privateGetV5PreUpgradeAccountTransactionLog(params?: {}): Promise<implicitReturnType>;
    privateGetV5PreUpgradeAssetDeliveryRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5PreUpgradeAssetSettlementRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountWalletBalance(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountBorrowHistory(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountCollateralInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetCoinGreeks(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountFeeRate(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountTransactionLog(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountContractTransactionLog(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountSmpGroup(params?: {}): Promise<implicitReturnType>;
    privateGetV5AccountMmpState(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetExchangeOrderRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetDeliveryRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetSettlementRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetTransferQueryAssetInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetTransferQueryAccountCoinsBalance(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetTransferQueryAccountCoinBalance(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetTransferQueryTransferCoinList(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetTransferQueryInterTransferList(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetTransferQuerySubMemberList(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetTransferQueryUniversalTransferList(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetDepositQueryAllowedList(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetDepositQueryRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetDepositQuerySubMemberRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetDepositQueryInternalRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetDepositQueryAddress(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetDepositQuerySubMemberAddress(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetCoinQueryInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetWithdrawQueryRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5AssetWithdrawWithdrawableAmount(params?: {}): Promise<implicitReturnType>;
    privateGetV5UserQuerySubMembers(params?: {}): Promise<implicitReturnType>;
    privateGetV5UserQueryApi(params?: {}): Promise<implicitReturnType>;
    privateGetV5UserSubApikeys(params?: {}): Promise<implicitReturnType>;
    privateGetV5UserGetMemberType(params?: {}): Promise<implicitReturnType>;
    privateGetV5UserAffCustomerInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5UserDelSubmember(params?: {}): Promise<implicitReturnType>;
    privateGetV5UserSubmembers(params?: {}): Promise<implicitReturnType>;
    privateGetV5SpotLeverTokenOrderRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5SpotMarginTradeState(params?: {}): Promise<implicitReturnType>;
    privateGetV5SpotCrossMarginTradeLoanInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5SpotCrossMarginTradeAccount(params?: {}): Promise<implicitReturnType>;
    privateGetV5SpotCrossMarginTradeOrders(params?: {}): Promise<implicitReturnType>;
    privateGetV5SpotCrossMarginTradeRepayHistory(params?: {}): Promise<implicitReturnType>;
    privateGetV5InsLoanProductInfos(params?: {}): Promise<implicitReturnType>;
    privateGetV5InsLoanEnsureTokensConvert(params?: {}): Promise<implicitReturnType>;
    privateGetV5InsLoanLoanOrder(params?: {}): Promise<implicitReturnType>;
    privateGetV5InsLoanRepaidHistory(params?: {}): Promise<implicitReturnType>;
    privateGetV5InsLoanLtvConvert(params?: {}): Promise<implicitReturnType>;
    privateGetV5LendingInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5LendingHistoryOrder(params?: {}): Promise<implicitReturnType>;
    privateGetV5LendingAccount(params?: {}): Promise<implicitReturnType>;
    privateGetV5BrokerEarningRecord(params?: {}): Promise<implicitReturnType>;
    privateGetV5BrokerEarningsInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5BrokerAccountInfo(params?: {}): Promise<implicitReturnType>;
    privateGetV5BrokerAssetQuerySubMemberDepositRecord(params?: {}): Promise<implicitReturnType>;
    privatePostOptionUsdcOpenapiPrivateV1PlaceOrder(params?: {}): Promise<implicitReturnType>;
    privatePostOptionUsdcOpenapiPrivateV1ReplaceOrder(params?: {}): Promise<implicitReturnType>;
    privatePostOptionUsdcOpenapiPrivateV1CancelOrder(params?: {}): Promise<implicitReturnType>;
    privatePostOptionUsdcOpenapiPrivateV1CancelAll(params?: {}): Promise<implicitReturnType>;
    privatePostOptionUsdcOpenapiPrivateV1QueryActiveOrders(params?: {}): Promise<implicitReturnType>;
    privatePostOptionUsdcOpenapiPrivateV1QueryOrderHistory(params?: {}): Promise<implicitReturnType>;
    privatePostOptionUsdcOpenapiPrivateV1ExecutionList(params?: {}): Promise<implicitReturnType>;
    privatePostOptionUsdcOpenapiPrivateV1QueryPosition(params?: {}): Promise<implicitReturnType>;
    privatePostPerpetualUsdcOpenapiPrivateV1PlaceOrder(params?: {}): Promise<implicitReturnType>;
    privatePostPerpetualUsdcOpenapiPrivateV1ReplaceOrder(params?: {}): Promise<implicitReturnType>;
    privatePostPerpetualUsdcOpenapiPrivateV1CancelOrder(params?: {}): Promise<implicitReturnType>;
    privatePostPerpetualUsdcOpenapiPrivateV1CancelAll(params?: {}): Promise<implicitReturnType>;
    privatePostPerpetualUsdcOpenapiPrivateV1PositionLeverageSave(params?: {}): Promise<implicitReturnType>;
    privatePostSpotV3PrivateOrder(params?: {}): Promise<implicitReturnType>;
    privatePostSpotV3PrivateCancelOrder(params?: {}): Promise<implicitReturnType>;
    privatePostSpotV3PrivateCancelOrders(params?: {}): Promise<implicitReturnType>;
    privatePostSpotV3PrivateCancelOrdersByIds(params?: {}): Promise<implicitReturnType>;
    privatePostSpotV3PrivatePurchase(params?: {}): Promise<implicitReturnType>;
    privatePostSpotV3PrivateRedeem(params?: {}): Promise<implicitReturnType>;
    privatePostSpotV3PrivateCrossMarginLoan(params?: {}): Promise<implicitReturnType>;
    privatePostSpotV3PrivateCrossMarginRepay(params?: {}): Promise<implicitReturnType>;
    privatePostAssetV3PrivateTransferInterTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostAssetV3PrivateWithdrawCreate(params?: {}): Promise<implicitReturnType>;
    privatePostAssetV3PrivateWithdrawCancel(params?: {}): Promise<implicitReturnType>;
    privatePostAssetV3PrivateTransferSubMemberTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostAssetV3PrivateTransferTransferSubMemberSave(params?: {}): Promise<implicitReturnType>;
    privatePostAssetV3PrivateTransferUniversalTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostUserV3PrivateCreateSubMember(params?: {}): Promise<implicitReturnType>;
    privatePostUserV3PrivateCreateSubApi(params?: {}): Promise<implicitReturnType>;
    privatePostUserV3PrivateUpdateApi(params?: {}): Promise<implicitReturnType>;
    privatePostUserV3PrivateDeleteApi(params?: {}): Promise<implicitReturnType>;
    privatePostUserV3PrivateUpdateSubApi(params?: {}): Promise<implicitReturnType>;
    privatePostUserV3PrivateDeleteSubApi(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateCopytradingOrderCreate(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateCopytradingOrderCancel(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateCopytradingOrderClose(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateCopytradingPositionClose(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateCopytradingPositionSetLeverage(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateCopytradingWalletTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateCopytradingOrderTradingStop(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateOrderCreate(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateOrderCancel(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateOrderCancelAll(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateOrderReplace(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivatePositionSetAutoAddMargin(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivatePositionSwitchIsolated(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivatePositionSwitchMode(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivatePositionSwitchTpslMode(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivatePositionSetLeverage(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivatePositionTradingStop(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivatePositionSetRiskLimit(params?: {}): Promise<implicitReturnType>;
    privatePostContractV3PrivateAccountSetMarginMode(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateOrderCreate(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateOrderReplace(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateOrderCancel(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateOrderCreateBatch(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateOrderReplaceBatch(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateOrderCancelBatch(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateOrderCancelAll(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivatePositionSetLeverage(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivatePositionTpslSwitchMode(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivatePositionSetRiskLimit(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivatePositionTradingStop(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateAccountUpgradeUnifiedAccount(params?: {}): Promise<implicitReturnType>;
    privatePostUnifiedV3PrivateAccountSetMarginMode(params?: {}): Promise<implicitReturnType>;
    privatePostFhtComplianceTaxV3PrivateRegistertime(params?: {}): Promise<implicitReturnType>;
    privatePostFhtComplianceTaxV3PrivateCreate(params?: {}): Promise<implicitReturnType>;
    privatePostFhtComplianceTaxV3PrivateStatus(params?: {}): Promise<implicitReturnType>;
    privatePostFhtComplianceTaxV3PrivateUrl(params?: {}): Promise<implicitReturnType>;
    privatePostV5OrderCreate(params?: {}): Promise<implicitReturnType>;
    privatePostV5OrderAmend(params?: {}): Promise<implicitReturnType>;
    privatePostV5OrderCancel(params?: {}): Promise<implicitReturnType>;
    privatePostV5OrderCancelAll(params?: {}): Promise<implicitReturnType>;
    privatePostV5OrderCreateBatch(params?: {}): Promise<implicitReturnType>;
    privatePostV5OrderAmendBatch(params?: {}): Promise<implicitReturnType>;
    privatePostV5OrderCancelBatch(params?: {}): Promise<implicitReturnType>;
    privatePostV5OrderDisconnectedCancelAll(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionSetLeverage(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionSwitchIsolated(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionSetTpslMode(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionSwitchMode(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionSetRiskLimit(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionTradingStop(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionSetAutoAddMargin(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionAddMargin(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionMovePositions(params?: {}): Promise<implicitReturnType>;
    privatePostV5PositionConfirmPendingMmr(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountUpgradeToUta(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountQuickRepayment(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountSetMarginMode(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountSetHedgingMode(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountMmpModify(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountMmpReset(params?: {}): Promise<implicitReturnType>;
    privatePostV5AssetTransferInterTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostV5AssetTransferSaveTransferSubMember(params?: {}): Promise<implicitReturnType>;
    privatePostV5AssetTransferUniversalTransfer(params?: {}): Promise<implicitReturnType>;
    privatePostV5AssetDepositDepositToAccount(params?: {}): Promise<implicitReturnType>;
    privatePostV5AssetWithdrawCreate(params?: {}): Promise<implicitReturnType>;
    privatePostV5AssetWithdrawCancel(params?: {}): Promise<implicitReturnType>;
    privatePostV5UserCreateSubMember(params?: {}): Promise<implicitReturnType>;
    privatePostV5UserCreateSubApi(params?: {}): Promise<implicitReturnType>;
    privatePostV5UserFrozenSubMember(params?: {}): Promise<implicitReturnType>;
    privatePostV5UserUpdateApi(params?: {}): Promise<implicitReturnType>;
    privatePostV5UserUpdateSubApi(params?: {}): Promise<implicitReturnType>;
    privatePostV5UserDeleteApi(params?: {}): Promise<implicitReturnType>;
    privatePostV5UserDeleteSubApi(params?: {}): Promise<implicitReturnType>;
    privatePostV5SpotLeverTokenPurchase(params?: {}): Promise<implicitReturnType>;
    privatePostV5SpotLeverTokenRedeem(params?: {}): Promise<implicitReturnType>;
    privatePostV5SpotMarginTradeSwitchMode(params?: {}): Promise<implicitReturnType>;
    privatePostV5SpotMarginTradeSetLeverage(params?: {}): Promise<implicitReturnType>;
    privatePostV5SpotCrossMarginTradeLoan(params?: {}): Promise<implicitReturnType>;
    privatePostV5SpotCrossMarginTradeRepay(params?: {}): Promise<implicitReturnType>;
    privatePostV5SpotCrossMarginTradeSwitch(params?: {}): Promise<implicitReturnType>;
    privatePostV5InsLoanAssociationUid(params?: {}): Promise<implicitReturnType>;
    privatePostV5LendingPurchase(params?: {}): Promise<implicitReturnType>;
    privatePostV5LendingRedeem(params?: {}): Promise<implicitReturnType>;
    privatePostV5LendingRedeemCancel(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountSetCollateralSwitch(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountSetCollateralSwitchBatch(params?: {}): Promise<implicitReturnType>;
    privatePostV5AccountDemoApplyMoney(params?: {}): Promise<implicitReturnType>;
}
declare abstract class Exchange extends _Exchange {
}
export default Exchange;
