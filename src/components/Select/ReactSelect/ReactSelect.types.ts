import { Props } from 'react-select';

import { DefaultComponentProps } from '../../../types';
import { SelectOption } from '../Select.types';

export type ReactSelectProps = Omit<Props<SelectOption>, 'isMulti'> & DefaultComponentProps;
