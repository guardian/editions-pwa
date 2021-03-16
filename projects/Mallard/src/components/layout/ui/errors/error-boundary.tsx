import type { ReactNode } from 'react';
import React, { Component } from 'react';
import { FlexErrorMessage } from 'src/components/layout/ui/errors/flex-error-message';
import { GENERIC_FATAL_ERROR } from 'src/helpers/words';
import { errorService } from 'src/services/errors';

type Props = {
	children: ReactNode;
	error?: ReactNode;
};
class ErrorBoundary extends Component<
	Props,
	{
		hasError: boolean;
		message: string | undefined;
	}
> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, message: undefined };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true, message: JSON.stringify(error) };
	}

	componentDidCatch(err: Error) {
		err.message = `Error Boundary: ${err.message}`;
		errorService.captureException(err);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.error) {
				return this.props.error;
			}
			return (
				<FlexErrorMessage
					title={GENERIC_FATAL_ERROR}
					message={`Here's some details; ` + this.state.message}
				></FlexErrorMessage>
			);
		}

		return this.props.children;
	}
}

export { ErrorBoundary };
