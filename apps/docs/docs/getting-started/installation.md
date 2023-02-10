---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 2
---

import PackageTabs from '@site/src/components/PackageTabs';
import { NeoLink, GenericLink } from '@site/src/components/ui/Link';

:::danger

You have to buy a license [here](https://neoadmin.neoco.dev/) before installing the library

:::

Follow this guide to correctly install <NeoLink /> and its dependencies to make sure everything works properly.

As neoAdmin is a licensed library, you need to authenticate in order to have access to it. We store the library in an AWS Codeartifact repository. Once you have bought a license you will be granted an access key and a secret key that will allow you to authenticate against our servers in order to download the library.

### AWS CLI

Follow [this guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) in order to install the AWS CLI in your computer. This tool will allow you to authenticate against our servers

Run:

```bash
$ aws configure
```

It will ask you for the AWS Access Key ID and the AWS Secret Access Key. Here you have to paste the values that we shared with you in the email after buying the license. Set `eu-west-1` as the default region name and a `JSON` output format

Finally run this command:

```bash
$ aws codeartifact login --tool npm --domain neoadmin-neoco --domain-owner 906935845275 --repository neoadmin-registry --namespace @neoco
```

Now you are able to download neoAdmin packages!

### neoAdmin

To install and save in your `package.json` dependencies, run:

<PackageTabs code="@emotion/react @emotion/styled @mui/icons-material @mui/lab @mui/material @mui/x-data-grid @neoco/neoco-backoffice @neoco/neoco-form @neoco/neoco-image-uploader @tinymce/tinymce-react i18next luxon notistack react-i18next react-router-dom@5.3.0 styled-components" />

:::note

Note the installation includes a lot of packages, make sure to install all of them to avoid conflicts, you can copy directly the command and paste it in your console so you make sure you don't miss any package.

:::

<!--
### Fonts

LOREM IPSUM

```js
// with npm
npm install @neoco/neoadmin

// with yarn
yarn add @neoco/neoadmin
```


### MUI

In case you need to use components from <a href="https://mui.com/" target="blank">MUI</a> that are not exported from neoAdmin, please follow the provided link: <a href="https://mui.com/getting-started/installation/" target="blank">MUI docs</a>

 ⚠️ You have to install warning example -->
