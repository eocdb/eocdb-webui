# Changes for Version 0.2.5
- Product name dropdown moved to main search panel from advance search dialog.
- Added product category dropdown on search panel for substring search and also its case insensitive
- Fix: Fixed the cache problem in temporal search, which occurs when using the FROM date and TO date fields.

# Changes for Version 0.2.4
- favicon ... The web apps react favicon was replaced with a small FRM4SOC icon.  
- submissionReducer.ts ... Each time the SubmissionDialog is closed, dataFiles and docFiles are emptied.
- SubmissionDialog.tsx ... Lables of "Affiliation", "Experiment" and "Cruise" updated to "Affiliation (or userName)", 
  "Experiment (or project)" and "Cruise (or platform)"
  The SubmissionHelpText has also been adjusted accordingly.  
- SubmissionHeplText updated
- APICodeDialod ... Title updated from "Settings" to "Python API"
- Fixed ... SubmissionTable paging
- Fixed ... SubmissionTable filtering
- Dashboard.tsx ... Display of UserRegistrationDialog enabled
- SubmissionTable.tsx ... Colors changed for Submitted, Validated, Processed, Published, Canceled, Paused, Approved and Ready
- SubmissionTable.tsx ... Enable "delete submission" also for submit user
- SubmissionTable.tsx ... Swap buttons delete and cancel submission
- SubissionFilesTable.tsx ... Colors changed for Validated, Valid, Ok, Warnig, Error and Submitted
- New Submission Dialog ... Unnecessary paper shadows removed
- New Submission Dialog ... Clear field elements on close button click and other dialog close events
- New Submission Dialog ... Fields added (Affiliation, Experiment, Cruise)
- Drop boxes for file upload now allow files to be added one by one.
- package.json ... react-dropzone updated to ^14.2.3
- "new Calibration Submission" Dialog added.
  Submit is not implemented now. Displays a "Currently not implemented warning!" instead.
- Search input elements in the upper search line at the first page appear now in small size
- Warning and error messages, in the lower left corner, will no longer disappear automatically after 6 seconds.
  Users have to click them away on their own. This way we try to prevent that warnings or error messages
  are overlooked.
- Fix: enable display of number values in MetaInfoDialog.tsx
- Fix: Unit added to "Water Depth" input element. (AdvancedSearchDialog.tsx)
- Fix: Fix the point picking from index position 0 only. So a valid centroid can be created.
- Fix: The query URL for search of measurement data contained the key "wdepth" twice. 
- Current Backend URL added in Admin Panel
- Removed edit submission button as backend throws exceptions. The button will be reintroduced in version 0.2.5.
- Fixed marker cluster issue. The cluster did not have any associated styling. Related to #74.

# Changes for Version 0.2.3

- Fixed Data table for search results. The select/unselect all checkbox's behaviour was incorrect when the actual number
  of rows on a page was less than the selected number of rows per page. This occurred e.g. on the last page when the
  total number of items in a search result was not divisible by the selected rows per page.
- The markers now represent the centroid of all measurement locations.

# Changes for Version 0.2.2

- Library Material UI (MUI) has been upgraded from major version 3 to 5.
  The major version 5 includes a substantial refactoring. The code has been adopted accordingly
  (issue #72).
- Library react-leaflet has been upgraded to version 3.2.5. The major version 3 includes
  a substantial refactoring. The code has been adopted accordingly (issue #72).
- Fixing search products not working when advanced filtering (issue #29).
- Fixed submission ID duplication (issue #38).
- Fixed created date issue on Submission Files (issue #91).
- The AppBar is now open as default. This was suggested by users (appeared during issue #72 dependency updates).
- Fixed styling of SearchPanel. It was creating a scrollbar when the AppBar was expanded due to a wrong width. The width
  is now calculated from the drawerWidth (appeared during issue #72 dependency updates).
- Removed stage Dockerfile and config. The endpoint URL is now taken either from the URL the browser uses or a .env
  file (appeared during issue #72 dependency updates).
- Fixed SubmissionTable. Total number of rows was out by one (is returned number of rows - 1).
- Fixed creation date on Submission files. Shows now the correct date (issue #91).
- Data Table has now options 200 and 500 for the number of items on a page (issue #71).
- Fixed search by products (issue #29).

# Changes for Version 0.2.1

- Set a better default zoom for the search map avoiding the gray strip at the top when entering the site. Closing #31.
- Reintroduced mapbox map
- Send now info that the client is a webui when logging in

# Changes for Version 0.2.0

- Improved password encryption for a better protection against brute force

# Changes for Version 0.1.26

- Fixed submission date issue
- Submitters won't be able to delete a hole submission anymore
- Fixed minor issues regarding tooltips on disabled buttons

# Changes for Version 0.1.24

- Plots are now ignoring fill (missing) values
- Logout clears now submission table and dialog
- Submitters cannot delete submission files anymore

# Changes for Version 0.1.23

- Uses now the api version tag 'latest'
- Handles empty submission publication dates correctly
- Uses now ocdb server version 0.1.8

# Changes for Version 0.1.22

- A user can now add submission files to a submission
- The user gets now a creation date for a submission file
- A user can now remove the publication date from a submission

# Changes for Version 0.1.21

- Changed the search group label not to stand on top of everything
- Allows now adding a file to a submission
- Fixed confusing messages when the system rejects a submission

# Changes for Version 0.1.20

- Added legal agreement to inform about using HTML local storage. (#9)

# Changes for Version 0.1.19

- Added a temporary submission disclaimer for publishing data (#17)
- Data Policy Dialog Buttons are now labelled Accept and Decline (#7)

# Changed for Version 0.1.7

- Fixed Submission Dialog closing on error

# Changed for Version 0.1.6

- WebUi shifted to eumetsat gitlab
- Repo mirrored to [GitHub](https://github.com/eocdb/ocdb-webui)
