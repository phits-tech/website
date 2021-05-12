Topics: [Dev Setup](./Contributors.md) | [Emulators](./Emulators.md) | [Seeds & Migrations](./Seeds-Migrations.md) | [Deployment](./Deployment/Index.md) | [Test Runners](./Runners/Index.md) | [Known Issues](./Known-Issues.md)

---

[Home](../README.md) / Contributors

# Contribution Guide

## Developer Tools

Install programs & extensions:

- [Google Cloud SDK](https://cloud.google.com/sdk)
- [Vue Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [VSCode](https://code.visualstudio.com/download) + extensions:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for `ts`/`js`
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for `html`/`scss`/`js`/`json`
  - [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) for `scss`
  - [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) for `vue`
  - [TabNine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode) for AI suggestions (optional)
  - [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) (optional)

Install CLI tools (paste & run in VSCode terminal):

```
npm i -g firebase-tools lerna serve typescript yarn
```

## Login to Firebase

```
firebase login
firebase use default
```

## Dependencies & Build

Install deps, build project, and setup configuration:

```
yarn && yarn build && yarn bootstrap
```

If you get the error: `The engine "node" is incompatible with this module`, then tell yarn to ignore the node version:

```
yarn config set ignore-engines true
```

## Quick Start

Start the emulator:

```
yarn emu
```

Seed example data (also runs migrations):

```
yarn seed
```

Watch & compile modules (if editing `common` or `functions`):

```
yarn watch
```

Run the web app (if editing `hosting`):

```
yarn serve
```
