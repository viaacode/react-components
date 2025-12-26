import type { Props } from 'react-select';

import type { DefaultComponentProps } from '../../../types';
import type { SelectOption } from '../Select.types';

export type ReactSelectProps = Omit<Props<SelectOption>, 'isMulti'> & DefaultComponentProps;
