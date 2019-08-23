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
const fs = require('fs-extra');

// get all folder names in src folder in an array
const COMPONENTS = fs.readdirSync('./src');

const filter_js = (src) => {
  return fs.lstatSync(src).isDirectory() || src.endsWith('.js') || src.endsWith('.js.map');
}

const filter_README = (src) => {
  return fs.lstatSync(src).isDirectory() || src.endsWith('README.md');
}

const copyAllREADME = () => {
  return Promise.all([
    COMPONENTS.map(component=>fs.copy(`./src/${component}`, `./dist/${component}`, { filter: filter_README }))
  ])
}

const copyPolyfill = () => {
  // return fs.copy('./node_modules/@webcomponents/webcomponentsjs', './demo/scripts/webcomponentsjs', { filter: filter_js })
  return fs.copy('./node_modules/@webcomponents/webcomponentsjs', './demo/scripts/webcomponentsjs');
}

/**
 * README files should be copied for distribution
 * webcomponentjs polyfill is may be required for demo for browsers that does not natively support custom elements
 */
const copyMethod = process.env.BUILD === 'production' ? copyAllREADME : copyPolyfill;

exports.copyFiles = () => {
  return copyMethod().then(_=>console.log('Postbuild: copy files'));
};
