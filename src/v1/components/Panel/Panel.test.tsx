import { shallow } from 'enzyme';
import React, { Fragment } from 'react';

import { Panel } from './Panel';
import { PanelBody, PanelHeader } from './Panel.slots';

describe('<Panel />', () => {
	it('Should be able to render', () => {
		shallow(
			<Panel>
				<PanelHeader>
					<Fragment>Header</Fragment>
				</PanelHeader>
				<PanelBody>
					<Fragment>Body</Fragment>
				</PanelBody>
			</Panel>
		);
	});

	it('Should set the correct className(s)', () => {
		const customClass = 'c-panel-custom';

		const panelComponent = shallow(
			<Panel className={customClass}>
				<PanelHeader>
					<Fragment>Header</Fragment>
				</PanelHeader>
				<PanelBody>
					<Fragment>Body</Fragment>
				</PanelBody>
			</Panel>
		);

		const mainPanelDiv = panelComponent.find('.c-panel');
		const headerPanelDiv = panelComponent.find('.c-panel__header');
		const bodyPanelDiv = panelComponent.find('.c-panel__body');

		expect(mainPanelDiv).toHaveLength(1);
		expect(mainPanelDiv.hasClass(customClass)).toBeTruthy();
		expect(headerPanelDiv).toHaveLength(1);
		expect(bodyPanelDiv).toHaveLength(1);
	});

	it('Should correctly render the panel header', () => {
		const panelComponent = shallow(
			<Panel>
				<PanelHeader>
					<p id="test">Hello!</p>
				</PanelHeader>
			</Panel>
		);

		const children = panelComponent.find('#test');

		expect(panelComponent.find('.c-panel__header').children().html()).toContain(
			children.html()
		);

		const headerElement = panelComponent.find('.c-panel__header');
		const bodyElement = panelComponent.find('.c-panel__body');

		expect(headerElement).toHaveLength(1);
		expect(bodyElement).toHaveLength(0);
	});

	it('Should correctly render the panel body', () => {
		const panelComponent = shallow(
			<Panel>
				<PanelBody>
					<p id="test">Hello!</p>
				</PanelBody>
			</Panel>
		);

		const children = panelComponent.find('#test');

		expect(panelComponent.find('.c-panel__body').children().html()).toContain(children.html());

		const headerElement = panelComponent.find('.c-panel__header');
		const bodyElement = panelComponent.find('.c-panel__body');

		expect(headerElement).toHaveLength(0);
		expect(bodyElement).toHaveLength(1);
	});
});
