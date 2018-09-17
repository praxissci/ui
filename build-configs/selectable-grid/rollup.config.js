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
 * This happens with ./rhi-ui-selectable-grid-cell.
 * Rollup, on my machine, is mapping the file using E:\rhi\ui\src\@rhi-ui\selectable-grid\rhi-ui-selectable-grid-cell\rhi-ui-selectable-grid-cell.js
 * We need to use path.resolve to generate the correct mapping.
 */
const selectableGridCellPath =
    path.resolve('src/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-cell.js')
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
            resolve({
                browser: true
            }),
            typescript({
                tsconfigDefaults: defaults,
                declaration: true,
                removeComments: true,
                tsconfig: "build-configs/selectable-grid/tsconfig.json"
            })
        ]
    }
}

export default [
    // SELECTABLE-GRID-CELL
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-cell.ts',
        output: {
            file: 'packages/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-cell.js',
            format: 'umd',
            globals: { '@rhi-ui/html': 'RHI_UI_HTML' },
            name: 'RHI_UI_SELECTABLE_GRID_CELL'
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-cell.ts',
        output: {
            file: 'packages/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-cell.esm.js',
            format: 'esm'
        }
    }),
    // SELECTABLE-GRID
    config({
        external: [
            '@rhi-ui/html',
            './rhi-ui-selectable-grid-cell'
        ],
        input: 'src/@rhi-ui/selectable-grid/rhi-ui-selectable-grid.ts',
        output: {
            file: 'packages/@rhi-ui/selectable-grid/rhi-ui-selectable-grid.js',
            format: 'umd',
            globals: {
                '@rhi-ui/html': 'RHI_UI_HTML',
                [selectableGridCellPath]: 'RHI_UI_SELECTABLE_GRID_CELL'
            },
            name: 'RHI_UI_SELECTABLE_GRID',
        }
    }),
    config({
        external: [
            '@rhi-ui/html',
            './rhi-ui-selectable-grid-cell'
        ],
        input: 'src/@rhi-ui/selectable-grid/rhi-ui-selectable-grid.ts',
        output: {
            file: 'packages/@rhi-ui/selectable-grid/rhi-ui-selectable-grid.esm.js',
            format: 'esm'
        }
    }),
    // SELECTABLE-GRID-DEMO
    config({
        external: [
            '@rhi-ui/demo-snippet',
            '@rhi-ui/html',
            '@rhi-ui/markdown-viewer',
            './rhi-ui-selectable-grid-cell',
            './rhi-ui-selectable-grid'
        ],
        input: 'src/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-demo.ts',
        output: {
            file: 'packages/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-demo.js',
            format: 'umd',
            globals: {
                '@rhi-ui/html': 'RHI_UI_HTML'
            },
            name: 'RHI_UI_SELECTABLE_GRID_DEMO'
        }
    }),
    config({
        external: [
            '@rhi-ui/demo-snippet',
            '@rhi-ui/html',
            '@rhi-ui/markdown-viewer',
            './rhi-ui-selectable-grid-cell',
            './rhi-ui-selectable-grid'
        ],
        input: 'src/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-demo.ts',
        output: {
            file: 'packages/@rhi-ui/selectable-grid/rhi-ui-selectable-grid-demo.esm.js',
            format: 'esm'
        }
    })
];
