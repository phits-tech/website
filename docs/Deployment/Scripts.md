Topics: [Dev Setup](./Contributors.md) | [Emulators](./Emulators.md) | [Seeds & Migrations](./Seeds-Migrations.md) | [Deployment](./Deployment/Index.md) | [Test Runners](./Runners/Index.md) | [Known Issues](./Known-Issues.md)

---

[Home](../../README.md) / [Contributors](../Contributors.md) / Deployment

# Admin Scripts

All scripts are runnable using the following syntax:  
_- from `admin` -_

```
yarn serve "src/path/to/script"
```

By default scripts will run against the `emulator`. If you need to run a script against `dev` or `prod` you must specify `--mode` (and provide the matching `service-account.[alias].json` in `configs`):

```
yarn serve "src/path/to/script" --mode=[alias]
```

---

[< Back to Deployment](./Index.md)
