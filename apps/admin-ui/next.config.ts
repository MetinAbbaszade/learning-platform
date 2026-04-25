import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Transpile internal workspace package (@repo/ui)
	// In a Turborepo setup, shared packages are not precompiled like node_modules.
	// This tells Next.js to include @repo/ui in its build pipeline (SWC/webpack)
	// so TypeScript/ESM code from the UI package can be resolved correctly.
	transpilePackages: ["@repo/ui"],
};

export default nextConfig;
