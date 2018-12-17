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

export const template: string = `
    <!-- shadow DOM for your element -->
    <style>
        :host {
            background-color: #323232;
            bottom: 24px;
            box-sizing: border-box;
            display: flex;
            left: 24px;
            padding-left: 24px;
            padding-right: 24px;
            position: fixed;
            transform: translateY(200%);
            transition: transform .25s cubic-bezier(0,0,.2,1) 0ms,-webkit-transform .25s cubic-bezier(0,0,.2,1) 0ms;
            z-index: 999999999;
        }
        :host([align-right=""]) {
            left: unset;
            right: 24px;
        }
        :host([active]) {
            transform: translateY(0);
        }
        :host([align-center=""]) {
            left: 50%;
            transform: translate(-50%,200%);
        }
        :host([align-center=""][active]) {
            transform: translate(-50%,0);
        }
        #message{
            align-items: center;
            color:#fff;
            display: flex;
            font-size: 1rem;
            line-height: 1.5rem;
            margin-right: auto;
            padding: 11px 0;
        }
        ::slotted(button){
            background-color: transparent;
            border: none;
            color: var(--isncsci-secondary-text-color,#666);
            outline: none;
            text-transform: uppercase;
        }
        @media (max-width: 599px) {
            :host {
                bottom: 0;
                left: 0;
                width: 100%;
            }
        }
        @media (min-width: 600px) {
            :host {
                border-radius: 2px;
                min-width: 288px;
                max-width: 568px;
            }
        }
        #buttons{
            display: flex;
            padding-left: 24px;
        }
    </style>
    <div id="message"></div><div id="buttons"><slot></slot></div>
`;
