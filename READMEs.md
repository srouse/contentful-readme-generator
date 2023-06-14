# Contentful Readme Generator
<!-- 
  Do not edit directly, built using contentful-readme-generator.
  Content details in Build Information below.
-->

- [Description](#description)
- [Readme Install](#readme-install)
  * [To install](#to-install)
  * [Create a .env file in your project](#create-a-env-file-in-your-project)
  * [Setup Local Configuration *](#setup-local-configuration-)
  * [build](#build)
- [Contentful Content](#contentful-content)
  * [Build your Content Type](#build-your-content-type)
  * [What Does NOT work as well](#what-does-not-work-as-well)
  * [Badges](#badges)
  * [Headers](#headers)
  * [Table of Contents](#table-of-contents)
  * [Arguments](#arguments)
- [Build Information](#build-information)

---


__Project Abbreviation__: RDME

<span class="badge-npmversion"><a href="https://npmjs.org/package/contentful-readme-generator" title="View this project on NPM"><img src="https://img.shields.io/npm/v/contentful-readme-generator.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/contentful-readme-generator" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/contentful-readme-generator.svg" alt="NPM downloads" /></a></span>

__Developer Emails__: scott.rouse@gmail.com

__NPM URL__: https://www.npmjs.com/package/contentful-readme-generator

__Repo URL__: https://github.com/srouse/contentful-readme-generator

## Description

This is a service that loads a Contentful entry and renders it as a README file in the repo folder. It has the side effect of being able to use this information for other uses, such as project overviews.

## Readme Install
### To install

```
yarn add contentful-readme-generator
```

### Create a .env file in your project

```
# CTFL README
CTFL_README_CONTENTFUL_SPACE=[Your Space Id *]
CTFL_README_CONTENTFUL_ENVIRONMENT=[Your Environment Id *]
CTFL_README_CONTENTFUL_ENTRY_ID=[Your Entry Id *]
CTFL_README_CONTENTFUL_ACCESS_TOKEN=[Your Access Token Id]
```

### Setup Local Configuration *
* The .env variables are not necessary if using a configuration file.

```
// ctfl-readme.json
{
  "contentfulSpace": "[Your Space Id]",
  "contentfulEnvironment": "[Your Env]",
  "contentfulEntryId": "[Your Entry Id]",
  "rootFilename": "README",
  "folderName": "README",
  "htmlTemplate": "templates/htmlTemplate.mjs",
  "htmlRootFileName": "index",
  "htmlDist": "dist"
}
```

### build

```
yarn ctfl-readme
```


## Contentful Content
### Build your Content Type
There is no specific structure needed to build a readme file, but there are limitations. For instance, ctfl-readme will try to render out whatever you put into your Entry, but text and markdown (large text) are ideal. A simple, but effective example would be:

```
{
  "name": "Readme Project",
  "description": "",
  "displayField": "title",
  "fields": [
    {
      "id": "title",
      "name": "Title",
      "type": (TEXT),
      ...
    },
    {
      "id": "Badges",
      "name": "badges",
      "type": (JSON),
      ...
    },
    {
      "id": "tableOfContents",
      "name": "Table of Contents",
      "type": "Boolean",
      "defaultValue": {
        "en-US": true
      },
      ...
    },
    {
      "id": "repoUrl",
      "name": "Repo URL",
      "type": (TEXT, URL VALIDATED),
      ...
    },
    {
      "id": "description",
      "name": "## Description",
      "type": (MARKDOWN TEXT),
      ...
    },
    {
      "id": "howToInstall",
      "name": "## How To Install",
      "type": (MARKDOWN TEXT),
      ...
    },

```

### What Does NOT work as well

__Rich Text.__ Avoid rich text in your Content Type. There is a markdown editor in Contentful, so rich text is a very round about way of getting back to markdown.

### Badges

ctfl-readme does understand how to create badges via [badges](https://www.npmjs.com/package/badges). Add a property to your content type with an id of "badges" with the type of JSON and you will be able to pass in a formatted object into badges' renderBadges. Each argument will be a line in the JSON object:

```
{
    "list": [
        "npmversion"
    ],
    "config": {
        "npmPackageName": "contentful-readme-generator"
    },
    "options": {}
}
```

### Headers

Properties with header characters (#, ##, ###) will be expressed as headers before their content is rendered. This works well for markdown entries. The only special case is "# Title" which will render the actual title instead of the literal word "title".

### Table of Contents

Adding a property with an id of "tableOfContents" with a type of boolean will trigger (if true) the rendering of a table of contents. It is done via [markdown-toc](https://www.npmjs.com/package/markdown-toc).

### Arguments

There is only one argument where you can change the destination file name

```
ctfl-readme --fileName README-OTHER.md
```

## Build Information

*Dynamically built using contentful-readme-generator. Do not edit directly.*

*__updated__: 6/14/2023, 3:45:48 PM*

*__built__: 6/14/2023, 4:06:28 PM*

*__space__: rtkhko6y3s3u*

*__environment__: master*

*__entity id__: 2Ox6brgaOxUyE0QDuNOAmH*

[Edit Contentful Entry](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/2Ox6brgaOxUyE0QDuNOAmH)