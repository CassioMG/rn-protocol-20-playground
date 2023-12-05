# rn-protocol-20-playground
Test Stellar's Protocol-20 support on React Native

## Setting up the development environment
If you've never run a React Native project before, you'll want to follow the instructions here:

https://reactnative.dev/docs/environment-setup

^ Please make sure to:
1) Select the "React Native CLI Quickstart" tab for this project
2) Follow all the instructions up to "3. Configure the ANDROID_HOME environment variable"
3) Skip the "Creating a new application" step as you'll be using the code from this repo
4) Follow the "Preparing the Android device" steps
5) Follow the "Running your React Native application" steps:
   - `yarn start`
   - `yarn android`

## Testing package changes
Please note that when testing a `new package version` (e.g. when upgrading `js-xdr` from `1.3.0` to `3.0.0`) you'll want to `delete` the `node_modules` folder and run `yarn` again to make sure you'll be using the desired package version.

You also have the option to use a `locally compiled package` by specifying it's `file:/` path in `package.json`.

E.g.: instead of using `"js-xdr": "3.0.0"` you could use `"js-xdr": "file:/Users/<path-to-xdr-project>/js-xdr"`. This way you are able to easily apply changes to the `js-xdr` package and test it on this RN project. You'll want to delete the `dist`, `lib` and `node_modules` folder from your local `js-xdr` project every time you need to re-compile it to make sure the applied changes will take effect. Please don't forget to also delete the `node_modules` folder from the `rn-protocol-20-playground` project every time you have a package change to make sure the changes will take effect.

## Testing Protocol-20 in RN vs NODE envs

To test the changes in `RN env` you'll want to run the code in `App.tsx` component in an Android emulator or device (see steps 4 and 5 on the first section):
   - `yarn start`
   - `yarn android`

To test the changes in `NODE env` you'll want to run the code in `App-test.tsx` through the command line:
   - `yarn test`
