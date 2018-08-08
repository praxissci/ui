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

import { html, LitElement } from '@polymer/lit-element';
import { TemplateResult } from 'lit-html';

export class RhiUiLogo extends LitElement {
    public static get is(): string { return 'rhi-ui-logo'; }

    public _render(props: any): TemplateResult {
        return html`
            <style>
                :host {
                    display: block;
                }

            </style>
            <!-- shadow DOM for your element -->
            <h1>Rick Hansen Institute</h1>
        `;
    }

    public constructor() {
        super();
    }
}

customElements.define(RhiUiLogo.is, RhiUiLogo);