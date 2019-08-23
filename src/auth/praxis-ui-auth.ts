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

import { ICustomElementProperty, RhiUiBaseElement } from '@rhi-ui/base-element';
import { template } from './praxis-ui-auth-template';

export class PraxisUiAuth extends RhiUiBaseElement {
    public static get is(): string { return 'praxis-ui-auth'; }

    public static get observedAttributes(): string[] {
        const result: string[] = [];
        const properties: { [index: string]: ICustomElementProperty } = PraxisUiAuth.properties;

        for (const property in properties) {
            if (properties.hasOwnProperty(property)) {
                result.push(property);
            }
        }

        return result;
    }

    public static get properties(): { [index: string]: ICustomElementProperty } {
        return {
            'login-action-create': {
                reflectToAttribute: true,
                type: 'string',
                useProperty: '',
                value: 'Create an account',
            },
            'login-action-submit': { reflectToAttribute: true, type: 'string', useProperty: '', value: 'Login'},
            'login-email': { reflectToAttribute: true, type: 'string', useProperty: '', value: 'E-mail'},
            'login-email-validation-invalid': {
                reflectToAttribute: true,
                type: 'string',
                useProperty: '',
                value: 'Please enter a valid email.',
            },
             'login-password': { reflectToAttribute: true, type: 'string', useProperty: '', value: 'Password'},
             'login-password-validation-invalid': {
                 reflectToAttribute: true,
                 type: 'string',
                 useProperty: '',
                 value: 'Please provide a password.',
             },
             'login-title': { reflectToAttribute: true, type: 'string', useProperty: '', value: 'Login'},
             'request-error': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
             'show-logo': { reflectToAttribute: true, type: 'Boolean', useProperty: '', value: 'false' },
        };
    }

    public constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.requestRender(this.getTemplate());
        this.updateUiBindings(PraxisUiAuth.properties);

        const createButton: HTMLElement = this.uiBindings['create-button'] as HTMLElement;

        if (createButton) {
            createButton.addEventListener('click', (e: MouseEvent) => this.onCreateTapped(e));
        }

        const loginButton: HTMLElement = this.uiBindings['login-button'] as HTMLElement;

        if (loginButton) {
            loginButton.addEventListener('click', (e: MouseEvent) => this.onLoginTapped(e));
        }

        window.addEventListener('keypress', (e: KeyboardEvent) => this.onKeyPressed(e));
    }

    public getTemplate(): string {
        return template;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void {
        if (oldValue === newValue) {
            return;
        }

        this.props[name] = newValue;
        const element: (HTMLElement | null) = this.uiBindings[name];

        if (element) {
            element.innerHTML = newValue;
        }
    }

    private handleLoginRequest(): void {
        const email: HTMLInputElement = this.uiBindings.email as HTMLInputElement;
        const password: HTMLInputElement = this.uiBindings.password as HTMLInputElement;

        const emailIsValid = email && email.checkValidity();
        const passwordIsValid = password && password.checkValidity();
        this.manageBlankAttribute(emailIsValid, 'invalid-email');
        this.manageBlankAttribute(passwordIsValid, 'invalid-password');

        if (!emailIsValid || !passwordIsValid) {
            return;
        }

        this.dispatchEvent(
            new CustomEvent(
                'login-requested',
                {
                    detail: {
                        password: password.value,
                        username: email.value,
                    },
                },
            ),
        );
    }

    private manageBlankAttribute(remove: boolean, attributeName: string): void {
        if (remove) {
            this.removeAttribute(attributeName);
            return;
        }

        this.setAttributeNode(document.createAttribute(attributeName));
    }

    private onCreateTapped(e: MouseEvent): boolean {
        this.dispatchEvent(new CustomEvent('create-requested'));

        return true;
    }

    private onLoginTapped(e: MouseEvent): boolean {
        this.handleLoginRequest();
        return true;
    }

    private onKeyPressed(e: KeyboardEvent): boolean {
        if (e.keyCode === 13 || e.which === 13) {
            this.handleLoginRequest();
        }

        return true;
    }
}

customElements.define(PraxisUiAuth.is, PraxisUiAuth);
