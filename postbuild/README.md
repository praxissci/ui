# postbuild process

## copyFiles
Copy all the necessary files to the `demo` or the `dist` folder.

If it is a development build, copy the webcomponentsjs polyfill for the demo.

If it is a production build, copy all of the web components' `README.md` files from `src` folder to corresponding folders in the `dist` folder.

## editPackages (production build)
1. Get the `package.json` file in the root of the project
2. Remove unnecessary descriptions such as (dependencies, scrips, etc).
3. Add unique descriptions from each web components' `package.json` from the `src` folder on to the common descriptions found in `package.json`.
4. Add the modified `package.json` files in the corresponding web components folder in the `dist` folder.
