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

### Style customization
| CSS variables                      | Default |
|:-----------------------------------|:--------|
|--rhi-ui-snackbar-background-color  | #323232 |
|--rhi-ui-snackbar-text-color        | #fff    |
|--rhi-ui-snackbar-button-text-color | #aaa    |

### Property(Attribute)
| Property(Attribute)             | Type    | Description                                                                                                                                                              |
|---------------------------------|:--------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| active                          | boolean | (read only) Whether the snackbar is active (showing)                                                                                                                     |
| align(align-center/align-right) | string  | Align snackbar to left, center, or right side of the viewport.                                                                                                           |
| message                         | string  | The text message to display   .                                                                                                                                          |
| persistent                      | boolean | Whether to show snackbar persistently (no timeout).This attribute can be added to slotted button to prevent default behavior of dismissing the snackbar on button click. |
| timeout	                        | number  | The amount of time in milliseconds to show the snackbar. Defaults to 2750.                                                                                               |
| event-name	                    | string  | Attribute for the slotted button that dispatches an event with defined value when the button is clicked.                                                                 |

### Method
```ts
show(): void
```
show the snackbar

```ts
hide(): void
```
hide the snackbar

```ts
setButtons(buttons: RhiUiSnackbarButton[]): void
```
Add buttons to the snackbar.

```ts
new RhiUiSnackbarButton(text: string, persistent: boolean, eventName: string | null = null, event: any = null): RhiUiSnackbarButton
```
Object used for providing information for `setButtons()`

### Events
Events get dispatched on the `<rhi-ui-snackbar>` element when the user clicks the slotted button defined in the slotted buttons' value of `event-name` attribute.