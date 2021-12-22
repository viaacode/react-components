import { storiesOf } from '@storybook/react';
import { intersectionBy, times } from 'lodash-es';
import React, { cloneElement, ReactElement, useEffect, useState } from 'react';

import { action } from '../../helpers';
import { testRenderLink } from '../../helpers/render-link';

import { BlockPageOverview, LabelObj, PageInfo } from './BlockPageOverview';
import { CONTENT_PAGES_MOCK } from './BlockPageOverview.mock';

const tabs = [
	{ label: 'test1', id: 1 },
	{ label: 'test2', id: 2 },
];

const itemsPerPage = 2;
const mockPages = CONTENT_PAGES_MOCK.map((page) => ({
	...page,
	blocks: <p>Test content page blocks</p>,
}));

const BlockPageOverviewStoryComponent = ({
	children,
	initialPageIndex = 0,
	itemsOnPage = itemsPerPage,
}: {
	children: ReactElement;
	initialPageIndex?: number;
	itemsOnPage?: number;
}) => {
	const [currentPage, setCurrentPage] = useState<number>(initialPageIndex);
	const [selectedTabs, setSelectedTabs] = useState<LabelObj[]>([]);
	const [pages, setPages] = useState<PageInfo[]>(mockPages.slice(0, itemsOnPage));
	const [pageCount, setPageCount] = useState<number>(mockPages.length / itemsOnPage);

	useEffect(() => {
		let filteredPages: PageInfo[];
		if (selectedTabs.length) {
			filteredPages = mockPages.filter((page) => {
				return !!intersectionBy(
					page.labels,
					selectedTabs,
					(labelObj: LabelObj) => labelObj.id
				).length;
			});
		} else {
			filteredPages = mockPages;
		}
		setPages(filteredPages.slice(itemsOnPage * currentPage, itemsOnPage * (currentPage + 1)));
		setPageCount(Math.ceil(filteredPages.length / itemsOnPage));
	}, [selectedTabs, currentPage, itemsOnPage]);

	return cloneElement(children, {
		currentPage,
		selectedTabs,
		pages,
		pageCount,
		onCurrentPageChanged: (pageIndex: number) => {
			action('page changed')(pageIndex);
			setCurrentPage(pageIndex);
		},
		onSelectedTabsChanged: (tabs: LabelObj[]) => {
			action('tabs changed')(tabs);
			setSelectedTabs(tabs);
			setCurrentPage(0);
		},
	});
};

const baseProps = {
	tabs,
	currentPage: 0,
	onCurrentPageChanged: () => null,
	onSelectedTabsChanged: () => null,
	pageCount: 1,
	pages: [],
	selectedTabs: [],
	itemStyle: 'NEWS_LIST' as any,
	tabStyle: 'MENU_BAR' as any,
	renderLink: testRenderLink(action('navigate')),
	focusedPage: null,
};

storiesOf('v1/blocks/BlockPageOverview', module)
	.addParameters({ jest: ['BlockPageOverview'] })
	.add('BlockPageOverview', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview {...baseProps} tabs={[]} />
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview accordions', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview {...baseProps} tabs={[]} itemStyle="ACCORDION" />
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview menu NEWS_LIST', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview
				{...baseProps}
				itemStyle="NEWS_LIST"
				showDate
				onLabelClicked={action('label clicked')}
			/>
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview menu PROJECT_LIST', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview
				{...baseProps}
				itemStyle="PROJECT_LIST"
				buttonLabel="Bekijk project"
			/>
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview dark tabs', () => (
		<div style={{ position: 'relative' }}>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '60px',
					backgroundColor: '#1D637A',
				}}
			/>
			<BlockPageOverviewStoryComponent initialPageIndex={0}>
				<BlockPageOverview
					{...baseProps}
					darkTabs
					itemStyle="NEWS_LIST"
					showDate
					onLabelClicked={action('label clicked')}
				/>
			</BlockPageOverviewStoryComponent>
		</div>
	))
	.add('BlockPageOverview header center', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview {...baseProps} centerHeader />
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview accordions with header', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview {...baseProps} itemStyle="ACCORDION" />
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview accordions with focus', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0} itemsOnPage={20}>
			<BlockPageOverview
				{...baseProps}
				itemStyle="ACCORDION"
				focusedPage={mockPages.find((page) => page.id === 31) || null}
			/>
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview menu grid', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0} itemsOnPage={1000}>
			<BlockPageOverview {...baseProps} itemStyle="GRID" />
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview menu grid multi', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0} itemsOnPage={1000}>
			<BlockPageOverview {...baseProps} itemStyle="GRID" allowMultiple />
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview badges', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview {...baseProps} tabStyle={'ROUNDED_BADGES'} />
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview badges allow multiple', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview {...baseProps} tabStyle={'ROUNDED_BADGES'} allowMultiple />
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview badges wrapping and center', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview
				{...baseProps}
				tabStyle={'ROUNDED_BADGES'}
				tabs={times(20, (i) => ({ label: `label-${i}`, id: i }))}
				centerHeader
			/>
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview show date', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview
				{...baseProps}
				showDate
				dateString="Geplaatst in %label% op %date%"
				getLabelLink={(label) => `https://google.com?q=${encodeURIComponent(label)}`}
			/>
		</BlockPageOverviewStoryComponent>
	))
	.add('BlockPageOverview empty tab', () => (
		<BlockPageOverviewStoryComponent initialPageIndex={0}>
			<BlockPageOverview
				{...baseProps}
				tabs={[{ label: 'empty', id: 0 }, ...baseProps.tabs]}
				tabStyle={'MENU_BAR'}
			/>
		</BlockPageOverviewStoryComponent>
	));
