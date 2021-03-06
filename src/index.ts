import * as program from 'commander'
import * as net from 'net'
import * as path from 'path'
import { showHost, watch, saveHost, build, sync } from './actions'
import { getPackageName } from './utils'
import { getHost } from './config'
import * as log from './log'
import * as fs from 'fs'

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
  .option('-t, --target <ip>', 'Set host ip')
  .action(async (dir: string, cmd) => {
    let hostIP = cmd.target
    if (hostIP) {
      if (!net.isIP(hostIP)) {
        log.error(`${hostIP} is not a valid IP`)
        process.exit(1)
      }
      saveHost(hostIP)
    }

    const pwd = process.cwd()
    dir = dir || '.'
    dir = path.resolve(pwd, dir)

    const isDir = fs.statSync(dir).isDirectory()
    let packageName = path.basename(dir)
    if (isDir) {
      packageName = getPackageName(dir)
    }
    await sync(isDir, dir, getHost(), packageName, cmd.exclude)
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
