# User Manual for the EOCDB Web

The aim of the Ocean Colour Databas (OCDB) is to provide a platform to publish
ocean related in-situ measurements. This tool enables researchers to upload
their own in-situ data provided in the Seabass data format. This system will
validate the data and make it searchible. This is an attempt to make data findable, accessible, interoperable as well as reusable (FAIR principles, quote).

## Search

All data the submittor has agreed to publish is searchible for the public. 
The OCDB WebUI offers a search interface. Main feature of that interface is the search text field.
You can enter a single keyword which will attempt to find data using the meta
data fields provided by the submittor. This field also allows to use the
so-called Lucene syntax which enables you to search for specific field values
and also allows chaining.

## Submissions

In this section we describe how to submit data. We assume that you have a user 
account and have logged in to the system. When clicking on the submission section a list of your submissions will appear including action buttons.

### New Submission

If you want to add a new submission click on New Submission on the top rihht corner.
A new dialog will open. Please add an identifier for your submission and a path
teh submissions will be stored under. This will be used to intermittantly 
store your data files and will be used when zipping data files on download.

When submitting data, you will be asked to provide a publication date. Leave this empty if you do not desire your data to be searchible. Otherwise, indicate
what date you would like your data to be available to the public.

If you don't want the data to be published, tick 'publication' allowed. This 
will be shown in the submission table to the administrators.   

Once you initiate the submission by pushing "Submit" your data will be validated
using plausibility and validation rules (link to rules).

If the validation succeeds, the status of your submission will be VALIDATED 
otherwise SUBMITTED. If the system finds errors you can view them in the 
submission file table by clicking 'list files' on the submission table item. 


### Submission Actions

__List Submission Files__:

![list](static/list.png)

__Process Data__:

![list](static/process.png)

When pushing this button, the data will be processed into the database and, 
therefore, available for searching ONLY for administrators and the submittor.

__Publish Data__:

![list](static/publish.png)

The data will also be processed into the database. However, in this case
the data will be available to the public.

__Delete Submission__:

![list](static/delete.png)

The whole submission will be deleted incuding the data in the search database.
 
__Halt Restart Submission__:

![list](static/play.png)

You are able to halt a submission. This will denote the administrators that you
don't desire your data to be processed. Once the process is halted, you can 
restart the submission by pushing the restart button.

__Cancel Submission__:

![list](static/cancel.png)

Cancelling the submission will delete the database entries hmhmhm to this submission.

### Submission Stati

From the above actions the following stati for subissions derive.

- Submitted
- Validated
- Cancelled
- Processed
- Published

### Submission File Actions

When clicking on listing files for a submission a list of teh data and document
files are listed. This new table provides the following actions:

__Delete File__:

![list](static/delete.png)

Remove the file from the submission. This has no impact on the search database.

__Download File__:

![list](static/download.png)

Download the file.

__Upload File__:

![list](static/upload.png)

Reupload a new version of the file. The old one will be overwritten. The 
validation will be re-run.

### Submission File Stati

- ERROR
- VALIDATED

