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

export class RhiUiThermometerEq5d extends HTMLElement {
    public static get is(): string { return 'rhi-ui-thermometer-eq5d'; }

    public static get observedAttributes(): string[] {
        return ['value'];
    }

    private valueBar: HTMLElement | null = null;
    private start: number = 0;
    private end: number = 100;
    private steps: number = 10;

    public constructor() {
        super();

        this.updateProperties();
        this.attachShadow({ mode: 'open' });
        this.requestRender();
    }

    public getTemplate(scale: string): string {
        return `
            <style>
                :host {
                    border: solid 1px;
                    border-color: var(--thermometer-border-color, #CCC);
                    border-radius: 4px;
                    box-shadow: inset 0 0 48px var(--thermometer-box-shadow-color, #E2E2E2);
                    display: block;
                    overflow: visible;
                    padding: 20px 0 12px 0;
                    position: relative;
                }

                .section {
                    display: flex;
                    margin-right: 12px;
                }

                .section .grade {
                    color: var(--thermometer-grade-color, #666);
                    font-size: 12px;
                    margin: -8px 4px 0 0;
                    text-align: right;
                    width: 28px;
                }

                .section .bars {
                    flex-grow: 1;
                }

                .section .bars .bar {
                    background-color: var(--thermometer-bar-color, #CCC);
                    height: 1px;
                    margin: 0 4px 2px 4px;
                }

                .section .bars .bar.main {
                    background-color: var(--thermometer-main-bar-color, #000);
                    margin: 0 0 2px 0;
                    width: 100%;
                }

                .mercury {
                    background-color: var(--thermometer-mercury-bar-color, #F00);;
                    bottom: 19px;
                    left: 44px;
                    mix-blend-mode: var(--thermometer-mercury-mix-blend-mode, multiply);
                    position: absolute;
                    right: 24px;
                    transition: top 1s;
                }
            </style>
            <!-- shadow DOM for your element -->
            ${scale}
            <div class="mercury" bind-to="value"></div>
        `;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void {
        if (oldValue === newValue) {
            return;
        }

        if (name !== 'value') {
            return;
        }

        const value: number = parseInt(newValue, 10);
        if (!isNaN(value)) {
            this.updateValue(value);
        }
    }

    private updateProperties(): void {
        this.start = this.getNumericValueFromAttribute('start', 0);
        this.end = this.getNumericValueFromAttribute('end', 100);
        this.steps = this.getNumericValueFromAttribute('steps', 10);
        this.updateValue(this.getNumericValueFromAttribute('value', 0));
    }

    private getNumericValueFromAttribute(attributeName: string, defaultValue: number): number {
        const attribute: string | null = this.getAttribute(attributeName);
        const value: number = attribute ? parseInt(attribute, 10) : defaultValue;
        return isNaN(value) ? defaultValue : value;
    }

    private requestRender(): void {
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = this.getTemplate(this.getScale(this.start, this.end, this.steps));

        if (!this.shadowRoot) {
            return;
        }

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.valueBar = this.shadowRoot.querySelector('[bind-to="value"]');
    }

    private getScale(start: number, end: number, steps: number): string {
        if (end < start) {
            throw new Error(`${RhiUiThermometerEq5d.is} :: start-lt-end`);
        }

        if (steps < 1) {
            throw new Error(`${RhiUiThermometerEq5d.is} :: steps-lt-one`);
        }

        let current: number = end;
        let scale: string = '';

        while (current > start) {
            let bars: string = '';

            for (let i: number = 1; i < steps; i++) {
                bars += `<div class="bar"></div>`;
            }

            scale += `
                <div class="section">
                    <div class="grade">${current}</div>
                    <div class="bars">
                        <div class="bar main"></div>
                        ${bars}
                    </div>
                </div>`;
            current -= steps;
        }

        scale += `
            <div class="section">
                <div class="grade">${start}</div>
                <div class="bars">
                    <div class="bar main"></div>
                </div>
            </div>
        `;

        return scale;
    }

    private updateValue(value: number) {
        const marginTop: number = 20;
        const marginBottom: number = 19;
        const height: number = this.clientHeight - marginTop - marginBottom;

        if (!this.valueBar || value < this.start || value > this.end) {
            return;
        }

        const barHeight: number = (value - this.start) * height / (this.end - this.start);
        this.valueBar.style.top = `${marginTop + height - barHeight}px`;
    }
}

customElements.define(RhiUiThermometerEq5d.is, RhiUiThermometerEq5d);
