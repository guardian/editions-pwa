export const issueDateFromId = (id: string) => {
	const dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
	const dateString = id.match(dateRegex);
	const date = dateString ? new Date(dateString[0]) : undefined;
	return date;
};
