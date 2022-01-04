import { act, renderHook } from '@testing-library/react-hooks';

import { useCallbackRef } from '.';

describe('hooks/useCallbackRef', () => {
	it('Should keep a ref to an element', () => {
		const div = document.createElement('div');
		const { result } = renderHook(() => useCallbackRef(div));

		expect(result.current[0]).toBe(div);
	});

	it('Should update a ref', () => {
		const { result } = renderHook(() => useCallbackRef());
		const [, setRef] = result.current;

		const div = document.createElement('div');

		act(() => {
			setRef(div);
		});

		expect(result.current[0]).toBe(div);
	});

	it('Should not update if ref is null', () => {
		const div = document.createElement('div');
		const { result } = renderHook(() => useCallbackRef(div));
		const [, setRef] = result.current;

		act(() => {
			setRef(null);
		});

		expect(result.current[0]).toBe(div);
	});
});
