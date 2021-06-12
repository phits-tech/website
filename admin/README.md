[Home](../README.md) | **[CLI](../admin/README.md)** | [Emulators](../docs/Emulators.md) | [Deployment](../docs/Deployment.md)

# Scripts

## Actions

Actions are stored in `admin/src/actions`:

- Scripts that might be run multiple times
- Named by function
- _Ex: `sync-achievements`_

Run using the `serve` script

```
yarn serve "src/path/to/script"
```

By default scripts will run against the `emulator`. If you need to run a script against `dev` or `production` you must specify `--mode` (and provide the matching `service-account.[alias].json` in `configs`):

```
yarn serve "src/path/to/script" --mode=[alias]
```

## Migrations

Migrations are stored in `admin/src/migrations`:

- Scripts that update the database schema incrementally to the latest version
- Must start with a 3 digit number (E.g. `001-populate-config.ts`)
- Must contain an `up` method that performs the transformation on a Firestore instance

1. Make a copy of `_000-template.ts` and rename it with the next available consecutive number.

2. Write your database changes in a batched write or transaction inside the `up` method (example in the template).

3. Test your migration locally and on `phits-tech-dev`

```
yarn migrate --mode=dev
```

This command only runs new migrations. To see what migrations have been run, inspect `configuration/migrations` in Firestore.

## Seeds

// TODO: Refactor production seeds so that they get code-reviewed

Seeds are stored in `admin/src/seeds`:

- Scripts that should only be run once; focus on loading data
- Only `emu` seeds are committed to the repo
- Each data type has its own file: `banners.ts`, `events.ts`, `spaces.ts`

To create a new event in production:

1. Copy the `events.ts` file from the `emu` folder to the `production` folder
2. Remove existing events from the `events` array in `production/events.ts`
3. Add the new event to the `events` array
4. Run `yarn seed --mode=production`

To upload files (folders are `events` and `spaces`):

- `gsutil cp new-banner.png gs://phits-tech.appspot.com/events/`
