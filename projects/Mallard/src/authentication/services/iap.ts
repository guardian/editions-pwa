import { NativeModules, Platform } from 'react-native';
import type { Purchase } from 'react-native-iap';
import RNIAP from 'react-native-iap';
import type { ReceiptValidationResponse } from 'react-native-iap/apple';
import { ITUNES_CONNECT_SHARED_SECRET } from 'src/constants';
import { isInBeta } from 'src/helpers/release-stream';
import type { AuthResult } from '../lib/Result';
import { ErrorResult, InvalidResult, ValidResult } from '../lib/Result';

const { InAppUtils } = NativeModules;

const THREE_DAYS = 1000 * 60 * 60 * 24 * 3;

export interface ReceiptIOS {
	expires_date: string;
	expires_date_ms: string;
	expires_date_pst: string;
	is_in_intro_offer_period: string;
	is_trial_period: string;
	original_purchase_date: string;
	original_purchase_date_ms: string;
	original_purchase_date_pst: string;
	original_transaction_id: string;
	product_id: string;
	purchase_date: string;
	purchase_date_ms: string;
	purchase_date_pst: string;
	quantity: string;
	transaction_id: string;
	web_order_line_item_id: string;
	name?: string; // I haven't seen this in the TestFlight responses but the old app uses it so will add as an optional
}

const fetchDecodeReceipt = (receipt: string) =>
	RNIAP.validateReceiptIos(
		{
			'receipt-data': receipt,
			password: ITUNES_CONNECT_SHARED_SECRET,
		},
		isInBeta() || __DEV__,
	);

const getMostRecentTransactionReceipt = (purchases: Purchase[]) => {
	if (!purchases.length) return false;
	return purchases.sort((a, b) => b.transactionDate - a.transactionDate)[0]
		.transactionReceipt;
};

const isReceiptValid = (receipt: ReceiptIOS) => {
	const expirationInMilliseconds = Number(receipt.expires_date_ms);
	const expirationWithGracePeriod = expirationInMilliseconds + THREE_DAYS;
	const nowInMilliseconds = Date.now();
	return expirationWithGracePeriod > nowInMilliseconds;
};

const hasLatestReceiptInfo = (receipt: ReceiptValidationResponse) => {
	return (
		receipt &&
		receipt.latest_receipt_info &&
		(receipt.latest_receipt_info as ReceiptIOS[]).length > 0
	);
};

const findValidReceiptFromLatestInfo = (receipt: ReceiptValidationResponse) => {
	return (receipt.latest_receipt_info as ReceiptIOS[]).find(isReceiptValid);
};

const findValidReceipt = (receipt: ReceiptValidationResponse) =>
	hasLatestReceiptInfo(receipt)
		? findValidReceiptFromLatestInfo(receipt) || null
		: null;

/**
 * This will attempt to restore existing purchases
 */
const tryRestoreActiveIOSSubscriptionReceipt = async (): Promise<
	AuthResult<ReceiptIOS>
> => {
	try {
		if (Platform.OS !== 'ios') return InvalidResult();
		const purchases = await RNIAP.getAvailablePurchases();
		const mostRecentReceipt = getMostRecentTransactionReceipt(purchases);
		if (!mostRecentReceipt) return InvalidResult();
		const decodedReceipt = await fetchDecodeReceipt(mostRecentReceipt);
		if (!decodedReceipt) return InvalidResult();
		const validReceipt = findValidReceipt(decodedReceipt);
		return validReceipt ? ValidResult(validReceipt) : InvalidResult();
	} catch {
		return ErrorResult('Verification error');
	}
};

const getReceiptData = (): Promise<string> =>
	new Promise((res, rej) =>
		InAppUtils.receiptData((error: boolean, receiptData: string) => {
			if (error) {
				rej('Receipt not found');
			} else {
				res(receiptData);
			}
		}),
	);

// This will attempt to look for the existing receipt without trying to restore those purchases
const fetchActiveIOSSubscriptionReceipt = async (): Promise<
	AuthResult<ReceiptIOS>
> => {
	if (Platform.OS !== 'ios') return InvalidResult();
	let receipt: string | undefined;
	try {
		receipt = await getReceiptData();
	} catch (e) {
		return InvalidResult();
	}
	const decodedReceipt = await fetchDecodeReceipt(receipt);
	if (!decodedReceipt) return InvalidResult();
	const validReceipt = findValidReceipt(decodedReceipt);
	return validReceipt ? ValidResult(validReceipt) : InvalidResult();
};

const TEST_PRODUCT_ID = 'uk.co.guardian.gce.sevenday.1monthsub2';

const DEV_getLegacyIAPReceipt = () =>
	isInBeta() &&
	InAppUtils.loadProducts([TEST_PRODUCT_ID], () => {
		InAppUtils.purchaseProduct(TEST_PRODUCT_ID, () => {});
	});

export {
	DEV_getLegacyIAPReceipt,
	fetchActiveIOSSubscriptionReceipt,
	tryRestoreActiveIOSSubscriptionReceipt,
	isReceiptValid,
	findValidReceipt,
};
