import { keysEnter, onKey } from '../../utils';

export interface UseEnterKeyClickOptions {
	disabled?: boolean;
	preventWhenChecked?: boolean;
	checked?: boolean;
}

export function useEnterKeyClick({
	disabled = false,
	preventWhenChecked = false,
	checked = false,
}: UseEnterKeyClickOptions = {}) {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		onKey(e, keysEnter, () => {
			if (disabled) {
				return;
			}

			if (preventWhenChecked && checked) {
				return;
			}

			e.preventDefault();
			e.currentTarget.click();
		});
	};

	return handleKeyDown;
}
