import { render } from '@testing-library/react';

import Alert from './Alert';
import type { AlertProps } from './Alert.types';

const mockTitle = 'Title';
const mockContent = <p>content</p>;
const mockIcon = <span />;

const renderAlert = ({
	title = mockTitle,
	content = mockContent,
	icon = mockIcon,
	...rest
}: AlertProps) => {
	return render(<Alert title={title} content={content} icon={icon} {...rest} />);
};

describe('<Alert />', () => {
	it('Should be able to render', () => {
		const title = 'Alert-title';
		const contentText = 'Alert-content';
		const content = <p>{contentText}</p>;
		const { getByText } = renderAlert({ title, content, id: 'alert-1' });

		const AlertTitle = getByText(title);
		const AlertContent = getByText(contentText);

		expect(AlertTitle).toBeInTheDocument();
		expect(AlertContent).toBeInTheDocument();
	});

	it('Should render a react node correctly', () => {
		const title = 'title';
		const mockContent = 'content';
		const mockClass = 'class';
		const content = <div className={mockClass}>{mockContent}</div>;
		const { getByText } = renderAlert({ title, content, id: 'alert-1' });

		const component = getByText(mockContent);

		expect(component).toBeInTheDocument;
		expect(component).toHaveClass(mockClass);
	});

	it('Should set the correct className', () => {
		const title = 'Alert-title';
		const rootClassName = 'c-Alert';
		const className = 'c-Alert-custom';
		const content = <div>content</div>;
		const { container } = renderAlert({
			title,
			content,
			className,
			id: 'alert-1',
			rootClassName,
		});

		expect(container.firstChild).toHaveClass(rootClassName);
		expect(container.firstChild).toHaveClass(className);
	});

	it('Should render an icon if provided', () => {
		const title = 'Alert-title';
		const className = 'c-Alert-custom';
		const content = <div>content</div>;
		const { container } = renderAlert({
			title,
			content,
			className,
			id: 'alert-1',
		});

		const iconContainer = container.querySelectorAll('.c-Alert__icon');

		expect(iconContainer).toHaveLength(iconContainer.length);
	});
});
