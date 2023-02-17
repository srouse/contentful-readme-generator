# Contentful Readme Generator
<!-- 
  Do not edit directly, built using contentful-readme-generator.
  Content details in Build Information below.
-->

- [Description](#description)
- [How To Install](#how-to-install)
- [How To Use](#how-to-use)
  * [Build your Content Type](#build-your-content-type)
  * [What Does NOT work as well](#what-does-not-work-as-well)
  * [Badges](#badges)
  * [Headers](#headers)
  * [Table of Contents](#table-of-contents)
  * [Arguments](#arguments)
- [How To Deploy](#how-to-deploy)
- [Build Information](#build-information)

---


<span class="badge-npmversion"><a href="https://npmjs.org/package/contentful-readme-generator" title="View this project on NPM"><img src="https://img.shields.io/npm/v/contentful-readme-generator.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/contentful-readme-generator" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/contentful-readme-generator.svg" alt="NPM downloads" /></a></span>

## Description

This is a service that loads a Contentful entry and renders it as a README file in the repo folder. It has the side effect of being able to use this information for other uses, such as project overviews.

## How To Install

To install

```
yarn add contentful-readme-generator
```

Create a .env file in your project

```
# CTFL README
CTFL_README_CONTENTFUL_SPACE=[Your Space Id]
CTFL_README_CONTENTFUL_ENVIRONMENT=[Your Environment Id]
CTFL_README_CONTENTFUL_ACCESS_TOKEN=[Your Access Token Id]
CTFL_README_CONTENTFUL_ENTRY_ID=[Your Entry Id]
```

You will have to build your Contentful Entry and Content Type first, but after you do, you can build

```
yarn ctfl-readme
```


## How To Use

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

__Rich Text.__ There is a markdown editor in Contentful, so rich text is a very round about way of getting back to markdown.

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

## How To Deploy

Publish to NPM

```
npm publish
```

## Build Information

*Dynamically built using contentful-readme-generator. Do not edit directly.*

*__updated__: 8/29/2022, 3:14:26 PM*

*__built__: 2/5/2023, 10:22:05 AM*

*__space__: 7gg213tt004u*

*__environment__: sandbox*

*__entity id__: 6VeYGHMAi2Tsykl9N671JX*

[Edit Contentful Entry](https://app.contentful.com/spaces/7gg213tt004u/environments/sandbox/entries/6VeYGHMAi2Tsykl9N671JX)