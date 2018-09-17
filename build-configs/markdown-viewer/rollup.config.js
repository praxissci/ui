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
            ...external,
        ],
        output: {
            ...output,
        },
        plugins: [
            resolve(),
            typescript({
                tsconfigDefaults: defaults,
                declaration: true,
                removeComments: true,
                tsconfig: "build-configs/markdown-viewer/tsconfig.json"
            })
        ]
    }
}

export default [
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer.ts',
        output: {
            file: 'packages/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer.js',
            format: 'umd',
            globals: { '@rhi-ui/html': 'RHI_UI_HTML' },
            name: 'RHI_UI_MARKDOWN_VIEWER'
        }
    }),
    config({
        external: ['@rhi-ui/html'],
        input: 'src/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer.ts',
        output: {
            file: 'packages/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer.esm.js',
            format: 'esm'
        }
    }),
    config({
        external: ['@rhi-ui/html', '@rhi-ui/demo-snippet', './rhi-ui-markdown-viewer'],
        input: 'src/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer-demo.ts',
        output: {
            file: 'packages/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer-demo.js',
            format: 'umd',
            globals: { '@rhi-ui/html': 'RHI_UI_HTML' },
            name: 'RHI_UI_MARKDOWN_VIEWER_DEMO'
        }
    }),
    config({
        external: ['@rhi-ui/html', '@rhi-ui/demo-snippet', '@rhi-ui/markdown-viewer', './rhi-ui-markdown-viewer'],
        input: 'src/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer-demo.ts',
        output: {
            file: 'packages/@rhi-ui/markdown-viewer/rhi-ui-markdown-viewer-demo.esm.js',
            format: 'esm'
        }
    })
];
