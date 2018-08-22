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
export class RhiUiSelectableGridCell extends HTMLElement {
    static get is() { return 'rhi-ui-selectable-grid-cell'; }
    static get observedAttributes() {
        return ['value', 'preview'];
    }
    getTemplate(props) {
        return `
            <style>
                :host {
                    display: block;
                }

                :host([selected]) #cell {
                    border-color: var(--grid-selected-border-color, #666);
                }

                :host([special]) #cell {
                    background-color: var(--grid-special-background-color, #FFF);
                }

                :host([highlighted]) #cell,
                :host([special][highlighted]) #cell {
                    color: var(--grid-highlight-color, #FFF);
                    background-color: var(--grid-highlight-background-color, #CCC);
                }

                #cell {
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

                .noselect {
                    -webkit-touch-callout: none; /* iOS Safari */
                    -webkit-user-select: none; /* Safari */
                    -khtml-user-select: none; /* Konqueror HTML */
                    -moz-user-select: none; /* Firefox */
                    -ms-user-select: none; /* Internet Explorer/Edge */
                    user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
                }

                /* The following code was added for styling to work on MS Edge */
                [selected] #cell {
                    border-color: var(--grid-selected-border-color, #666);
                }

                [special] #cell {
                    background-color: var(--grid-special-background-color, #FFF);
                }

                [highlighted] #cell,
                [special][highlighted] #cell {
                    color: var(--grid-highlight-color, #FFF);
                    background-color: var(--grid-highlight-background-color, #CCC);
                }
            </style>
            <!-- shadow DOM for your element -->
            <div id="cell" class="noselect"></div>
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
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.requestRender();
    }
    connectedCallback() {
        this.cell = this.shadowRoot.getElementById('cell');
        this.updateDisplayValue();
    }
    requestRender() {
        const template = document.createElement('template');
        template.innerHTML = this.getTemplate({});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    attributeChangedCallback(name, oldValue, newValue, namespace) {
        if (oldValue === newValue || !/^(preview|value)$/.test(name)) {
            return;
        }
        this.updateDisplayValue();
    }
    updateDisplayValue() {
        if (!this.cell) {
            return;
        }
        this.cell.textContent = this.hasAttribute('preview') ? this.preview : this.value;
    }
}
customElements.define(RhiUiSelectableGridCell.is, RhiUiSelectableGridCell);
