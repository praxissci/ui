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
export class RhiUiMarkdownViewer extends HTMLElement {
    constructor() {
        super();
        this.props = {};
        this.attachShadow({ mode: 'open' });
        // Initialize declared properties
        const props = RhiUiMarkdownViewer.properties;
        for (let key in props) {
            this.props[key] = props[key].value;
        }
        this.requestRender();
    }
    static get is() { return 'rhi-ui-markdown-viewer'; }
    getTemplate(props) {
        return `
            <!-- shadow DOM for your element -->
            <!-- RHI Blue: #007DC2 -->
            <style>
                :host {
                    display: block;
                    white-space: normal;
                }
            </style>
            <div id="markdown">Loading file...</div>
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
        for (let key in RhiUiMarkdownViewer.properties) {
            attributes.push(key.toLowerCase());
        }
        return attributes;
    }
    attributeChangedCallback(name, oldValue, newValue, namespace) {
        if (oldValue === newValue) {
            return;
        }
        this.props[name] = newValue;
        if (name === 'file-uri' && newValue) {
            this.loadMarkdown(newValue)
                .then((content) => this.updateReadme(content));
        }
    }
    requestRender() {
        const template = document.createElement('template');
        template.innerHTML = this.getTemplate({});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        //render(this.getTemplate({}), this.shadowRoot);
    }
    loadMarkdown(fileUri) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', fileUri, true);
            request.onload = function (e) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.responseText);
                    }
                }
            };
            request.onerror = function (e) {
                reject(request.statusText);
            };
            request.send(null);
        });
    }
    updateReadme(content) {
        const md = window['markdownit']();
        if (!md) {
            throw `${RhiUiMarkdownViewer.is} :: updateReadme :: 'markdownid' is not loaded.  Make sure to include the the file: <script src="../node_modules/markdown-it/dist/markdown-it.min.js"></script>`;
        }
        // this.shadowRoot.querySelector('.foo-button')
        this.shadowRoot.getElementById('markdown').innerHTML = md.render(content);
    }
}
customElements.define(RhiUiMarkdownViewer.is, RhiUiMarkdownViewer);
