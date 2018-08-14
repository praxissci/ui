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
import { RhiUiSelectableGrid } from './rhi-ui-selectable-grid.js';
import { RhiUiSelectableGridCell } from './rhi-ui-selectable-grid-cell.js';

export class RhiUiSelectableGridDemo extends LitElement {
    public static get is(): string { return 'rhi-ui-selectable-grid-demo'; }

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

                .row {
                    display: flex;
                    width: 100%;
                }

                .example h4 {
                    background-color: var(--snippet-title-background-color, #8baec1);
                    color: var(--snippet-title-color, #003a59);
                    padding: 12px 16px;
                }
            </style>
            <marked-element>
                <div slot="markdown-html"></div>
                <script id="marked-element" type="text/markdown"></script>
            </marked-element>
            <div class="example">
                <h4>Default</h4>
                <demo-snippet>
                    <template>
                        <rhi-ui-selectable-grid>
                            <div class="row">
                                <rhi-ui-selectable-grid-cell value="1" selected></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="2" special></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="3"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="4"></rhi-ui-selectable-grid-cell>
                            </div>
                            <div class="row">
                                <rhi-ui-selectable-grid-cell value="a"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="b"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="c"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="d"></rhi-ui-selectable-grid-cell>
                            </div>
                            <div class="row">
                                <rhi-ui-selectable-grid-cell value="!"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="@"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="#"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="$"></rhi-ui-selectable-grid-cell>
                            </div>
                        </rhi-ui-selectable-grid>
                    </template>
                </demo-snippet>
            </div>
            <div class="example">
                <h4>Styled</h4>
                <demo-snippet>
                    <template>
                        <style>
                            .theme-wacky {
                                --grid-background-color: black;
                                --grid-color: white;
                                --grid-highlight-background-color: green;
                                --grid-highlight-color: orange;
                                --grid-selected-border-color: red;
                                --grid-special-background-color: blue;
                            }
                        </style>
                        <rhi-ui-selectable-grid class="theme-wacky">
                            <div class="row">
                                <rhi-ui-selectable-grid-cell value="1" selected></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="2" special></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="3"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="4"></rhi-ui-selectable-grid-cell>
                            </div>
                            <div class="row">
                                <rhi-ui-selectable-grid-cell value="a"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="b"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="c"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="d"></rhi-ui-selectable-grid-cell>
                            </div>
                            <div class="row">
                                <rhi-ui-selectable-grid-cell value="!"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="@"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="#"></rhi-ui-selectable-grid-cell>
                                <rhi-ui-selectable-grid-cell value="$"></rhi-ui-selectable-grid-cell>
                            </div>
                        </rhi-ui-selectable-grid>
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
        console.log(`Loaded ${RhiUiSelectableGrid.is} and ${RhiUiSelectableGridCell.is}`);

        this.shadowRoot.getElementById('marked-element').setAttribute('src', this['readmeFile']);
    }
}

customElements.define(RhiUiSelectableGridDemo.is, RhiUiSelectableGridDemo);