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

Install CLI tools, by running this command in VSCode terminal:

```
npm i -g firebase-tools serve typescript yarn
```

## Dependencies & Build

From the `project-root` directory:

```
yarn && yarn build && yarn bootstrap
```

If you get the error: `The engine "node" is incompatible with this module`, then tell yarn to ignore the node version:

```
yarn config set ignore-engines true
```

## Login to Google Cloud & Firebase

Authenticate & set the current project:

// TODO: Why do we need application-default?

```
gcloud auth login
gcloud config set project phits-tech-emu
gcloud auth application-default login
firebase login
firebase use default
```

## Quick Start

Open 3 terminals:

1. From the `project-root` directory, start the emulator:

   ```
   yarn emulate
   -OR-
   yarn emu
   ```

2. Seed example data:

   ```
   yarn seed
   ```

3. Run the web app:  
   _(it will connect to the emulator by default)_

   ```
   yarn serve
   ```
