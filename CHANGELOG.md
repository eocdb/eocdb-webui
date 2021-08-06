# Changes for Version 0.3.0 (in development)

- Upgraded outdated package dependencies (#72). We are now using
  * `leaflet 1.7.1` 
  * `react-leaflet 2.8.0`. Note we could not upgrade to `react-leaflet 3.x` 
     due to a compilation error in `@react-leaflet/core 1.1.0` using CRA.   


# Changes for Version 0.2.0

- Improved password encryption for better protection against brute force 

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
