import { render, screen } from '@testing-library/react';
import React from 'react';

import type { RefTypes } from '../../types/index.js';

import { mergeRefs } from './merge-refs.js';

const mockText = 'Hello World';
const ComponentWithRefs = ({ refs }: { refs: RefTypes<HTMLDivElement | null>[] }) => {
	return <div ref={mergeRefs(refs)}>{mockText}</div>;
};

describe('Utils', () => {
	describe('mergeRefs()', () => {
		it('Should merge refs', () => {
			const ref1 = jest.fn();
			const ref2 = jest.fn();

			render(<ComponentWithRefs refs={[ref1, ref2]} />);

			const text = screen.queryByText(mockText);

			expect(ref1).toHaveBeenCalled();
			expect(ref2).toHaveBeenCalled();
			expect(ref1).toHaveBeenCalledWith(text);
			expect(ref2).toHaveBeenCalledWith(text);
		});
	});
});
