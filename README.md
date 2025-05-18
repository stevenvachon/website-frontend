# website-frontend [![Coverage Status][codecov-image]][codecov-url]

> My website's frontend.

**Note**: this repository/project is _UNLICENSED_. If you don't know what that means, Google it.

Also: the "website-projectile-pixels" dependency is pointed to a private repository, so **it will always fail to install** for anyone but me.

## Installation

Be sure that [Git](https://git-scm.com) `>= 2` is installed.

Open a command line at, or change directory (`cd`) to where you'd like the project to exist (as a sub-directory).

Checkout the repository:

```shell
git clone git@github.com:stevenvachon/website-frontend.git
```

Open the project directory:

```shell
cd website-frontend
```

Be sure that [Node.js](https://nodejs.org) `>= 24` is installed.

Install all dependencies:

```shell
npm install
```

## Building & Linting

A development build can be performed automatically as files change via:

```shell
npm run dev
```

A production build can be performed manually via:

```shell
npm run build
```

A lint for all JavaScript files via:

```shell
npm run lint
```

## Testing

The test suite can be ran manually via:

```shell
npm test
```

… or as files are changed via:

```shell
npm run test:watch
```

## Deploying

Deployment will be performed automatically when pushing/merging to the "main" branch.

## To-do

- Remove comments and TODOs.
- Try adding the pane grain back when it renders correctly with `position: sticky`.
- Try adding a gradient to titles again when the pixelate filter supports them.
- Add a--simple math or honeypot--captcha to the contact form or switch to JS submission to prevent any abuse from bots.
- Use GitHub Packages instead of private repository for `website-projectile-pixels`.
- Switch from Nunjucks to JSX (or TSX) when it supports front matter.
- ~~Move blog post `title`s from their front matter to `#` header when possible.~~
- Move `title` concatenations from `index` layout to their respective chained layouts' front matter when possible.
- Remove `build:clean:post` npm script when possible.
- Add print CSS; maybe use `@media print {}`.
- Try using `display: grid` instead of `flex` because it was blocking `container-type`.
- Add `@container` query to remove blog sidebar when too narrow (primarily for user-set larger fonts).
- Add `site.version` to _styles.css_ and _scripts.js_.
- Try using ~~parcel~~ ~~esbuild~~ Rollup or Vite instead of webpack.
- Try switching to npm workspaces.
- Try [element-ready](https://npmjs.com/element-ready) again when possible: https://github.com/sindresorhus/element-ready/issues/52.
- Clean up text effects suffering from https://github.com/mattboldt/typed.js/issues/624.
- Add HTML and [sitemap] XML validator to build--`npm run validate:html`, `npm run validate:sitemap`, `npm test` (runs both).
- Inline code demos with some widget.
- Fix [`<figcaption>` issue](https://github.com/arve0/markdown-it-implicit-figures/issues/56).
- ~~Blog archives.~~
- Exclude atom/rss feed from sitemap: https://github.com/11ty/eleventy-plugin-rss/issues/62
- Make tags list in _content/blog/category.njk_ dynamic somehow and strip the "blog-category-" prefix from generated output:
  - https://github.com/11ty/eleventy/discussions/3690
  - https://github.com/11ty/eleventy/discussions/3691

[codecov-image]: https://img.shields.io/codecov/c/github/stevenvachon/website-frontend
[codecov-url]: https://app.codecov.io/github/stevenvachon/website-frontend
