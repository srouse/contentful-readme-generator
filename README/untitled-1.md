# Summit Rates Central Release History
<!-- 
  Do not edit directly, built using contentful-readme-generator.
  Content details in Build Information below.
-->

- [undefined](#undefined)
- [Testing](#testing)
- [Contentful Project Architecture](#contentful-project-architecture)
- [Build Information](#build-information)

---


__Title__: Summit Rates Central Release History

## undefined
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


## Contentful Project Architecture
[![Contentful Project Architecture](https://images.ctfassets.net/7gg213tt004u/YruBqvflI5J9c3hvDGvKX/d03e62b5a613211904bb7536f4c75b9a/Contentful_Project_Architecture.png)](https://images.ctfassets.net/7gg213tt004u/YruBqvflI5J9c3hvDGvKX/d03e62b5a613211904bb7536f4c75b9a/Contentful_Project_Architecture.png "View Full Size")[image source](https://www.figma.com/file/odipsExhhMLQGFlReq9YnF/?node-id=313:250)



## Build Information

*Dynamically built using contentful-readme-generator. Do not edit directly.*

*__updated__: 2/3/2023, 10:20:15 AM*

*__built__: 2/21/2023, 4:57:15 PM*

*__space__: 7gg213tt004u*

*__environment__: sandbox-readme*

*__entity id__: 1tJqOg5qLS7mxsS3YbI6gF*

[Edit Contentful Entry](https://app.contentful.com/spaces/7gg213tt004u/environments/sandbox-readme/entries/1tJqOg5qLS7mxsS3YbI6gF)