"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function UIProvider(props: ColorModeProviderProps) {
	return (
		<ColorModeProvider {...props} forcedTheme="light">
			<ChakraProvider value={defaultSystem}>{props.children}</ChakraProvider>
		</ColorModeProvider>
	);
}
