**[Home](README.md)** | [Emulators](docs/Emulators.md) | [Scripts](admin/README.md) | [Deployment](docs/Deployment.md)

# Phits-Tech Developer Guide

Welcome new developer! Please read below to get started :)  
Run shell commands in VSCode terminal, from the `project-root` directory (unless stated otherwise).

## Developer Tools

Install programs & extensions:

1. [VSCode](https://code.visualstudio.com/download)
2. [Vue Devtools (beta)](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en)
3. [Google Cloud SDK](https://cloud.google.com/sdk)

Install CLI tools & VSCode extensions:

```
npm run install-tools
```

## First-time Setup

Login to Firebase

```
firebase login
firebase use default
```

Install deps, build project, and setup configuration:

```
yarn && yarn build && yarn config-sync
```

If you get the error: `The engine "node" is incompatible with this module`, then tell yarn to ignore the node version:

```
yarn config set ignore-engines true
```

## Dev Quick Start

Open 3 terminals & execute these commands (in order):

1. Watch `common` & `functions` (build when the source changes)
2. Start cloud services `emulator` (fake db, auth, cloud functions)
3. Load example data & start `hosting` webserver (w/ auto-update)

| Terminal 1   | Terminal 2 | Terminal 3                |
| ------------ | ---------- | ------------------------- |
| `yarn watch` | `yarn emu` | `yarn seed && yarn serve` |
