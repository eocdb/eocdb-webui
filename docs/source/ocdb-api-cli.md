# The OCDB Command Line Client and Python API

Copernicus Ocean Colour Database (OCDB) Python Client

## Installation

```bash
    git clone https://github.com/bcdev/ocdb-client
    cd ocdb-client
    conda env create
    [conda] activate ocdb-client
    python setup.py install
```


## Configure

In order to access the database you need to configure the RESTful API server address.
The default address is ```https://ocdb.eumetsat.int```.


cli:
```bash
ocdb-cli conf 

https://ocdb.eumetsat.int
```

python:
```python
from ocdb_client.api.OCDBApi import new_api

api = new_api()

api.config
api.set

#Out[11]: {'server_url': 'https://ocdb.eumetsat.int'}
```


## Search Database


The database can be searched using the so-called Lucene syntax. The Lucene
syntax allows you to query specific fields and also allows to apply logic,
chaining of queries, and using wild cards.

The first example searches for instance attempts to find data files
that include the name Colleen in the investigators meta field.

bash:
```bash
ocdb-cli ds find --expr "investigators: *Colleen*"

{
  "locations": {},
  "total_count": 900,
  "datasets": [
    {
      "id": "5c6d632661d82d28bf8ce807",
      "path": "URI/Mouw/NIH-NSF_Lake_Erie/URI_Lake_Erie_2013/archive/URI_Lake_Erie20130820_2_0m_ag.txt"
    },
    ...
```

python:
```python
api.find_datasets(expression="investigators:*Colleen*")

{
  "locations": {},
  "total_count": 900,
  "datasets": [
    {
      "id": "5c6d632661d82d28bf8ce807",
      "path": "URI/Mouw/NIH-NSF_Lake_Erie/URI_Lake_Erie_2013/archive/URI_Lake_Erie20130820_2_0m_ag.txt"
    },
    ...
```


__Possible fields are__:

- __received__: Date Received
- __identifier_product_doi__: Product DOI
- __investigators__: Primary Investigators (PIs) of the experiment
- __affiliations__: The Affiliations of the PIs.
- __contact__: Contact (Email Address) of the PIs.
- __experiment__: Identifier of the Experiment
- __cruise__: Identifier of the Cruise
- __data_file_name__: The name of the original data file
- __data_type__: The data type (e.g. scan)
- __data_file_name__: name of teh original data file
- __documents__: Comma separated list of uploaded supplementary documents
- __data_status__: e.g. final
- __start_date__: start of measurements,
- __end_date__: end of measurements
- __water_depth__: Water depths on measurement
- __measurement_depth__: Measurement depth
- __secchi_depth__: Secchi depth
- __missing__: Fill value
- __delimiter__: Delimiter of data file e.g. tab
- __units__: Comma separated list of units e.g. "nm,1/m,1/m"


## Get Datasets

The search engine returns a list of datasets. In order to retrieve the actual data you, you will have 
to use the result and obtain dataset IDs. A dataset ID can be used to get actual data:

python:
```python
api.get_dataset(dataset_id='5c6d632661d82d28bf8ce807', fmt='pandas')

Out[10]: 
     wavelength      ag   ag_sd
0           300  6.1015  0.2407
1           301  5.9565  0.2389
2           302  5.8140  0.2352
3           303  5.6763  0.2318
...

```

## User Management

__Login User__:

The login procedure will ask for a user name and password. You can specify the password
 as an option. However, under normal circumstances we advice to use the command line prompt.

The example below will login a user with the user name 'admin'. 'admin' is
a dummy user that should be present in the Copernicus production database. Scott
does not have any privileges.

cli:
```bash
ocdb-cli user login --user scott --password tiger
```

python:
```python
api.login_user(username='scott', password='tiger')
```


__Add User__:

To add a user, specify the required user information


cli:
```bash
eocdb-cli user add -u admin -p admin -fn Submit -ln Submit -em jj -ph hh -r admin
```

python:
```python
api.add_user(username='<user_name>', password='<passwd>', roles=['<role1>, <role2>'])
```


__Get User Information__:

cli:
```bash
ocdb-cli user get --user scott
```

python:
```python
api.get_user(name=<user_name>)
```


__Delete a User__:


cli:
```bash
ocdb-cli user delete --user scott
```

python:
```python
api.delete_user(name=<user_name>)
```


__Update an Existing User__:


cli:
```bash
ocdb-cli user update --key last_name --value <your value>
```

python:
```python
api.update_user(name=<user_name>, key=<key>, value=<value>)
```


## Managing Submissions

__Get Submission__:


cli:
```bash
ocdb-cli sbm get --submission-id <submission-id>
```

python:
```python
api.get_submission(<submission-id>)
```


__Get Submissions for a specific User__:


