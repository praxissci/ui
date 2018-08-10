import { LitElement } from '@polymer/lit-element/lit-element.js';
import { TemplateResult } from 'lit-html/lit-html.js';
export declare class RhiUiDemoSnippet extends LitElement {
    static readonly is: string;
    _render(props: any): TemplateResult;
    static readonly properties: any;
    constructor();
    ready(): void;
    private updateCode;
}
