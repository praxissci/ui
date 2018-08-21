export declare class RhiUiDemoSnippet extends HTMLElement {
    static readonly is: string;
    private getTemplate;
    static readonly properties: {
        'snippet-title': {
            type: StringConstructor;
            value: string;
        };
    };
    static readonly observedAttributes: string[];
    private props;
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void;
    private requestRender;
    private updateCode;
}
