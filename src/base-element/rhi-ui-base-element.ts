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

export interface ICustomElementProperty {
    reflectToAttribute: boolean;
    type: string;
    useProperty: string;
    value: string;
}

export function getAttributesFrom(properties: { [index: string]: ICustomElementProperty }): string[] {
    const attributes: string[] = [];
    const props = properties;

    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            attributes.push(key.toLowerCase());
        }
    }

    return attributes;
}

export class RhiUiBaseElement extends HTMLElement {
    protected uiBindings: { [index: string]: HTMLElement | null } = {};
    protected props: { [index: string]: {} } = {};

    protected requestRender(template: string): void {
        const newTemplate = document.createElement('template');
        newTemplate.innerHTML = template;
        this.shadowRoot!.appendChild(newTemplate.content.cloneNode(true));
    }

    protected initializeDeclaredProperties(properties: { [index: string]: ICustomElementProperty }): void {
        for (const key in properties) {
            if (properties.hasOwnProperty(key)) {
                this.props[key] = properties[key].value;
            }
        }
    }

    protected updateUiBindings(properties: { [index: string]: ICustomElementProperty }): void {
        const elements: Element[] = Array.from(this.shadowRoot!.querySelectorAll('[bind-to]'));

        for (const element of elements) {
            const bindTo: string = element.getAttribute('bind-to') as string;
            this.uiBindings[bindTo] = element as HTMLElement;

            const property: ICustomElementProperty = properties[bindTo];

            if (property && property.value) {
                if (property.useProperty) {
                    (element as any)[property.useProperty] = property.value;
                } else {
                    element.innerHTML = property.value;
                }
            }
        }
    }
}
