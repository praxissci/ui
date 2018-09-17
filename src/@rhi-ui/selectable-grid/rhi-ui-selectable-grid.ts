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

import { html } from '@rhi-ui/html';
import { GestureEventListeners } from '../../../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as Gestures from '../../../node_modules/@polymer/polymer/lib/utils/gestures.js';
import { RhiUiSelectableGridCell } from './rhi-ui-selectable-grid-cell';

export class RhiUiSelectableGrid extends GestureEventListeners(HTMLElement) {
    public static get is(): string { return 'rhi-ui-selectable-grid'; }

    public getTemplate(): string {
        return html`
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

    public static get properties(): any {
        return {
            'preview-selected-value-on-range': {
                type: Boolean,
                value: false
            }
        };
    }
    
    public static get observedAttributes(): string[] {
        const attributes: string[] = [];

        for (let key in RhiUiSelectableGrid.properties) {
            attributes.push(key.toLowerCase());
        }

        return attributes;
    }

    private props: any = {};
    private selectedCell: HTMLElement;

    // I don't like using any, but that is what
    private currentTrackSource: any = null;
    private selectionRange: HTMLElement[] = [];

    private cells: HTMLElement[];

    public constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.requestRender();
    }

    public connectedCallback(): void {
        // if the element has children, it means rows were added to the <slot> element.
        // Other wise we asume the object was extended and the rows were added directly to the element's template instead of <slot>.
        const rootElement: HTMLElement = this.getRootElement();
        this.initializeCells(rootElement.children);

        Gestures.addListener(rootElement, 'track', this.trackHandler.bind(this));
        Gestures.addListener(rootElement, 'down', this.downHandler.bind(this));
        Gestures.addListener(rootElement, 'up', this.upHandler.bind(this));
    }

    public disconnectedCallback(): void {
        const rootElement: any = this.getRootElement();
        Gestures.removeListener(rootElement, 'track', this.trackHandler.bind(this));
        Gestures.removeListener(rootElement, 'down', this.downHandler.bind(this));
        Gestures.removeListener(rootElement, 'up', this.upHandler.bind(this));
    }

    private requestRender(): void {
        const template: HTMLTemplateElement = <HTMLTemplateElement>document.createElement('template');
        template.innerHTML = this.getTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    private getRootElement(): any {
        return this['children'].length > 0 ? this : this['shadowRoot'];
    }

    private initializeCells(rows: HTMLCollection): void {
        this.cells = [];

        for (let r: number = 0; r < rows.length; r++) {
            const row: HTMLElement = <HTMLElement>rows.item(r);

            row.children

            if (!row.classList || !row.classList.contains('row')) {
                continue;
            }

            for (let c: number = 0; c < row.children.length; c++) {
                if (row.children[c].tagName.toUpperCase() === 'RHI-UI-SELECTABLE-GRID-CELL')
                    this.cells.push(<HTMLElement>row.children.item(c));
            }
        }
    }

    public selectCell(name: string) {
        if (this.selectedCell) {
            this.selectedCell['selected'] = false;
            this.selectedCell = null;
        }

        this.selectedCell = this.cells.find((c: HTMLElement) => c.getAttribute('name') === name);

        if (this.selectedCell) {
            this.selectedCell['selected'] = true;
        }
    }

    public getCellValue(name: string): string {
        const cell: HTMLElement = this.cells.find((c: HTMLElement) => c.getAttribute('name') === name);
        return cell ? cell.getAttribute('value') : '';
    }

    public clearSelectionRange(): void {
        this.cells.forEach((c: HTMLElement) => {
            c.removeAttribute('highlighted');
            c.removeAttribute('preview');
        });

        this.selectionRange = [];
    }

    private static rectanglesIntersect(r1Top: number, r1Right: number, r1Bottom: number, r1Left: number, r2Top: number, r2Right: number, r2Bottom: number, r2Left: number): boolean {
        return !(r2Left > r1Right ||
            r2Right < r1Left ||
            r2Top > r1Bottom ||
            r2Bottom < r1Top);
    }

    private isValidForRange(cell: HTMLElement): boolean {
        return true;
    }

    private updateRange(top: number, right: number, bottom: number, left: number): void {
        const range: HTMLElement[] = [];
        const currentValue: string = this.selectedCell ? this.selectedCell.getAttribute('value') : null;

        this.cells.forEach((c: HTMLElement) => {
            const bounds = c.getBoundingClientRect();
            if (
                RhiUiSelectableGrid.rectanglesIntersect(bounds.top, bounds.left + bounds.width, bounds.top + bounds.height, bounds.left, top, right, bottom, left)
                && this.isValidForRange(c)
            ) {
                c.setAttributeNode(document.createAttribute('highlighted'));
                range.push(c);

                if (this['preview-selected-value-on-range'] && currentValue) {
                    c.setAttribute('preview', currentValue);
                }
            } else {
                c.removeAttribute('highlighted');
                c.removeAttribute('preview');
            }
        });

        this.selectionRange = range;
    }

    private trackHandler(e): void {
        const t: any = e.detail.hover();

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

        let left: number;
        let right: number;
        let top: number;
        let bottom: number;

        // Remember that the detail returns the coordinates based on the screen.
        // To tell where we are on the actual page we need to add the distance scrolled.
        if (e.detail.dx > 0) {
            left = e.detail.x/* + window.pageXOffset*/ - e.detail.dx;
            right = e.detail.x/* + window.pageXOffset*/;
        } else {
            left = e.detail.x/* + window.pageXOffset*/;
            right = e.detail.x/* + window.pageXOffset*/ - e.detail.dx;
        }

        if (e.detail.dy > 0) {
            top = e.detail.y/* + window.pageYOffset*/ - e.detail.dy;
            bottom = e.detail.y/* + window.pageYOffset*/;
        } else {
            top = e.detail.y/* + window.pageYOffset*/;
            bottom = e.detail.y/* + window.pageYOffset*/ - e.detail.dy;
        }

        this.updateRange(top, right, bottom, left);
    }

    private getCellFromElementPath(element: any): HTMLElement {
        let currentElement = element;
        let cell: HTMLElement = null;

        while (currentElement && !cell) {
            if (currentElement.tagName && currentElement.tagName.toLowerCase() === RhiUiSelectableGridCell.is) {
                cell = currentElement;
            }

            currentElement = currentElement.parentNode;
        }

        return cell;
    }

    private downHandler(e: any): void {
        const cell: HTMLElement = this.getCellFromElementPath(e.target);

        if (!cell) {
            return;
        }

        const event: CustomEvent = new CustomEvent('cell-down', { detail: { name: cell.getAttribute('name') } });
        this['dispatchEvent'](event);
    }

    private upHandler(e): void {
        const cell: HTMLElement = this.getCellFromElementPath(e.target);

        if (!cell) {
            return;
        }

        const event: CustomEvent = new CustomEvent('cell-up', { detail: { name: cell.getAttribute('name') } });
        this['dispatchEvent'](event);
    }
}

customElements.define(RhiUiSelectableGrid.is, RhiUiSelectableGrid);