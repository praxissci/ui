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
export class RhiUiSelectableGridCell extends LitElement {
    constructor() {
        super();
        this.displayValue = '';
    }
    static get is() { return 'rhi-ui-selectable-grid-cell'; }
    static get observedAttributes() {
        return ['value', 'preview'];
    }
    _render(props) {
        return html `
            <style>
                :host {
                    display: block;
                }

                :host([selected]) .cell {
                    border-color: var(--grid-selected-border-color, #666);
                }

                :host([special]) .cell {
                    background-color: var(--grid-special-background-color, #FFF);
                }

                :host([highlighted]) .cell,
                :host([special][highlighted]) .cell {
                    color: var(--grid-highlight-color, #FFF);
                    background-color: var(--grid-highlight-background-color, #CCC);
                }

                .cell {
                    background-color: var(--grid-background-color, #E2E2E2);
                    border:solid 1px #CCC;
                    color: var(--grid-color, #333);
                    font-size: 14px;
                    height: 29px;
                    line-height: 30px;
                    margin: 1px;
                    text-align: center;
                    width: 37px;
                }
            </style>
            <!-- shadow DOM for your element -->
            <div class="cell">${this.displayValue}</span>
        `;
    }
    get selected() { return this.hasAttribute('selected'); }
    set selected(value) {
        if (!value) {
            this.removeAttribute('selected');
        }
        else if (!this.selected) {
            this.setAttributeNode(document.createAttribute('selected'));
        }
    }
    get value() { return this.getAttribute('value'); }
    set value(v) {
        if (v !== this.value) {
            this.setAttribute('value', v);
        }
    }
    get preview() { return this.getAttribute('preview'); }
    set preview(v) {
        if (v && v !== this.preview) {
            this.setAttribute('preview', v);
            return;
        }
        if (!v && this.hasAttribute('preview')) {
            this.removeAttribute('preview');
        }
    }
    attributeChangedCallback(name, oldValue, newValue, namespace) {
        super.attributeChangedCallback(name, oldValue, newValue, namespace);
        if (oldValue === newValue || !/^(preview|value)$/.test(name)) {
            return;
        }
        this.updateDisplayValue();
        this.requestRender();
    }
    updateDisplayValue() {
        this.displayValue = this.hasAttribute('preview') ? this.preview : this.value;
    }
}
customElements.define(RhiUiSelectableGridCell.is, RhiUiSelectableGridCell);
//# sourceMappingURL=rhi-ui-selectable-grid-cell.js.map