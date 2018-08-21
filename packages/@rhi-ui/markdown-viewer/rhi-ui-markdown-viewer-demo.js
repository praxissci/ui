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
import { RhiUiDemoSnippet } from '../../../node_modules/@rhi-ui/demo-snippet/rhi-ui-demo-snippet.js';
import { RhiUiMarkdownViewer } from './rhi-ui-markdown-viewer.js';
export class RhiUiMarkdownViewerDemo extends HTMLElement {
    constructor() {
        super();
        this.props = {};
        this.attachShadow({ mode: 'open' });
        // I'm forcing loading these two libraries without having to add the import script on the consuming html page.
        console.log(`Loaded ${RhiUiMarkdownViewer.is} and ${RhiUiDemoSnippet}`);
        this.requestRender();
    }
    static get is() { return 'rhi-ui-markdown-viewer-demo'; }
    getTemplate(props) {
        return `
            <!-- shadow DOM for your element -->
            <!-- RHI Blue: #007DC2 -->
            <style>
                :host {
                    display: block;
                }
                
                .readme {
                    margin: 0 16px 48px 16px;
                }
            </style>
            <rhi-ui-markdown-viewer id="readme-viewer" class="readme"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet snippet-title="Default">
                <rhi-ui-markdown-viewer id="markdown-viewer"></rhi-ui-markdown-viewer>
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
        for (let key in RhiUiMarkdownViewerDemo.properties) {
            attributes.push(key.toLowerCase());
        }
        return attributes;
    }
    connectedCallback() {
    }
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
            const markdownViewer = this.shadowRoot.getElementById('markdown-viewer');
            if (readmeViewer) {
                readmeViewer.setAttribute('file-uri', newValue);
                markdownViewer.setAttribute('file-uri', newValue);
            }
        }
    }
}
customElements.define(RhiUiMarkdownViewerDemo.is, RhiUiMarkdownViewerDemo);
