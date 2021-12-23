import { shallow } from 'enzyme';
import React, { Fragment } from 'react';

import { PanelHeader } from './PanelHeader';

describe('<PanelHeader />', () => {
	it('Should be able to render', () => {
		shallow(
			<PanelHeader>
				<Fragment />
			</PanelHeader>
		);
	});

	it('Should set the correct className(s)', () => {
		const customClass = 'c-panel__header-custom';

		const panelHeaderComponent = shallow(
			<PanelHeader className={customClass}>
				<Fragment />
			</PanelHeader>
		);

		expect(panelHeaderComponent.hasClass(customClass)).toEqual(true);
		expect(panelHeaderComponent.hasClass('c-panel__header')).toEqual(true);
	});

	it('Should correctly pass children', () => {
		const panelHeaderComponent = shallow(
			<PanelHeader>
				<p id="panel-header-test">Testing 123</p>
			</PanelHeader>
		);

		const paragraph = panelHeaderComponent.find('#panel-header-test');

		expect(panelHeaderComponent.html()).toContain(paragraph.html());
	});
});
