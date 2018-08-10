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
import { RhiUiDemoSnippet } from '@rhi-ui/demo-snippet/rhi-ui-demo-snippet.js';
import { RhiUiMarkdownViewer } from '@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer.js';
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

                rhi-ui-demo-snippet:first-of-type {
                    margin-bottom: 48px;
                }
                
                rhi-ui-markdown-viewer {
                    margin: 0 16px 48px 16px;
                }
            </style>
            <h3 class="install-command">npm install --save @rhi-ui/logo</h3>
            <h3>&lt;rhi-ui-logo&gt;</h3>
            <rhi-ui-markdown-viewer class="readme" fileUri="${props.readmeFile}"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet snippetTitle="Logo">
                <rhi-ui-logo></rhi-ui-logo>
            </rhi-ui-demo-snippet>
            <rhi-ui-demo-snippet snippetTitle="Logo small">
                <rhi-ui-logo-small></rhi-ui-logo-small>
            </rhi-ui-demo-snippet>
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
        console.log(`Loaded ${RhiUiLogo.is} and ${RhiUiLogoSmall.is} and ${RhiUiDemoSnippet.is} and ${RhiUiMarkdownViewer.is}`);
    }
}

customElements.define(RhiUiLogoDemo.is, RhiUiLogoDemo);