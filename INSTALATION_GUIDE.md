# Template initialization guide

After you fork this repo, you have to configure it to make it work properly. This guide will help you to set up the project.

- [ ] Deployment: Configure Jenkins environment variables in [Jenkinsfile](./Jenkinsfile). Create multiple Jenkinsfiles in case you need them for different deployment environments. [Deployment Guide](https://www.notion.so/Gu-a-Deploy-Jenkins-cc192f9cb41540ed8cf26386478eaad9).
- [ ] Project name: Change the project name in the [package.json](./package.json) file.
- [ ] Base Path: Change the web base path in the [next.config.js](./next.config.js) file.
- [ ] Update your project name in the [README.md](./README.md) file.
- [ ] Tracking: Set the correct value for all the variables in the file [common/libraries/tracking/constants](./common/libraries/tracking/constants.ts). You can find instructions on [tracking README](common/libraries/tracking/README.md). Or disable tracking by removing it from [AppWrapper](./common/components/AppWrapper/AppWrapper.tsx).
- [ ] Configure Firebase Credentials. These credentials will be used later for Storage and Authentication. [Firebase Setup Guide](https://www.notion.so/Gu-a-de-Firebase-Setup-d18e7e2a1f8c44cba728aca6c0927ecc).
- [ ] Integrate Auth Library with your backend. Follow the guide on [Auth Library README](./common/libraries/auth/README.md).
- [ ] Configure your tailwind variables. Replace [variables.css](./common/styles/variables.css) file with the one exported from your Figma project. Then setup your [tailwind.config.js](./tailwind.config.js) file in case any extra change is needed. Also configure your fonts in [globals.css](./common/styles/globals.css) file.
