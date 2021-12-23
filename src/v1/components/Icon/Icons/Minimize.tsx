import React, { SVGProps } from 'react';
export const Minimize = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<path
			d="M10 21a1 1 0 01-1-1v-5H4a1 1 0 110-2h6a1 1 0 011 1v6a1 1 0 01-1 1zM20 11h-6a1 1 0 01-1-1V4a1 1 0 112 0v5h5a1 1 0 110 2z"
			fill="#000"
		/>
		<path
			d="M14 11a.999.999 0 01-.707-1.707l7-7a.999.999 0 111.414 1.414l-7 7A.997.997 0 0114 11zM3 22a.999.999 0 01-.707-1.707l7-7a.999.999 0 111.414 1.414l-7 7A.997.997 0 013 22z"
			fill="#000"
		/>
	</svg>
);
