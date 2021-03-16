import { useEffect, useState } from 'react';

/*
you can use response to store an async value
and update it for success/error scenarios.

You will probably wanna wrap your response in
something more abstract because this has a lot of
nitty gritty implementation details

This maps beautifully to promises, and even
more beautifully to instant promises. you
can use 'useCachedOrPromise' to wrap those

Calling useResponse gives you two sets of stuff,
the first one is the response you pass down to
your consumer and the second one is your API to
update the response. Ej:

```js
const [response, {onSuccess, onError}] = useResponse()

useEffect(()=>{
    Promise().then(onSuccess).catch(onError)
})
```
(If you call useResponse with an initial value it'll
already be resolved)

*/

export interface Error {
	message: string;
	name?: string;
}

type Response<T> =
	| {
			state: 'pending';
			staleResponse: T | null;
	  }
	| {
			state: 'error';
			error: Error;
			staleResponse: T | null;
	  }
	| {
			state: 'success';
			response: T;
	  };

export interface ResponseHookCallbacks<T> {
	onSuccess: (res: T) => void;
	onError: (error: Error) => void;
	onPending: () => void;
}

const useResponse = <T>(
	initial: T | null,
): [Response<T>, ResponseHookCallbacks<T>] => {
	const [response, setResponse] = useState<Response<T>>(
		initial
			? {
					state: 'success',
					response: initial,
			  }
			: {
					state: 'pending',
					staleResponse: null,
			  },
	);
	const onSuccess = (response: T) => {
		setResponse({ state: 'success', response });
	};
	const onError = (error: Error) => {
		setResponse({
			state: 'error',
			error,
			staleResponse: 'response' in response ? response.response : null,
		});
	};
	const onPending = () => {
		setResponse({
			state: 'pending',
			staleResponse: 'response' in response ? response.response : null,
		});
	};
	return [
		response,
		{
			onSuccess,
			onError,
			onPending,
		},
	];
};

/*
A response can be 'fetchable'. This type of
response controls how the data gets into it
and thanks to this it can be retryable.

useCachedOrPromise uses this behind the scenes
so it might be the best living example. It works
a bit like this:

```
const fetchValue = ({onSuccess, onError}) => {
    Promise().then(onSuccess).catch(onError)
}
const response = useFetchableResponse<T>(
    null,
    (isInitial, {onSuccess, onError}) => fetchValue({onSuccess, onError}),
)
```
*/

export type FetchableResponse<T> = Response<T> & {
	retry: () => void;
};

const useFetchableResponse = <T>(
	initial: T | null,
	fetcher: (isInitial: boolean, callbacks: ResponseHookCallbacks<T>) => void,
	effectDependencies: unknown[] = [],
): FetchableResponse<T> => {
	const [response, responseHookCallbacks] = useResponse(initial);
	const retry = () => {
		responseHookCallbacks.onPending();
		fetcher(false, responseHookCallbacks);
	};

	useEffect(() => {
		if (!initial) {
			responseHookCallbacks.onPending();
		} else {
			responseHookCallbacks.onSuccess(initial);
		}
		fetcher(true, responseHookCallbacks);
	}, effectDependencies);

	return {
		...response,
		retry,
	};
};

export { useFetchableResponse, useResponse };
