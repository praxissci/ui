## RhiUiBaseElement
Base class, which extends `HTMLElement`, with protected methods to initialize a list of properties and ui-bindings
based on a list of `ICustomElementProperty` instances.

Based on the list, the component will select the HTMElements, whose `bind-to` attribute match a property name.
This is to help reduce the selections applied to the DOM. 

### Install
`npm install --save @rhi-ui/base-element`

### Basic usage

```JavaScript
class MyClass extends RhiUiBaseElement { }
```

### Methods

```TypeScript
protected requestRender(template: string): void
```

```TypeScript
JavaScript protected initializeDeclaredProperties(properties: { [index: string]: ICustomElementProperty }): void
```

```TypeScript
protected updateUiBindings(properties: { [index: string]: ICustomElementProperty }): void
```