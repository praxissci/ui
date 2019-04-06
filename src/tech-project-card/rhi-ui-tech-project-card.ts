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

import { ICustomElementProperty, RhiUiBaseElement } from '@rhi-ui/base-element';
import { template } from './rhi-ui-tech-project-card-template';

export class RhiUiTechProjectCard extends RhiUiBaseElement {
    public static get is(): string { return 'rhi-ui-tech-project-card'; }

    public static get observedAttributes(): string[] {
        const result: string[] = [];
        const properties: { [index: string]: ICustomElementProperty } = RhiUiTechProjectCard.properties;

        for (const property in properties) {
            if (properties.hasOwnProperty(property)) {
                result.push(property);
            }
        }

        return result;
    }

    public static get properties(): { [index: string]: ICustomElementProperty } {
        return {
            'champion': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'code': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'description': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'lead': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'lead-initials': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'milestones': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'name': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'resources': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'status': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
            'users': { reflectToAttribute: true, type: 'string', useProperty: '', value: '' },
        };
    }

    public constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.requestRender(this.getTemplate());
        this.updateUiBindings(RhiUiTechProjectCard.properties);
    }

    public getTemplate(): string {
        return template;
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string, namespace: string): void {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'resources') {
            this.updateResources(newValue);
            return;
        }

        this.props[name] = newValue;
        const element: (HTMLElement | null) = this.uiBindings[name];

        if (element) {
            element.innerHTML = newValue;
        }
    }

    private updateResources(resourcesText: string): void {
        const resourcesElement: HTMLElement | null = this.uiBindings.resources;

        if (!resourcesElement) {
            return;
        }

        const resources: [{name: string, url: string}] = JSON.parse(resourcesText);
        let resourcesTemplate: string = '';
        resources.forEach(
            (r: {name: string, url: string}) =>
                resourcesTemplate += `<li><a href="${r.url}" target="_blank">${r.name}</a></li>`);

        resourcesElement.innerHTML = resourcesTemplate;
    }
}

customElements.define(RhiUiTechProjectCard.is, RhiUiTechProjectCard);
