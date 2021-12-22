import React, { FunctionComponent, ReactNode } from 'react';

export interface SwatchListProps {
	children: ReactNode;
}

export const SwatchList: FunctionComponent<SwatchListProps> = ({ children }) => (
	<div className="c-swatch-list">{children}</div>
);
