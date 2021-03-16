import { canViewEdition } from '../helpers';
import { withCreds } from './fixtures';

describe('helpers', () => {
	describe('isStaffMember', () => {
		it('returns true for a validated guardian email', () => {
			expect(
				canViewEdition(
					withCreds({
						email: 'alice@guardian.co.uk',
						digitalPack: false,
					}),
				),
			).toBe(true);
		});

		it('returns false for an unvalidated guardian email', () => {
			expect(
				canViewEdition(
					withCreds({
						email: 'bob@guardian.co.uk',
						digitalPack: false,
						userEmailValidated: false,
					}),
				),
			).toBe(false);
		});

		it('returns false for a validated non-guardian email', () => {
			expect(
				canViewEdition(
					withCreds({
						email: 'clarissa@grauniad.co.uk',
						digitalPack: false,
					}),
				),
			).toBe(false);
		});

		it('returns false for an unvalidated non-guardian email', () => {
			expect(
				canViewEdition(
					withCreds({
						email: 'desmond@grauniad.co.uk',
						digitalPack: false,
						userEmailValidated: false,
					}),
				),
			).toBe(false);
		});
	});

	describe('canViewEdition', () => {
		it('allows people in with guardian email addresses', () => {
			expect(
				canViewEdition(
					withCreds({
						email: 'alice@guardian.co.uk',
						digitalPack: false,
					}),
				),
			).toBe(true);

			expect(
				canViewEdition(
					withCreds({
						email: 'bob@theguardian.com',
						digitalPack: false,
					}),
				),
			).toBe(true);

			expect(
				canViewEdition(
					withCreds({
						email: 'charlotte@gu.com',
						digitalPack: false,
					}),
				),
			).toBe(false);
		});

		it('disallows people with unvalidated guardian email addresses', () => {
			expect(
				canViewEdition(
					withCreds({
						email: 'alice@guardian.co.uk',
						digitalPack: false,
						userEmailValidated: false,
					}),
				),
			).toBe(false);

			expect(
				canViewEdition(
					withCreds({
						email: 'bob@theguardian.com',
						digitalPack: false,
						userEmailValidated: false,
					}),
				),
			).toBe(false);

			expect(
				canViewEdition(
					withCreds({
						email: 'charlotte@gu.com',
						digitalPack: false,
						userEmailValidated: false,
					}),
				),
			).toBe(false);
		});

		it('allows anyone to login with a digital pack', () => {
			expect(
				canViewEdition(
					withCreds({
						email: 'alice@guardian.co.uk',
						digitalPack: true,
					}),
				),
			).toBe(true);

			expect(
				canViewEdition(
					withCreds({
						email: 'bob@theguardian.com',
						digitalPack: true,
					}),
				),
			).toBe(true);

			expect(
				canViewEdition(
					withCreds({
						email: 'charlotte@gu.com',
						digitalPack: true,
					}),
				),
			).toBe(true);
		});
	});
});
