/**
 * @license
 * Copyright (c) 2019 Rick Hansen Institute. All rights reserved.
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

export const template: string =
    `
        <style>
            /* Material design card container */
            :host {
                --rhi-ui-tech-font-common-base-font-family: 'Roboto', 'Noto', 'Open Sans', sans-serif';
                --rhi-ui-tech-project-card-lead-icon-background-color: #000;
                --rhi-ui-tech-project-card-lead-icon-color: #FFF;
                --rhi-ui-tech-project-card-media-background-color: #CCC;
                --rhi-ui-tech-project-card-media-background-image: none;

                background: #fff;
                border-radius: 2px;
                display: block;
                font-family: var(--rhi-ui-tech-font-common-base-font-family, 'Roboto', 'Noto', 'Open Sans', sans-serif);
                margin: 1rem;
                min-height: 300px;
                min-width: 300px;
                overflow: hidden;
                position: relative;
                transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
            }

            :host([elevation="1"]) {
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            }

            :host([elevation="2"]) {
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            }

            :host([elevation="3"]) {
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            }

            :host([elevation="4"]) {
                box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            }

            :host([elevation="5"]) {
                box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
            }

            .code {
                margin: 16px 16px 4px 16px;
            }

            .description {
                margin: 16px;
            }

            .detail {
                margin: 16px;
            }

            .display-flex {
                display: flex;
            }

            .header {
                color: #000;
                font-size: 21px;
                font-weight: bold;
                margin: 4px 16px 16px 16px;
                text-transform: capitalize;
            }

            .lead-icon {
                background-color: var(--rhi-ui-tech-project-card-lead-icon-background-color, #000);
                border: solid 4px #FFF;
                border-radius: 20px;
                bottom: -20px;
                color: var(--rhi-ui-tech-project-card-lead-icon-color, #FFF);
                font-size: 15px;
                height: 32px;
                left: 50%;
                line-height: 31px;
                margin-left: -20px;
                position: absolute;
                text-align: center;
                width: 32px;
            }

            .media {
                background-color: var(--rhi-ui-tech-project-card-media-background-color, #CCC);
                background-image: var(--rhi-ui-tech-project-card-media-background-image, none);
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                min-height: 194px;
                position: relative;
            }

            .text-body-1 {
                color: #232F34;
                font-size: 17px;
            }

            .text-body-2 {
                color: #232F34;
                font-size: 15px;
            }

            .text-color-secondary {
                color: #666;
            }
        </style>
        <div class="media">
            <div class="lead-icon" bind-to="lead-initials"></div>
        </div>
        <div class="code text-body-2" bind-to="code"></div>
        <div class="header" bind-to="name"></div>
        <div class="description text-body-1" bind-to="description"></div>
        <div class="detail">
            <div class="text-body-2 text-color-secondary">Lead</div>
            <div bind-to="lead"></div>
        </div>
        <div class="detail">
            <div class="text-body-2 text-color-secondary">Champion</div>
            <div bind-to="champion"></div>
        </div>
        <div class="detail">
            <div class="text-body-2 text-color-secondary">Status</div>
            <div bind-to="status"></div>
        </div>
        <div class="detail">
            <div class="text-body-2 text-color-secondary">Resources:</div>
            <ul bind-to="resources"></ul>
        </div>
        <!--<div>
            milestones="[]"
            resources="[]"
            users="[]"></rhi-ui-tech-project-card>
        </div>-->
        <!-- shadow DOM for your element -->
    `;
