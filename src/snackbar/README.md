## &lt;rhi-ui-snackbar&gt;

### Install
`npm install --save @rhi-ui/snackbar`

### Basic usage

```html
<rhi-ui-snackbar message="Use snackbar to display an interactive message">
  <button event-name="action">Act</button>
  <button event-name="dismiss">Dismiss</button>
</rhi-ui-snackbar>
```

### Property(Attribute)
| Property(Attribute) | Type    | Description                                                                                                                                                              |
|---------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| align(align-*)      | string  | Align snackbar to left, center, or right side of the viewport.                                                                                                           |
| message             | string  | The text message to display   .                                                                                                                                          |
| persistent          | boolean | Whether to show snackbar persistently (no timeout).This attribute can be added to slotted button to prevent default behavior of dismissing the snackbar on button click. |
| timeout	            | number  | The amount of time in milliseconds to show the snackbar. Defaults to 2750.                                                                                               |
| event-name	        | string  | Attribute for the slotted button that dispatches an event with defined value when the button is clicked.                                                                 |

### Events
Events get dispatched on the `<rhi-ui-snackbar>` element when the user clicks the slotted button defined in the slotted buttons' value of `event-name` attribute.