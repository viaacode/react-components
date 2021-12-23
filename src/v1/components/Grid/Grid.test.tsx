import { shallow } from 'enzyme';
import React from 'react';

import { Column } from './Column/Column';
import { Grid } from './Grid';

describe('<Grid />', () => {
	it('Should be able to render', () => {
		shallow(
			<Grid>
				<Column size="6">Hello</Column>
			</Grid>
		);
	});

	it('Should correctly set the className', () => {
		const customClass = 'c-grid-custom';

		const gridComponent = shallow(
			<Grid className={customClass}>
				<Column size="6">Hello</Column>
			</Grid>
		);

		expect(gridComponent.hasClass(customClass)).toEqual(true);
		expect(gridComponent.hasClass('o-grid')).toEqual(true);
	});

	it('Should correctly pass children', () => {
		const gridComponent = shallow(
			<Grid>
				<Column size="6">Hello</Column>
			</Grid>
		);

		const columnComponent = gridComponent.find(Column);

		expect(gridComponent.children().html()).toEqual(columnComponent.html());
	});

	it('Should render with a custom tag', () => {
		const gridComponent = shallow(
			<Grid tag="p">
				<Column size="6">Hello</Column>
			</Grid>
		);

		expect(gridComponent.find('p')).toHaveLength(1);
	});
});
