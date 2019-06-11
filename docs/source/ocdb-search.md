# Search the Database

All data the submittor has agreed to publish is searchable for the public. 
The OCDB WebUI offers a search interface. Main feature of that interface is the search text field.
You can enter a single keyword which will attempt to find data using the meta
data fields provided by the submittor. This field also allows to use the
so-called Lucene syntax which enables you to search for specific field values
and also allows chaining.

## Lucene Syntax

```
[field]: [expression]
```

__Exact Match__:

```
investigators: Colleen
```

__Wild Card__:

```
investigators: *Colleen*
investigators: ?Colleen?
```

__In__:

```
investigators: *Colleen*
investigators: ?Colleen?
```


__Operators AND/OR__:

```
investigators: *Colleen*
investigators: ?Colleen?
```


__Operators Lower/Greater Than__:

```
investigators: *Colleen*
investigators: ?Colleen?
```



## Groups

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


## Possible Fields

