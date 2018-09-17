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

export class RhiUiLogoSmall extends HTMLElement {
    public static get is(): string { return 'rhi-ui-logo-small'; }

    public getTemplate(): string {
        return html`
            <style>
                :host {
                    display: block;
                    
                    --rhi-ui-logo-black: #000;
                    --rhi-ui-logo-blue: #0072CE;
                    --rhi-ui-logo-gray: #7F7F7F;
                }

                :host([color-palette="black"]) {
                    --rhi-ui-logo-blue: #000;
                    --rhi-ui-logo-gray: #000;
                }

                :host([color-palette="grayscale"]) {
                    --rhi-ui-logo-blue: #B2B3B6;
                }

                :host([color-palette="white"]) {
                    --rhi-ui-logo-black: #FFF;
                    --rhi-ui-logo-blue: #FFF;
                    --rhi-ui-logo-gray: #FFF;
                }

                .cls-1 {
                    fill: var(--rhi-ui-logo-black, #000);
                }

                .cls-2 {
                    fill: var(--rhi-ui-logo-gray, #7F7F7F);
                }
                
                .cls-3 {
                    fill: var(--rhi-ui-logo-blue, #0072CE);
                }

                /*
                 * The :host notation with CSS variables did not work on MS Edge.
                 * The code below has been added so that the component works on Edge just as on FireFox, Safari, and Chrome,
                 */
                [color-palette="black"] .cls-2,
                [color-palette="black"] .cls-3 {
                    fill: #000;
                }

                [color-palette="grayscale"] .cls-3 {
                    fill: #B2B3B6;
                }

                [color-palette="white"] .cls-1,
                [color-palette="white"] .cls-2,
                [color-palette="white"] .cls-3 {
                    fill: #FFF;
                }
            </style>
            <!-- shadow DOM for your element -->
            <svg id="rhi-logo-small"
                 data-name="Layer 1"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 203 168">
                <title>rhi-logo-small</title>
                <path class="cls-1" d="M31.68,64.85C39.93,45.86,61,33,83,29a30.32,30.32,0,0,0-6.79,10.27c-4.18,10.68-1,22.69,8.66,33.32,6.36,6.67,9.67,16.27,7.6,27.43-2.12,11.36-9.3,22.35-19.9,30.93C35.66,120.43,20.31,90.92,31.68,64.85Z"/><path class="cls-1" d="M101.06,80.36c1.22-4.06,6.25-6.52,11.31-5.62s8.68,4.92,7.9,9.16c-.84,4.42-6.1,7.3-11.66,6.21S99.79,84.6,101.06,80.36Z"/><path class="cls-2" d="M91.56,62.47c1.29-3.34,6-5.34,10.52-4.6s7.59,4.05,6.62,7.47c-1,3.62-5.9,5.94-10.84,5.07S90.19,65.92,91.56,62.47Z"/><path class="cls-3" d="M82.59,45.58c1.37-2.82,5.76-4.5,9.9-3.88s6.75,3.39,5.67,6.3S92.45,53,88,52.25,81.17,48.49,82.59,45.58Z"/><path class="cls-3" d="M90,31.36c1.23-2.36,5.27-3.76,9.08-3.26s6.18,2.88,5.17,5.3S99.05,37.56,95,36.93,88.75,33.82,90,31.36Z"/><path class="cls-1" d="M116.84,128.75c.63,5.33-4.62,10.28-11.69,11.14s-13.31-2.83-13.93-8.15,4.59-10.32,11.69-11.13S116.23,123.44,116.84,128.75Z"/><path class="cls-1" d="M125.21,104.81c.62,4.89-4,9.51-10.38,10.36s-12-2.52-12.64-7.39,4-9.52,10.35-10.34S124.55,99.92,125.21,104.81Z"/><path class="cls-3" d="M117.69,30c23.23,3.79,45.45,17.27,53.69,37.25,10.45,25.28-3.56,53.69-37.7,66.2a82.11,82.11,0,0,0,3.42-25.58c-.61-20.55-9.75-36.67-22.57-47.23-6.23-5.3-9.28-11.6-8.24-17.71,1-5.61,5.3-10.07,11.43-12.91Z"/>
            </svg>
        `;
    }

    public constructor() {
        super();

        this.attachShadow({mode: 'open'});

        this.requestRender();
    }

    private requestRender(): void {
        const template: HTMLTemplateElement = <HTMLTemplateElement>document.createElement('template');
        template.innerHTML = this.getTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define(RhiUiLogoSmall.is, RhiUiLogoSmall);