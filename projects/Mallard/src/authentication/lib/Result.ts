import { GENERIC_AUTH_ERROR } from 'src/helpers/words';

type ValidResult<T> = { type: 'valid-result'; data: T };
/**
 * the difference between these two is a signal to the Authorizer
 * that we should clear our authCaches if we receive and InvalidResult
 * whereas an ErrorResult is exceptional, does not mean we have
 * invalid credentials so we should keep the caches
 **/
type InvalidResult = { type: 'invalid-result'; reason?: string };
type ErrorResult = { type: 'error-result'; reason?: string };

export type AuthResult<T> = ValidResult<T> | InvalidResult | ErrorResult;

const cataResult = <T, R>(
	result: AuthResult<T>,
	{
		valid,
		invalid,
		error,
	}: {
		valid: (data: T) => R;
		invalid: (reason?: string) => R;
		error: (reason?: string) => R;
	},
) => {
	switch (result.type) {
		case 'valid-result': {
			return valid(result.data);
		}
		case 'invalid-result': {
			return invalid(result.reason);
		}
		case 'error-result': {
			return error(result.reason);
		}
		default: {
			const x: never = result;
			return x;
		}
	}
};

const ValidResultCons = <T>(data: T): ValidResult<T> => ({
	type: 'valid-result',
	data,
});

const InvalidResultCons = (reason?: string): InvalidResult => ({
	type: 'invalid-result',
	reason,
});

const ErrorResultCons = (reason?: string): ErrorResult => ({
	type: 'error-result',
	reason,
});

const fromResponse = async <T>(
	res: Response,
	{
		error = GENERIC_AUTH_ERROR,
		valid = (val) => val,
		invalid = () => GENERIC_AUTH_ERROR,
	}: {
		error?: string;
		valid?: (json: any) => T;
		invalid?: (json: any) => string;
	} = {},
): Promise<AuthResult<T>> => {
	if (res.status >= 500) return ErrorResultCons(error);
	const data = await res.json();
	if (res.ok) return ValidResultCons(valid(data));
	if (res.status >= 401 && res.status <= 403)
		return InvalidResultCons(invalid(data));
	return ErrorResultCons(error);
};

/**
 * This is a helper for taking an auth result and chaining it
 * with another one. A little bit like a cheap and cheerful asynchronous
 * Either
 */
const flat = async <T, U>(
	init: AuthResult<T>,
	mapper: (data: T) => Promise<AuthResult<U>>,
): Promise<AuthResult<U>> =>
	cataResult(init, {
		valid: mapper,
		invalid: async (...args) => InvalidResultCons(...args),
		error: async (...args) => ErrorResultCons(...args),
	});

export {
	cataResult,
	ValidResultCons as ValidResult,
	InvalidResultCons as InvalidResult,
	ErrorResultCons as ErrorResult,
	fromResponse,
	flat,
};
