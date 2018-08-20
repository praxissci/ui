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

export class RhiUiDemoSnippet extends HTMLElement {

    public static get is(): string { return 'rhi-ui-demo-snippet'; }

    private getTemplate(props): string {
        return `
            <!-- shadow DOM for your element -->
            <!-- RHI Blue: #007DC2 -->
            <style>
                :host {
                    border: solid 1px #cdbbce;
                    /* offset-x | offset-y | blur-radius | spread-radius | color */
                    box-shadow: 3px 3px 20px -3px rgba(0, 0, 0, .3);
                    display: block;
                }

                #title {
                    color: var(--snippet-title-color, #FFF);
                    background-color: var(--snippet-title-background-color, #73007A);
                    font-size: 18px;
                    padding: 16px;
                }

                .demo {
                    padding: 16px;
                }

                .code-container {
                    background-color: var(--demo-snippet-code-background-color, #666);
                    color: var(--demo-snippet-code-color, #E2E2E2);
                    font-family: serif;
                    font-size: 16px;
                    line-height: 20px;
                    overflow: scroll;
                    padding: 16px;
                }
            </style>
            <div class="demo-snippet">
                <div id="title"></div>
                <div class="demo">
                    <slot></slot>
                </div>
                <div class="code-container">
                    <pre>
                        <code  id="code"></code>
                    </pre>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            'snippet-title': {
                type: String,
                value: 'title'
            }
        };
    }
    
    public static get observedAttributes(): string[] {
        const attributes: string[] = [];

        for (let key in RhiUiDemoSnippet.properties) {
            attributes.push(key.toLowerCase());
        }

        return attributes;
    }

    private props: any = {};

    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        // Initialize declared properties
        const props: any = RhiUiDemoSnippet.properties;

        for (let key in props) {
            this.props[key] = props[key].value;
        }

        this.requestRender();
    }

    public connectedCallback(): void {
        this.updateCode();
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'snippet-title') {
            this.shadowRoot.getElementById('title').innerHTML = newValue;
        }
    }

    private requestRender(): void {
        const template: HTMLTemplateElement = <HTMLTemplateElement>document.createElement('template');
        template.innerHTML = this.getTemplate({});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    private updateCode(): void {
        let code: string = this.innerHTML.toString()
        
        // Count the preceding white spaces
        let counting: boolean = true;
        let index: number = 1;
        let spaces: string = '';

        do {
            if (/\s/i.test(code[index])) {
                spaces += ' ';
            } else {
                counting = false;
            }

            index++;
        } while (counting && index < code.length)

        // Remove the preceding white spaces so all code starts at the beginning of the container
        if (spaces.length > 0) {
            code = code.replace(new RegExp(spaces, 'g'), '');
        }
        
        // this.shadowRoot.querySelector('.foo-button')
        this.shadowRoot.getElementById('code').textContent = code;
    }
}

customElements.define(RhiUiDemoSnippet.is, RhiUiDemoSnippet);