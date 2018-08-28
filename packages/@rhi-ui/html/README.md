## HTML Tagged Template

Basic [Tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) which will allow us to get code highlights, on VSCode, for our vanilla custom element templates.

### Use
When writting vanilla custom elements, write your template in the following fashion to get html code highlights:

```html
public static getTemplate(): string {
    return html`
    <div>My HTML template code goes here</div>
    `;
}
```