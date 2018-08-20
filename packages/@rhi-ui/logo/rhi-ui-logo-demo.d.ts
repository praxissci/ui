export declare class RhiUiLogoDemo extends HTMLElement {
    static readonly is: string;
    getTemplate(props: any): string;
    static readonly properties: {
        'file-uri': {
            type: StringConstructor;
            value: string;
        };
    };
    static readonly observedAttributes: string[];
    private props;
    constructor();
    connectedCallback(): void;
    private requestRender;
    attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void;
}
