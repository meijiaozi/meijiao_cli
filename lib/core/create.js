const program = require('commander');

const { createProjectAction, addComponentAction, addPageAction, addStoreAction } = require('./actions');

const createCommands = () => {
  // 创建项目指令
  program
    .command('create <project> [otherArgs...]')
    .description('clone a repository into a newly created directory')
    .action(createProjectAction);

  program
    .command('addcpn <name>')
    .description('add vue component, 例如: coderwhy addcpn nav-bar [-d src/components]')
    .action(name => addComponentAction(name, program.dest || 'src/components'));

  program
    .command('addpage <name>')
    .description('add vue page, 例如: coderwhy addpage Home [-d dest]')
    .action(name => {
      addPageAction(name, program.dest ? `${program.dest}/${name.toLowerCase()}` : `src/views/${name.toLowerCase()}`);
    });

  program
    .command('addstore <name>')
    .description('add vue store, 例如: coderwhy addstore favor [-d dest]')
    .action(name => {
      addStoreAction(name, program.dest || `src/store/modules/${name.toLowerCase()}`);
    });
};

module.exports = createCommands;
