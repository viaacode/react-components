import { render } from '@testing-library/react';
import React from 'react';

import Datepicker from './Datepicker';

describe('<Datepicker />', () => {
	it('Should be able to render', () => {
		render(<Datepicker />);
	});
});
