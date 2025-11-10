import { render } from '@testing-library/react';

import Avatar from './Avatar.js';
import type { AvatarProps } from './Avatar.types.js';

const renderAvatar = ({ text = 'text', ...props }: AvatarProps) => {
	return render(
		<Avatar {...props} text={text}>
			{props.children}
		</Avatar>
	);
};

describe('<Avatar />', () => {
	it('Should be able to render', () => {
		const text = 'avatar-text';
		const { getByText } = renderAvatar({ text });

		const avatar = getByText(text);

		expect(avatar).toBeInTheDocument();
	});

	it('Should render the text correctly', () => {
		const text = 'this is an avatar';
		const { container } = renderAvatar({ text });

		const avatar = container.firstChild;

		expect(avatar?.textContent).toEqual(text);
	});

	it('Should render a react node correctly', () => {
		const mockLabel = 'avatar';
		const mockClass = 'className';
		const text = <span className={mockClass}>{mockLabel}</span>;
		const { getByText } = renderAvatar({ text });

		const component = getByText(mockLabel);

		expect(component).toBeInTheDocument;
		expect(component).toHaveClass(mockClass);
	});

	it('Should set the correct className', () => {
		const text = 'a person';
		const className = 'c-profile';
		const variants = ['black'];
		const { getByText } = renderAvatar({ text, className, variants });

		const avatar = getByText(text).parentElement;

		expect(avatar).toHaveClass('c-avatar');
		expect(avatar).toHaveClass(className);
		expect(avatar).toHaveClass(`c-avatar--${variants[0]}`);
	});

	it('Should be able to render an avatar', () => {
		const text = 'avatar-text';
		const children = 'child';
		const { getByText } = renderAvatar({ text, children });

		const avatar = getByText(children);

		expect(avatar).toBeInTheDocument();
	});
});
