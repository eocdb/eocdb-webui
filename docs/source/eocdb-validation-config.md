# Validation configuration
Every in-situ measurement document entering the OC-DB system is validated 
against a list of rules before being accepted by the system. 
The validation rules can be freely configured using the configuration file 
"validation_config.json"

The validation system checks both header fields and measurement records 
using "Rules". Each rule relates to a section in the configuration file. 
Also, error and warning messages can be freely configured and associated 
to the rules.

The configuration file contains four major sections:

{  
"header": [],  
"record": [],  
"errors": [],  
"warnings": []  
}  
  
which are explained in detail in the following sections.

## Header

This section in the configuration contains all checks to be executed on the 
measurement header entries. All checks need to be of one of the following 
rule types.

### field_required
Checks if a required field is present in the header information and that the field is 
not empty.  A miss of this rule always results in an error. Parameters are:


* **name**: denotes the name of the field. The name tag omits the forward slash and just 
contains the name
* **type**: always "field_required"
* **error**: the error message to be displayed, either direct or as a reference (see below).
Error messages can contain the tags
    * *{reference}*: resolves to the field name.  

Example:

    {
      "name": "investigators",
      "type": "field_required",
      "error": "@required_field_missing"
    }

### field_optional
Checks if an optional field is potentially present and if so that it is not empty. Issues a warning if field 
is empty. Parameters are:

* **name**: denotes the name of the field. The name tag omits the forward slash and just 
contains the name
* **type**: always "field_optional"
* **warning**: the warning message to be displayed, either direct or as a reference (see below).
Warning messages can contain the tags
    * *{reference}*: resolves to the field name.
    
Example:

    {
      "name": "station",
      "type": "field_optional",
      "warning": "@field_value_missing"
    }  




### field_obsolete
Check if an obsolete header field is present in the header. If so, a warning message is issued.
Parameters are:

* **name**: denotes the name of the field. The name tag omits the forward slash and just 
contains the name
* **type**: always "field_obsolete"
* **warning**: the warning message to be displayed, either direct or as a reference (see below).
Warning messages can contain the tags
    * *{reference}*: resolves to the field name.

Example:

    {
      "name": "station_alt_id",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    }
    
    

### field_compare 
Check that the values of header fields follow relational rules (e.g. stop day not before start day).
Parameters are:

* **reference_name**: denotes the name of the reference field. The name tag omits the forward slash and just 
contains the name
* **compare_name**: denotes the name of the comparand field. The name tag omits the forward slash and just 
contains the name
* **type**: always "field_compare"
* **operation**: one of the relational operators
    * \>=: greater than or equal
    * \>: greater than
    * !=: not equal
    * ==: equal
    * \<: lesser than 
    * \<=: lesser than or equal
* **data_type**: data type of the field value. Must be one of:
    * date: a date value formatted "YYYYmmdd"
    * number: a numerical value
    * string: a string value  
* **error**: the error message to be displayed, either direct or as a reference (see below).
Error messages can contain the tags
    * *{reference}*: resolves to the reference field name. 
    * *{ref_val}*: resolves to the value of the reference field. 
    * *{compare}*: resolves to the comparand field name. 
    * *{comp_val}*: resolves to the value of the comparand field.
* **warning**: the warning message to be displayed, either direct or as a reference (see below).
Warning messages are overridden if error is present. Warning messages can contain the tags
    * *{reference}*: resolves to the reference field name. 
    * *{ref_val}*: resolves to the value of the reference field. 
    * *{compare}*: resolves to the comparand field name. 
    * *{comp_val}*: resolves to the value of the comparand field.
    
Example:

    {
      "type": "field_compare",
      "reference": "start_date",
      "compare": "end_date",
      "operation": "<=",
      "data_type": "date",
      "error": "@header_start_after_finish"
    }


## Records

Checks on the record section cover two entities:

* the correct unit(s) 
* correct value ranges 

The list of variable names to validate is derived from the header field "fields" that defines the 
columns of the record section. A variable name can optionally be followed by any number of digits to 
e.g. denote the wavelength at which the measurement was taken. The name in the configuraiton file must be the raw name, 
without the numbers; these are automatically stripped for the validation chores.

The units for a variable are defined in the header section "units" as a comma separated list of unit names. Each test can
be configured to check for more than one valid physical unit (e.g. mg/m^3 or ug/l).

After these global checks have successfully been passed, all values as stored in the records section are optionally 
checked to stay in the defined value ranges for the variable. These checks are fill-value-aware in the sense that 
possible fill values as defined in the header section "missing" are treated as check-passed.
 
The check of the record content supports the following data types:

### Number record

Checks a numerical measurement variable.  
Parameters are:

* **data_type**: always "number"
* **name**: the name of the variable without the optionally appended wavelength
* **unit**: the list of physical units as comma separated values. Set to "none" or "unitless" if the variable is dimensionless.
* **lower_bound**: lower numerical bound for the variable values. Skip field if no lower bound is to be applied.
* **upper_bound**: upper numerical bound for the variable values. Skip field if no upper bound is to be applied.
* **unit_error**: the error message to be displayed on an error related to the physical units, either direct or as a reference (see below).
Unit error messages can contain the tags
    * *{field_name}*: resolves to the variable name. 
    * *{unit}*: resolves to the required unit(s). 
    * *{bad_unit}*: resolves to the unit detected as incorrect. 
* **value_error**: the error message to be displayed on an error related to the variable values, either direct or as a reference (see below).
Value error messages can contain the tags
    * *{field_name}*: resolves to the variable name. 
    * *{line}*: resolves to the record line number where the error was detected. 
    * *{value}*: resolves to the erroneous value. 
    * *{lower_bound}*: resolves to the lower numerical bound (if defined).
    * *{upper_bound}*: resolves to the upper numerical bound (if defined).

Example:

    {
      "name": "adg",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    } 
    
### Date record

Checks a measurement variable containing a date value, formatted as "YYYYMMDD". Checks that the date format is correct, 
month and day values are within the standard boundaries and that the date is after the min_date defined.
 
Parameters are:

* **data_type**: always "date"
* **name**: the name of the variable
* **min_year**: The lower bound of dates accepted as minimal year.

Example:

    {
      "name": "date_processed",
      "min_year": 1975,
      "data_type": "date"
    }

### Time record

Checks a measurement variable defining a timestamp, formatted as "hh:mm:ss". Checks that the time format is correct and 
the values for hours, minutes and seconds are within their ranges. 

Parameters are:

* **data_type**: always "time"
* **name**: the name of the variable
* **unit**: the list of physical units as comma separated values. Set to "none" or "unitless" if the variable is dimensionless.
* **unit_error**: the error message to be displayed on an error related to the physical units, either direct or as a reference (see below).
Unit error messages can contain the tags
    * *{field_name}*: resolves to the variable name. 
    * *{unit}*: resolves to the required unit(s). 
    * *{bad_unit}*: resolves to the unit detected as incorrect. 

Example:

    {
      "name": "time_processed",
      "unit": "hh:mm:ss",
      "data_type": "time",
      "unit_error": "@field_has_wrong_unit"
    }

### String record

Checks a measurement variable containing a string value. Checks that the string value is not empty.

Parameters are:

* **data_type**: always "string"
* **name**: the name of the variable
* **error**: the error message to be displayed, either direct or as a reference (see below).
Error messages can contain the tags
    * *{field_name}*: resolves to the variable name. 
    * *{line}*: resolves to the record line number where the error was detected. 

Example:

    {
      "name": "hplc_gsfc_id",
      "data_type": "string",
      "error": "@field_is_empty"
    }

## Errors and Warnings

* messages list
* resolving engine - tags
