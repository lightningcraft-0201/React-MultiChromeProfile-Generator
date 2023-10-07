# Multi Chrome Profiles Generator
### This React app allows you to create and delete multiple Chrome profiles with specific extensions and settings such as bookmarks, appearance, avatar images, and more.

## `Features`
`Importing`
* Import existing Chrome profiles using `Import.exe` in the root folder.

* To create new multi profiles: 
Run this react app and then enter the `Profile Name`, `Start Index` , and `Profile Count`. Then press `Add` button to push new profiles to profile list.
Click the `Save` button to generate a file that contains a profile list. The file will be saved in the download folder. Note that the generated file must have the basic index name (e.g., `Local State.json`(true), `Local State (1)`.json(false)).
To clear incorrect files, run `Clear.exe` in the root folder.
Close all Chrome browsers and run `Store.exe` in the root folder to store the created profiles.
Open your Chrome browser to verify that the created profiles are available.

`Removing`
* To remove profiles from the list:
Click the `Remove` button next to the profile you want to delete.
Click the `Save` button to generate an updated file that contains the removed profile list.
Close all Chrome browsers and run `Store.exe` in the root folder to update the stored profiles.
Open your Chrome browser to confirm that the selected profiles are removed.
## `Installation`
To use this app, you'll need to have Node.js and React installed on your computer.

Clone this repository: git clone https://github.com/Turtle-0201/Multi-chrome-profiles.git
Navigate to the project directory: cd Multi-chrome-profiles/resource
Install dependencies: npm install
Start the app: npm start

## `Contributing`
If you'd like to contribute to this project, please fork this repository and submit a pull request with your suggested changes.