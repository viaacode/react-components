import { shallow } from 'enzyme';
import React, { Fragment } from 'react';

import { PanelBody } from './PanelBody';

describe('<PanelBody />', () => {
	it('Should be able to render', () => {
		shallow(
			<PanelBody>
				<Fragment />
			</PanelBody>
		);
	});

	it('Should set the correct className(s)', () => {
		const customClass = 'c-panel__body-custom';

		const panelBodyComponent = shallow(
			<PanelBody className={customClass}>
				<Fragment />
			</PanelBody>
		);

		expect(panelBodyComponent.hasClass(customClass)).toEqual(true);
		expect(panelBodyComponent.hasClass('c-panel__body')).toEqual(true);
	});

	it('Should correctly pass children', () => {
		const panelBodyComponent = shallow(
			<PanelBody>
				<p id="panel-body-test">Testing 123</p>
			</PanelBody>
		);

		const paragraph = panelBodyComponent.find('#panel-body-test');

		expect(panelBodyComponent.html()).toContain(paragraph.html());
	});
});
