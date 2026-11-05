/**
 * Attributes that tell common password managers (1Password, LastPass, Bitwarden, Dashlane) to ignore a field
 */
export const PASSWORD_MANAGER_IGNORE_ATTRIBUTES = {
	'data-1p-ignore': 'true',
	'data-lpignore': 'true',
	'data-bwignore': 'true',
	'data-form-type': 'other',
} as const;

export const getPasswordManagerIgnoreAttributes = (
	ignorePasswordManagers: boolean | undefined
): Partial<typeof PASSWORD_MANAGER_IGNORE_ATTRIBUTES> =>
	ignorePasswordManagers ? PASSWORD_MANAGER_IGNORE_ATTRIBUTES : {};
