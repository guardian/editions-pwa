import React from 'react';
import { Button } from './Button';

const IssueMenuButton = ({ onPress }: { onPress: () => void }) => (
	<Button icon={'\uE04A'} alt="More issues" onPress={onPress} />
);

export { IssueMenuButton };
