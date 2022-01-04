import { render } from '@testing-library/react';
import React from 'react';

import Tabs from './Tabs';
import { MOCK_TABS } from './__mocks__/tabs';

const renderTabs = () => {
	return render(<Tabs tabs={MOCK_TABS} />);
};

describe('components/<Tabs />', () => {
	it('Should render tabs', () => {
		renderTabs();
	});
});
