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

import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import path from 'path';

const defaults = { compilerOptions: { declaration: true } };
const override = { compilerOptions: { declaration: false } };

/**
* https://rollupjs.org/guide/en
* View: external -e/--external
* 
* When marking external files that are consumed using relative paths (e.g. ./my-component),
* the globals will require the local path to the file.
* This happens with ./rhi-ui-logo.
* Rollup, on my machine, is mapping the file using E:\rhi\ui\src\@rhi-ui\logo\rhi-ui-logo.js
* We need to use path.resolve to generate the correct mapping.
*/
const logoPath =
   path.resolve('src/@rhi-ui/logo/rhi-ui-logo.js')
       .replace('.js', '');

const logoSmallPath =
   path.resolve('src/@rhi-ui/logo/rhi-ui-logo-small.js')
       .replace('.js', '');

function config({ input = '', context = undefined, output = {}, external = [], globals = {} }) {
    return {
        input,
        context,
        external: [
            ...external
        ],
        output: {
            ...output
        },
        plugins: [
            resolve(),
            typescript({
                tsconfigDefaults: defaults,
                declaration: true,
                removeComments: true,
                tsconfig: "build-configs/logo/tsconfig.json"
            })
        ]
    }
}

export default [
    // INDEX
    config({
        external: ['./rhi-ui-logo', './rhi-ui-logo-small'],
        input: 'src/@rhi-ui/logo/index.ts',
        output: {
            file: 'packages/@rhi-ui/logo/umd/index.js',
            format: 'umd',
            globals: {
                [logoPath]: 'RHI_UI_LOGO',
                [logoSmallPath]: "RHI_UI_LOGO_SMALL"
            },
            name: 'RHI_UI_LOGO',
        }
    }),
    config({
        external: ['./rhi-ui-logo', './rhi-ui-logo-small'],
        input: 'src/@rhi-ui/logo/index.ts',
        output: {
            file: 'packages/@rhi-ui/logo/esm/index.js',
            format: 'esm'
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/logo/rhi-ui-logo.ts',
        output: {
            file: 'packages/@rhi-ui/logo/umd/rhi-ui-logo.js',
            format: 'umd',
            globals: { '@rhi-ui/html': 'RHI_UI_HTML' },
            name: 'RHI_UI_LOGO'
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/logo/rhi-ui-logo.ts',
        output: {
            file: 'packages/@rhi-ui/logo/esm/rhi-ui-logo.js',
            format: 'esm'
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/logo/rhi-ui-logo-small.ts',
        output: {
            file: 'packages/@rhi-ui/logo/umd/rhi-ui-logo-small.js',
            format: 'umd',
            globals: { '@rhi-ui/html': 'RHI_UI_HTML' },
            name: 'RHI_UI_LOGO_SMALL'
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/logo/rhi-ui-logo-small.ts',
        output: {
            file: 'packages/@rhi-ui/logo/esm/rhi-ui-logo-small.js',
            format: 'esm'
        }
    })
];
