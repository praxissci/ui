## &lt;rhi-ui-logo&gt;

Custom element that displays an SVG version of the Rick Hansen Institute logo.

### Logo Elements
The logo's two elements, the icon and text, are fixed in relationship and must not be changed in any way.
The icon implies several powerful messages.
The circles represent both a spinal cord (with a SCI) and a pathway or journey that a person follows before, during and after a SCI.
Meanwhile, the two elements on either side of the circles also have multiple interpretations: they can be viewed as two separate but coordinated pillars of support for people with SCI (research/acute care and community support/reintegration), and they also have the appearance of the Chinese yin and yang symbols which convey the need for balanced support in a person's post-SCI life.

The typeface used in the logo is `Netto`.
This typeface has been chosen for its visual impact and readability.
This typeface should never be altered. 

### Logo Colours

|          |    Pantone 285C | Neutral Black C |     Cool Grey 7 |
|----------|----------------:|----------------:|----------------:|
| __CMYK__ | 100  45   0  19 |   0   0   0 100 | 0     0   0  50 |
| __RGB__  |       0 114 206 |       0   0   0 |     127 127 127 |
| __HEX__  |         #0072CE |         #000000 |         #7F7F7F |

			
Whenever possible, we encourage use of the logo in colour on a white background.
When this is not possible we permit use of the logo in black, greyscale and reversed out in white on a dark background. 
If you’re in doubt about how to feature the RHI logo or which colour variation to use, please ask.
 	 
### Minimum Size
The logo should never appear less than .5" in height with the exception of use in our business cards. As a general guideline for gauging the minimum size of our logo for digital purposes (i.e.  featured in PowerPoint presentations or online) the height of the text in the logo should be at least twice the height of the body copy text.


### Install
`npm install --save @rhi-ui/logo`

### Use
You can import the custom element via JavaScript:

`import { RhiUiLogo } from './node_modules/@rhi-ui/logo/rhi-ui-logo.js';`

or using a script tag:

`<script  type="module" src="node_modules/@rhi-ui/logo/rhi-ui-logo.js"></script>`

After imported, add it to your page using HTML.
Use the attribute `color-palette` to specify the style of the component.
The available options for `color-palette` are: `black`, `grayscale`, and `white`.

```html
<rhi-ui-logo></rhi-ui-logo>
<rhi-ui-logo color-palette="grayscale"></rhi-ui-logo>
<rhi-ui-logo color-palette="black"></rhi-ui-logo>
<rhi-ui-logo color-palette="white" style="background-color:#0072CE;"></rhi-ui-logo>
```

---

## &lt;rhi-ui-logo-small&gt;

Custom element that displays an SVG version of the Rick Hansen Institute logo, without text.

### Install
`npm install --save @rhi-ui/logo`


### Use
You can import the custom element via JavaScript:

`import { RhiUiLogoSmall } from './node_modules@rhi-ui/logo/rhi-ui-logo-small.js';`

or using a script tag:

`<script  type="module" src="node_modules/@rhi-ui/logo/rhi-ui-logo-small.js"></script>`

After imported, add it to your page using HTML.
Use the attribute `color-palette` to specify the style of the component.
The available options for `color-palette` are: `black`, `grayscale`, and `white`.

```html
<rhi-ui-logo-small></rhi-ui-logo-small>
<rhi-ui-logo-small color-palette="grayscale"></rhi-ui-logo-small>
<rhi-ui-logo-small color-palette="black"></rhi-ui-logo-small>
<rhi-ui-logo-small color-palette="white" style="background-color:#0072CE;"></rhi-ui-logo-small>
```

### Demo
The `rhi-ui-logo.js` file references the library `markdown-it`.
They are already referenced in the component but you will need to load it on your page using a script tag.
Use the `file-uri` attribute to specify the location of the `README.md` file so it is displayed by the demo element.

```html
<!DOCTYPE html>
<html>
<head>
    <script src="../node_modules/markdown-it/dist/markdown-it.min.js"></script>
    <script type="module" src="../node_modules/selectable-grid/rhi-ui-logo-demo.js"></script>
</head>
<body>
    <rhi-ui-logo-demo file-uri="../node_modules/@rhi-ui/logo/README.md"></rhi-ui-logo-demo>
</body>
</html>
```