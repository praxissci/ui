> :warning: These components are still a work in progress. :warning:

# Introduction
*rhi-ui* contains reusable user interface [web components](https://www.webcomponents.org/introduction) for the different RHI web projects.
We are currently using [Google Polymer](https://www.polymer-project.org/) for our syntactic sugar.

# Demo
Our demo code is being stored in the `demo` folder.
Add your demo pages there.
To see the demo, it is recommended to run `polymer serve`.

# Contribute
All of our source code is being written in TypeScript in the `src` folder.
When completed, the componets are to be published to the `packages` folder.
A `package.json` needs to be provided per component.
The components are being published individually under the `@rhi-ui` organization.

# Publish
Every component is to be published individually.
1. At the root of the project run the `tsc` command to generate the updated ES6 code in the packages folder.
2. Navigate to the folder of the component to be published.
3. Update the package version.
4. Run `npm publish --access public`.