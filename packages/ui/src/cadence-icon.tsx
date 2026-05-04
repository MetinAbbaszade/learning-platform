"use client";
import { createIcon } from "@chakra-ui/react";

export const CadenceIcon = createIcon({
	displayName: "CadenceIcon",
	viewBox: "0 0 200 200",
	path: [
		<rect
			key="1"
			x="0"
			y="0"
			width="200"
			height="200"
			rx="36"
			fill="#1a1d1a"
		/>,
		<path
			key="2"
			d="M 50 130 Q 100 50 150 130"
			fill="none"
			stroke="#e8dcc4"
			strokeWidth="8"
			strokeLinecap="round"
		/>,
		<circle key="3" cx="100" cy="135" r="6" fill="#e8dcc4" />,
		<circle key="4" cx="70" cy="165" r="4" fill="#c97a4a" />,
		<circle key="5" cx="100" cy="165" r="5" fill="#c97a4a" />,
		<circle key="6" cx="130" cy="165" r="6" fill="#c97a4a" />,
	],
});
