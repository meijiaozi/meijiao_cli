const { promisify } = require('util');
const path = require('path');

const download = promisify(require('download-git-repo'));
const open = require('open');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const {
  compile,
  writeToFile,
  createDirSync,
  strToCase,
} = require('../utils/utils');
const fs = require('fs');

// callback -> promisify(函数) -> Promise -> async await
const createProjectAction = async (project) => {
  console.log('why helps you create your project~');

  // 1.clone项目
  await download(vueRepo, project, { clone: true });

  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], { cwd: `./${project}` });

  // 3.运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });

  // 4.打开浏览器
  open('http://localhost:8080/');
};

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  const result = await compile('vue-component.ejs', {
    name: strToCase(name),
    lowerName: name.toLowerCase(),
  });

  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${strToCase(name)}.vue`);
  const targetDir = path.resolve(dest);
  if (createDirSync(targetDir)) {
    writeToFile(targetPath, result);
  }
};

// 添加新页面
const addPageAction = async (dir, dest) => {
  console.log('dest:', dest);
  // 1.编译ejs模板
  const data = { dir, name: strToCase(dir), lowerName: dir.toLowerCase() };
  const pageResult = await compile('vue-component.ejs', data);
  const storeResult = await compile('vue-store.ejs', data);
  //2.创建文件夹
  const targetDest = path.resolve(dest, dir);
  const componentDest = path.resolve(dest, dir, 'components');
  const storeDest = path.resolve(dest, dir, 'store');
  const utilsDest = path.resolve(dest, dir, 'utils');
  createDirSync(targetDest);
  createDirSync(componentDest);
  createDirSync(storeDest);
  createDirSync(utilsDest);
  // 3.写入文件
  //主页面
  const targetPagePath = path.resolve(targetDest, `index.vue`);
  const targetStorePath = path.resolve(storeDest, `${dir}.auex.js`);
  writeToFile(targetPagePath, pageResult);
  writeToFile(targetStorePath, storeResult);
};

const addStoreAction = async (dir, dest) => {
  // 1.遍历的过程
  const data = {
    dir,
  };
  const storeResult = await compile('vue-store.ejs', data);

  // 2.创建文件
  const targetDest = path.resolve(dest);
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${dir}.auex.js`);
    writeToFile(targetPagePath, storeResult);
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addStoreAction,
};

