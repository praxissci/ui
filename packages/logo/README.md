## &lt;rhi-ui-logo&gt;

Custom element that displays an SVG version of the Rick Hansen Institute logo.

### Install
`npm install --save @rhi-ui/logo`


### Use
You can import the custom element via JavaScript:

`import { RhiUiLogo } from '@rhi-ui/logo/rhi-ui-logo.js';`

or using a script tag:

`<script  type="module" src="node_modules/@rhi-ui/logo/rhi-ui-logo.js"></script>`

After imported, add it to your page using HTML.
```html
<rhi-ui-logo></rhi-ui-logo>
```

---

## &lt;rhi-ui-logo-small&gt;

Custom element that displays an SVG version of the Rick Hansen Institute logo, without text.

### Install
`npm install --save @rhi-ui/logo`


### Use
You can import the custom element via JavaScript:

`import { RhiUiLogoSmall } from '@rhi-ui/logo/rhi-ui-logo-small.js';`

or using a script tag:

`<script  type="module" src="node_modules/@rhi-ui/logo/rhi-ui-logo-small.js"></script>`

After imported, add it to your page using HTML.
```html
<rhi-ui-logo-small></rhi-ui-logo-small>
```

### Demo
The `rhi-ui-logo.js` file references the *Polymer* elements `<marked-element>` and `<demo-snippet>`.  They are already referenced in the library but you will need to load them on your page using a script tag.  Use the *readmeFile* attribute to specify the location of the README.md file so it is displayed by the demo element.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <script type="module" src="../node_modules/@polymer/iron-demo-helpers/demo-snippet.js"></script>
    <script type="module" src="../node_modules/@polymer/marked-element/marked-element.js"></script>
    <script type="module" src="../packages/selectable-grid/rhi-ui-logo-demo.js"></script>
</head>
<body>
    <rhi-ui-logo-demo readmeFile="../packages/selectable-grid/README.md"></rhi-ui-logo-demo>
</body>
</html>
```