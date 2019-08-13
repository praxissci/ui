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
import { terser as minify } from "rollup-plugin-terser";
import { readdirSync } from "fs";

// get all folder names in src folder in an array
const COMPONENTS = readdirSync('./src');

function config({ input = '', output = {}, plugins = [], tsconfigOverride = {} }) {
    return {
        input,
        output,
        plugins: [
            resolve(),
            typescript({tsconfigOverride}),
            ...plugins
        ]
    }
}

/**
 * esm builds with sourcemap and no declaration files
 * builds found at demo/scripts/@rhi-ui/
 */
const devBuild = COMPONENTS.map(component =>
    config({
        input: `src/${component}/index.ts`,
        output: {
            file: `demo/scripts/@rhi-ui/${component}/index.js`,
            format: 'esm',
            sourcemap: true
        },
        tsconfigOverride: { compilerOptions: { declaration: false } }
    })
);

/**
 * umd and esm builds for all components
 * umd builds are minified and found in `umd` folder in the package
 * esm builds are packaged in root of the package
 */
const prodBuild = [
    // minified umd builds
    ...COMPONENTS.map(component =>
        config({
            input: `src/${component}/index.ts`,
            output: {
                name: `RHI_UI_${component.toUpperCase().replace(/-/g,'_')}`,
                file: `dist/${component}/umd/index.js`,
                format: 'umd'
            },
            plugins:[ minify() ],
            tsconfigOverride: { compilerOptions: { declaration: false } }
        })
    ),
    // esm builds
    ...COMPONENTS.map(component =>
        config({
            input: `src/${component}/index.ts`,
            output: {
                file: `dist/${component}/index.js`,
                format: 'esm'
            },
            tsconfigOverride: { include: [ `src/${component}/**/*` ] } // to avoid declaration files from  other components
        })
    ),
]

const build = process.env.BUILD === 'production' ? prodBuild : devBuild;

export default build
