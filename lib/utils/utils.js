const path = require('path');
const fs = require('fs');
// https://ejs.bootcss.com/#install
const ejs = require('ejs');

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};

// source/components/category/why
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      return true;
    }
  }
};
function strToCase(str) {
  var re = /-(\w)/g;
  const newStr = str.replace(re, function ($0, $1) {
    return $1.toUpperCase();
  });
  return newStr.slice(0, 1).toUpperCase() + newStr.slice(1);
}

const writeToFile = (path, content) => {
  // 判断path是否存在, 如果不存在, 创建对应的文件夹
  return fs.promises.writeFile(path, content);
};

module.exports = {
  compile,
  writeToFile,
  createDirSync,
  strToCase,
};

