import React, { SVGProps } from 'react';
export const BellOff = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<g clipPath="url(#bell-off_svg__clip0)" fill="#000">
			<path d="M11.995 22.995a2.99 2.99 0 01-2.59-1.494.999.999 0 111.731-1.002 1 1 0 001.73-.001 1 1 0 011.729 1.004 3.002 3.002 0 01-2.6 1.493zM17 18H2a1 1 0 110-2c1.103 0 2-.897 2-2V9a8.056 8.056 0 01.891-3.68.999.999 0 111.777.918A6.04 6.04 0 006 8.998V14a3.97 3.97 0 01-.537 2H17a1 1 0 110 2zm2-4a1 1 0 01-1-1V9a6.01 6.01 0 00-.774-2.952A6.007 6.007 0 009.052 3.77a1 1 0 11-.984-1.742c3.842-2.167 8.731-.806 10.899 3.036A8.013 8.013 0 0119.999 9V13A.998.998 0 0119 14z" />
			<path d="M23 24a.997.997 0 01-.707-.293l-22-22A.999.999 0 111.707.293l22 22A.999.999 0 0123 24z" />
		</g>
		<defs>
			<clipPath id="bell-off_svg__clip0">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
