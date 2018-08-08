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
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';
import { RhiUiSelectableGridCell } from './rhi-ui-selectable-grid-cell.js';
export class RhiUiSelectableGrid extends GestureEventListeners(LitElement) {
    constructor() {
        super();
        // I don't like using any, but that is what
        this.currentTrackSource = null;
        this.selectionRange = [];
    }
    static get is() { return 'rhi-ui-selectable-grid'; }
    _render(props) {
        return html `
            <style>
                :host {
                    display: block;

                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -o-user-select: none;
                    user-select: none;
                }

                .row {
                    display: flex;
                    width: 100%;
                }

                rhi-ui-selectable-grid-cell,
                .empty-cell {
                    margin: 1px;
                    flex: 1 0;
                }
            </style>
            <slot></slot>
        `;
    }
    // Polymer
    static get properties() {
        return {
            previewSelectedValueOnRange: Boolean
        };
    }
    // Polymer
    ready() {
        super.ready();
        // if the element has children, it means rows were added to the <slot> element.
        // Other wise we asume the object was extended and the rows were added directly to the element's template instead of <slot>.
        const rootElement = this.getRootElement();
        this.initializeCells(rootElement.children);
        Gestures.addListener(rootElement, 'track', this.trackHandler.bind(this));
        Gestures.addListener(rootElement, 'down', this.downHandler.bind(this));
        Gestures.addListener(rootElement, 'up', this.upHandler.bind(this));
    }
    // Polymer
    disconnectedCallback() {
        super.disconnectedCallback();
        const rootElement = this.getRootElement();
        Gestures.removeListener(rootElement, 'track', this.trackHandler.bind(this));
        Gestures.removeListener(rootElement, 'down', this.downHandler.bind(this));
        Gestures.removeListener(rootElement, 'up', this.upHandler.bind(this));
    }
    getRootElement() {
        return this['children'].length > 0 ? this : this['shadowRoot'];
    }
    initializeCells(rows) {
        this.cells = [];
        for (let r = 0; r < rows.length; r++) {
            const row = rows.item(r);
            row.children;
            if (!row.classList || !row.classList.contains('row')) {
                continue;
            }
            for (let c = 0; c < row.children.length; c++) {
                if (row.children[c].tagName.toUpperCase() === 'RHI-UI-SELECTABLE-GRID-CELL')
                    this.cells.push(row.children.item(c));
            }
        }
    }
    selectCell(name) {
        if (this.selectedCell) {
            this.selectedCell['selected'] = false;
            this.selectedCell = null;
        }
        this.selectedCell = this.cells.find((c) => c.getAttribute('name') === name);
        if (this.selectedCell) {
            this.selectedCell['selected'] = true;
        }
    }
    getCellValue(name) {
        const cell = this.cells.find((c) => c.getAttribute('name') === name);
        return cell ? cell.getAttribute('value') : '';
    }
    clearSelectionRange() {
        this.cells.forEach((c) => {
            c.removeAttribute('highlighted');
            c.removeAttribute('preview');
        });
        this.selectionRange = [];
    }
    static rectanglesIntersect(r1Top, r1Right, r1Bottom, r1Left, r2Top, r2Right, r2Bottom, r2Left) {
        return !(r2Left > r1Right ||
            r2Right < r1Left ||
            r2Top > r1Bottom ||
            r2Bottom < r1Top);
    }
    isValidForRange(cell) {
        return true;
    }
    updateRange(top, right, bottom, left) {
        const range = [];
        const currentValue = this.selectedCell ? this.selectedCell.getAttribute('value') : null;
        this.cells.forEach((c) => {
            if (RhiUiSelectableGrid.rectanglesIntersect(c.offsetTop, c.offsetLeft + c.offsetWidth, c.offsetTop + c.offsetHeight, c.offsetLeft, top, right, bottom, left)
                && this.isValidForRange(c)) {
                c.setAttribute('highlighted', 'true');
                range.push(c);
                if (this['previewSelectedValueOnRange'] && currentValue) {
                    c.setAttribute('preview', currentValue);
                }
            }
            else {
                c.removeAttribute('highlighted');
                c.removeAttribute('preview');
            }
        });
        this.selectionRange = range;
    }
    trackHandler(e) {
        const t = e.detail.hover();
        // We can get a null target when moving outside the document, possible when in a frame.
        if (!t) {
            return;
        }
        // Don't check when rolling over the same element, just when we move on top of a different cell
        if (this.currentTrackSource
            && this.currentTrackSource.offsetLeft === t.offsetLeft
            && this.currentTrackSource.offsetTop === t.offsetTop) {
            return;
        }
        this.currentTrackSource = t;
        let left;
        let right;
        let top;
        let bottom;
        // Remember that the detail returns the coordinates based on the screen.
        // To tell where we are on the actual page we need to add the distance scrolled.
        if (e.detail.dx > 0) {
            left = e.detail.x + window.pageXOffset - e.detail.dx;
            right = e.detail.x + window.pageXOffset;
        }
        else {
            left = e.detail.x + window.pageXOffset;
            right = e.detail.x + window.pageXOffset - e.detail.dx;
        }
        if (e.detail.dy > 0) {
            top = e.detail.y + window.pageYOffset - e.detail.dy;
            bottom = e.detail.y + window.pageYOffset;
        }
        else {
            top = e.detail.y + window.pageYOffset;
            bottom = e.detail.y + window.pageYOffset - e.detail.dy;
        }
        this.updateRange(top, right, bottom, left);
    }
    getCellFromElementPath(element) {
        let currentElement = element;
        let cell = null;
        while (currentElement && !cell) {
            if (currentElement.tagName && currentElement.tagName.toLowerCase() === RhiUiSelectableGridCell.is) {
                cell = currentElement;
            }
            currentElement = currentElement.parentNode;
        }
        return cell;
    }
    downHandler(e) {
        const cell = this.getCellFromElementPath(e.target);
        if (!cell) {
            return;
        }
        const event = new CustomEvent('cell-down', { detail: { name: cell.getAttribute('name') } });
        this['dispatchEvent'](event);
    }
    upHandler(e) {
        const cell = this.getCellFromElementPath(e.target);
        if (!cell) {
            return;
        }
        const event = new CustomEvent('cell-up', { detail: { name: cell.getAttribute('name') } });
        this['dispatchEvent'](event);
    }
}
customElements.define(RhiUiSelectableGrid.is, RhiUiSelectableGrid);
