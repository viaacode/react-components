import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';

import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

import { Toolbar } from './Toolbar';
import { ToolbarCenter, ToolbarLeft, ToolbarRight } from './Toolbar.slots';
import { ToolbarItem } from './ToolbarItem/ToolbarItem';
import { ToolbarTitle } from './ToolbarTitle/ToolbarTitle';

storiesOf('v1/components/Toolbar', module)
	.addParameters({ jest: ['Toolbar', 'ToolbarItem', 'ToolbarTitle'] })
	.add('Toolbar', () => (
		<Fragment>
			<Toolbar>
				<ToolbarLeft>
					<ToolbarItem>
						<Icon name="chevron-left" />
					</ToolbarItem>
				</ToolbarLeft>
				<ToolbarCenter>
					<ToolbarItem>
						<ToolbarTitle>Regular toolbar</ToolbarTitle>
					</ToolbarItem>
				</ToolbarCenter>
				<ToolbarRight>
					<ToolbarItem>
						<Button type="primary" label="Save" ariaLabel="Save" />
					</ToolbarItem>
				</ToolbarRight>
			</Toolbar>
			<br />
			<Toolbar size="medium">
				<ToolbarLeft>
					<ToolbarItem>
						<Icon name="chevron-left" />
					</ToolbarItem>
				</ToolbarLeft>
				<ToolbarCenter>
					<ToolbarItem>
						<p>Toolbar medium</p>
					</ToolbarItem>
				</ToolbarCenter>
				<ToolbarRight>
					<ToolbarItem>
						<Button type="primary" label="Save" ariaLabel="Save" />
					</ToolbarItem>
				</ToolbarRight>
			</Toolbar>
			<br />
			<Toolbar spaced>
				<ToolbarLeft>
					<ToolbarItem>
						<Icon name="chevron-left" />
					</ToolbarItem>
				</ToolbarLeft>
				<ToolbarCenter>
					<ToolbarItem>
						<p>Toolbar spaced</p>
					</ToolbarItem>
				</ToolbarCenter>
				<ToolbarRight>
					<ToolbarItem>
						<Button type="primary" label="Save" ariaLabel="Save" />
					</ToolbarItem>
				</ToolbarRight>
			</Toolbar>
			<br />
			<Toolbar justify>
				<ToolbarLeft>
					<ToolbarItem>
						<Icon name="chevron-left" />
					</ToolbarItem>
				</ToolbarLeft>
				<ToolbarCenter>
					<ToolbarItem>
						<p>Toolbar justified</p>
					</ToolbarItem>
				</ToolbarCenter>
				<ToolbarRight>
					<ToolbarItem>
						<Button type="primary" label="Save" ariaLabel="Save" />
					</ToolbarItem>
				</ToolbarRight>
			</Toolbar>
			<br />
			<Toolbar autoHeight>
				<ToolbarLeft>
					<ToolbarItem>
						<Icon name="chevron-left" />
					</ToolbarItem>
				</ToolbarLeft>
				<ToolbarCenter>
					<ToolbarItem>
						<p>Toolbar autoheight</p>
					</ToolbarItem>
				</ToolbarCenter>
				<ToolbarRight>
					<ToolbarItem>
						<Button type="primary" label="Save" ariaLabel="Save" />
					</ToolbarItem>
				</ToolbarRight>
			</Toolbar>
			<br />
			<Toolbar alignTop>
				<ToolbarLeft>
					<ToolbarItem>
						<Icon name="chevron-left" />
					</ToolbarItem>
				</ToolbarLeft>
				<ToolbarCenter>
					<ToolbarItem>
						<p>Toolbar alignTop</p>
					</ToolbarItem>
				</ToolbarCenter>
				<ToolbarRight>
					<ToolbarItem>
						<Button type="primary" label="Save" ariaLabel="Save" />
					</ToolbarItem>
				</ToolbarRight>
			</Toolbar>
		</Fragment>
	))
	.add('Left toolbar', () => (
		<Toolbar>
			<ToolbarLeft>
				<ToolbarItem>
					<Icon name="chevron-left" />
				</ToolbarItem>
			</ToolbarLeft>
		</Toolbar>
	))
	.add('Center toolbar', () => (
		<Toolbar>
			<ToolbarCenter>
				<ToolbarItem>
					<p>Only stuff in the center</p>
				</ToolbarItem>
			</ToolbarCenter>
		</Toolbar>
	))
	.add('Right toolbar', () => (
		<Toolbar>
			<ToolbarRight>
				<ToolbarItem>
					<Button type="primary" label="Only right" ariaLabel="Only right" />
				</ToolbarItem>
			</ToolbarRight>
		</Toolbar>
	))
	.add('Full toolbar', () => (
		<Toolbar justify>
			<ToolbarItem grow>
				<div
					style={{
						margin: '3.2rem 0',
						border: 'none',
						borderBottom: '1px solid #D6DEE3',
					}}
				/>
			</ToolbarItem>
			<ToolbarItem>
				<Button type="secondary" icon="add" ariaLabel="Sectie toevoegen" />
			</ToolbarItem>
			<ToolbarItem grow>
				<div
					style={{
						margin: '3.2rem 0',
						border: 'none',
						borderBottom: '1px solid #D6DEE3',
					}}
				/>
			</ToolbarItem>
		</Toolbar>
	));
