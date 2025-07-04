import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { type CSSProperties } from 'react';

import { Card } from './Card';
import { cardImageMock, cardTitleMock } from './__mocks__/card';

export default {
	title: 'Components/Card',
	component: Card,
} as ComponentMeta<typeof Card>;

const container: CSSProperties = {
	display: 'flex',
	margin: '-10px',
};
const column: CSSProperties = { flex: '1 1 0', margin: '10px' };
const h2: CSSProperties = { fontSize: '3.2rem', lineHeight: 1 };

const Template: ComponentStory<typeof Card> = (args) => {
	return (
		<>
			<section style={{ ...container, flexDirection: 'row' }}>
				<div style={column}>
					<h4>Simple</h4>

					<br />

					<Card {...args} image={undefined} title={undefined}>
						The simplest card
					</Card>
				</div>

				<div style={column}>
					<h4>Border</h4>

					<br />

					<Card {...args} title="A card with a zinc-colored border">
						This card is still pretty basic but also has an image and a title
					</Card>
				</div>

				<div style={column}>
					<h4>Edgeless</h4>

					<br />

					<Card {...args} edge="none" padding="vertical" title={<b>A card with no border</b>}>
						Now that&apos;s more like it, this card has an image, a title in bold, gets rid of the
						border and adds some much needed vertical padding
					</Card>
				</div>

				<div style={column}>
					<h4>Padded</h4>

					<br />

					<Card
						{...args}
						padding="both"
						title="A card with a few more things"
						subtitle="Including a subtitle"
						toolbar="both"
					>
						Things keep getting better; Now we have a card that has padding on both the content and
						image, reintroducs the border, adds a subtitle and adds &quot;both&quot; in the
						toolbar-area
					</Card>
				</div>

				<div style={column}>
					<h4>Wide</h4>

					<br />

					<Card
						{...args}
						padding="content"
						title="A card with padding on just the content"
						toolbar="content"
					>
						Okay, maybe we&apos;d like to give our visual just that little bit of extra space...
					</Card>
				</div>
			</section>

			<br />

			<section style={{ ...container }}>
				<div style={column}>
					<h4>Padded + Horizontal</h4>

					<br />

					<Card
						{...args}
						padding="both"
						orientation="horizontal"
						title={<b>A horizontal card with padding on both image and content</b>}
						subtitle="Studio Hyperdrive (15 dec. 2022) "
						toolbar="both + horizontal"
					>
						<span>
							Aenean nec feugiat nisi. Pellentesque vel nunc sit amet augue tincidunt egestas. Cras
							vitae molestie leo. Nullam sed arcu aliquet, porta massa vel, feugiat sapien.
						</span>
					</Card>
				</div>
				<div style={column}>
					<h4>Wide + Horizontal</h4>

					<br />

					<Card
						{...args}
						padding="content"
						orientation="horizontal"
						title="A horizontal card with padding on just the content"
						toolbar="content + horizontal"
					>
						<span>
							Aenean nec feugiat nisi. Pellentesque vel nunc sit amet augue tincidunt egestas. Cras
							vitae molestie leo. Nullam sed arcu aliquet, porta massa vel, feugiat sapien.
						</span>
					</Card>
				</div>
			</section>

			<br />

			<section style={{ ...container }}>
				<div style={column}>
					<h4>Dark</h4>

					<br />

					<Card
						{...args}
						mode="dark"
						edge="none"
						padding="content"
						orientation="horizontal"
						title={<h2 style={h2}>A dark card</h2>}
					>
						<span>
							Het Sint-Felixpakhuis is één van de meest tot de verbeelding sprekende voorbeelden,
							van pakhuizen uit de 19e eeuw. In 1860 werd het gebouwd als warenhuis voor simpele
							artikelen.
						</span>
					</Card>
				</div>
				<div style={column}>
					<h4>Offset</h4>

					<br />

					<Card
						{...args}
						mode="dark"
						edge="none"
						padding="content"
						orientation="horizontal"
						title={
							<h2 style={h2}>An offset card with a very long title that spans multiple lines</h2>
						}
						offset
					>
						<span>
							Het Museum voor Schone Kunsten Gent (MSK) is het oudste museum in België. De kern van
							de collectie gaat terug tot 1798. Het museum is gehuisvest in een verlaten deel van de
							binnenstad.
						</span>
					</Card>
				</div>
				<div style={column}>
					<h4>Tags</h4>

					<br />

					<Card
						{...args}
						mode="dark"
						edge="none"
						padding="content"
						orientation="horizontal"
						tags={
							<>
								This is a <b>tag.</b>
							</>
						}
						title={
							<h2 style={h2}>An offset card with a very long title that spans multiple lines</h2>
						}
						offset
					>
						<span>
							Het Museum voor Schone Kunsten Gent (MSK) is het oudste museum in België. De kern van
							de collectie gaat terug tot 1798. Het museum is gehuisvest in een verlaten deel van de
							binnenstad.
						</span>
					</Card>
				</div>
			</section>
		</>
	);
};

export const Overview: ComponentStory<typeof Card> = Template.bind({});
Overview.args = {
	title: <span>{cardTitleMock}</span>,
	image: <img className="u-image-responsive" src={cardImageMock} alt={cardTitleMock} />, //eslint-disable-line
};
