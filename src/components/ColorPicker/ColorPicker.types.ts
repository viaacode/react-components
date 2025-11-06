import type React from 'react';

import type { DefaultComponentProps } from '../../types/index.js';

export interface ColorPickerProps extends DefaultComponentProps {
	children?: React.ReactNode;
	color: string;
	onChange: (newColor: string) => void;
	disabled?: boolean;
	input?: Partial<
		React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
	>;
}
