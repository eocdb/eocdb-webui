# Search the Database

All data the submittor has agreed to publish is searchable for the public. 
The OCDB WebUI offers a search interface. Main feature of that interface is the search text field.
You can enter a single keyword which will attempt to find data using the meta
data fields provided by the submittor. This field also allows to use the
so-called Lucene syntax which enables you to search for specific field values
and also allows chaining.

## Lucene Syntax

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

+------+-----+------------------------------------------------------------------+
| Fiel | Uni | Description                                                      |
| d    | ts  |                                                                  |
| Name |     |                                                                  |
+======+=====+==================================================================+
| a    | 1/m | Total absorption coefficient (aw + ap + ag)                      |
+------+-----+------------------------------------------------------------------+
| a\*p | m^2 | Chlorophyll a specific absorption coefficient                    |
| h    | /mg |                                                                  |
+------+-----+------------------------------------------------------------------+
| a\*s | m^2 | Specific absorption coefficient of Suwanee River Fulvic Acid     |
| rfa  | /mg | standard                                                         |
+------+-----+------------------------------------------------------------------+
| aaer | 1/m | Absorption coefficient of atmospheric aerosols                   |
+------+-----+------------------------------------------------------------------+
| abs  | uni | Absorbance                                                       |
|      | tle |                                                                  |
|      | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| abs\ | m^2 | Carbon specific absorbance                                       |
| *    | /mg |                                                                  |
+------+-----+------------------------------------------------------------------+
| abs\ | uni | Absorbance (Optical Density) of non-algal detritus               |
| _ad  | tle |                                                                  |
|      | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| abs\ | uni | Absorbance (Optical Density) of Gelbstoff                        |
| _ag  | tle |                                                                  |
|      | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| abs\ | uni | Absorbance (Optical Density) of particles (ad + aph)             |
| _ap  | tle |                                                                  |
|      | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| abs\ | uni | Absorbance of a blank (or unused) filter pad for non-algal       |
| _bla | tle | detritus.                                                        |
| nk\_ | ss  |                                                                  |
| ad   |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| abs\ | uni | Absorbance of a blank (or unused) filter pad for Gelbstoff.      |
| _bla | tle |                                                                  |
| nk\_ | ss  |                                                                  |
| ag   |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| abs\ | uni | Absorbance of a blank (or unused) filter pad for particles.      |
| _bla | tle |                                                                  |
| nk\_ | ss  |                                                                  |
| ap   |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| abs\ | uni | Absorbance of NaCl solution (use with the \_###ppt suffix)       |
| _nac | tle |                                                                  |
| l    | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| abun | non | Number of cells observed (to specify a particular taxonomic type |
| danc | e   |                                                                  |
| e    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| ad   | 1/m | Absorption coefficient of non-algal detritus                     |
+------+-----+------------------------------------------------------------------+
| ad\_ | 1/m | Accumulated estimate of standard uncertainty associated with the |
| unc  |     | derivation of the absorption coefficient of non-algal detritus   |
|      |     | (ad) via error propagation through the absorption equation. See  |
|      |     | section 5.3.4 of IOCCG's "Volume 1: Inherent Optical Property    |
|      |     | Measurements and Protocols: Absorption Coefficient" (2018).      |
+------+-----+------------------------------------------------------------------+
| adg  | 1/m | Absorption coefficient of non-algal detritus + Gelbstoff (ad +   |
|      |     | ag)                                                              |
+------+-----+------------------------------------------------------------------+
| ag   | 1/m | Absorption coefficient of Gelbstoff                              |
+------+-----+------------------------------------------------------------------+
| agp  | 1/m | Absorption coefficient of Gelbstoff + particles (ag + ap)        |
+------+-----+------------------------------------------------------------------+
| Allo | mg/ | HPLC Alloxanthin                                                 |
|      | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| alph | mg/ | HPLC Alpha (Beta                                                 |
| a-be | m^3 |                                                                  |
| ta-C |     |                                                                  |
| ar   |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| alti | m   | Altitude above sea level                                         |
| tude |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| am   | uni | Airmass                                                          |
|      | tle |                                                                  |
|      | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| AMC  | umo | Concentration of 7-Amino-4-methylcoumarin's fluorescent          |
|      | l   | molecules without an associated substrate (used for the          |
|      |     | calibration curve in flow cytometry).                            |
+------+-----+------------------------------------------------------------------+
| AMC- | umo | Rate of substrate cleavage for                                   |
| Leu  | l/L | L-Leucine-7-amido-4-methylcoumarin hydrochloride                 |
|      | /hr |                                                                  |
+------+-----+------------------------------------------------------------------+
| angs | uni | Angstrom exponent                                                |
| trom | tle |                                                                  |
|      | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| Anth | mg/ | HPLC Antheraxanthin                                              |
|      | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| AOT  | uni | Aerosol Optical Thickness (sometimes referred to as tau or taua) |
|      | tle |                                                                  |
|      | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| ap   | 1/m | Absorption coefficient of particles (ad + aph)                   |
+------+-----+------------------------------------------------------------------+
| ap\_ | 1/m | Accumulated estimate of standard uncertainty associated with the |
| unc  |     | derivation of the absorption coefficient of particles (ap) via   |
|      |     | error propagation through the absorption equation. See section   |
|      |     | 5.3.4 of IOCCG's "Volume 1: Inherent Optical Property            |
|      |     | Measurements and Protocols: Absorption Coefficient" (2018).      |
+------+-----+------------------------------------------------------------------+
| aph  | 1/m | Absorption coefficient of phytoplankton                          |
+------+-----+------------------------------------------------------------------+
| aph\ | 1/m | Accumulated estimate of standard uncertainty associated with the |
| _unc |     | derivation of the absorption coefficient of phytoplankton (aph)  |
|      |     | via error propagation through the absorption equation. See       |
|      |     | section 5.3.4 of IOCCG's " Volume 1: Inherent Optical Property   |
|      |     | Measurements and Protocols: Absorption Coefficient" (2018).      |
+------+-----+------------------------------------------------------------------+
| asrf | 1/m | Absorption coefficient of Suwanee River Fulvic Acid standard     |
| a    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| asso | non | File type of an associated file. Please contact SeaBASS staff    |
| ciat | e   | before using this field to verify that your file type is         |
| ed\_ |     | supported. Valid entries for this field are: DNA-FASTQ           |
| file |     |                                                                  |
| \_ty |     |                                                                  |
| pes  |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| asso | non | File name of an associated file. Must be used with               |
| ciat | e   | associated\_file\_type. Please include the file suffix in the    |
| ed\_ |     | entry. If multiple entries are applicable                        |
| file |     |                                                                  |
| s    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| Asta | mg/ | HPLC Astaxanthin                                                 |
|      | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| At   | deg | Air temperature                                                  |
|      | ree |                                                                  |
|      | sC  |                                                                  |
+------+-----+------------------------------------------------------------------+
| aw   | 1/m | Absorption coefficient of water                                  |
+------+-----+------------------------------------------------------------------+
| b    | 1/m | Total scattering coefficient (bw + bp)                           |
+------+-----+------------------------------------------------------------------+
| bact | cel | Bacterioplankton abundance                                       |
| \_ab | ls/ |                                                                  |
| un   | L   |                                                                  |
+------+-----+------------------------------------------------------------------+
| bact | pmo | Bacterioplankton production                                      |
| P    | l/L |                                                                  |
|      | /hr |                                                                  |
+------+-----+------------------------------------------------------------------+
| bb   | 1/m | Total backscattering coefficient (bbw + bbp)                     |
+------+-----+------------------------------------------------------------------+
| bbp  | 1/m | Backscattering coefficient of particles                          |
+------+-----+------------------------------------------------------------------+
| bbp\ | uni | Ratio of the backscattering coefficient of particles (bbp) to    |
| _bp  | tle | the total backscattering coefficient (bp)                        |
|      | ss  |                                                                  |
+------+-----+------------------------------------------------------------------+
| bbw  | 1/m | Backscattering coefficient of water                              |
+------+-----+------------------------------------------------------------------+
| BChl | mg/ | HPLC Bacteriochlorophyll a                                       |
| \_a  | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| bent | non | Description of the benthic seafloor community or substrate.      |
| hic\ | e   |                                                                  |
| _typ |     |                                                                  |
| e    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| beta | mg/ | HPLC Beta-Carotene (Beta                                         |
| -bet | m^3 |                                                                  |
| a-Ca |     |                                                                  |
| r    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| beta | mg/ | HPLC Alpha-Carotene (Beta                                        |
| -epi | m^3 |                                                                  |
| -Car |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| beta | mg/ | HPLC Gamma-Carotene (Beta                                        |
| -psi | m^3 |                                                                  |
| -Car |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| bin\ | m   | Nominal or center depth for each data bin                        |
| _dep |     |                                                                  |
| th   |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| binc | non | Number of records averaged into a bin or reported measurement    |
| ount | e   |                                                                  |
+------+-----+------------------------------------------------------------------+
| bott | non | Number used to identify a specific bottle within an array of     |
| le   | e   | bottle samples collected                                         |
+------+-----+------------------------------------------------------------------+
| bp   | 1/m | Scattering coefficient of particles                              |
+------+-----+------------------------------------------------------------------+
| BSi  | mmo | Biogenic silica                                                  |
|      | l/m |                                                                  |
|      | ^3  |                                                                  |
+------+-----+------------------------------------------------------------------+
| But- | mg/ | HPLC 19'-Butanoyloxyfucoxanthin                                  |
| fuco | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| bw   | 1/m | Scattering coefficient of water                                  |
+------+-----+------------------------------------------------------------------+
| c    | 1/m | Beam attenuation coefficient                                     |
+------+-----+------------------------------------------------------------------+
| C2H3 | ppb | VOCC concentration of (C2H3N)H+ in the air evolved from the      |
| N\_H | v   | experimental chambers that are measured by the PTR-TOF/MS. Use   |
|      |     | with headers /chemical\_formula= and /mass\_to\_charge=.         |
+------+-----+------------------------------------------------------------------+
| C2H4 | ppb | VOCC concentration of (C2H4O)H+ in the air evolved from the      |
| O\_H | v   | experimental chambers that are measured by the PTR-TOF/MS. Use   |
|      |     | with headers /chemical\_formula= and /mass\_to\_charge=.         |
+------+-----+------------------------------------------------------------------+
| C2H6 | ppb | VOCC concentration of (C2H6S)H+ in the air evolved from the      |
| S\_H | v   | experimental chambers that are measured by the PTR-TOF/MS. Use   |
|      |     | with headers /chemical\_formula= and /mass\_to\_charge=.         |
+------+-----+------------------------------------------------------------------+
| C3H6 | ppb | VOCC concentration of (C3H6O)H+ in the air evolved from the      |
| O\_H | v   | experimental chambers that are measured by the PTR-TOF/MS. Use   |
|      |     | with headers /chemical\_formula= and /mass\_to\_charge=.         |
+------+-----+------------------------------------------------------------------+
| C5H8 | ppb | VOCC concentration of (C5H8)H+ in the air evolved from the       |
| \_H  | v   | experimental chambers that are measured by the PTR-TOF/MS. Use   |
|      |     | with headers /chemical\_formula= and /mass\_to\_charge=.         |
+------+-----+------------------------------------------------------------------+
| C6H6 | ppb | VOCC concentration of (C6H6)H+ in the air evolved from the       |
| \_H  | v   | experimental chambers that are measured by the PTR-TOF/MS. Use   |
|      |     | with headers /chemical\_formula= and /mass\_to\_charge=.         |
+------+-----+------------------------------------------------------------------+
| Cant | mg/ | HPLC Canthaxanthin                                               |
| ha   | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| cdmf | vol | CDOM fluorescence (may be used in combination with suffixes      |
|      | ts  | \_ex### and/or \_em###                                           |
+------+-----+------------------------------------------------------------------+
| cdom | mg/ | Concentration of chromophoric dissolved organic matter           |
|      | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| cg   | 1/m | Attenuation coefficient of Gelbstoff                             |
+------+-----+------------------------------------------------------------------+
| cgp  | 1/m | Attenuation coefficient of Gelbstoff + particles (c - cw = agp + |
|      |     | bp)                                                              |
+------+-----+------------------------------------------------------------------+
| CH4O | ppb | VOCC concentration of (CH4O)H+ in the air evolved from the       |
| \_H  | v   | experimental chambers that are measured by the PTR-TOF/MS. Use   |
|      |     | with headers /chemical\_formula= and /mass\_to\_charge=.         |
+------+-----+------------------------------------------------------------------+
| CH4S | ppb | VOCC concentrations of (CH4S)H+ in the air evolved from the      |
| \_H  | v   | experimental chambers that are measured by the PTR-TOF/MS. Use   |
|      |     | with headers /chemical\_formula= and /mass\_to\_charge=.         |
+------+-----+------------------------------------------------------------------+
| Chl  | mg/ | Chlorophyll a derived fluorometrically/spectrophotometrically    |
|      | m^3 | (e.g.                                                            |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll a (MV\_Chl\_a plus allomers and epimers)        |
| _a   | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll a allomers                                      |
| _a\_ | m^3 |                                                                  |
| allo |     |                                                                  |
| m    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll a epimer                                        |
| _a\_ | m^3 |                                                                  |
| prim |     |                                                                  |
| e    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll b                                               |
| _b   | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll c                                               |
| _c   | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll c1                                              |
| _c1  | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll c1 + c2 + Mg\_DVP                               |
| _c1c | m^3 |                                                                  |
| 2    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll c2                                              |
| _c2  | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | HPLC Chlorophyll c3                                              |
| _c3  | m^3 |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chl\ | mg/ | Chlorophyll a derived via experiment                             |
| _exp | m^3 |                                                                  |
| erim |     |                                                                  |
| ent  |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chli | mg/ | HPLC Chlorophyllide a                                            |
| de\_ | m^3 |                                                                  |
| a    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| Chli | mg/ | HPLC Chlorophyllide b                                            |
| de\_ | m^3 |                                                                  |
| b    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| chor | non | CHORS HPLC processing identification number                      |
| s\_i | e   |                                                                  |
| d    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| clou | %   | Percent cloud cover                                              |
| d    |     |                                                                  |
+------+-----+------------------------------------------------------------------+
| cnw  | 1/m | Attenuation coefficient of Gelbstoff + particles (obsolete; see  |
|      |     | cgp)                                                             |
+------+-----+------------------------------------------------------------------+
