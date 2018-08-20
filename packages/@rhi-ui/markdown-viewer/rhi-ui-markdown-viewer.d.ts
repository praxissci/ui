export declare class RhiUiMarkdownViewer extends HTMLElement {
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
    attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void;
    private requestRender;
    private loadMarkdown;
    private updateReadme;
}
