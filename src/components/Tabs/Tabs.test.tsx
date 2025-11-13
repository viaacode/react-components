import { render } from '@testing-library/react';
import { MOCK_TABS } from './__mocks__/tabs';
import Tabs from './Tabs';

const renderTabs = () => {
	return render(<Tabs tabs={MOCK_TABS} />);
};

describe('components/<Tabs />', () => {
	it('Should render tabs', () => {
		renderTabs();
	});
});
