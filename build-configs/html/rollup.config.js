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

function config({ input = '', context = undefined, output = {}, external = [] }) {
    return {
        input,
        context,
        output: {
            ...output,
        },
        external: [
            ...external,
        ],
        plugins: [
            resolve(),
            typescript({
                tsconfigDefaults: defaults,
                declaration: true,
                removeComments: true,
                tsconfig: "build-configs/html/tsconfig.json"
            })
        ]
    }
}

export default [
    config({
        input: 'src/@rhi-ui/html/rhi-ui-html.ts',
        output: {
            file: 'packages/@rhi-ui/html/rhi-ui-html.js',
            format: 'umd',
            name: 'RHI_UI_HTML'
        },
    }),
    config({
        input: 'src/@rhi-ui/html/rhi-ui-html.ts',
        output: {
            file: 'packages/@rhi-ui/html/rhi-ui-html.esm.js',
            format: 'esm'
        },
        external: ['@rhi-ui/html']
    })
];
