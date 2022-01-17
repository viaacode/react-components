import React, { SVGProps } from 'react';
export const Flag = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<path
			d="M16 17c-1.692 0-3.054-.545-4.372-1.071C10.435 15.451 9.308 15 8 15c-2.445 0-3.31.724-3.318.731a1.023 1.023 0 01-1.083.166A.994.994 0 013 15V3c0-.265.105-.52.293-.707C3.509 2.077 4.75 1 8 1c1.692 0 3.054.545 4.372 1.071C13.565 2.549 14.692 3 16 3c2.444 0 3.31-.724 3.318-.731a1.028 1.028 0 011.084-.166A.996.996 0 0121 3v12c0 .266-.105.52-.293.707C20.491 15.923 19.25 17 16 17zm-8-4c1.692 0 3.054.545 4.372 1.071 1.193.478 2.32.929 3.628.929 1.633 0 2.562-.323 3-.54V4.606c-.721.222-1.699.394-3 .394-1.692 0-3.054-.545-4.372-1.071C10.435 3.451 9.308 3 8 3c-1.633 0-2.561.323-3 .54v9.854C5.72 13.173 6.699 13 8 13z"
			fill="#000"
		/>
		<path d="M4 23a1 1 0 01-1-1v-7a1 1 0 112 0v7a1 1 0 01-1 1z" fill="#000" />
	</svg>
);