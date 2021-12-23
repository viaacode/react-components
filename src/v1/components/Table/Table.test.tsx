import { mount, shallow } from 'enzyme';
import React, { Fragment } from 'react';

import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

import { Table, TableColumnSchema } from './Table';

const COLUMNS: TableColumnSchema[] = [
	{ id: 'name', label: 'Name', sortable: true },
	{ id: 'age', label: 'Age (in yrs)', sortable: true },
	{ id: 'cat', label: 'Has cat?', col: '2' },
	{ id: 'dog', label: 'Has dog?' },
	{ id: 'actions', label: 'actions' },
];

const DATA = [
	{ id: 0, name: 'Mark', age: '28', cat: true, dog: false },
	{ id: 1, name: 'Jessica', age: '34', cat: true, dog: true },
	{ id: 2, name: 'Gabriela', age: '19', cat: false, dog: false },
	{ id: 3, name: 'Filip', age: '72', cat: true, dog: true },
	{ id: 4, name: 'Vlatko', age: '29', cat: false, dog: true },
	{ id: 5, name: 'Eric', age: '34', cat: true, dog: false },
	{ id: 6, name: 'Mariah', age: '34', cat: false, dog: true },
];

describe('<Table />', () => {
	it('Should be able to render', () => {
		shallow(<Table columns={COLUMNS} data={DATA} rowKey="id" />);
	});

	it('Should set the correct className', () => {
		const customClass = 'c-table-custom';

		const tableComponent = shallow(
			<Table align className={customClass} horizontal nowrap striped />
		);

		expect(tableComponent.find('table').hasClass(customClass)).toBeTruthy();
		expect(tableComponent.find('table').hasClass('c-table')).toBeTruthy();
		expect(tableComponent.find('table').hasClass('c-table--align-middle')).toBeTruthy();
		expect(tableComponent.find('table').hasClass('c-table--horizontal')).toBeTruthy();
		expect(tableComponent.find('table').hasClass('c-table--nowrap')).toBeTruthy();
		expect(tableComponent.find('table').hasClass('c-table--striped')).toBeTruthy();
	});

	it('Should set the correct className for `variant`-prop', () => {
		const tableComponent = shallow(<Table columns={COLUMNS} data={DATA} rowKey="id" />);

		expect(tableComponent.find('table').hasClass('c-table--styled')).toBeFalsy();

		tableComponent.setProps({ variant: 'styled' });
		expect(tableComponent.find('table').hasClass('c-table--styled')).toBeTruthy();

		tableComponent.setProps({ variant: 'bordered' });
		expect(tableComponent.find('table').hasClass('c-table--bordered')).toBeTruthy();
		expect(tableComponent.find('table').hasClass('c-table--styled')).toBeTruthy();

		tableComponent.setProps({ variant: 'invisible' });
		expect(tableComponent.find('table').hasClass('c-table--invisible')).toBeTruthy();
	});

	it('Should be able to render the table head from `columns`', () => {
		const tableComponent = shallow(<Table columns={COLUMNS} data={DATA} rowKey="id" />);

		const headings = tableComponent.find('thead > tr > th');

		expect(headings).toHaveLength(headings.length);
	});

	it('Should render a chevron based on `sortColumn` & `sortOrder` when a column is sortable', () => {
		const ascTableComponent = shallow(
			<Table
				columns={COLUMNS}
				data={DATA}
				rowKey="id"
				sortOrder="asc"
				sortColumn={COLUMNS[0].id}
			/>
		);

		const descTableComponent = shallow(
			<Table
				columns={COLUMNS}
				data={DATA}
				rowKey="id"
				sortOrder="desc"
				sortColumn={COLUMNS[0].id}
			/>
		);

		const ascHeading = ascTableComponent.find('thead > tr > th').first();
		const descHeading = descTableComponent.find('thead > tr > th').first();

		const ascHeadingIcon = ascHeading.find(Icon);
		const descHeadingIcon = descHeading.find(Icon);

		expect(ascHeadingIcon.prop('name')).toEqual('chevron-up');
		expect(descHeadingIcon.prop('name')).toEqual('chevron-down');
	});

	it('Should set the correct className for a th when col is given', () => {
		const tableComponent = shallow(<Table columns={COLUMNS} data={DATA} rowKey="id" />);
		const colSize = 2;

		expect(tableComponent.find(`.o-table-col-${colSize}`)).toHaveLength(1);
	});

	it('Should not try to render table head when no `columns` are passed', () => {
		const tableComponent = shallow(<Table columns={[]} data={DATA} rowKey="id" />);

		const tableHead = tableComponent.find('thead');

		expect(tableHead).toHaveLength(0);
	});

	it('Should be able to render the table body from `data`', () => {
		const tableComponent = shallow(<Table columns={COLUMNS} data={DATA} rowKey="id" />);

		const rows = tableComponent.find('tbody > tr');

		expect(rows).toHaveLength(DATA.length);
	});

	it('Should not try to render table body when no `data` is passed', () => {
		const tableComponent = shallow(<Table columns={COLUMNS} data={[]} rowKey="id" />);

		const tableHead = tableComponent.find('tbody');

		expect(tableHead).toHaveLength(0);
	});

	it('Should accept a custom `renderCell`-prop for cell-rendering', () => {
		const tableComponent = shallow(
			<Table
				columns={COLUMNS}
				data={DATA}
				rowKey="id"
				renderCell={(row, columnId, rowIndex, columnIndex) => {
					if (columnId === 'actions') {
						return <Button icon="more-horizontal" />;
					}
					return <p className={`${rowIndex}-${columnIndex}`}>{row[columnId]}</p>;
				}}
			/>
		);

		const cells = tableComponent.find('tbody > tr > td > p');

		expect(cells.at(0).hasClass('0-0')).toBeTruthy();
		expect(cells.at(0).text()).toEqual(DATA[0].name);
		expect(cells.at(4).hasClass('1-0')).toBeTruthy();
		expect(cells.at(4).text()).toEqual(DATA[1].name);
		expect(cells.at(5).hasClass('1-1')).toBeTruthy();
		expect(cells.at(5).text()).toEqual(DATA[1].age);
	});

	it('Should correctly set the rowKey for each row', () => {
		const key = 'id';
		const tableComponent = shallow(<Table columns={COLUMNS} data={DATA} rowKey={key} />);

		const rows = tableComponent.find('tbody > tr');

		expect(rows.at(0).key()).toEqual(`table-row-${DATA[0][key].toString()}`);
		expect(rows.at(2).key()).toEqual(`table-row-${DATA[2][key].toString()}`);
		expect(rows.at(3).key()).toEqual(`table-row-${DATA[3][key].toString()}`);
		expect(rows.at(5).key()).toEqual(`table-row-${DATA[5][key].toString()}`);
	});

	it('Should call `onColumnClick` when a sortable column is clicked', () => {
		const onColumnClickHandler = jest.fn();

		const ascTableComponent = shallow(
			<Table
				columns={COLUMNS}
				data={DATA}
				rowKey="id"
				sortOrder="asc"
				sortColumn={COLUMNS[0].id}
				onColumnClick={onColumnClickHandler}
			/>
		);

		const column = ascTableComponent.find('thead > tr > th').first();

		column.simulate('click');

		expect(onColumnClickHandler).toHaveBeenCalled();
		expect(onColumnClickHandler).toHaveBeenCalledTimes(1);
		expect(onColumnClickHandler).toHaveBeenCalledWith(COLUMNS[0].id);
	});

	it('Should not call `onColumnClick` when a non-sortable column is clicked', () => {
		const onColumnClickHandler = jest.fn();

		const ascTableComponent = shallow(
			<Table columns={COLUMNS} data={DATA} rowKey="id" onColumnClick={onColumnClickHandler} />
		);

		const column = ascTableComponent.find('thead > tr > th').last();

		column.simulate('click');

		expect(onColumnClickHandler).toHaveBeenCalledTimes(0);
	});

	it('Should render an `emptyStateMessage` when no data is passed', () => {
		const emptyStateMessage = 'No data test test no data...';

		const tableComponent = mount(
			<Fragment>
				<Table
					columns={COLUMNS}
					data={[]}
					rowKey="id"
					emptyStateMessage={emptyStateMessage}
				/>
			</Fragment>
		);

		const emptyStateParagraph = tableComponent.find('div.u-spacer-left-s.u-spacer-top');

		expect(emptyStateParagraph.text()).toEqual(emptyStateMessage);
	});

	it('Should not render an `emptyStateMessage` when data is passed', () => {
		const emptyStateMessage = 'No data test test no data...';

		const tableComponent = shallow(
			<Table
				columns={COLUMNS}
				data={DATA}
				rowKey="id"
				emptyStateMessage={emptyStateMessage}
			/>
		);

		const emptyStateParagraph = tableComponent.find('p.u-spacer-top');

		expect(emptyStateParagraph).toHaveLength(0);
	});

	it('Should not render an `emptyStateMessage` when it was not passed', () => {
		const tableComponent = shallow(<Table columns={COLUMNS} data={[]} rowKey="id" />);

		const emptyStateParagraph = tableComponent.find('p.u-spacer-top');

		expect(emptyStateParagraph).toHaveLength(0);
	});
});
