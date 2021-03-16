import moment from 'moment';
import { receiptIOS } from 'src/authentication/__tests__/fixtures';
import { isReceiptValid, findValidReceipt } from '../iap';

describe('iap', () => {
	describe('isReceiptValid', () => {
		it('returns false for expiry dates that are more thanthree days older than now', () => {
			const fourDaysAgo = moment().subtract(4, 'days').toDate();
			const isValid = isReceiptValid(
				receiptIOS({ expires_date: fourDaysAgo }),
			);

			expect(isValid).toBe(false);
		});

		it('returns true for expiry dates that are less than three days older than now', () => {
			const twoDaysAgo = moment().subtract(2, 'days').toDate();
			const isValid = isReceiptValid(
				receiptIOS({ expires_date: twoDaysAgo }),
			);

			expect(isValid).toBe(true);
		});
	});
	describe('findValidReceipt', () => {
		it('should return a valid iap receipt if its found', () => {
			const twoDaysInFuture = moment().add(2, 'days').toDate();
			const receipt = receiptIOS({ expires_date: twoDaysInFuture });
			const receiptValidationResponse = {
				status: 0,
				receipt: {
					bundle_id: 'test',
					application_version: '1.2',
					in_app: [],
					original_application_version: '',
					receipt_creation_date: '',
				},
				latest_receipt_info: [receipt],
			};
			expect(findValidReceipt(receiptValidationResponse)).toEqual(
				receipt,
			);
		});
		it('should return null if latest_receipt_info param is empty', () => {
			const receiptValidationResponse = {
				status: 0,
				receipt: {
					bundle_id: 'test',
					application_version: '1.2',
					in_app: [],
					original_application_version: '',
					receipt_creation_date: '',
				},
				latest_receipt_info: [],
			};
			expect(findValidReceipt(receiptValidationResponse)).toEqual(null);
		});
		it('should return null if it cant find a valid receipt', () => {
			const fourDaysAgo = moment().subtract(4, 'days').toDate();
			const receipt = receiptIOS({ expires_date: fourDaysAgo });
			const receiptValidationResponse = {
				status: 0,
				receipt: {
					bundle_id: 'test',
					application_version: '1.2',
					in_app: [],
					original_application_version: '',
					receipt_creation_date: '',
				},
				latest_receipt_info: [receipt],
			};
			expect(findValidReceipt(receiptValidationResponse)).toEqual(null);
		});
		it('should return null if last_receipt_info is missing', () => {
			const receiptValidationResponse = {
				status: 0,
				receipt: {
					bundle_id: 'test',
					application_version: '1.2',
					in_app: [],
					original_application_version: '',
					receipt_creation_date: '',
				},
			};
			expect(findValidReceipt(receiptValidationResponse)).toEqual(null);
		});
	});
});
