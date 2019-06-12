# The OCDB Command Line Client and Python API

Copernicus Ocean Colour Database (OCDB) Python Client

## Installation

```bash
    git clone https://github.com/bcdev/eocdb-client
    cd eocdb-client
    conda env create
    source activate eocdb-client-dev
    python setup.py develop
```


## Configure

In order to access the database you need to configure the RESTful API server address.
The default address is ```http://ocdb.eumetsat.int```.


cli:
```bash
eocdb-cli conf server_url http://ocdb.eumetsat.int
```

python:
```python
from eocdb_client.api.OCDBApi import new_api

api = new_api()

api.config
api.set

#Out[11]: {'server_url': 'http://ocdb.eumetsat.int'}
```


## Search Database


The database can be searched using the so-called Lucene syntax (https://lucene.apache.org/core/2_9_4/queryparsersyntax.html). The Lucene
syntax allows you to query specific fields and also allows to apply logic,
chaining of queries, and using wild cards.

The first example below for instance attempts to find data files
that include the name *"Colleen"* in the investigators meta field.

bash:
```bash
eocdb-cli ds find --expr "investigators: *Colleen*"
```

python:
```python
api.find_datasets(investigators="*Colleen*")
```

Possible fields are:

- __received__: Date received
- __identifier_product_doi__: Product DOI
- __investigators__: Primary Investigators (PIs) of the experiment
- __affiliations__: The affiliations of the PIs.
- __contact__: Contact (Email Address) of the PIs.
- __experiment__: Identifier of the experiment
- __cruise__: Identifier of the cruise
- __data_file_name__: The name of the original data file
- __data_type__: The data type (e.g. scan)


## User Management

__Login User__:

The login procedure will ask for a user name and password. You can specify the password
 as an option. However, under normal circumstances we advise to use the command line prompt.

The example below will login a user with the user name 'scott'. 'scott' is
a dummy user that should be present in the EUMETSAT production database. Scott
does not have any privileges.

cli:
```bash
eocdb-cli user login --user scott --password tiger
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

You need to have administrative access rights to be able to complete this action.

__Get User Information__:


cli:
```bash
eocdb-cli user get --user scott --api-key <your key>
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
eocdb-cli user delete --user scott --api-key <your key>
```

python:
```python
api.delete_user(name=<user_name>)
```

You need to have administrative access rights to be able to complete this action

__Update an Existing User__:


cli:
```bash
eocdb-cli user update --key last_name --value <your value>
```

python:
```python
from eocdb_client.api.OCDBApi import new_api

api = new_api()

api.update_user(name=<user_name>, key=<key>, value=<value>)
```
You need to have administrative access rights to perform this operation for any user. 
Users can update their own information without restrictions.

## Managing Submissions

__Get Submission__:


cli:
```bash
eocdb-cli sbm get --submission-id <submission-id>
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
eocdb-cli sbm user --user-id <user-id>
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
eocdb-cli sbm delete --submission-id <submission-id>
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
eocdb-cli sbm status --submission-id <submission-id> --status <status>
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
eocdb-cli sbm download --submission-id <submission-id> --index <index>
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
eocdb-cli sbm upload --submission-id <submission-id> --index <index> --file <file>
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
eocdb-cli lic
```
