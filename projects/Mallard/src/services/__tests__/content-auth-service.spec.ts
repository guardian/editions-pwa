import 'isomorphic-fetch';
import { fetchCasSubscription } from '../content-auth-service';
import fetchMock from 'fetch-mock';
import { CAS_ENDPOINT_URL } from 'src/constants';

describe('content-auth-service', () => {
	describe('fetchCasSubscription', () => {
		beforeEach(fetchMock.resetBehavior);

		it('creates a JSON string from the params in the body', async () => {
			fetchMock.post(`begin:${CAS_ENDPOINT_URL}`, {
				expiry: 'expiry',
			});

			await fetchCasSubscription('subId', 'pass');

			const { body } = fetchMock.calls()[0][1] || { body: null };

			expect(JSON.parse(body as string)).toMatchObject({
				subscriberId: 'subId',
				password: 'pass',
			});
		});

		it('returns the access token from the response', async () => {
			fetchMock.post(`begin:${CAS_ENDPOINT_URL}`, {
				expiry: 'exp',
			});

			const res = await fetchCasSubscription('subId', 'pass');

			expect(res).toBe('exp');
		});

		it('throws an error on non-200 responses', async () => {
			fetchMock.post(`begin:${CAS_ENDPOINT_URL}`, {
				body: JSON.stringify({
					error: {
						message: 'error-message',
					},
				}),
				status: 419,
			});

			let error;

			try {
				await fetchCasSubscription('subId', 'pass');
			} catch (e) {
				error = e;
			}

			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe('error-message');
		});
	});
});
