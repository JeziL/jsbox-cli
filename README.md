# jsbox-cli

JSBox VSCode 插件的 cli 版本.

![Travis](https://img.shields.io/travis/Dreamacro/jsbox-cli.svg?style=flat-square)
![NPM version](https://img.shields.io/npm/v/jsbox-cli.svg?style=flat-square)

## Installation

```
$ npm i jsbox-cli -g
```

## Getting Started

设置手机端 Host IP

```
$ jsbox set 192.168.1.1
```

查看当前的 Host IP

```
$ jsbox host
```

监听一个目录或文件

```
# 监听当前目录
$ jsbox watch

# 监听指定目录
$ jsbox watch ./dist

# 监听指定文件
$ jsbox watch ./index.js
```

手动同步目录或文件

*可通过 `-t / --target` 参数设置（重设）Host IP。*

```
# 同步当前目录
$ jsbox sync

# 同步指定目录
$ jsbox sync ./dist

# 同步指定文件
$ jsbox sync ./index.js

# 设置 Host IP 并同步指定文件
$ jsbox sync ./index.js -t 192.168.1.1
```

构建一个 JSBox 应用

```
# 构建当前目录, 默认生成到 .output
$ jsbox build

# 构建指定目录
$ jsbox build ./dist

# 自定义输出路径
$ jsbox build ./dist -o ./dist/output.box
```

排除指定文件或目录

*以安装包模式进行开发时，可通过 `-e / --exclude` 参数指定需要排除的文件或目录（以逗号分隔），在同步至 JSBox 时，安装包内将不会包含它们。特别地，以英文句点 `.` 开头的文件或目录会自动被排除。*

```
jsbox watch ./dist -e README.md,LICENSE
jsbox sync ./dist -e README.md,LICENSE
jsbox build ./dist -e README.md,LICENSE -o ./dist/output.box
```
