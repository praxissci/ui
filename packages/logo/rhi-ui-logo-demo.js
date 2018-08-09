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

                rhi-ui-logo {
                    max-width: 512px;
                    margin-bottom: 48px;
                }

                rhi-ui-logo-small {
                    max-width: 96px;
                }

                .example {
                    margin-bottom: 48px;
                }

                .example .description {
                    margin: 16px 0;
                }

                .install-command {
                    color: var(--install-command-color, #A30046);
                }

                .import {
                    color: var(--install-command-color, #016184);
                }
            </style>
            <h3 class="install-command">npm install --save @rhi-ui/logo</h3>
            <h3>&lt;rhi-ui-logo&gt;</h3>
            <div class="example">
                <div class="description">
                    <p>You can import the custom element via JavaScript:</p>
                    <p class="import">import { RhiUiLogo } from '@rhi-ui/logo/rhi-ui-logo.js';</p>
                    <p>OR using a script tag:</p>
                    <p class="import">&lt;script  type="module" src="node_modules/@rhi-ui/logo/rhi-ui-logo.js"&gt;&lt;/script&gt;</p>
                </div>
                <rhi-ui-logo></rhi-ui-logo>
            </div>
            <h3>&lt;rhi-ui-logo-small&gt;</h3>
            <div class="example">
                <div class="description">
                    <p>You can import the custom element via JavaScript:</p>
                    <p class="import">import { RhiUiLogo } from '@rhi-ui/logo/rhi-ui-logo-small.js';</p>
                    <p>OR using a script tag:</p>
                    <p class="import">&lt;script  type="module" src="node_modules/@rhi-ui/logo/rhi-ui-logo-small.js"&gt;&lt;/script&gt;</p>
                </div>
                <rhi-ui-logo-small></rhi-ui-logo-small>
            </div>
        `;
    }
    // Polymer
    static get properties() {
        return {};
    }
    constructor() {
        super();
    }
    ready() {
        super.ready();
        // I'm forcing loading these two libraries without having to add the import script on the consuming html page.
        console.log(`Loaded ${RhiUiLogo.is} and ${RhiUiLogoSmall.is}`);
    }
}
customElements.define(RhiUiLogoDemo.is, RhiUiLogoDemo);
