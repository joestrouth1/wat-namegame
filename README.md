# wat-namegame

[![Netlify Status](https://api.netlify.com/api/v1/badges/35215cd1-f5d0-42dc-9ff3-2682be4d452c/deploy-status)](https://app.netlify.com/sites/wat-namegame/deploys)

A web game where users earn points for putting faces with names.

## Get started - clone and install

**Prerequisites**: Git, Node.js (v14+ recommended), and NPM

```
git clone git@github.com:joestrouth1/wat-namegame
npm install
```

### Build application and start local development server

```
npm run serve
```


### Project overview

Updated UI designs are available on the `web` page of [this Figma file](https://www.figma.com/file/4mvW85nIusoLmoRfSaHArR/wat-namegame?node-id=3637%3A1255).

```
  .
  ├── node_modules
  ├── public
  ├── src
  ├── tests
  ├── App.vue
  ├── main.ts
  ├── *.d.ts
  └── README.md
```

- `node_modules`: Where dependencies are installed. Do not edit these files manually.
- `public`: These files are copied to the root of the application when its built, without processing by the build system. The one exception is `index.html` which is used as a template for the built page. Also includes files for Progressive Web Application icons and controlling bots/crawlers.
- `src`: The heart of the app.
  - `assets`: Non-markup files that aren't specific to any one component. Includes images and shared stylesheets.
  - `components`: Shared Vue components that are not a route/page.
  - `router`: Maps Vue components to URLs and defines navigation behavior.
  - `store`: Manages fetching, storing, and updating the state of the application. Includes two modules for managing employees and game scoring.
  - `views`: Vue components that define one route or URL. These are never reused and should not be imported anywhere other than `router`.
- `tests`: Automated tests. Only includes `/unit` for now, with room for adding `/e2e` or other tests later.
- `App.vue`: The root Vue component of the application. Sets global styles and renders the current route component.
- `main.ts`: The entry point of the application. Sets up the router and store before rendering the `App`.
- `*.d.ts`: Type declaration files. These give TypeScript information about untyped modules or augment existing types with additional context specific to this application.
- `README.md`: 📌 You are here!

### Create a production build - transpiled and minified

Built application will be in `/dist`.

```
npm run build
```

In most cases, you can rely on Netlify (or your choice of CI/CD) to do this for you.

You may configure some aspects of the build in these locations:

- `/vue.config.js` - [Vue CLI](https://cli.vuejs.org/guide/), a tool for building [Vue.js](https://v3.vuejs.org/) applications. Can be used to customize the webpack build, PWA manifest, and more.
- `/babel.config.js` - [Babel](https://babeljs.io/), a tool for transforming JavaScript.
- `/tsconfig.json` - TypeScript, a typed superset of JavaScript that can help prevent runtime errors and gives more useful autocomplete while developing.
- `/.browserslistrc` - [Browserslist](https://github.com/browserslist/browserslist) specifies which browsers the application supports. This list is used by other tools like Babel when adding polyfills or transpiling the application for compatability.
- `/netlify.toml` - Adds redirects, HTTP headers, and/or build commands for [Netlify](https://www.netlify.com/) hosting.

### Run your unit tests

```
npm run test:unit
```

This project uses [Jest](https://jestjs.io/) to run tests. It's configured in `/jest.config.js`.

For testing Vue components, the project includes [Vue Test Utils](https://next.vue-test-utils.vuejs.org/).

There aren't many tests right now. Were I to add tests, I would start with the store modules. They're the most complex and critical components of the application.

Page components in `/views` would be the next priority, but given their reliance on the store and router, they're better suited to integration/e2e tests. The additional tooling required to add useful tests for those would have taken too much time to justify for an app that will be unmaintained next week.

Any shared Vue components are very simple, with little to no state and few props. 
Adding tests to leaf components like these could quickly venture into testing the framework, i.e. that child content is rendered or that click events are emitted. Could still be worth it down the line if/when the application grows.

### Lint and fix files

```
npm run lint
```

This project uses [ESLint](https://eslint.org/), configured in `/eslintrc.js`, to help ensure consistent code quality and style.

### Commit your changes

```
git add <file-paths>
git commit
```

ESLint and [Commitizen](https://github.com/commitizen/cz-cli) will run before your commit is made.

Commitizen will prompt you to specify the type and scope of your changes, whether they're breaking or connected to known issues, and enforce a consistent style of commit message. This is configured in `/.czrc` and currently set to [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog).

Please use these prompts rather than directly passing an irregular message with `-m`.
Doing so could allow for auto-generated changelogs and reports in the future.

## Other docs

There are some other notes about this project in [/docs](https://github.com/joestrouth1/wat-namegame/tree/main/docs).
