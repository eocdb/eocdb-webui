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
- Fixed creation date on Submission files. Shows now the correct date (Isissuesue #91).
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
