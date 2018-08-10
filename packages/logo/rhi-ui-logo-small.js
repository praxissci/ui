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
export class RhiUiLogoSmall extends LitElement {
    static get is() { return 'rhi-ui-logo-small'; }
    _render(props) {
        return html `
            <style>
                :host {
                    display: block;
                }

            </style>
            <!-- shadow DOM for your element -->
            <svg id="rhi-logo-small"
                 data-name="Layer 1"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 73 56">
                <defs>
                    <style>
                        .cls-1,.cls-2{fill:#231f20;}
                        .cls-2,.cls-3,.cls-4{fill-rule:evenodd;}
                        .cls-3{fill:#929497;}
                        .cls-4,.cls-5{fill:#007dc2;}
                    </style>
                </defs>
                <title>rhi-logo-small</title>
                <path class="cls-1" d="M1.82,18.26C5.91,8.85,16.37,2.46,27.27.49A14.94,14.94,0,0,0,23.9,5.58c-2.07,5.29-.5,11.24,4.29,16.5A15.16,15.16,0,0,1,32,35.68C30.91,41.31,27.35,46.75,22.1,51,3.79,45.79-3.81,31.17,1.82,18.26Z"/><path class="cls-2" d="M36.2,25.94c.6-2,3.09-3.23,5.6-2.78s4.3,2.44,3.91,4.53-3,3.62-5.77,3.08S35.57,28,36.2,25.94Z"/><path class="cls-3" d="M31.49,17.08c.64-1.66,2.95-2.65,5.21-2.28s3.76,2,3.28,3.7S37.06,21.44,34.61,21,30.81,18.79,31.49,17.08Z"/><path class="cls-4" d="M27,8.71c.68-1.4,2.86-2.23,4.91-1.92s3.35,1.68,2.81,3.12-2.83,2.46-5,2.1S26.34,10.15,27,8.71Z"/><path class="cls-4" d="M30.74,1.66C31.35.5,33.34-.2,35.23.05S38.3,1.47,37.8,2.67s-2.6,2.07-4.61,1.75S30.1,2.88,30.74,1.66Z"/><path class="cls-1" d="M44,49.91c.31,2.64-2.28,5.1-5.79,5.52s-6.59-1.4-6.9-4,2.28-5.12,5.79-5.52S43.71,47.28,44,49.91Z"/><path class="cls-1" d="M48.16,38.05c.31,2.42-2,4.72-5.14,5.13s-6-1.24-6.26-3.66,2-4.71,5.12-5.12S47.84,35.63,48.16,38.05Z"/><path class="cls-5" d="M44.43,1C55.94,2.84,67,9.52,71,19.42c5.18,12.52-1.76,26.6-18.67,32.8a40.92,40.92,0,0,0,1.69-12.68A30.85,30.85,0,0,0,42.87,16.15c-3.09-2.63-4.6-5.75-4.08-8.78.48-2.78,2.62-5,5.66-6.39Z"/>
            </svg>
        `;
    }
    constructor() {
        super();
    }
}
customElements.define(RhiUiLogoSmall.is, RhiUiLogoSmall);
//# sourceMappingURL=rhi-ui-logo-small.js.map