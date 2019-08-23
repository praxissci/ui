/**
 * @license
 * Copyright (c) 2019 Praxis Spinal Cord Institute. All rights reserved.
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

// tslint:disable:max-line-length

export const template: string =
`
    <style>
        :host {
            background-color: #FFF;
            display: block;
            height: 600px;
        }

        :host([invalid-email]) .form-field.email .error-container label,
        :host([invalid-password]) .form-field.password .error-container label {
            display: inline-block;
        }

        :host:before {
            min-height: 30px;
        }

        .font-title {
            /*@apply --paper-font-title;*/
        }

        .card {
            background-color: #FFF;
            margin: 0;
        }

        .card .content {
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            overflow: hidden;
            padding: 8px;
        }

        .card .content praxis-ui-logo {
            width: 120px;
        }

        .card .content .title {
            margin: 16px 0;
        }

        .card .content .error-container {
            color: var(--color-deep-orange, #DD2C00);
        }

        .card .content .error-container.request {
            margin-bottom: 16px;
        }

        .card .content .form-field .error-container {
            min-height: 18px;
        }

        .card .content .form-field .error-container label {
            display: none;
        }

        .card .content .form-field.email,
        .card .content .form-field.password {
            margin-bottom: 16px;
        }

        .card .content .form-field.email input,
        .card .content .form-field.password input {
            font-size: 18px;
            line-height: 32px;
            margin: 8px 0;
            padding: 0 8px;
            width: 250px;
        }

        .card .content .controls {
            display: flex;
            margin-top: 32px;
            min-height: 48px;
        }

        .card .content .controls button {
            background-color: #FFF;
            border: 2px solid #0BF;
            border-radius: 4px;
            color: #0BF;
            cursor: pointer;
            font-size: 18px;
            padding: 8px 16px;
        }

        .card .content .controls .create {
            flex-grow: 1;
            flex-basis: 0;
        }

        .card .content .controls .create button {
            border: none;
        }

        .card .content .controls .login {
            flex-grow: 0;
            flex-basis: 0;
        }

        @media (min-width: 601px) {
            :host {
                background-color: #E2E2E2;
                background-image: var(--background-image-url, none);
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                display: -webkit-box;
                display: -moz-box;
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                -webkit-flex-direction: column;
                flex-direction: column;
                min-height: 100%;
                position: relative;
            }

            :host:before,
            :host:after {
                -moz-box-flex: 1;
                -ms-box-flex: 1;
                -webkit-box-flex: 1;
                box-flex: 1;
                -webkit-flex-grow: 1;
                flex-grow: 1;
                content: '';
                display: block;
                height: 24px;
            }

            .card {
                margin: 0 auto;
                width: 450px;

                -moz-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
                -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
            }

            .card .content {
                height: auto;
                min-height: 500px;
                overflow-y: auto;
            }
        }

        @media (min-width: 450px) {
            .card .content {
                padding: 48px 40px 36px;
            }
        }

        /*
         * The :host notation with CSS variables did not work on MS Edge.
         * The code below has been added so that the component works on Edge just as
         * on FireFox, Safari, and Chrome,
         */
        [invalid-email] .form-field.email .error-container label,
        [invalid-password] .form-field.password .error-container label {
            display: inline-block;
        }
    </style>
    <!-- shadow DOM for your element -->
    <div class="card">
        <div class="content">
            <praxis-ui-logo></praxis-ui-logo>
            <div class="title font-title" bind-to="login-title"></div>
            <div class="error-container request" bind-to="request-error"></div>
            <div class="form-field email">
                <div class="form-label"><label for="email" bind-to="login-email"></label></div>
                <input bind-to="email"
                       type="email"
                       id="email"
                       name="email"
                       required/>
                <div class="error-container"><label for="email" bind-to="login-email-validation-invalid"></label></div>
            </div>
            <div class="form-field password">
                <div class="form-label">
                    <label for="password" bind-to="login-password"></label>
                </div>
                <input bind-to="password"
                       type="password"
                       id="password"
                       name="password"
                       required/>
                <div class="error-container">
                    <label for="email" bind-to="login-password-validation-invalid"></label>
                </div>
            </div>
            <div class="controls">
                <div class="create">
                    <button bind-to="create-button">
                        <span bind-to="login-action-create"></span>
                    </button>
                </div>
                <div class="login">
                    <button bind-to="login-button" raised>
                        <span bind-to="login-action-submit"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
`;
