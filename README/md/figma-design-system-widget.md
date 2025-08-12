[home](../../README.md)

# Figma Design System Widget
<!-- 
  Do not edit directly, built using contentful-readme-generator.
  Content details in Build Information below.
-->

- [Figma Design System Widget](#figma-design-system-widget)
- [Color Set Tokens](#color-set-tokens)
- [Typography Set Tokens](#typography-set-tokens)
- [Icon Tokens](#icon-tokens)
- [Font Awesome Integration](#font-awesome-integration)
- [Effect Tokens](#effect-tokens)
- [Breakpoint Tokens](#breakpoint-tokens)
- [Custom Tokens](#custom-tokens)
- [Component Tokens](#component-tokens)
- [Downloading Code](#downloading-code)
- [Deployment - Github NPM Packages](#deployment---github-npm-packages)
- [Github Configuration](#github-configuration)
- [Style Guide](#style-guide)
- [Design System Lifecycle](#design-system-lifecycle)
- [Build Information](#build-information)

---


## Figma Design System Widget
Figma Design System Widget is an attempt to integrate design system concerns (ADA, color/typography sets) with Figma structures (styles, components) as well as explore how much of a design system build tool can be created entirely within Figma leveraging existing services (Font Awesome, Google Fonts, Github repos/npm packaging).

This widget can build a significantly sized design system token set by dragging the widget on stage, choosing a name and building out the various parts of your system. From there, you can tokenize, transform (css, scss, Javascript, and Typescript), and deploy your design system all the way into a Github hosted NPM Package. It isn't designed to be used for large production designs systems quite yet, but is perfect for small to medium sized projects or for just exploring your first full design system.

[![Figma Design System Intro](https://images.ctfassets.net/rtkhko6y3s3u/G1bRl15S1OX8XR54ASpel/17334e319b19753b49f9f073ecb9785e/Figma_Design_System_Intro.png)](https://images.ctfassets.net/rtkhko6y3s3u/G1bRl15S1OX8XR54ASpel/17334e319b19753b49f9f073ecb9785e/Figma_Design_System_Intro.png "View Full Size")
    
Figma Design System Intro, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/5xVKOtGyh8Tc5GGZUSkyh), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=414:5957)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/2e7qSw7d9GiGKPZ20WakEe)

## Color Set Tokens
- __Color Sets__. Design Systems usually step colors, so this widget will kick off creating values by choosing your step pattern and base color (the color in the center of the steps).
- __Figma Styles__. All colors created within the widget are automatically synchronized with native Figma styles.
- __Editing All Steps__. Editing one color will show all of the other dots for the other steps. The selected color will have the biggest selector, but all other selectors will be editable as well. Build a better color arc of stepped colors.
- __Locking Hue__. During editing of any one color you can lock the hue and change the hue for all colors.
- __ADA feedback__. Design Systems can be built with conventions where each color can work with ADA compliance at specific steps. This widget will surface that information and make it easy to knudge your colors into ADA compliance. 


[![Color Set Tokens](https://images.ctfassets.net/rtkhko6y3s3u/16sbzdl6tU5BdeLQ49MMjl/33c5a029ac50b8f1fa67e5094bc296a0/Color_Set_Tokens.png)](https://images.ctfassets.net/rtkhko6y3s3u/16sbzdl6tU5BdeLQ49MMjl/33c5a029ac50b8f1fa67e5094bc296a0/Color_Set_Tokens.png "View Full Size")
    
Color Set Tokens, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/6BtrrHU5A610HkSd6q8aV4), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=415:5945)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/QF9aF0ZMFXhKD6JxKG5Vr)

## Typography Set Tokens
- __Typography Sets__. Typography can also be managed as a set. A typography token can be created one by one, but also by choosing a set patter with a base font, weight, and size.
- __Google Fonts__. The tokens created with the widget are transformed into a Google Fonts embed, so each of the previews (the large sentence and the individual thumbnails) are directly from Google Fonts. If they are not available in Google Fonts (and thus not able to be transformed into a simple css file) you will be alerted immediately.

[![Typography Step Tokens](https://images.ctfassets.net/rtkhko6y3s3u/5P8l4h9nJmxF3YE4OcjyWQ/610a8b9b3d9576c19655f6ea935e2a2b/Typography_Step_Tokens.png)](https://images.ctfassets.net/rtkhko6y3s3u/5P8l4h9nJmxF3YE4OcjyWQ/610a8b9b3d9576c19655f6ea935e2a2b/Typography_Step_Tokens.png "View Full Size")
    
Typography Step Tokens, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/54cT6TBJ9JJTQwLud4V9S8), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=417:6153)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/3AxQBQDANmkVcn7byWj98A)

## Icon Tokens
- __Multiple Sources__. In creating a new icon, you can choose from uploading an svg, selecting an icon on the Figma stage, or downloading from Font Awesome.
- __Font Awesome Integration__. 
- __Automatic Icon Component__. The widget will automatically create a component that has variants in the names of the icons you create. The widget is actually wrapped around that component.
- __Spacing and Offset__. Some icons work better flush to the edges and some do not. The widget will allow you to scale and nudge each specific icon into place.

[![Icon Tokens](https://images.ctfassets.net/rtkhko6y3s3u/36WGBxePiPH68E1YUiMmDQ/e54abacb7d23337840ca7e7e59a2b8ca/Icon_Tokens.png)](https://images.ctfassets.net/rtkhko6y3s3u/36WGBxePiPH68E1YUiMmDQ/e54abacb7d23337840ca7e7e59a2b8ca/Icon_Tokens.png "View Full Size")
    
Icon Tokens, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/382Cg13Ey9mjgNd9jYU5Kw), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=416:5986)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/mjKdKkrKbjSYPC4mz4HCu)

## Font Awesome Integration
The Font Awesome integration includes using your paid subscription. To use all the available icons in your subscription, you will need to create an api token and a kit that includes these icons. The widget will walk you through attaching that kit via the API token.

[![Font Awesome Integration](https://images.ctfassets.net/rtkhko6y3s3u/T7nvQx4FF0Xo30oFl64Rp/da8cfc3414b53323824ee0e9e00a548a/Font_Awesome_Integration.png)](https://images.ctfassets.net/rtkhko6y3s3u/T7nvQx4FF0Xo30oFl64Rp/da8cfc3414b53323824ee0e9e00a548a/Font_Awesome_Integration.png "View Full Size")
    
Font Awesome Integration, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/59CKy3Kq0rRy8EI93NrF4d), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=417:6090)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/1bret6YSOZ46lLVKEwNswj)

## Effect Tokens

[![Effect Tokens](https://images.ctfassets.net/rtkhko6y3s3u/38DkSASYQ4EDhbQwkqqHGz/a4dc0004f629f7e45c55f6eaeb8aaf0c/Effect_Tokens.png)](https://images.ctfassets.net/rtkhko6y3s3u/38DkSASYQ4EDhbQwkqqHGz/a4dc0004f629f7e45c55f6eaeb8aaf0c/Effect_Tokens.png "View Full Size")
    
Effect Tokens, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/a3OB5x9E5vhBqpvT3u69S), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=417:6203)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/3QOn3ijt1ZkUOdyKIchfH)

## Breakpoint Tokens

[![Breakpoint Tokens](https://images.ctfassets.net/rtkhko6y3s3u/3ucfX1p4jKc3favnH9ujMz/b154725c0544700ff9e5a12621633b10/Breakpoint_Tokens.png)](https://images.ctfassets.net/rtkhko6y3s3u/3ucfX1p4jKc3favnH9ujMz/b154725c0544700ff9e5a12621633b10/Breakpoint_Tokens.png "View Full Size")
    
Breakpoint Tokens, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/tMfZuUzRgXW3lQlLVGVuJ), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=417:6249)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/5a6H9RJS9lmxmSUrT0KVLB)

## Custom Tokens

[![Custom Tokens](https://images.ctfassets.net/rtkhko6y3s3u/4tZ7Lz29ZPUg2Kn7CTY6dd/0387c0160fc1e8a6e4b5b5f4cbc70477/Custom_Tokens.png)](https://images.ctfassets.net/rtkhko6y3s3u/4tZ7Lz29ZPUg2Kn7CTY6dd/0387c0160fc1e8a6e4b5b5f4cbc70477/Custom_Tokens.png "View Full Size")
    
Custom Tokens, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/5PY21GoAvJjIEhYl8a0G0V), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=417:6332)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/3rl2NJMfp0hh3tcej102yo)

## Component Tokens
(Not presently implemented) Component tokens will be created from attaching a component to the Figma Design System widget. They will only create scss transformations since direct css will create relatively unweildy results.

[![Component Tokens](https://images.ctfassets.net/rtkhko6y3s3u/1qczLdmqKJUsG8LtOvX6z1/18cd16c23b26ce557cc70cb75d8ab843/Component_Tokens.png)](https://images.ctfassets.net/rtkhko6y3s3u/1qczLdmqKJUsG8LtOvX6z1/18cd16c23b26ce557cc70cb75d8ab843/Component_Tokens.png "View Full Size")
    
Component Tokens, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/3qmQPgGANH1tGpM3c2Zyvc), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=417:6379)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/2xhCrQGX4aqzb7vhdGNfM6)

## Downloading Code
Tokens can be transformed instantly and copied to your clipboard with several different outputs:

- Tokens. W3C formatted tokens
- CSS Variables. Tokens transformed into css properties.
- CSS Fonts. Google font css embeds
- Javascript. Tokens transformed into a javascript object.

This is a subset of all the transformations available with the Figma Design System widget. If you would like to use the Typescript or Atomic transformations you will need to use the GitHub Deploy.

[![Downloads](https://images.ctfassets.net/rtkhko6y3s3u/1073jN2bzY0EcHuXrThG3o/1fdae2ed357d8f8cd32d587c39c1330e/Downloads.png)](https://images.ctfassets.net/rtkhko6y3s3u/1073jN2bzY0EcHuXrThG3o/1fdae2ed357d8f8cd32d587c39c1330e/Downloads.png "View Full Size")
    
Downloads, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/5hoQYojqlTzPCLyaf01Xm4), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=515:6149)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/3yL83eGvNoEOHCS6GZ3gKV)

## Deployment - Github NPM Packages
Deployment and Github NPM Packages.

[![Github Deployment](https://images.ctfassets.net/rtkhko6y3s3u/1NVWRrZ8pRlgk7teOOT5ZP/ced8cae884f4d78ce20e32c1e0e2e079/Github_Deployment.png)](https://images.ctfassets.net/rtkhko6y3s3u/1NVWRrZ8pRlgk7teOOT5ZP/ced8cae884f4d78ce20e32c1e0e2e079/Github_Deployment.png "View Full Size")
    
Github Deployment, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/2rp4QIhQl44YhsiSxy3KWW), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=417:6428)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/18ckMk6Wc17H7o6S7fT7zi)

## Github Configuration
The tokens created with the Figma Design System widget can be immediately transformed on deployment and deployed to a Github repo as well as a Github NPM package. This requires a Github account and an access token that has workflow and read:packages permissions (see below).

Note: The Figma Design System plugin will create and configure your Github repo for you, so enter a name of a repository that does NOT yet exist.

[![Github Configuration](https://images.ctfassets.net/rtkhko6y3s3u/5o9Na9IAKpMoLlNeOB7N1/d90b7dbf573bad045c3287b81e4ae947/Github_Configuration.png)](https://images.ctfassets.net/rtkhko6y3s3u/5o9Na9IAKpMoLlNeOB7N1/d90b7dbf573bad045c3287b81e4ae947/Github_Configuration.png "View Full Size")
    
Github Configuration, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/2Qox2a5rtUdedB3p2Z3f54), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=417:6464)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/1TA5k44YfysVHMrrwzyNoR)

## Style Guide
A good design system documents in the same motion that it captures values. The Figma Design System is a living document that can be composed and presented as you will with each token set presented clearly in each widget.

<a href="https://assets.ctfassets.net/rtkhko6y3s3u/7xU711XEoyQbXkLtrW7Ayt/bc83c4067ee5ef25de8575a39567f119/Readme_Design_System_-_2023-03-19.pdf" target="_new">View Readme Design System Style Guide PDF</a>


[![Readme DSys - Typography Page](https://images.ctfassets.net/rtkhko6y3s3u/5TJMbfAPWZLubAGoH3aKSp/1c3915590663167f095f9485ba82012a/Readme_DSys_-_Typography_Page.png)](https://images.ctfassets.net/rtkhko6y3s3u/5TJMbfAPWZLubAGoH3aKSp/1c3915590663167f095f9485ba82012a/Readme_DSys_-_Typography_Page.png "View Full Size")
    
Readme DSys - Typography Page, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/7r7UYv6eHuoDUkTpOPQXt), [figma](https://www.figma.com/file/feMH69om0kW1WpgxX2cffW/?node-id=24:3628)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/1USr9brQYVqAQ1ElehfloE)

## Design System Lifecycle

[![Design System Lifecycle](https://images.ctfassets.net/rtkhko6y3s3u/STDEhsaxXEs9cdoWTaJ5d/cdc67e7901853b888ddcc1f7ef9a3429/Design_System_Lifecycle.png)](https://images.ctfassets.net/rtkhko6y3s3u/STDEhsaxXEs9cdoWTaJ5d/cdc67e7901853b888ddcc1f7ef9a3429/Design_System_Lifecycle.png "View Full Size")
    
Design System Lifecycle, source: [contentful](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/7kJIgyai8XdpSIC8SdJMja), [figma](https://www.figma.com/file/Msm91sl0dhVPyjUnnbtd7j/?node-id=411:6280)


[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/5oqbvqoCgeqtlfvEpqN9ti)

## Build Information

*Dynamically built using contentful-readme-generator. Do not edit directly.*

*__updated__: 4/22/2023, 4:22:33 PM*

*__space__: rtkhko6y3s3u*

*__environment__: master*

*__entity id__: 2VGzXFpO7HEpkpuLuKgETd*

[&#9998; edit](https://app.contentful.com/spaces/rtkhko6y3s3u/environments/master/entries/2VGzXFpO7HEpkpuLuKgETd)
