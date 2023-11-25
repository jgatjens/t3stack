import nextIntl from "next-intl/plugin";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
*/
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {};

// Use nextIntl to extend your configuration with the next-intl plugin
const withNextIntl = nextIntl("./src/i18n.ts");

export default withNextIntl(config);
