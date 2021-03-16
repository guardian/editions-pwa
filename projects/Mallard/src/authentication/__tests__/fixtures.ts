import type { ReceiptIOS } from 'src/authentication/services/iap';
import type { IdentityAuthData } from '../authorizers/IdentityAuthorizer';

const membershipResponse = {
	userId: 'uid',
	showSupportMessaging: true,
	contentAccess: {
		member: false,
		paidMember: false,
		recurringContributor: false,
		digitalPack: false,
		paperSubscriber: false,
		guardianWeeklySubscriber: false,
	},
};

const userResponse = {
	id: '123',
	dates: {
		accountCreatedDate: '2019',
	},
	adData: {},
	consents: [],
	userGroups: [],
	socialLinks: [],
	publicFields: {
		displayName: 'User Name',
	},
	statusFields: {
		hasRepermissioned: false,
		userEmailValidated: true,
		allowThirdPartyProfiling: false,
	},
	primaryEmailAddress: 'username@example.com',
	hasPassword: true,
};

const userData = {
	userDetails: userResponse,
	membershipData: membershipResponse,
};

const casExpiry = ({
	content = '',
	expiryDate = '2012-05-05',
	expiryType = '',
	provider = '',
	subscriptionCode = 'G99123456',
} = {}) => ({
	content,
	expiryDate,
	expiryType,
	provider,
	subscriptionCode,
});

const receiptIOS = ({
	expires_date = new Date(),
	is_in_intro_offer_period = '',
	is_trial_period = '',
	original_purchase_date = '',
	original_purchase_date_ms = '',
	original_purchase_date_pst = '',
	original_transaction_id = '',
	product_id = '',
	purchase_date = '',
	purchase_date_ms = '',
	purchase_date_pst = '',
	quantity = '',
	transaction_id = '',
	web_order_line_item_id = '',
} = {}): ReceiptIOS => ({
	expires_date: expires_date.toString(),
	expires_date_ms: expires_date.getTime().toString(),
	expires_date_pst: expires_date.toString(),
	is_in_intro_offer_period,
	is_trial_period,
	original_purchase_date,
	original_purchase_date_ms,
	original_purchase_date_pst,
	original_transaction_id,
	product_id,
	purchase_date,
	purchase_date_ms,
	purchase_date_pst,
	quantity,
	transaction_id,
	web_order_line_item_id,
});

const withCreds = ({
	email,
	digitalPack,
	userEmailValidated = true,
}: {
	email: string;
	digitalPack: boolean;
	userEmailValidated?: boolean;
}): IdentityAuthData => ({
	...userData,
	userDetails: {
		...userData.userDetails,
		primaryEmailAddress: email,
		statusFields: {
			...userData.userDetails.statusFields,
			userEmailValidated,
		},
	},
	membershipData: {
		...userData.membershipData,
		contentAccess: {
			...userData.membershipData.contentAccess,
			digitalPack,
		},
	},
});

export {
	receiptIOS,
	membershipResponse,
	userResponse,
	userData,
	casExpiry,
	withCreds,
};
