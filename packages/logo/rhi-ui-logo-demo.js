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
import { RhiUiMarkdownViewer } from '@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer.js';
import { RhiUiLogo } from './rhi-ui-logo.js';
import { RhiUiLogoSmall } from './rhi-ui-logo-small.js';
export class RhiUiLogoDemo extends LitElement {
    static get is() { return 'rhi-ui-logo-demo'; }
    _render(props) {
        return html `
            <style>
                :host {
                    display: block;
                }

                .title {
                    background-color: var(--snippet-title-background-color, #007DC2);
                    color: var(--snippet-title-color, #FFF);
                    padding: 16px;
                }

                .example h4 {
                    background-color: var(--snippet-title-background-color, #8baec1);
                    color: var(--snippet-title-color, #003a59);
                    padding: 12px 16px;
                }
                
                rhi-ui-markdown-viewer {
                    margin: 0 16px 48px 16px;
                }
            </style>
            <h3 class="title">&lt;rhi-ui-logo&gt;</h3>
            <h3 class="install-command">npm install --save @rhi-ui/logo</h3>
            <rhi-ui-markdown-viewer class="readme" fileUri="${props.readmeFile}"></rhi-ui-markdown-viewer>
            <div class="example">
                <h4>Logo</h4>
                <demo-snippet>
                    <template>
                        <rhi-ui-logo></rhi-ui-logo>
                    </template>
                </demo-snippet>
            <div class="example">
            </div>
                <h4>Small</h4>
                <demo-snippet>
                    <template>
                        <rhi-ui-logo-small></rhi-ui-logo-small>
                    </template>
                </demo-snippet>
            </div>
        `;
    }
    // Polymer
    static get properties() {
        return {
            readmeFile: String
        };
    }
    constructor() {
        super();
    }
    ready() {
        super.ready();
        // I'm forcing loading these two libraries without having to add the import script on the consuming html page.
        console.log(`Loaded ${RhiUiLogo.is} and ${RhiUiLogoSmall.is} and ${RhiUiMarkdownViewer.is}`);
    }
}
customElements.define(RhiUiLogoDemo.is, RhiUiLogoDemo);
