# Search the Database

All data the submittors have agreed to publish is searchable for the public. 
The OCDB WebUI offers a graphical search interface. Main feature of this interface is the search text field.
You can enter a single keyword which will attempt to find data using the meta
data fields provided by the submittor. This field also allows to use the
so-called Lucene syntax which enables you to search for specific field values
and also allows chaining. A concise description of the full Lucene query language syntax can be found at 
https://lucene.apache.org/core/2_9_4/queryparsersyntax.html. 

Please note that the OCDB system does not support the complete syntax.

## Lucene Syntax

```
[field]: [expression]
```

__Exact Match__:

```
investigators: Colleen
```

Returns all datasets where the field "investigators" exactly matches the term "Colleen". 

__Wild Card__:

```
investigators: *Colleen*
investigators: ?Colleen?
```

Lucene syntax offers two flavours of wildcards; the "*" represents multiple wildcard characters, the "?" denotes a 
single character wildcard. So the first example above returns all datasets with the investigators field containing 
"Colleen", surrounded by any number of characters, whereas the second returns datasets with "Colleen" preceded and followed by any single character.  


__Operators AND/OR__:

```
investigators: *Colleen* AND investigators: Helge
investigators: *Colleen* OR investigators: Helge
```

These operators allow to combine conditions. As expected, the "AND" implements a logical AND, the "OR" represents the logical OR operation.

__Operators Lower/Greater Than__:

```
investigators: >Colleen
investigators: <Colleen
```

Allows to search for datasets where a field is greater that or smaller than a reference. For number fields the functionality is obvious. 
When applying the operator to String fields, alphanumerical comparisoins are used (i.e. C>B is TRUE).



## Groups

The search interface allows to restrict result sets to certain geophysical variable types, the so-called "groups".
A list of groups and the variables covered is listed in the table below:

```eval_rst
============ =============================================================
Group        Description
============ =============================================================
a            Spectral absorption coefficients: a, ap, aph, ad, ag
b            Spectral scattering coefficients: b, bp
bb           Spectral backscattering coefficients: bb, bbp, beta (VSF)
c            Spectral attenuation coefficients: c, cg, cp, cpg
DC           Dissolved carbon: DIC, DOC, pCO2, alkalinity, CDOM
PC           Particulate carbon: PIC, POC
SPM          Suspended particulate matter
AOT          Aerosol optical properties: AOT, angstrom, water vapor, ozone
nutrients    Si, N, P, oxygen
CTD          Hydrography: Wt, Sal/Cond, sigmaT
fluorescence Fluorescence
productivity NPP, NCP, GPP, PP
Chl          Chlorophyll-a only
HPLC         HPLC: Phytoplankton pigments
============ =============================================================
```


