import { getUserName, detectAuthType } from '../IdentityAuthorizer';
import { locale } from 'src/helpers/locale';

describe('IdentityAuthorizer', () => {
	describe('getUserName', () => {
		it('returns correct usernames for valid params', () => {
			console.log(locale);
			expect(
				getUserName('google', { 'google-access-token': 'blah' }),
			).toBe('gu-editions::token::google');
			expect(
				getUserName('email', {
					email: 'blah@blah.com',
					password: 'blah',
				}),
			).toBe('blah@blah.com');
		});

		describe('detectAuthType', () => {
			it('correctly detects auth type from params', () => {
				expect(
					detectAuthType({
						email: 'blah@blah.com',
						password: 'blah',
					}),
				).toBe('email');

				expect(
					detectAuthType({
						idToken: 'blah@blah.com',
						authorizationCode: '',
						givenName: '',
						familyName: '',
					}),
				).toBe('apple');
			});
		});
	});
});
