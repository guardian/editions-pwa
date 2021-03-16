import { useApolloClient } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { AccessContext } from 'src/authentication/AccessContext';
import { createMailtoHandler } from 'src/helpers/diagnostics';
import { isInBeta } from 'src/helpers/release-stream';
import { DIAGNOSTICS_TITLE } from 'src/helpers/words';
import { BugButton } from './BugButton';

const BugButtonHandler = () => {
	const { attempt } = useContext(AccessContext);
	const client = useApolloClient();
	return isInBeta() ? (
		<BugButton
			onPress={createMailtoHandler(
				client,
				'Report a bug',
				'',
				attempt,
				DIAGNOSTICS_TITLE,
			)}
		/>
	) : null;
};

export { BugButtonHandler };
