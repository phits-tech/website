**[Home](README.md)** | [Emulators](docs/Emulators.md) | [Scripts](admin/README.md) | [Deployment](docs/Deployment.md)

# Phits-Tech Developer Guide

Welcome new developer! Please read below to get started :)

Run shell commands in VSCode terminal, from the `project-root` directory (unless stated otherwise).

## Developer Tools

Install these programs & extensions:

1. [VSCode](https://code.visualstudio.com/download) + extensions:
   - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for `ts`/`js`
   - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for `html`/`scss`/`js`/`json`
   - [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) for `scss`
   - [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) for `vue`
   - [WindiCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense)
   - [TabNine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode) for AI suggestions (optional)
   - [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
   - [Live Share](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
2. [Vue Devtools (beta)](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en)
3. [Google Cloud SDK](https://cloud.google.com/sdk)

Install CLI tools (paste & run in VSCode terminal):

```
npm i -g firebase-tools serve typescript yarn
```

## First-time Setup

Login to Firebase

```
firebase login
firebase use default
```

Install deps, build project, and setup configuration:

```
yarn && yarn build && yarn bootstrap
```

If you get the error: `The engine "node" is incompatible with this module`, then tell yarn to ignore the node version:

```
yarn config set ignore-engines true
```

## Quick Start

Open 3 terminals & execute these commands (in order):

| Terminal 1   | Terminal 2 | Terminal 3                |
| ------------ | ---------- | ------------------------- |
| `yarn watch` | `yarn emu` | `yarn seed && yarn serve` |

1. Builds `common` & `functions` when the source changes
2. Fakes cloud services (db, auth, cloud functions)
3. Creates example data & starts `hosting` webserver (w/ auto-update)
