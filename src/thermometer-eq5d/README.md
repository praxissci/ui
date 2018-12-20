## &lt;rhi-ui-thermometer-eq5d&gt;

[**EQ-5D**](https://en.wikipedia.org/wiki/EQ-5D) is a standardized instrument for measuring generic health status. It has been widely used in population health surveys, clinical studies, economic evaluation and in routine outcome measurement in the delivery of operational healthcare.  The study `CanProCo` in the [**Global Research Platform**](https://www.rhigrp.net) uses this standard form.  In order to obtain permission to use the form, the EuroQol Research Foundation has told us to add a thermometer component, similar to the one on their printable form, when collecting a patient's health state.  We have created the &lt;`rhi-ui-thermometer-eq5d`&gt; custom element to satisfy the requirement.

### Install
`npm install --save @rhi-ui/thermometer-eq5d`

### Basic usage

```html
<rhi-ui-thermometer-eq5d
    end="100"
    start="0"
    steps="10"
    value="20">
</rhi-ui-thermometer-eq5d>
```

[Demo](http://rhi-tech.azurewebsites.net/wcc/#rhi-ui-thermometer-eq5d)

### Property (Attribute)
| Property (Attribute) | Type    | Description |
|----------------------|:--------|:------------|
| end   | number | The maximum value the thermometer is to measure. It is the number to be shown right at the top. |
| start | number  | The minimum value the thermometer is to measure. It is the number to be shown right at the bottom. |
| steps | number | Used to calculate the increments between the start and the end values on the thermometer (the numbers in between). |
| value | number | Controls the size of the 'mercury' line that indicates the value. |

### CSS Variables
| Variable name                        | Default value |
|--------------------------------------|:-------------:|
| --thermometer-bar-color              | #CCC          |
| --thermometer-border-color           | #CCC          |
| --thermometer-box-shadow-color       | #E2E2E2       |
| --thermometer-main-bar-color         | #000          |
| --thermometer-mercury-bar-color      | #F00          |
| --thermometer-mercury-mix-blend-mode | multiply      |
| --thermometer-grade-color            | #666          |