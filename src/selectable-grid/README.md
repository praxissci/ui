## &lt;rhi-ui-selectable-grid&gt;

Custom element that allows the creation of a grid where cells can be selected by dragging.  A user would be able to select a cell range using your mouse or finger, depending on the device.

### Install
`npm install --save @rhi-ui/selectable-grid`

### Use
You can import the custom element via JavaScript:

`import { RhiUiSelectableGrid } from '@rhi-ui/logo/rhi-ui-selectable-grid.js';`

or using a script tag:

`<script  type="module" src="node_modules/@rhi-ui/selectable-grid/rhi-ui-selectable-grid.js"></script>`

After imported, add it to your page using HTML.
```html
<style>
    .row { display: flex; }
</style>
<rhi-ui-selectable-grid>
    <div class="row">
        <rhi-ui-selectable-grid-cell value="1" selected></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="2" special></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="3"></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="4"></rhi-ui-selectable-grid-cell>
    </div>
    <div class="row">
        <rhi-ui-selectable-grid-cell value="a"></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="b"></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="c"></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="d"></rhi-ui-selectable-grid-cell>
    </div>
    <div class="row">
        <rhi-ui-selectable-grid-cell value="!"></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="@"></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="#"></rhi-ui-selectable-grid-cell>
        <rhi-ui-selectable-grid-cell value="$"></rhi-ui-selectable-grid-cell>
    </div>
</rhi-ui-selectable-grid>
```

### Styling

You can style the grid by targetting these variables:
```css
.theme-demo {
    --grid-background-color: black;
    --grid-color: white;
    --grid-highlight-background-color: green;
    --grid-highlight-color: orange;
    --grid-selected-border-color: red;
    --grid-special-background-color: blue;
}
```


### Demo
The `rhi-ui-selectable-grid-demo.js` file references the *Polymer* elements `<marked-element>` and `<demo-snippet>`.  They are already referenced in the library but you will need to load them on your page using a script tag.  Use the *readmeFile* attribute to specify the location of the README.md file so it is displayed by the demo element.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="../node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <script type="module" src="../node_modules/@polymer/iron-demo-helpers/demo-snippet.js"></script>
    <script type="module" src="../node_modules/@polymer/marked-element/marked-element.js"></script>
    <script type="module" src="../packages/selectable-grid/rhi-ui-selectable-grid-demo.js"></script>
</head>
<body>
    <rhi-ui-selectable-grid-demo readmeFile="../packages/selectable-grid/README.md"></rhi-ui-selectable-grid-demo>
</body>
</html>
```
