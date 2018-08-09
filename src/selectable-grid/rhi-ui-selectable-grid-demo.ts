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

                .row {
                    display: flex;
                    width: 100%;
                }

                .theme-wacky {
                    --grid-background-color: black;
                    --grid-color: white;
                    --grid-highlight-background-color: green;
                    --grid-highlight-color: orange;
                    --grid-selected-border-color: red;
                    --grid-special-background-color: blue;
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
            <h3>&lt;rhi-ui-selectable-grid&gt;</h3>
            <div class="example">
                <div class="description">
                    <p>You can select a cell range using your mouse or finger.</p>
                    <p>You can import the custom element via JavaScript:</p>
                    <p class="import">
                        import { RhiUiSelectableGrid } from '@rhi-ui/selectable-grid/rhi-ui-selectable-grid.js';
                        <br/>
                        import { RhiUiSelectableGrid } from '@rhi-ui/selectable-grid/rhi-ui-selectable-grid-cell.js';
                    </p>
                    <p>OR using a script tag:</p>
                    <p class="import">
                        &lt;script  type="module" src="node_modules/@rhi-ui/selectable-grid/rhi-ui-selectable-grid.js"&gt;&lt;/script&gt;
                        <br/>
                        &lt;script  type="module" src="node_modules/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-cell.js"&gt;&lt;/script&gt;
                    </p>
                </div>
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
            </div>
            <div class="example theme-wacky">
                <div class="description">
                    You can style the grid by targetting these variables:
                    <ul>
                        <li>--grid-background-color: black;</li>
                        <li>--grid-color: white;</li>
                        <li>--grid-highlight-background-color: green;</li>
                        <li>--grid-highlight-color: orange;</li>
                        <li>--grid-selected-border-color: red;</li>
                        <li>--grid-special-background-color: blue;</li>
                    </ul>
                </div>
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
            </div>
        `;
    }

    // Polymer
    public static get properties(): object {
        return {};
    }

    public constructor() {
        super();
    }

    public ready(): void {
        super.ready();

        // I'm forcing loading these two libraries without having to add the import script on the consuming html page.
        console.log(`Loaded ${RhiUiSelectableGrid.is} and ${RhiUiSelectableGridCell.is}`);
    }
}

customElements.define(RhiUiSelectableGridDemo.is, RhiUiSelectableGridDemo);