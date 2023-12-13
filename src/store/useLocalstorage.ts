import { createSignal } from "solid-js";

type StoredValueType<T> = T | null;

const localStorageStore = <T>() => ({
	get(key: string): StoredValueType<T> {
		const jsonObject = window.localStorage.getItem(key);
		const parsedObject = (JSON.parse(jsonObject) ?? {}) as Record<
			string,
			T
		>;
		const currentValue = parsedObject?.[key] as T;
		return currentValue || null;
	},
	set(key: string, val: T) {
		const unparsedObject = JSON.stringify({
			key: val,
		});
		window.localStorage.setItem(key, unparsedObject);
	},
});

export default function useLocalstorage<T>(key: string, initialValue: T) {
	const [value, setValue] = createSignal<T>(initialValue);
	const store = localStorageStore<T>();

	const updateValue = (val: StoredValueType<T>) => {
		store.set(key, val);
	};

	const initializeLocalStorage = () => {
		const storedValue = store.get(key);

		if (!storedValue) {
			store.set(key, initialValue);
		}

		setValue(() => storedValue || initialValue);
	};

	initializeLocalStorage();

	return [value, updateValue] as const;
}
