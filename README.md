# Cadmus Itinera App

Web application frontend for Cadmus _Itinera_.

The corresponding backend API is [Cadmus Itinera API](https://github.com/vedph/cadmus_itinera_api), depending on [Cadmus Itinera](https://github.com/vedph/cadmus_itinera) for its specific parts.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

For more details about this project generation, please see the [Cadmus shell](https://github.com/vedph/cadmus_shell) repository.

## Developer Environment

Until Cadmus shell libraries are not published to NPM, we use `npm link` to link them to this project. This implies that you should clone the [cadmus-shell](https://github.com/vedph/cadmus_shell) repository, build all the libraries there with `npm run build-all`, and then enter the `dist/LIBNAME` of each library there and type `npm link`. This creates the symbolic links to these libraries, which can then referenced from other projects.

To reference these libraries, once you have NPM link-ed them, just run the `link.bat` batch in this folder.

In Windows, you can find the symbolic links in a folder like `C:\Users\USERNAME\AppData\Roaming\npm\node_modules`.

Once you have published your library to NPM, just `npm unlink LIBNAME` from the client project's folder (this is equivalent to a `npm uninstall`), and then reinstall (from NPM).

Other general tasks:

- list all the linked libraries: `npm ls -g --depth=0 --link=true`.
- unlink: `npm unlink LIBNAME -g` (linked libraries are global).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
