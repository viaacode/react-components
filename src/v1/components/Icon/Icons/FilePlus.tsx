import React, { SVGProps } from 'react';
export const FilePlus = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<path
			d="M18 23H6c-1.654 0-3-1.346-3-3V4c0-1.654 1.346-3 3-3h8c.266 0 .52.105.707.293l6 6A.997.997 0 0121 8v12c0 1.654-1.346 3-3 3zM6 3c-.551 0-1 .449-1 1v16c0 .552.449 1 1 1h12a1 1 0 001-1V8.414L13.586 3H6z"
			fill="#000"
		/>
		<path
			d="M20 9h-6a1 1 0 01-1-1V2a1 1 0 112 0v5h5a1 1 0 110 2zM12 19a1 1 0 01-1-1v-6a1 1 0 012 0v6a1 1 0 01-1 1z"
			fill="#000"
		/>
		<path d="M15 16H9a1 1 0 110-2h6a1 1 0 110 2z" fill="#000" />
	</svg>
);
