/**
 * @license
 * Copyright (c) 2018 Rick Hansen Institute. All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
'use strict';

export class RhiUiSelectableGridCell extends HTMLElement {    
    public static get is(): string { return 'rhi-ui-selectable-grid-cell'; }
    public static get observedAttributes(): string[] {
        return ['value', 'preview'];
    }

    public getTemplate(props: any): string {
        return `
            <style>
                :host {
                    display: block;
                }

                :host([selected]) #cell {
                    border-color: var(--grid-selected-border-color, #666);
                }

                :host([special]) #cell {
                    background-color: var(--grid-special-background-color, #FFF);
                }

                :host([highlighted]) #cell,
                :host([special][highlighted]) #cell {
                    color: var(--grid-highlight-color, #FFF);
                    background-color: var(--grid-highlight-background-color, #CCC);
                }

                #cell {
                    background-color: var(--grid-background-color, #E2E2E2);
                    border:solid 1px #CCC;
                    color: var(--grid-color, #333);
                    font-size: 14px;
                    height: 29px;
                    line-height: 30px;
                    margin: 1px;
                    text-align: center;
                    width: 37px;
                }
            </style>
            <!-- shadow DOM for your element -->
            <div id="cell"></div>
        `;
    }

    private cell: HTMLElement;

    public get selected(): boolean { return this.hasAttribute('selected'); }
    public set selected(value: boolean) {
        if (!value) {
            this.removeAttribute('selected');
        } else if (!this.selected) {
            this.setAttributeNode(document.createAttribute('selected'));
        }
    }

    public get value(): string { return this.getAttribute('value'); }
    public set value(v: string) {
        if (v !== this.value) {
            this.setAttribute('value', v);
        }
    }

    public get preview(): string { return this.getAttribute('preview'); }
    public set preview(v: string) { 
        if (v && v !== this.preview) {
            this.setAttribute('preview', v);
            return;
        }
        
        if (!v && this.hasAttribute('preview')) {
            this.removeAttribute('preview');
        }
    }

    public constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.requestRender();
    }

    public connectedCallback(): void {
        this.cell = this.shadowRoot.getElementById('cell');
        this.updateDisplayValue();
    }

    private requestRender(): void {
        const template: HTMLTemplateElement = <HTMLTemplateElement>document.createElement('template');
        template.innerHTML = this.getTemplate({});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void {
        if (oldValue === newValue || !/^(preview|value)$/.test(name)) {
            return;
        }
        
        this.updateDisplayValue();
    }

    private updateDisplayValue(): void {
        if (!this.cell) {
            return;
        }

        this.cell.textContent = this.hasAttribute('preview') ? this.preview : this.value;
    }
}

customElements.define(RhiUiSelectableGridCell.is, RhiUiSelectableGridCell);