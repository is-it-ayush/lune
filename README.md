### turborepo-starter.

A base template for turborepo-next-tailwind.

```sh
git clone https://github.com/is-it-ayush/turborepo-starter.git ./turborepo-starter
&& cd ./turborepo-starter
&& rm -rf .git
&& git init
&& git commit -am "chore: init turborepo-starter"
```

### structure.

```
.
├── ./apps/
│   └── ./web (@repo/web): A nextjs website.
├── ./packages/
│   ├── ./just-in-time (@repo/just-in-time): A transpiled package.
│   └── ./compiled (@repo/compiled): A compiled package.
└── ./tooling/
    ├── ./eslint-config (@repo/lint): Reuseable Eslint Configurations.
    └── ./tsconfig (@repo/tsconfig): Reuseable Typescript Configurations.
```

### packages.

There are two types of packages and an example of both is included in this starter. You can chose the style you
like and remove the other or you could keep both.

- `compiled packages`: these packages **need to be compiled** (/transpiled) before they can be used in your app.
  - example: [@repo/compiled](./packages/compiled/)
- `transpiled packages`: these packages **do not need to be compiled** (/transpiled) before they can be used in your app. instead,
they are compiled during application bundling (tranpilation) by the bundler.
  - example: [@repo/just-in-time](./packages/just-in-time/)

### license.

It's MIT. You can read it [here](./LICENSE.md).

### credits.

by [@is_it_ayush](https://x.com/is_it_ayush) with the help of [monorepo maestros](https://www.shew.dev/monorepos).
