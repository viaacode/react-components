import type { LucideIcon } from 'lucide-react';
import type React from 'react';

import type { DefaultComponentProps } from '../../types';

export interface ColorPickerProps extends DefaultComponentProps {
	/** Font / text color (hex) */
	color: string;
	onChange: (newColor: string) => void;
	/** Background color (hex). When provided, activates dual-tab mode. */
	bgColor?: string;
	onBgColorChange?: (newColor: string) => void;
	disabled?: boolean;
	icon?: LucideIcon;
	iconSize?: number;
	input?: Partial<
		React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
	>;
}
