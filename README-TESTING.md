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
- [Summit Rates Central Release History - 2023-02-03](#summit-rates-central-release-history---2023-02-03)
- [Testing](#testing)
- [Contentful Readme Content Types](#contentful-readme-content-types)
- [Environment Migration Workflow](#environment-migration-workflow)
- [Build Information](#build-information)

---


__Title__: Contentful Readme Generator Project

__Project Abbreviation__: contentful-readme-generator

__Developer Emails__: scott.rouse@summitcreditunion.com

__NPM URL__: https://www.npmjs.com/package/contentful-readme-generator

__Repo URL__: https://github.com/srouse/contentful-readme-generator

__Documentation URL__: https://github.com/srouse/contentful-readme-generator

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

## Summit Rates Central Release History - 2023-02-03
- Added "description" to Rates Product
- Updated environment checking to include Contentful environments that start with "sandbox-rates-central...".
- Hooked up "edit" state to localStorage state. On refresh the page will keep edit state.
- Updated refresh button in scurates-navigation (upper right button) to refresh the entire page if holding the shift key. Useful for web components only updates. 
- Fixed API bug where credit rate adjustments where looking for null versus looking for explicit undefined (zero value didn't create attribute)
- Add ReferentialRateEngine content type.
- Added Ref.RateEngine to App
- Added Ref.RateEngine to API

## Testing
- Look at rate in Contentful App, both in edit mode and published mode.
- Check that the referred rate is aligned with other rate and that it changes with it.
- Check that margin, ceiling, and floor apply as expected. (including nulls).
- Check that the API shows the correct information (referred rate).

[![Person Typing at Computer](https://images.ctfassets.net/7gg213tt004u/6cs7girVJu9QEKVu1JZ3mT/d3266097cd078e90f9b0a1a7a19888d4/ob_login_desktop.png)](https://www.summitcreditunion.com "test")

## Contentful Readme Content Types
[![Contentful Readme Content Types](https://images.ctfassets.net/7gg213tt004u/OtdNpCZ9DOsvCqC5QoKhd/e165799b7e287ca63a2b2010a77c0c61/Contentful_Readme_Content_Types.png)](https://images.ctfassets.net/7gg213tt004u/OtdNpCZ9DOsvCqC5QoKhd/e165799b7e287ca63a2b2010a77c0c61/Contentful_Readme_Content_Types.png "View Full Size")

## Environment Migration Workflow
1. clone "prod-\[app]-\[date\]" into "sandbox-\[app]-\[date\]"
2. Update your API Access Key permissions AND the API Access Key of the application to include new environment.
3. Update your .env to point at this new environment.
4. Build out content and code changes.
5. TBD: (QA, pull request, etc)
6. Clone "prod-\[date\]" to "nonprod-\[app]-\[date\]" to ensure that you are making changes to the latest content.
7. Merge (via "Merge" Contentful App) content type updates and content into "nonprod".
8. TBD: test...
9. Clone "prod-\[date\]" into new "prod-\[date\]".
10. Merge (via "Merge" Contentful App) content type updates and content into "prod". If this is going to take awhile, put a hold on updates to prod.
11. Point Contentful alias to new prod environment.
12. Update Roles relative to new content types, etc. (This only works when content types exist in prod).
13. TBD: test...
14. Delete the old prod environment

## Build Information

*Dynamically built using contentful-readme-generator. Do not edit directly.*

*__updated__: 2/5/2023, 12:53:08 PM*

*__built__: 2/7/2023, 9:33:53 AM*

*__space__: 7gg213tt004u*

*__environment__: sandbox-readme*

*__entity id__: 6VeYGHMAi2Tsykl9N671JX*

[Edit Contentful Entry](https://app.contentful.com/spaces/7gg213tt004u/environments/sandbox-readme/entries/6VeYGHMAi2Tsykl9N671JX)