import type { ReactElement } from 'react';
import type { Error, FetchableResponse } from 'src/hooks/use-response';

interface WithResponseCallbacks<T> {
	retry: () => void;
}

export const withResponse = <T>(response: FetchableResponse<T>) => ({
	success,
	pending,
	error,
}: {
	success: (resp: T, callbacks: WithResponseCallbacks<T>) => ReactElement;
	pending: (
		stale: T | null,
		callbacks: WithResponseCallbacks<T>,
	) => ReactElement;
	error: (
		error: Error,
		stale: T | null,
		callbacks: WithResponseCallbacks<T>,
	) => ReactElement;
}): ReactElement => {
	switch (response.state) {
		case 'success':
			return success(response.response, { retry: response.retry });
		case 'error':
			return error(response.error, response.staleResponse, {
				retry: response.retry,
			});
		case 'pending':
			return pending(response.staleResponse, { retry: response.retry });
	}
};
