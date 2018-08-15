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
import { TemplateResult } from 'lit-html/lit-html.js'
import { RhiUiLogo } from './rhi-ui-logo.js';
import { RhiUiLogoSmall } from './rhi-ui-logo-small.js';

export class RhiUiLogoDemo extends LitElement {
    public static get is(): string { return 'rhi-ui-logo-demo'; }

    public _render(props: any): TemplateResult {
        return html`
            <style>
                :host {
                    display: block;
                }

                .example h4 {
                    background-color: var(--snippet-title-background-color, #8baec1);
                    color: var(--snippet-title-color, #003a59);
                    padding: 12px 16px;
                }

                marked-element {
                    margin-bottom: 48px;
                }
            </style>
            <marked-element>
                <div slot="markdown-html"></div>
                <script id="marked-element" type="text/markdown"></script>
            </marked-element>
            <div class="example">
                <h4>Logo</h4>
                <demo-snippet>
                    <template>
                        <rhi-ui-logo></rhi-ui-logo>
                    </template>
                </demo-snippet>
            </div>
            <div class="example">
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
    public static get properties(): object {
        return {
            readmeFile: String
        };
    }

    public constructor() {
        super();
    }

    public ready(): void {
        super.ready();

        // I'm forcing loading these two libraries without having to add the import script on the consuming html page.
        console.log(`Loaded ${RhiUiLogo.is} and ${RhiUiLogoSmall.is}`);

        this.shadowRoot.getElementById('marked-element').setAttribute('src', this['readmeFile']);
    }
}

customElements.define(RhiUiLogoDemo.is, RhiUiLogoDemo);