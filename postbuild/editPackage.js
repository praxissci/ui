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
const projectPackagePath = './package.json';
const COMPONENTS = fs.readdirSync('./src');

const modifyProperties = (packagePath, projectPackage) => {
  return fs.readJson(packagePath).then( package => {
    const modifiedPackage = Object.assign({},projectPackage,package);
    modifiedPackage.keywords = [
      ...projectPackage.keywords,
      ...package.keywords
    ];
    return modifiedPackage;
  })
}

exports.editPackage = () => {
  return fs.readJson(projectPackagePath).then( projectPackage => {
    delete projectPackage['description'];
    delete projectPackage['devDependencies'];
    delete projectPackage['name'];
    delete projectPackage['scripts'];
    delete projectPackage['version'];

    return Promise.all(COMPONENTS.map(component=>{
      return modifyProperties(`./src/${component}/package.json`,projectPackage)
        .then(modifiedPackage=>fs.writeJson(`./dist/${component}/package.json`, modifiedPackage))
        .then(_=>console.log(`Postbuild: edit ${component}'s package.json`))
    }));
  }).then(_=>console.log('Postbuild: Done edit package.json files'));
}
