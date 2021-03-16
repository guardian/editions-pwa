import {
	TErrorAttempt,
	TInvalidAttempt,
	isValid,
	TValidAttempt,
} from '../Attempt';

describe('Attempt', () => {
	describe('isValid', () => {
		it('should return true is their attempt is successful', () => {
			const validAttempt = { type: 'valid-attempt' };
			expect(
				isValid(validAttempt as TValidAttempt<{ data: '' }>),
			).toEqual(true);
		});
		it('should return false if there is an error when attempting', () => {
			const errorAttempt = { type: 'error-attempt' };
			expect(isValid(errorAttempt as TErrorAttempt)).toEqual(false);
		});
		it('should return false if the attempt is invalid', () => {
			const invalidAttempt = { type: 'error-attempt' };
			expect(isValid(invalidAttempt as TInvalidAttempt)).toEqual(false);
		});
	});
});
