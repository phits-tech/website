# Scripts

## Actions

- Scripts that might be run multiple times
- Named by function
- _Ex: `sync-achievements`_

## Migrations

- Scripts that update the database schema incrementally to the latest version
- Named by sequence
- _Ex: `1-01-populate-configuration`_

## Seeders

- Scripts that should only be run once; focus on loading data
- Only `emu` seeds are committed to the repo
- Each data type has its own file: `banners.ts`, `events.ts`, `spaces.ts`

To create a new event in production:

1. Copy the `events.ts` file from the `emu` folder to the `production` folder
2. Remove existing events from the `events` array in `production/events.ts`
3. Add the new event to the `events` array
4. Run `yarn seed --mode=production`

To upload files (folders are `banners`, `events` and `spaces`):

- `gsutil cp new-banner.jpg gs://phits-tech.appspot.com/banners/`
- `gsutil acl set -R -a public-read gs://phits-tech.appspot.com/banners`
