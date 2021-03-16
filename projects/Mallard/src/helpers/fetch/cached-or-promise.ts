/*
Wrap a promise or an stored value in this
so hooks can access the value instantly

🤔 BUT WHY?
With hooks, we need an instant cache because that must
always return a value, so value-or-promise allows us to short
circuit all data fetching and stuff and return from the promise
layer as soon as we know what we want is stored in there while
still allowing all normal js goodness like testability or loops.

We need a function that returns a promise so we never accidentally
fire the promise inside the hook code (we need to wrap that
behavior in a useEffect).
This prevents infinite loops from firing off

Without a CachedOrPromise:
const useData = (promise) => {
    const [result, setResult] = useState(null) :(
    useEffect(()=>{
        promise().then(val => {setResult(val)})
    },[])
    return result;
}

With a CachedOrPromise:
const useData = (createCachedOrPromise) => {
    const initialState = isCached(createCachedOrPromise) ? createCachedOrPromise.value : null;
    const [result, setResult] = useState(initialState) :D
    useEffect(()=>{
        //or call it again?
        if(!isCached(createCachedOrPromise)){
            createCachedOrPromise.getValue().then(val => {setResult(val)})
        }
    },[])
    return result;
}
*/

interface SlowPromiseGetter<T> {
	type: 'promise';
	getValue: () => Promise<T>;
}

interface CachedResult<T> {
	type: 'value';
	value: T;
	getValue: () => Promise<T>;
}

export type CachedOrPromise<T> = CachedResult<T> | SlowPromiseGetter<T>;

const createCachedOrPromise = <T>(
	[value, promiseGetter]: [T | null | undefined, () => Promise<T>],
	{
		savePromiseResultToValue,
	}: { savePromiseResultToValue: (result: T) => void },
): CachedOrPromise<T> => {
	const getValue = async () => {
		const val = await promiseGetter();
		savePromiseResultToValue(val);
		return val;
	};
	if (value) {
		return {
			type: 'value',
			value,
			getValue,
		};
	}
	return {
		type: 'promise',
		getValue,
	};
};

/*
Type refinement helper
*/
const isCached = <T>(
	cachedOrPromise: CachedOrPromise<T>,
): cachedOrPromise is CachedResult<T> => cachedOrPromise.type === 'value';

/*
If you wanna chain a bunch of CachedOrPromises but retain the
behavior where .value is always cached and .getValue() is not
(this allows for refreshes of the entire chain) you can use
this helper
*/
const chain = <T, X>(
	cachedOrPromise: CachedOrPromise<T>,
	callback: (t: T) => CachedOrPromise<X>,
) => {
	let defaultValue = null;
	if (isCached(cachedOrPromise)) {
		const cb = callback(cachedOrPromise.value);
		if (isCached(cb)) {
			defaultValue = cb.value;
		}
	}
	return createCachedOrPromise<X>(
		[
			defaultValue,
			async () => {
				const resp = await cachedOrPromise.getValue();
				return callback(resp).getValue();
			},
		],
		{
			savePromiseResultToValue: () => null,
		},
	);
};
chain.end = <X>(value: X) =>
	createCachedOrPromise<X>([value, async () => value], {
		savePromiseResultToValue: () => {},
	});

export { isCached, chain, createCachedOrPromise };
