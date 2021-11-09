# NOIRLab Top 100 Images Chrome extension

This extension takes a random image from NOIRLab's collection of 100 best images
and renders it when the user opens a new browser tab. In the lower left corner
the logo of our official site is displayed next to the title and image credit.

### Directory tree
```
• LICENSE      
• manifest.json
• README.md
+ icons/
    • icon-32x32.png
    • icon-64x64.png
    • icon-128x128.png
+ top100/
    • top100.css
    • top100.html
    • top100.js
    • vue3.0.2.runtime.global.prod.js
    + img/
        • noirlab-white.svg
```

## Development ##

### Manifest ###

Every extension has a JSON-formatted [**manifest**](https://developer.chrome.com/docs/extensions/mv3/manifest/)
file, named manifest.json, that provides important information. Using
[manifest.json](manifest.json), you can specify basic metadata about your extension
such as the name and version, and you can also define aspects of your
extension's functionality (such as background scripts, content scripts, and browser actions).

> We strongly recommend you check this [link](https://developer.chrome.com/docs/extensions/mv3/devguide/)

### How to get this repository ###

Clone the repository
```
git clone https://github.com/helixsoftco/top100-chrome-extension
```

### Main feature ###

This chrome extension 
modifies the new tab of the Google Chrome browser to render an image from the 
Top 100 collection from the NOIRLab [website](https://noirlab.edu/public/es/images/archive/top100/). The images 
are obtained with a query to an API that provides the information in JSON (AVM) format 
from which the image title and the url of the resource are extracted.

### Unpacked extension ###

Once the repository is cloned, you can start developing new
features or customizing our source code. To test the extension
in development you must access the extensions panel of your
Google Chrome browser and enable developer mode. With the
developer mode active you must load the unzipped extension
and perform the corresponding tests

## Production ##

### Register as a Chrome Web Store developer ###

Before you can publish items on the Chrome Web Store, you must register as a CWS 
developer and pay a one-time registration fee. You must provide a developer email 
when you create your developer account.

To register, just access the developer console. The first time you do this, a 
registration screen appears as shown here:

![developer-account](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/adH2VFqS92VdzPTjsHtB.png?w=845)

Once you pay the registration fee and agree to the terms, you will not see this 
registration page again.

### Upload your extension ###

To upload your item, use the Chrome Developer Dashboard. If you need the item ID 
to complete your item's code, then you need to upload the item while you're still 
writing its code. Otherwise, you can wait until the item is finished. 
You can upload your item many times before submitting it for review.

Here's how to upload your item:

1. Go to the [dashboard](https://chrome.google.com/webstore/devconsole)
2. Click the Add new item button
3. Click Choose file > your zip file > Upload. If your item's manifest 
and ZIP file are valid, you can edit your item on the next page

You need to fill out additional listing information before you can publish, 
as contained in the left-hand tabs. [Here](https://developer.chrome.com/docs/webstore/publish/) 
is a quick summary of the information on these tabs.

To publish your item:

1. Make sure you've completed the details on all the tabs
2. Click the Submit for Review button
3. The following dialog appears, letting you confirm that you want 
to submit the item for review:

![submitting](https://developer-chrome-com.imgix.net/image/BrQidfK9jaQyIHwdw91aVpkPiib2/BiZituXHHZ74SIkwc3q7.png?w=845)

### Review of submitted items ###

After you submit the item for review, it will undergo a review process. 
The time for this review depends on the nature of your item.