cli:
```bash
ocdb-cli sbm user --user-id <user-id>
```

python:
```python
api.get_submissions_for_user(<user-id>)
```


__Delete Submission__:


cli:
```bash
ocdb-cli sbm delete --submission-id <submission-id>
```

python:
```python
api.delete_submission(<submission-id>)
```


__Update Submission Status__:

This command allows to manipulate the status of a submission. Some status changes will have impact on
whether the data are searchable or not.

The following list shows the different statuses and the impact changing them:

- SUBMITTED: A dataset has been submitted. Usually also means that the data has issues. This will also trigger
  the validation process
- VALIDATED: The data has been submitted and is clean
- PROCESSED: The data has been processed into the database and is findable, but only to admins and the submitting user
- PUBLISHED: The data has been processed into the database and is publically findable
- CANCELED: The data submission has been canceled. Setting this status will remove the data from the database and will
  not be findable anymore
- PAUSED: The user pauses the submission. This indicates that the admin shall not publish or process the data

cli:
```bash
ocdb-cli sbm status --submission-id <submission-id> --status <status>
```


python
```python
api.update_submission_status(<submission-id>, <status>)
```


__Download Submission File__:


This command will download a single submission file. Please be aware that the version of the file is that of teh submission
status. Do not use this feature to download data.

cli:
```bash
ocdb-cli sbm download --submission-id <submission-id> --index <index>
```


python
```python
api.download_submission_file(<submission-id>, <index>)
```


__Upload Submission File__:


The aim of this feature is to enable users and admin to replace an existing submission file. You can
replace both documents and measurements.


cli
```bash
ocdb-cli sbm upload --submission-id <submission-id> --index <index> --file <file>
```


python
```python
api.upload_submission_file(<submission-id>, <index>, <file>)
```


## General

__Get License__


```bash
ocdb-cli lic
```


## List of functions/CLI commands

| Operation                                | CLI              | API                           | Parameters                                                                                                                                              | 
|------------------------------------------|------------------|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------| 
| Upload Submission                        | sbm upload   | upload_submission             | store_path: str, dataset_files: Sequence[str], doc_files: Sequence[str], path: str,  submission_id: str, publication_date: str, allow_publication: bool | 
| Download datasets by Ids                 | ds download      | download_datasets_by_ids      | ids: List[str], download_docs: bool, out_fn: Optional[str]                                                                                              | 
| Delete datasets by submission            | ds del-by-sb     | delete_datasets_by_submission | submission_id: str                                                                                                                                      | 
| Get datasets by submission               | ds get-by-sb     | get_datasets_by_submission    | submission_id: str                                                                                                                                      | 
| Get a single dataset by ID               | ds get           | get_dataset                   | dataset_id: str, fmt: str                                                                                                                               | 
| Find datasets                            | ds find          | find_datasets                 |                                                                                                                                                         | 
| Get submission by ID                     | sbm get          | get_submission                | submission_id: str                                                                                                                                      | 
| Get submissions for user                 | sbm user         | get_submissions_for_user      | user_id: str                                                                                                                                            | 
| Update status of a submission            | sbm status       | update_submission_status      | submission_id: str, status: str                                                                                                                         | 
| Delete an entire submission              | sbm delete       | delete_submission             | submission_id: str                                                                                                                                      | 
| Create a submission                      | sbm upload       | upload_submission             | store_path: str, dataset_files: Sequence[str], doc_files: Sequence[str], path: str, submission_id: str, publication_date: str, allow_publication: bool  | 
| Download a submission file               | sbmfile download | download_submission_file      | submission_id: str, index: int, out_fn: Optional[str]                                                                                                   | 
| Get a submission file                    | sbmfile get      | get_submission_file           | submission_id: str, index: int                                                                                                                          | 
| Delete a submission file                 | sbmfile delete   | delete_submission_file        | submission_id: str, index: int                                                                                                                          | 
| Upload a submission file                 | sbmfile upload   | upload_submission_file        | submission_id: str, index: int, file_name: str                                                                                                          | 
| Validate a submission file before upload | sbmfile validate | validate_submission_file      | file_name: str                                                                                                                                          | 
| Add a user                               | user add         | add_user                      | username: str, password: str, email: str, roles: Sequence[str], first_name: str = '',last_name: str = '', phone: str = ''                               | 
| Delete a user                            | user delete      | delete_user                   | username: str                                                                                                                                           | 
| Update a user                            | user update      | update_user                   | username: str, key: str, value: str                                                                                                                     | 
| Get user info                            | user get         | get_user                      | username: str                                                                                                                                           | 
| Login                                    | user login       | login_user                    | username: Optional[str], password: Optional[str]                                                                                                        | 
| Logout                                   | user logout      | logout_user                   |                                                                                                                                                         | 
