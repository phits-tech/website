Topics: [Dev Setup](./Contributors.md) | [Emulators](./Emulators.md) | [Seeds & Migrations](./Seeds-Migrations.md) | [Deployment](./Deployment/Index.md) | [Test Runners](./Runners/Index.md) | [Known Issues](./Known-Issues.md)

---

[Home](../README.md) / [Contributors](./Contributors.md) / Seeds & Migrations

# Seeds

A seed adds user data to the database.

// TODO: Fix up our current seeds

# Migrations

A migration is a script that either:

- setups up new structure required for new functionality
- transforms existing data (e.g. restructuring) to accomodate new functionality

## Creating migrations

Migrations are stored in `admin/migrations`:

- must start with a 3 digit number (E.g. `001-your-migration.ts`)
- contain an `up` method that performs the transformation on a Firestore instance

1. Make a copy of `_000-template.ts` and rename it with the next available consecutive number.

2. Write your database changes in a batched write or transaction inside the `up` method (example in the template).

## Running migrations

Runs all unperformed migrations

_- from `admin` -_

```
yarn migrate
```

To see what migrations have been run, inspect `configuration/migrations` in Firestore.

---

[< Back to Contributing](./Contributors.md)
