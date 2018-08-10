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
export class RhiUiDemoSnippet extends LitElement {
    static get is() { return 'rhi-ui-demo-snippet'; }
    _render(props) {
        return html `
            <!-- shadow DOM for your element -->
            <!-- RHI Blue: #007DC2 -->
            <style>
                :host {
                    border: solid 1px #cdbbce;
                    /* offset-x | offset-y | blur-radius | spread-radius | color */
                    box-shadow: 3px 3px 20px -3px rgba(0, 0, 0, .3);
                    display: block;
                }

                .title {
                    color: var(--snippet-title-color, #FFF);
                    background-color: var(--snippet-title-background-color, #73007A);
                    font-size: 18px;
                    padding: 16px;
                }

                .demo {
                    padding: 16px;
                }

                #code {
                    background-color: var(--demo-snippet-code-background-color, #666);
                    color: var(--demo-snippet-code-color, #E2E2E2);
                    font-family: serif;
                    font-size: 16px;
                    line-height: 20px;
                    padding: 16px;
                }
            </style>
            <div class="demo-snippet">
                <div class="title">${props.snippetTitle}</div>
                <div class="demo">
                    <slot></slot>
                </div>
                <div id="code"></div>
            </div>
        `;
    }
    static get properties() {
        return {
            snippetTitle: String
        };
    }
    constructor() {
        super();
    }
    ready() {
        super.ready();
        this.updateCode();
        //this.requestRender();
    }
    updateCode() {
        this.shadowRoot.getElementById('code').innerHTML =
            this.innerHTML.toString().replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
    }
}
customElements.define(RhiUiDemoSnippet.is, RhiUiDemoSnippet);
//# sourceMappingURL=rhi-ui-demo-snippet.js.map