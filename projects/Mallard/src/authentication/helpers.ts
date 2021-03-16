import {
	casCredentialsKeychain,
	legacyCASUsernameCache,
} from 'src/helpers/storage';
import type { IdentityAuthData } from './authorizers/IdentityAuthorizer';

const GUARDIAN_SUFFIXES = ['guardian.co.uk', 'theguardian.com'];

const isGuardianEmail = (email: string) =>
	GUARDIAN_SUFFIXES.some((suffix) => email.endsWith(suffix));

/**
 * If they have a Guardian email we want to check that they've validated their email,
 * otherwise we don't really mind
 */
const isStaffMember = (userData: IdentityAuthData) =>
	isGuardianEmail(userData.userDetails.primaryEmailAddress) &&
	userData.userDetails.statusFields.userEmailValidated;

/**
 * This takes the membersDataApiResponse and is responsible for returning a boolean
 * describing whether or not the user has the relevant permissions to use the app
 */
const canViewEdition = (userData: IdentityAuthData): boolean =>
	userData.membershipData.contentAccess.digitalPack ||
	isStaffMember(userData);

/**
 * This gets a CAS code for a user if one exists
 */
const getCASCode = () =>
	Promise.all([
		casCredentialsKeychain.get(),
		legacyCASUsernameCache.get(),
	]).then(([current, legacy]) => (current && current.username) || legacy);

export { canViewEdition, isStaffMember, getCASCode };
