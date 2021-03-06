[Home](../README.md) | [CLI](../admin/README.md) | [Emulators](../docs/Emulators.md) | **[Deployment](../docs/Deployment.md)**

# Deployment: New Firebase Project

## Firebase Configuration

You will need to download `firebase-config.[alias].json` and `service-account.[alias].json` for the new project. See [New Clone](./New-Clone.md) for more details.

## Storage

Everyone is granted "Get Only" access to storage (to get event banners & user pics)

1. Create a custom role with Get Only access

   ```
   gcloud iam roles create storage.objectGetOnly --project=phits-tech-dev \
   --title="Storage Object Get Only" --description="Get objects without list" \
   --permissions=storage.objects.get --stage=ALPHA
   ```

2. Assign the role to "allUsers" on the required buckets

   ```
   gsutil iam ch allUsers:projects/phits-tech-dev/roles/storage.objectGetOnly gs://phits-tech-dev.appspot.com
   ```

3. Check the permissions in the console or use

   ```
   gsutil iam get gs://phits-tech-dev.appspot.com
   ```

   Successful result:

   ```
   {
   "bindings": [
      {
         "members": [
         "allUsers"
         ],
         "role": "projects/phits-tech-dev/roles/storage.objectGetOnly"
      },
      ..
   }
   ```

## Firestore

_TODO_

- deploy security rules
