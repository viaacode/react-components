import { loremIpsum } from 'lorem-ipsum';

export const RICH_TEXT_MOCK = {
	content: `
# Title

${loremIpsum({ count: 20 })}

* one
* two
* three

<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>
`,
};
