import type { ReactNode } from 'react';
import React, { useState } from 'react';
import type { ToastList, ToastProps } from 'src/components/toast/toast';
import { ToastRootHolder } from 'src/components/toast/toast';
import { createProviderFromHook, providerHook } from 'src/helpers/provider';

/*
  Exports
 */

const useToastInContext = () => {
	const [toast, setToast] = useState<ToastList>([]);

	const removeLastToastWithTitle = (title: string) => {
		setToast((toasts) => toasts.filter((toast) => toast.title !== title));
	};

	const showToast = (
		title: ToastProps['title'],
		moreThings: Omit<ToastProps, 'title'> = {},
	) => {
		setToast((toasts) => {
			if (!toasts.find((toast) => toast.title === title)) {
				setTimeout(() => {
					removeLastToastWithTitle(title);
				}, 5000);
				return [...toasts, { title, ...moreThings }];
			}

			return toasts;
		});
	};

	return providerHook({
		getter: toast,
		setter: { showToast },
	});
};

const {
	Provider: ToastProviderBase,
	useAsGetterHook: useToastList,
	useAsSetterHook: useToast,
} = createProviderFromHook(useToastInContext);

const ToastProvider = ({ children }: { children: ReactNode }) => (
	<ToastProviderBase>
		{children}
		<ToastRootHolder />
	</ToastProviderBase>
);

export { ToastProvider, useToast, useToastList };
