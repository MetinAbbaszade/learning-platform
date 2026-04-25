# ADR 1: Adopt Chakra UI for Application UI Layer
Use Chakra UI as the unified component library for all frontend applications in the monorepo.

## Status
`Approved`

## Context

The repository is structured as a Turborepo monorepo with multiple frontend applications:
* **apps/web** (main user-facing application)
* **apps/admin-ui** (admin interface)
* **packages/ui** (shared UI component library)

The UI layer must:

* Maintain consistent design across all applications
* Support shared components via @repo/ui
* Enable centralized theming and design tokens
* Provide accessible, production-ready components
* Avoid duplication and divergence between apps
* Work seamlessly within a monorepo + shared package architecture

Without a unified UI system, each application could introduce:

* inconsistent styling approaches
* duplicated components
* fragmented design decisions


## Decision

We adopt **Chakra UI** as the **single UI component system** for all frontend applications in the monorepo.

This includes:

* apps/web
* apps/admin-ui
* packages/ui (shared components built on Chakra)

All UI development must:

* Use Chakra UI components
* Use Chakra’s theming system
* Share reusable components via @repo/ui

## Consequences

### Positive

* Consistent UI across all frontend apps
* Shared component system via packages/ui
* Centralized theme and design tokens
* Built-in accessibility (WAI-ARIA compliant)
* Faster development through reusable primitives
* Reduced duplication across apps
* Cleaner separation between UI and business logic

### Negative

* Slight increase in bundle size due to Chakra runtime
* Some complex components (e.g. advanced tables, data grids) may require additional libraries
* Requires proper setup in Next.js (transpilePackages) for monorepo compatibility

## Compliance

Chakra UI supports accessibility best practices and WAI-ARIA standards by default.

## Notes

* **Author:** Metin Abbaszade
* **Date Modified:** 2026-04-26
* **Approvers:** Metin Abbaszade
* **Related Links:**
    * [Chakra UI Documentation](https://chakra-ui.com/docs/get-started/installation)
