[Home](../README.md) | [Emulators](../docs/Emulators.md) | [Scripts](../admin/README.md) | **[Deployment](../docs/Deployment.md)**

# Deployment

## Login to Google Cloud & Firebase

Authenticate & set the current project:

```
gcloud auth login
gcloud config set project phits-tech-emu
gcloud auth application-default login
firebase login
firebase use default
```

## Initial Setup

See: [New Git Clone](./New-Clone.md) if you have not deployed this `clone` before.  
See: [New Firebase Project](./New-Project.md) if you need to setup a new Firebase/GCP Project.

## 1. Select project

- Set the correct project:
  ```
  firebase use [alias]
  ```

## 2. Run migrations

- Perform new migrations
  _- from `admin` -_

  ```
  yarn build
  yarn migrate --mode=[alias]
  ```

## 3. Deploy Functions

- Deploy config from `configs/functions.[alias].json`  
   _- from `admin` -_

  ```
  yarn config:deploy [alias]
  ```

- Deploy to Firebase Cloud Functions  
   _- from `functions` -_

  ```
  yarn deploy
  ```

## 4. Deploy Hosting

- Import the firebase-config using  
   _- from `admin` -_

  ```
  yarn serve "src/config/hosting-import.ts"
  ```

- Build & deploy  
  _- from `hosting` -_

  ```
  yarn build --mode=[alias]
  yarn deploy
  ```

## 5. Reset Local Workspace

- Set your project back to use the emulator:

  ```
  firebase use emu
  ```

## See also

- [Scripts](../admin/README.md)

# Backup Firestore production and restore to dev

1. Backup production
   _- from `admin` -_

   ```
   yarn backup "pre user split"
   ```

2. Copy it to a dev bucket

   From the output of the step one `Backup up ... to: XYZ`, copy `XYZ` to:

   ```
   gsutil cp -r gs://phits-tech-backups/XYZ gs://phits-tech-dev.appspot.com/backups/XYZ
   ```

   where `XYZ` is of the form `2021-01-10-06-45-01-pre-user-split`.

3. Restore to dev

   First delete the existing database:

   ```
   firebase firestore:delete --project=phits-tech-dev --all-collections
   ```

   Replace `XYZ` again:

   ```
   gcloud firestore import --project=phits-tech-dev gs://phits-tech-dev.appspot.com/backups/XYZ
   ```

4. Tidy up

   ```
   gsutil rm -r gs://phits-tech-dev.appspot.com/backups/XYZ
   ```
