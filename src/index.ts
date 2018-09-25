import * as program from 'commander'
import * as net from 'net'
import * as path from 'path'
import { showHost, watch, saveHost, build, sync } from './actions'
import { isPackageDir, getPackageName } from './utils'
import { getHost } from './config'
import * as log from './log'

program
  .command('host')
  .description('Show your current host IP')
  .action(() => {
    showHost()
  })

program
  .command('set <hostIP>')
  .description('Set your host IP')
  .action((hostIP: string) => {
    if (!net.isIP(hostIP)) {
      log.error(`${hostIP} is not a valid IP`)
      process.exit(1)
    }

    saveHost(hostIP)
  })

program
  .command('watch [item]')
  .description('Watching change in a directory or file')
  .option('-e, --exclude <exclude>', 'Specify the files and directories that will be ignored')
  .action((item: string, cmd) => {
    const pwd = process.cwd()
    if (!item) {
      item = '.'
    }
    item = path.resolve(pwd, item)

    watch(item, cmd.exclude)
  })

program
  .command('sync [dir]')
  .description('Sync files')
  .option('-e, --exclude <exclude>', 'Specify the files and directories that will be ignored')
  .action(async (dir: string, cmd) => {
    const pwd = process.cwd()
    dir = dir || '.'
    dir = path.resolve(pwd, dir)

    await sync(isPackageDir(dir), dir, getHost(), getPackageName(dir), cmd.exclude)
  })

program
  .command('build [dir]')
  .option('-o, --output <output>', 'Specify the output directory')
  .option('-e, --exclude <exclude>', 'Specify the files and directories that will be ignored')
  .description('Build box package')
  .action(async (dir: string, cmd) => {
    const pwd = process.cwd()
    dir = dir || '.'
    dir = path.resolve(pwd, dir)

    await build(dir, cmd.output, cmd.exclude)
  })

program.parse(process.argv)
