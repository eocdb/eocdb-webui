# The OCDB Command Line Client and Python API

Automation and easy access is important. The OCDB database system does,
therefore,
offer a python command line interface as well as a Python API to access
as well as manage submissions and users. 


## Installation

To install the CLI and API, please use following steps.

```bash
    git clone https://github.com/bcdev/ocdb-client
    cd ocdb-client
    conda env create
    [conda] activate ocdb-client
    python setup.py install
```


## Configure

In order to access the database you need to configure the REST API server address.
The default address is ```https://ocdb.eumetsat.int```.


cli:
```bash
ocdb-cli conf 

https://ocdb.eumetsat.int

ocdb-cli cond server_url [some url]
```

python:
```python
from ocdb_client.api.OCDBApi import new_api

api = new_api()

api.config

#Out[11]: {'server_url': 'https://ocdb.eumetsat.int'}

api.set(server_url="[some server url]")

```


## Search Database


The database can be searched using the so-called Lucene syntax (https://lucene.apache.org/core/2_9_4/queryparsersyntax.html). The Lucene
syntax allows you to query specific fields and also allows to apply logic,
chaining of queries, and using wild cards.

The first example below for instance attempts to find data files
that include the name *"Colleen"* in the investigators meta field.


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

- __path__: 
- __received__: Date received
- __identifier_product_doi__: Product DOI
- __investigators__: Primary Investigators (PIs) of the experiment
- __affiliations__: The affiliations of the PIs.
- __contact__: Contact (email address) of the PIs.
- __experiment__: Identifier of the experiment
- __cruise__: Identifier of the cruise
- __data_file_name__: The name of the original data file
- __data_type__: The data type (e.g. scan)
- __documents__: Comma separated list of uploaded supplementary documents
- __data_status__: e.g. final
- __start_date__: Start of measurements,
- __end_date__: End of measurements
- __water_depth__: Water depths during measurement
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
ocdb-cli user add -u admin -p admin -fn Submit -ln Submit -em jj -ph hh -r admin
```

python:
```python
api.add_user(username='<user_name>', password='<passwd>', roles=['<role1>, <role2>'])
```

You need to have administrative access rights to be able to complete this action.


__Get User Information__:

cli:
```bash
ocdb-cli user get --user scott
```

python:
```python
api.get_user(name=<user_name>)
```

You need to have administrative access rights to perform this operation for any user. 
Users can request their own information without restrictions.

__Delete a User__:


cli:
```bash
ocdb-cli user delete --user scott
```

python:
```python
api.delete_user(name=<user_name>)
```
You need to have administrative access rights to be able to complete this action

__Update an Existing User__:


cli:
```bash
ocdb-cli user update --key last_name --value <your value>
```

python:
```python
api.update_user(name=<user_name>, key=<key>, value=<value>)
```

You need to have administrative access rights to perform this operation for any user. 
Users can update their own information without restrictions.


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

You need to have administrative access rights to perform this operation for any submission. 
Users can monitor their own submissions without restrictions.

__Get Submissions for a specific User__:


cli:
```bash
ocdb-cli sbm user --user-id <user-id>
```

python:
```python
api.get_submissions_for_user(<user-id>)
```

You need to have administrative access rights to perform this operation for any submission. 
Users can monitor their own submissions without restrictions.


__Delete Submission__:


cli:
```bash
ocdb-cli sbm delete --submission-id <submission-id>
```

python:
```python
api.delete_submission(<submission-id>)
```
You need to have administrative access rights to perform this operation for any submission. 
Users can delete their own submissions without restrictions.


__Update Submission Status__:

This command allows to manipulate the status of a submission. Some status changes will have impact on
whether the data are searchable or not.

The following list shows the different stati and the impact on the accessibility when changing them:

- SUBMITTED: A dataset has been submitted. Usually also means that the data has issues. This will trigger
  the automated validation process
- VALIDATED: The data has been submitted and is clean
- PROCESSED: The data has been processed into the database and is findable, but only to admins and the submitting user
- PUBLISHED: The data has been processed into the database and is publicly available
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

You need to have administrative access rights to perform this operation for any submission. 
Users can submit, cancel and pause their own submissions without restrictions.


__Download Submission File__:


This command will download a single submission file. Please be aware that the version of the file is that of the submission
status. Do not use this feature to download data, instead use the "dataset" API.

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

You need to have administrative access rights to perform this operation for any submission file. 
Users can update their own submission files without restrictions.


## General

__Get License__


```bash
ocdb-cli lic
```


## List of functions/CLI commands


```eval_rst
+-----------+----+--------+--------------------------------------------+
| Operation | CL | API    | Parameters                                 |
|           | I  |        |                                            |
+===========+====+========+============================================+
| Upload    | sb | upload | store_path: str, dataset_files:            |
| Submissio | m  | _submi | Sequence[str], doc_files: Sequence[str],   |
| n         | up | ssion  | path: str, submission_id: str,             |
|           | lo |        | publication_date: str, allow_publication:  |
|           | ad |        | bool                                       |
+-----------+----+--------+--------------------------------------------+
| Download  | ds | downlo | ids: List[str], download_docs: bool,       |
| datasets  | do | ad_dat | out_fn: Optional[str]                      |
| by Ids    | wn | asets_ |                                            |
|           | lo | by_ids |                                            |
|           | ad |        |                                            |
+-----------+----+--------+--------------------------------------------+
| Delete    | ds | delete | submission_id: str                         |
| datasets  | de | _datas |                                            |
| by        | l- | ets_by |                                            |
| submissio | by | _submi |                                            |
| n         | -s | ssion  |                                            |
|           | b  |        |                                            |
+-----------+----+--------+--------------------------------------------+
| Get       | ds | get_da | submission_id: str                         |
| datasets  | ge | tasets |                                            |
| by        | t- | _by_su |                                            |
| submissio | by | bmissi |                                            |
| n         | -s | on     |                                            |
|           | b  |        |                                            |
+-----------+----+--------+--------------------------------------------+
| Get a     | ds | get_da | dataset_id: str, fmt: str                  |
| single    | ge | taset  |                                            |
| dataset   | t  |        |                                            |
| by ID     |    |        |                                            |
+-----------+----+--------+--------------------------------------------+
| Find      | ds | find_d |                                            |
| datasets  | fi | ataset |                                            |
|           | nd | s      |                                            |
+-----------+----+--------+--------------------------------------------+
| Get       | sb | get_su | submission_id: str                         |
| submissio | m  | bmissi |                                            |
| n         | ge | on     |                                            |
| by ID     | t  |        |                                            |
+-----------+----+--------+--------------------------------------------+
| Get       | sb | get_su | user_id: str                               |
| submissio | m  | bmissi |                                            |
| ns        | us | ons_fo |                                            |
| for user  | er | r_user |                                            |
+-----------+----+--------+--------------------------------------------+
| Update    | sb | update | submission_id: str, status: str            |
| status of | m  | _submi |                                            |
| a         | st | ssion_ |                                            |
| submissio | at | status |                                            |
| n         | us |        |                                            |
+-----------+----+--------+--------------------------------------------+
| Delete an | sb | delete | submission_id: str                         |
| entire    | m  | _submi |                                            |
| submissio | de | ssion  |                                            |
| n         | le |        |                                            |
|           | te |        |                                            |
+-----------+----+--------+--------------------------------------------+
```
