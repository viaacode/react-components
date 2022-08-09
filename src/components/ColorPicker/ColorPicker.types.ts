import React from 'react';

import { DefaultComponentProps } from '../../types';

export interface ColorPickerProps extends DefaultComponentProps {
	color: string;
	onChange: (newColor: string) => void;
	disabled?: boolean;
	input?: Partial<
		React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
	>;
}
