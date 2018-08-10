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
import { html, LitElement } from '@polymer/lit-element/lit-element.js';
export class RhiUiMarkdownViewer extends LitElement {
    constructor() {
        super();
        this.markdown = '';
    }
    static get is() { return 'rhi-ui-markdown-viewer'; }
    _render(props) {
        return html `
            <!-- shadow DOM for your element -->
            <!-- RHI Blue: #007DC2 -->
            <style>
                :host {
                    display: block;
                    white-space: normal;
                }
            </style>
            <div id="markdown"></div>
        `;
    }
    static get properties() {
        return {
            fileUri: String
        };
    }
    ready() {
        super.ready();
        this.readTextFile(this['fileUri']);
    }
    readTextFile(fileUri) {
        var rawFile = new XMLHttpRequest();
        const that = this;
        rawFile.open("GET", fileUri, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    that.shadowRoot.getElementById('markdown').innerHTML = allText.replace(/\r\n/g, '<br/>');
                }
            }
        };
        rawFile.send(null);
    }
}
customElements.define(RhiUiMarkdownViewer.is, RhiUiMarkdownViewer);
//# sourceMappingURL=rhi-ui-markdown-viewer.js.map