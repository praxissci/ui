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

const defaults = { compilerOptions: { declaration: true } };
const override = { compilerOptions: { declaration: false } };

function config({ input = '', context = undefined, output = {}, external = [], globals = {} }) {
    return {
        input,
        context,
        external: [
            ...external
        ],
        globals: {
            ...globals
        },
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
    config({
        external: ['@rhi-ui/html'],
        globals: { '@rhi-ui/html': 'RHI_UI_HTML' },
        input: 'src/@rhi-ui/logo/rhi-ui-logo.ts',
        output: {
            file: 'packages/@rhi-ui/logo/rhi-ui-logo.js',
            format: 'umd',
            name: 'RHI_UI_LOGO',
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/logo/rhi-ui-logo.ts',
        output: {
            file: 'packages/@rhi-ui/logo/rhi-ui-logo.esm.js',
            format: 'esm'
        }
    }),
    config({
        external: ['@rhi-ui/demo-snippet', '@rhi-ui/html', '@rhi-ui/markdown-viewer', './rhi-ui-logo', './rhi-ui-small'],
        globals: { '@rhi-ui/html': 'RHI_UI_HTML' },
        input: 'src/@rhi-ui/logo/rhi-ui-logo-demo.ts',
        output: {
            file: 'packages/@rhi-ui/logo/rhi-ui-logo-demo.js',
            format: 'umd',
            name: 'RHI_UI_LOGO_DEMO'
        }
    }),
    config({
        external: ['@rhi-ui/demo-snippet', '@rhi-ui/html', '@rhi-ui/markdown-viewer', './rhi-ui-logo', './rhi-ui-small'],
        input: 'src/@rhi-ui/logo/rhi-ui-logo-demo.ts',
        output: {
            file: 'packages/@rhi-ui/logo/rhi-ui-logo-demo.esm.js',
            format: 'esm'
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        globals: { '@rhi-ui/html': 'RHI_UI_HTML' },
        input: 'src/@rhi-ui/logo/rhi-ui-logo-small.ts',
        output: {
            file: 'packages/@rhi-ui/logo/rhi-ui-logo-small.js',
            format: 'umd',
            name: 'RHI_UI_LOGO_SMALL',
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/logo/rhi-ui-logo-small.ts',
        output: {
            file: 'packages/@rhi-ui/logo/rhi-ui-logo-small.esm.js',
            format: 'esm'
        }
    })
];
