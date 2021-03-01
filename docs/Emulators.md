Topics: [Dev Setup](./Contributors.md) | [Emulators](./Emulators.md) | [Seeds & Migrations](./Seeds-Migrations.md) | [Deployment](./Deployment/Index.md) | [Test Runners](./Runners/Index.md) | [Known Issues](./Known-Issues.md)

---

[Home](../README.md) / [Contributors](./Contributors.md) / Emulators

# Firebase Emulators

## Firestore

From the root directory:

```
yarn emu
```

Firestore will run on port 4001 and the web interface will run on port 4000. Open localhost:4000 to edit the data in your local Firestore.

The `firestore.rules` in the root directory is dynamically reloaded -- great for testing security rules!

To seed the Firestore emulator, from the `admin` directory:

// TODO: This script doesn't work any more

```
yarn seed
```

## Cloud Functions

// TODO: Now we have `yarn watch` from the root

In a separate terminal, from the `functions` directory:

```
yarn watch
```

This will watch your `functions/src` directory and automatically compile to `functions/dist` which will be watched by the Emulator.

## Working with Firestore on the server and emulator

### Making a dump of your Firestore database

```
gcloud auth login
gcloud config set project phits-tech
```

You will need billing enabled for this next step.

```
gcloud firestore export gs://phits-tech.appspot.com/backup/firestore_export
```

Download your dump:

```
gsutil cp -r gs://phits-tech.appspot.com/backup .
```

### Running your downloaded database

There is a small difference between the export made from the Firestore server versus the Firestore emulator. The emulator has an extra metadata file that looks like this:

```
{
  "version":"8.4.2",
  "firestore": {
    "version":"1.11.4",
    "path":"firestore_export",
    "metadata_file":"firestore_export/firestore_export.overall_export_metadata"
  }
}
```

Assuming you called your export `firestore_export`, you can just write this file inside the dump folder:

```
echo '{"version":"8.4.2","firestore":{"version":"1.11.4","path":"firestore_export","metadata_file":"firestore_export/firestore_export.overall_export_metadata"}}' > backup/firebase-export-metadata.json
```

Then you can use it to import into your emulator.

```
firebase emulators:start --only firestore --import backup
```

---

[< Back to Contributing](./Contributors.md)
