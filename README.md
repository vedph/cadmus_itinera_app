# Cadmus Itinera App

## Docker

Quick Docker image build:

1. `npm run build-all`
2. `ng build --prod`
3. `docker build . -t vedph2020/cadmus-itinera-app:1.0.30 -t vedph2020/cadmus-itinera-app:latest` (replace with the current version).

## Production

1. build the image as above.
2. after building the app, change `env.js` in the `dist` folder for these variables:

```js
window.__env.apiUrl = "https://itinera.unisi.it:54184/api/";
window.__env.biblioApiUrl = "https://itinera.unisi.it:61692/api/";
```

3. build a new image for production: `docker build . -t vedph2020/cadmus-itinera-app:1.0.29-prod`. The production version is labeled like this one, with `-prod` suffix.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Developer Environment

Quick link to the [procedure for adding new parts](https://github.com/vedph/cadmus_doc/blob/master/web/adding-parts.md).

Cadmus shell libraries are now public in NPM, so this project just links to them. When updating them:

- increase the version numbers in the app's `package.json`;
- increase the version numbers in the `peerDependencies` of each library using them (this is good practice, to be able to publish these libraries too, should they be reused in other projects).

### NPM Link

Before Cadmus shell libraries were published to NPM, we used `npm link` to link them to this project. This implies that you should clone the [cadmus-shell](https://github.com/vedph/cadmus_shell) repository, build all the libraries there with `npm run build-all`, and then enter the `dist/LIBNAME` of each library there and type `npm link`. This creates the symbolic links to these libraries, which can then referenced from other projects.

To reference these libraries, once you have NPM link-ed them, just run the `link.bat` batch in this folder.

In Windows, you can find the symbolic links in a folder like `C:\Users\USERNAME\AppData\Roaming\npm\node_modules`.

Once you have published your library to NPM, just `npm unlink LIBNAME` from the client project's folder (this is equivalent to a `npm uninstall`), and then reinstall (from NPM).

Other general tasks:

- list all the linked libraries: `npm ls -g --depth=0 --link=true`.
- unlink: `npm unlink LIBNAME -g` (linked libraries are global).
