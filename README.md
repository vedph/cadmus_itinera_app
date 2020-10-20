# Cadmus Itinera App

Quick Docker image build (after `ng build --prod`): `docker build . -t vedph2020/cadmus-itinera-app:1.0.2 -t vedph2020/cadmus-itinera-app:latest` (replace with the current version).

Web application frontend for Cadmus _Itinera_. This application is built by packing together a number of components:

- _frontend_: the app includes the application and its specific libraries; shared Cadmus libraries (as defined in [Cadmus shell](https://github.com/vedph/cadmus_shell)) are used from NPM.

- _backend_: the corresponding backend API is [Cadmus Itinera API](https://github.com/vedph/cadmus_itinera_api), depending on [Cadmus Itinera](https://github.com/vedph/cadmus_itinera) for its specific parts.

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
