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
import { TemplateResult } from 'lit-html/lit-html.js';
import { RhiUiDemoSnippet } from './rhi-ui-demo-snippet.js';
import { RhiUiMarkdownViewer } from '../markdown-viewer/rhi-ui-markdown-viewer.js';

export class RhiUiDemoSnippetDemo extends LitElement {
    public static get is(): string { return 'rhi-ui-demo-snippet-demo'; }

    public _render(props): TemplateResult {
        return html`
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
            <h3>&lt;rhi-ui-demo-snippet&gt;</h3>
            <rhi-ui-markdown-viewer class="readme" fileUri="${props.readmeFile}"></rhi-ui-markdown-viewer>
            <rhi-ui-demo-snippet snippetTitle="Default">
                <style>
                    .black-and-white {
                        --snippet-title-color: #666;
                        --snippet-title-background-color: #E2E2E2;
                        --demo-snippet-code-background-color: #000;
                        --demo-snippet-code-color: #FFF;
                    }
                </style>
                <rhi-ui-demo-snippet class="black-and-white" snippetTitle="With H3">
                    <h3>H3 in demo snippet</h3>
                </rhi-ui-demo-snippet>
            </rhi-ui-demo-snippet>
        `;
    }

    public static get properties(): any {
        return {
            readmeFile: String
        };
    }

    public constructor() {
        super();
    }

    ready() {
        super.ready();
        // I'm forcing loading these two libraries without having to add the import script on the consuming html page.
        console.log(`Loaded ${RhiUiDemoSnippet.is} and ${RhiUiMarkdownViewer.is}`);
    }
}

customElements.define(RhiUiDemoSnippetDemo.is, RhiUiDemoSnippetDemo);