### @repo/just-in-time

- this package **does not need to be compiled** before being used by an application.
- in our web application configuration i.e. [next.config.js](../../apps/web/next.config.js). we specify the setting
`transpilePackages: ["@repo/just-in-time"]` such that it'll compile/transpile this package when the web application
builds/bundles itself (during `build` and `dev`).
- that's it.
