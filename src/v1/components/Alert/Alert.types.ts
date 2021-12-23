import { ReactNode } from 'react';

import { DefaultProps } from '../../types';

export type AlertTypeSchema = 'info' | 'success' | 'danger' | 'spinner';

export type AlertTypeWithIcon = Exclude<AlertTypeSchema, 'spinner'>;

export interface AlertPropsSchema extends DefaultProps {
	dark?: boolean;
	message?: ReactNode | string;
	onClose?: () => void;
	type?: AlertTypeSchema;
}
