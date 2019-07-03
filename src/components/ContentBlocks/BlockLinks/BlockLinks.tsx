import React, { FunctionComponent } from 'react';

import { Container } from '../../Container/Container';

export interface BlockLinksProps {
	uniqueKey: string; // Needed to ensure react can keep track of the list of rendered items
	links: { label: string; url: string }[];
}

export const BlockLinks: FunctionComponent<BlockLinksProps> = ({
	uniqueKey,
	links,
}: BlockLinksProps) => {
	return (
		<div className="o-container-vertical o-container-vertical-anchor-links">
			<Container mode="horizontal">
				<div className="o-flex o-flex--horizontal-center">
					<ul className="c-bordered-list-horizontal">
						{links.map(linkInfo => (
							<li key={`${uniqueKey}-${linkInfo.url}`}>
								<a href={linkInfo.url}>{linkInfo.label}</a>
							</li>
						))}
					</ul>
				</div>
			</Container>
		</div>
	);
};