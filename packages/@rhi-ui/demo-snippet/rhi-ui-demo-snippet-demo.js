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
import { RhiUiMarkdownViewer } from '../../../node_modules/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer.js';
import { RhiUiDemoSnippet } from './rhi-ui-demo-snippet.js';
export class RhiUiDemoSnippetDemo extends HTMLElement {
    constructor() {
        super();
        this.props = {};
        this.attachShadow({ mode: 'open' });
        // I'm forcing loading these two libraries without having to add the import script on the consuming html page.
        console.log(`Loaded ${RhiUiMarkdownViewer.is} and ${RhiUiDemoSnippet.is}`);
        this.requestRender();
    }
    static get is() { return 'rhi-ui-demo-snippet-demo'; }
    getTemplate(props) {
        return `
            <!-- shadow DOM for your element -->
            <!-- RHI Blue: #007DC2 -->
            <style>
                :host {
                    display: block;
                }
                
                rhi-ui-markdown-viewer {
                    margin: 0 16px 48px 16px;
                }
            </style>
            <rhi-ui-markdown-viewer id="readme-viewer" class="readme"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet snippet-title="Default">
                <style>
                    .black-and-white {
                        --snippet-title-color: #666;
                        --snippet-title-background-color: #E2E2E2;
                        --demo-snippet-code-background-color: #000;
                        --demo-snippet-code-color: #FFF;
                    }
                </style>
                <rhi-ui-demo-snippet class="black-and-white" snippet-title="With H3">
                    <h3>H3 in demo snippet</h3>
                </rhi-ui-demo-snippet>
            </rhi-ui-demo-snippet>
        `;
    }
    static get properties() {
        return {
            'file-uri': {
                type: String,
                value: ''
            }
        };
    }
    static get observedAttributes() {
        const attributes = [];
        for (let key in RhiUiDemoSnippetDemo.properties) {
            attributes.push(key.toLowerCase());
        }
        return attributes;
    }
    connectedCallback() { }
    requestRender() {
        const template = document.createElement('template');
        template.innerHTML = this.getTemplate({});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    attributeChangedCallback(name, oldValue, newValue, namespace) {
        if (oldValue === newValue) {
            return;
        }
        this.props[name] = newValue;
        if (name === 'file-uri' && newValue) {
            const readmeViewer = this.shadowRoot.getElementById('readme-viewer');
            if (readmeViewer) {
                readmeViewer.setAttribute('file-uri', newValue);
            }
        }
    }
}
customElements.define(RhiUiDemoSnippetDemo.is, RhiUiDemoSnippetDemo);
