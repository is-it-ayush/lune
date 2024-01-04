### @repo/compiled

- this package **needs to be compiled** before being used by an application.
- it uses [tsup](https://github.com/egoist/tsup) to do the compilation. checkout [tsup.config.js](./tsup.config.js).
- our `turbo.json` pipeline at root takes care of compiling this package before `dev` and `build` scripts run. it does so
with `^topo` whereby a consuming package/application executes `y` script on all of it's workspace dependencies before
executing `y` script on itself (a kind of a topological dependency tree).
- that's it.
