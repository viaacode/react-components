import type { Props } from 'react-select';

import type { DefaultComponentProps } from '../../../types/index.js';
import type { SelectOption } from '../Select.types.js';

export type ReactSelectProps = Omit<Props<SelectOption>, 'isMulti'> & DefaultComponentProps;
