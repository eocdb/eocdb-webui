# OCDB Data Import Validation Rules

The OCDB database system applies data validation rules during data submission. Teh aim is to
ensure inter-operability. Please refer to for more information about the structure
of these rules. This chapter will list the current rules.

## Header

The header rules essentially check the existence of a header __field__. If a header __field__ is required and not 
present in the data submitted, an error is reported. An optional field raises an error only if the field does not contain 
data. The existence of an obsolete __field__ in the data will raise a warning in the data validation report.

### Required fields

* **investigators**: The contributors of the data file. Principal investigator is listed first, followed by any associate investigators.
* **affiliations**: A list of affiliations (e.g. university, laboratory) for each investigator.
* **contact**: An email address for one of the investigators or point of contact for the data file.
* **experiment**: The name of the over-arching, long-term research project or funding program.
* **cruise**: The name of the specific cruise (or subset of the experiment) where the data in the file were collected. 
* **north_latitude**: The farthest north data in the file were collected (in decimal degrees). This header field requires a 
[DEG] trailer. Latitudes south of the equator are negative.
* **south_latitude**: The farthest south data in the file were collected (in decimal degrees). This header fields requires a 
[DEG] trailer. Latitudes south of the equator are negative.
* **east_longitude**: The farthest east data in the file were collected (in decimal degrees). This header field requires a 
[DEG] trailer. Longitudes west of the Prime Meridian are negative.
* **west_longitude**: The farthest west data in the file were collected (in decimal degrees). This header fields requires a 
[DEG] trailer. Longitudes west of the Prime Meridian are negative.
* **start_date**: The earliest date data in the file were collected (in YYYYMMDD).
* **end_date**: The latest date data in the file were collected (in YYYYMMDD).
* **start_time**: The earliest time of day measurements were collected during the start_date in the file (in HH:MM:SS). 
Times are in Greenwich Mean Time. This header requires a [GMT] trailer.
* **end_time**: The latest time of day data data were collected during the end_date in the file (in HH:MM:SS). 
Times are in Greenwich Mean Time. This header requires a [GMT] trailer.
* **data_file_name**: The current name of the data file.
* **documents**: Refers to cruise reports, station logs, digital images, and other associated documentation that provide 
additional information about the experiment and cruise. Every OCDB submission must be accompanied by an instrumentation/calibration 
report that describes the instruments used, how they were calibrated and how data were collected and processed. Multiple documents 
must be supplied as comma-separated list. 
* **calibration_files**: Refers to supplementary files containing coefficients and techniques used to calibrate the 
instruments used in data collection.
* **data_type**: Describes the general collection method for the data. Accepted values include:
    * *cast* for vertical profiles (e.g. optical packages, CTD)
    * *flow_thru* for continuous data (e.g. shipboard, underway flow through systems)
    * *above_water* for above surface radiometry data (e.g. ASD, SIMBAD, Satlantic SAS)
    * *sunphoto* for sunphotometry data (e.g. MicroTops, PREDE)
    * *mooring* for moored and buoy data
    * *drifter* for drifter and drogue data
    * *scan* for discrete hyperspectral measurements
    * *lidar* for lidar and other active remote-sensing measurements (e.g. MPL)
    * *pigment* for laboratory measured pigment data (e.g. fluorometry, spectrophotometry, HPLC)
    * *bottle* for other types of measurements from water samples collected at discrete depths (e.g. nutrients)
    * *diver* for measurements made by a diver
    * *auv* for measurements made by an autonomous underwater vehicle (auv)
    * *airborne* for measurements made via an aircraft
* **missing**: Refers to the NULL value used as a numeric placeholder for any missing data in the data file.
* **delimiter**: Indicates how the columns of data are delimited. Accepted delimiters include *tab*, *space*, and *comma*. 
Only a single (1) delimiter is permitted per data file.
* **fields**: A list of the field names for each column of data included in the data file, separated by *delimiter*. 
Each entry describes the data in a single (1) column, and every column must have an entry.
* **units**: A list of the units for each column of data included in the data file, separated by *delimiter*.
* **water_depth**: The water (bottom) depth at the station where the data were collected (in meters). Set to *missing* if not known.

### Optional fields
* **station**: The name of the station or deployment where data in the file were obtained.
* **data_status**: The condition, or status, of the data file. The value *preliminary* is used when the data are new 
and the investigator intends to analyze the data further. The value *update* indicates the data are being resubmitted and 
informs users that an additional resubmission will occur in the future. The value *final* is used when the investigator 
has no intention of revisiting the data set.
* **secchi_depth**: The secchi depth at the station where the data were collected (in meters).
* **cloud_percent**: Percent cloud cover for the entire sky. For example: 0 indicates no clouds and 100 indicates completely overcast.
* **wave_height**: The wave height at the station where the data were collected (in meters).
* **wind_speed**: The wind speed at the station where the data were collected (in meters per second).

### Obsolete fields
* station_alt_id
* associated_archives
* associated_archive_types
* associated_files
* associated_file_types
* original_file_name
* parameters
* measurement_depth
* volfilt
* end_header@
* received
* identifier_product_doi
* below_detection_limit
* above_detection_limit
* optical_depth_warning
* area
* null_correction
* biotic_setting
* biotic_class
* biotic_subclass
* biotic_group
* biotic_comm_unit_y
* geoform_tectonic_setting
* geoform_physiographic_setting
* geoform_origin
* geoform
* geoform_type
* substrate_origin
* substrate_class
* substrate_subclass
* substrate_group
* substrate_subgroup
* water_column_biogeochemical_feature
* water_column_hydroform_class
* water_column_hydroform
* water_column_hydroform_type
* water_column_layer
* water_column_salinity
* water_column_temperature
* chemical_formula
* mass_to_charge

## Records

Each record is checked against the below rules. The majority of teh rules encompass
checks on valid __unit__s, __data type__, and bounds if defined.

- __name__: a, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: a*ph, __unit__: m^2/mg, __data type__: number, __lower bound__: -1e-05
- __name__: a*srfa, __unit__: m^2/mg, __data type__: number
- __name__: aaer, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: abs, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: abs_blank_ap, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: abs_blank_ad, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: abs_blank_ag, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: abs*, __unit__: m^2/mg, __data type__: number, __lower bound__: 0
- __name__: abs_ad, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: abs_ag, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: abs_ap, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: abs_nacl, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: abundance, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: ad, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: ad_unc, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: adg, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: ag, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: agp, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: asrfa, __unit__: 1/m, __data type__: number
- __name__: allo, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: alpha-beta-car, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: altitude, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: am, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: angstrom, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: anth, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: aot, __unit__: none, __data type__: number, __lower bound__: 0.005, __upper bound__: 2.0
- __name__: amc, __unit__: umol, __data type__: number
- __name__: amc-leu, __unit__: umol/l/hr, __data type__: number
- __name__: ap, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: ap_unc, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: aph, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: aph_unc, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: asta, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: at, __unit__: degreesC, __data type__: number, __lower bound__: 0
- __name__: aw, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: b, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: bb, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: bbp, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: bbp_bp, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: bbw, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: bchl_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: bactp, __unit__: pmol/L/hr, __data type__: number, __lower bound__: 0
- __name__: bact_abun, __unit__: cells/L, __data type__: number, __lower bound__: 0
- __name__: beta-beta-car, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: beta-epi-car, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: beta-psi-car, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: bin_depth, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: bincount, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: bp, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: bsi, __unit__: mmol/m^3, __data type__: number, __lower bound__: 0
- __name__: but-fuco, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: bw, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: c, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: c2h3n_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: c2h4o_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: c2h6s_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: c3h6o_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: c5h8_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: c6h6_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: cantha, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: cdmf, __unit__: volts,ppb, __data type__: number, __lower bound__: 0
- __name__: cdom, __unit__: mg/m^3,ug/l,ppb, __data type__: number, __lower bound__: 0
- __name__: cg, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: cgp, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: ch4o_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: ch4s_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: chl, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0, __upper bound__: 100
- __name__: chl_ex, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0, __upper bound__: 100
- __name__: chl_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0, __upper bound__: 100
- __name__: chl_a_allom, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chl_a_prime, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chl_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chl_c, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chl_c1, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chl_c1c2, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chl_c2, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chl_c3, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chlide_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: chlide_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: cloud, __unit__: %, __data type__: number, __lower bound__: 0
- __name__: cnw, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: cond, __unit__: mmho/cm, __data type__: number, __lower bound__: 0
- __name__: cp, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: cp_gamma, __unit__: none, __data type__: number
- __name__: croco, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: cw, __unit__: 1/m, __data type__: number, __lower bound__: 0
- __name__: cycle, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: day, __unit__: dd, __data type__: number, __lower bound__: 1
- __name__: depth, __unit__: m,meters, __data type__: number, __lower bound__: 0
- __name__: dewpoint, __unit__: degreesC, __data type__: number
- __name__: diadchr, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: diadino, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: diato, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: dic, __unit__: umol/kg, __data type__: number, __lower bound__: 0
- __name__: dino, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: dmsa, __unit__: ppt, __data type__: number
- __name__: dmssw, __unit__: nmol/l, __data type__: number, __lower bound__: 0
- __name__: dna, __unit__: mg/m^3, __data type__: number, __lower bound__: 0
- __name__: doc, __unit__: umol/kg, __data type__: number, __lower bound__: 0
- __name__: dp, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: dv_chl_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: dv_chl_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: echin, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: ed, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number, __lower bound__: -0.001, __upper bound__: 250.0
- __name__: edgnd, __unit__: volts, __data type__: number
- __name__: edpitch, __unit__: degrees, __data type__: number
- __name__: edroll, __unit__: degrees, __data type__: number
- __name__: elapsed_time, __unit__: seconds, __data type__: number, __lower bound__: 0
- __name__: elw, __unit__: uW/cm^2, __data type__: number, __lower bound__: 0
- __name__: epar, __unit__: uE/cm^2/s, __data type__: number, __lower bound__: 0
- __name__: epi-epi-car, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: es, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number, __lower bound__: -0.001, __upper bound__: 250.0
- __name__: esgnd, __unit__: volts, __data type__: number
- __name__: esky, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number
- __name__: espitch, __unit__: degrees, __data type__: number
- __name__: esroll, __unit__: degrees, __data type__: number
- __name__: esun, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number
- __name__: esw, __unit__: uW/cm^2, __data type__: number
- __name__: et-8-carot, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: et-chlide_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: et-chlide_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: eu, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number, __lower bound__: 0
- __name__: eugnd, __unit__: volts, __data type__: number
- __name__: eupar, __unit__: uE/cm^2/s, __data type__: number, __lower bound__: 0
- __name__: f0, __unit__: uW/cm^2/nm, __data type__: number, __lower bound__: 0
- __name__: f-initial, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: fm, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: fv_fm, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: fuco, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: g, __unit__: d-1,1/d,d^-1, __data type__: number
- __name__: g_herb, __unit__: d-1,1/d,d^-1, __data type__: number
- __name__: gyro, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: heading, __unit__: degrees, __data type__: number, __lower bound__: 0, __upper bound__: 360.0
- __name__: hex-fuco, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: hex-kfuco, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: hour, __unit__: hh, __data type__: number, __lower bound__: 0, __upper bound__: 23
- __name__: it, __unit__: degreesC, __data type__: number, __lower bound__: 0
- __name__: iso_c2h3n_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: iso_c2h4o_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: iso_c2h6s_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: iso_c3h6o_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: iso_ch4o_h, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: jd, __unit__: jjj, __data type__: number, __lower bound__: 1, __upper bound__: 366
- __name__: kd, __unit__: 1/m,m-1, __data type__: number, __lower bound__: 0
- __name__: kl, __unit__: 1/m,m-1, __data type__: number, __lower bound__: 0
- __name__: knf, __unit__: 1/m,m-1, __data type__: number, __lower bound__: 0
- __name__: kpar, __unit__: 1/m,m-1, __data type__: number, __lower bound__: 0
- __name__: ku, __unit__: 1/m,m-1, __data type__: number, __lower bound__: 0
- __name__: lat, __unit__: degrees, __data type__: number, __lower bound__: -90.0, __upper bound__: 90.0
- __name__: lightlevel, __unit__: %, __data type__: number
- __name__: lon, __unit__: degrees, __data type__: number, __lower bound__: -180.0, __upper bound__: 180.0
- __name__: lsi, __unit__: mmol/m^3, __data type__: number, __lower bound__: 0
- __name__: lsky, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number, __lower bound__: 0
- __name__: lt, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number
- __name__: lu, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number, __lower bound__: -0.001, __upper bound__: 5.0
- __name__: lugnd, __unit__: volts, __data type__: number
- __name__: lut, __unit__: mg/m^3,ug/l, __data type__: number
- __name__: lw, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number, __lower bound__: -0.001, __upper bound__: 5.0
- __name__: lwn, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number, __lower bound__: -0.001
- __name__: lwnex, __unit__: uW/cm^2/nm,uWcm-2nm-1, __data type__: number, __lower bound__: -0.001
- __name__: lyco, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: me-chlinde_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: me-chlinde_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: mg_dvp, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: minute, __unit__: mn, __data type__: number, __lower bound__: 0, __upper bound__: 60
- __name__: monado, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: month, __unit__: mo, __data type__: number, __lower bound__: 1, __upper bound__: 12
- __name__: mpf, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: muf, __unit__: umol, __data type__: number
- __name__: muf-but, __unit__: umol/l/hr, __data type__: number
- __name__: muf-glu, __unit__: umol/l/hr, __data type__: number
- __name__: muf-po4, __unit__: umol/l/hr, __data type__: number
- __name__: mv_chl_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: mv_chl_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: mz, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: n2_fix, __unit__: ug/m^3/d, __data type__: number, __lower bound__: 0
- __name__: nadir, __unit__: degrees, __data type__: number
- __name__: nanoeukaryote_abun, __unit__: cell/l, __data type__: number
- __name__: nanoeukaryote_biovol, __unit__: m^3/l, __data type__: number
- __name__: nanoeukaryote_ug/l, __unit__: m^3/l, __data type__: number
- __name__: natf, __unit__: nE/m^2/sr/s, __data type__: number, __lower bound__: 0
- __name__: neo, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: nccb, __unit__: nmol/m^2/hr, __data type__: number, __lower bound__: 0
- __name__: ncpb, __unit__: nmol/m^2/hr, __data type__: number, __lower bound__: 0
- __name__: nh4, __unit__: nmol/m^3, __data type__: number, __lower bound__: 0
- __name__: no2, __unit__: nmol/m^3, __data type__: number, __lower bound__: 0
- __name__: no2_no3, __unit__: nmol/m^3, __data type__: number, __lower bound__: 0
- __name__: no3, __unit__: nmol/m^3, __data type__: number, __lower bound__: 0
- __name__: npf, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: npp, __unit__: mg/m^3/d,ug/l/d, __data type__: number, __lower bound__: 0
- __name__: nrb, __unit__: photoelectrons/usec/shot, __data type__: number, __lower bound__: 0
- __name__: oxygen, __unit__: ml/L, __data type__: number, __lower bound__: 0
- __name__: oxygen_saturation, __unit__: %, __data type__: number, __lower bound__: 0
- __name__: oz, __unit__: dobson, __data type__: number, __lower bound__: 0
- __name__: p-457, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: par, __unit__: uE/cm^2/s, __data type__: number, __lower bound__: 0
- __name__: pc, __unit__: mg/m^3, __data type__: number, __lower bound__: 0
- __name__: pco2, __unit__: uatm, __data type__: number, __lower bound__: 0
- __name__: perid, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: pdrift, __unit__: mbar, __data type__: number, __lower bound__: 0
- __name__: ph, __unit__: none, __data type__: number, __lower bound__: 0, __upper bound__: 14
- __name__: phaeo, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: phide_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: phide_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: phide_c, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: phytin_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: phytin_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: phytin_c, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: phytyl-chl_c, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: phyto_carbon, __unit__: ug/l, __data type__: number, __lower bound__: 0
- __name__: pic, __unit__: mol/m^3, __data type__: number, __lower bound__: 0
- __name__: pim, __unit__: mg/l, __data type__: number
- __name__: picoeukaryote_abun, __unit__: cell/l, __data type__: number
- __name__: picoeukaryote_biovol, __unit__: m^3/l, __data type__: number
- __name__: picoeukaryote_carbon, __unit__: ug/l, __data type__: number
- __name__: pitch, __unit__: degrees, __data type__: number
- __name__: pn, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: po4, __unit__: nmol/m^3, __data type__: number, __lower bound__: 0
- __name__: poc, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: pom, __unit__: mg/l, __data type__: number
- __name__: pon, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: pp, __unit__: mgC/mgchla/hr, __data type__: number, __lower bound__: 0
- __name__: ppc, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: ppc_tcar, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: ppc_tpg, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: ppf, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: pras, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: pressure, __unit__: dbar, __data type__: number, __lower bound__: 0
- __name__: pressure_atm, __unit__: mbar, __data type__: number, __lower bound__: 0
- __name__: prochlorococcus_abun, __unit__: cell/l, __data type__: number
- __name__: prochlorococcus_biovol, __unit__: m^3/l, __data type__: number
- __name__: prochlorococcus_carbon, __unit__: ug/l, __data type__: number
- __name__: psc, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: psc_tcar, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: psd, __unit__: ul/l, __data type__: number, __lower bound__: 0
- __name__: psp, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: psp_tpg, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: pulse_width, __unit__: seconds, __data type__: number, __lower bound__: 0
- __name__: pvel, __unit__: m/s, __data type__: number, __lower bound__: 0
- __name__: pyrophide_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: pyrophytin_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: pyrophytin_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: pyrophytin_c, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: q, __unit__: sr, __data type__: number, __lower bound__: 0
- __name__: qc, __unit__: none, __data type__: number
- __name__: *_qc, __unit__: none, __data type__: number
- __name__: r, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: relabundance, __unit__: %, __data type__: number
- __name__: relaz, __unit__: degrees, __data type__: number
- __name__: rf, __unit__: uW/cm^2/nm/sr, __data type__: number, __lower bound__: 0
- __name__: rl, __unit__: 1/sr, __data type__: number, __lower bound__: 0
- __name__: roll, __unit__: degrees, __data type__: number
- __name__: rpi, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: rrs, __unit__: 1/sr,sr^-1, __data type__: number, __lower bound__: 0
- __name__: rtilt, __unit__: degrees, __data type__: number
- __name__: s_ad, __unit__: Slope, __data type__: number, __lower bound__: 0
- __name__: s_ag, __unit__: Slope, __data type__: number, __lower bound__: 0
- __name__: sal, __unit__: PSU, __data type__: number, __lower bound__: 0
- __name__: saz, __unit__: degrees, __data type__: number, __lower bound__: 0
- __name__: sdy, __unit__: ddd, __data type__: number, __lower bound__: 0
- __name__: second, __unit__: ss, __data type__: number, __lower bound__: 0, __upper bound__: 59
- __name__: senz, __unit__: degrees, __data type__: number, __lower bound__: 0
- __name__: sig, __unit__: mV, __data type__: number
- __name__: sigma_psii, __unit__: angstrom^2, __data type__: number, __lower bound__: 0
- __name__: sigma_theta, __unit__: kg/m^3, __data type__: number, __lower bound__: 0
- __name__: sigmat, __unit__: kg/m^3, __data type__: number, __lower bound__: 0
- __name__: sio4, __unit__: mmol/m^3, __data type__: number, __lower bound__: 0
- __name__: siphn, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: siphx, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: speed_f_w, __unit__: m/s, __data type__: number
- __name__: spm, __unit__: mg/L, __data type__: number, __lower bound__: 0
- __name__: sst, __unit__: degreesC, __data type__: number
- __name__: stimf, __unit__: volts, __data type__: number, __lower bound__: 0
- __name__: synechococcus_abun, __unit__: cell/l, __data type__: number
- __name__: synechococcus_biovol, __unit__: m^3/l, __data type__: number
- __name__: synechococcus_carbon, __unit__: ug/l, __data type__: number
- __name__: sz, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: sza, __unit__: degrees, __data type__: number, __lower bound__: 0
- __name__: tacc, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: tacc_tchla, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: tcar, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: tchl, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: tchl_tcar, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: tchla_tpg, __unit__: none, __data type__: number, __lower bound__: 0
- __name__: tdn, __unit__: mmol/m^3, __data type__: number, __lower bound__: 0
- __name__: tdrift, __unit__: degreesC, __data type__: number, __lower bound__: 0
- __name__: tilt, __unit__: degrees, __data type__: number
- __name__: time, __unit__: hh:mm:ss, __data type__: time
- __name__: time_processed, __unit__: hh:mm:ss, __data type__: time
- __name__: tot_chl_a, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: tot_chl_b, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: tot_chl_c, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: tpg, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: trans, __unit__: %, __data type__: number, __lower bound__: 0
- __name__: turbidity, __unit__: NTU, __data type__: number
- __name__: u, __unit__: d-1,1/d,d^-1, __data type__: number
- __name__: u_ph, __unit__: d-1,1/d,d^-1, __data type__: number
- __name__: u_zoo, __unit__: d-1,1/d,d^-1, __data type__: number
- __name__: urea, __unit__: mmol/m^3, __data type__: number, __lower bound__: 0
- __name__: vauch, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: velnorth, __unit__: m/s, __data type__: number
- __name__: veleast, __unit__: m/s, __data type__: number
- __name__: velup, __unit__: m/s, __data type__: number
- __name__: viola, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0
- __name__: vocair, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: vocair, __unit__: ppbv, __data type__: number, __lower bound__: 0
- __name__: volfilt, __unit__: L, __data type__: number, __lower bound__: 0
- __name__: vsf, __unit__: 1/m/sr, __data type__: number, __lower bound__: 0
- __name__: vsfg, __unit__: 1/m/sr, __data type__: number, __lower bound__: 0
- __name__: vsfp, __unit__: 1/m/sr, __data type__: number, __lower bound__: 0
- __name__: vsfw, __unit__: 1/m/sr, __data type__: number, __lower bound__: 0
- __name__: vsf_angle, __unit__: degrees, __data type__: number, __lower bound__: 0
- __name__: water_depth, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: waveht, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: wavelength, __unit__: nm, __data type__: number, __lower bound__: 0
- __name__: wdir, __unit__: degrees, __data type__: number, __lower bound__: 0, __upper bound__: 360
- __name__: wind, __unit__: m/s, __data type__: number, __lower bound__: 0
- __name__: wt, __unit__: degreesC, __data type__: number, __lower bound__: -4, __upper bound__: 40
- __name__: wvp, __unit__: cm, __data type__: number, __lower bound__: 0
- __name__: year, __unit__: yyyy, __data type__: number, __lower bound__: 1975, __upper bound__: 2019
- __name__: z_90, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: z_dcm, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: z_eu, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: z_mld, __unit__: m, __data type__: number, __lower bound__: 0
- __name__: zea, __unit__: mg/m^3,ug/l, __data type__: number, __lower bound__: 0

## Field suffixes

```eval_rst

.. csv-table:: field Suffixes
   :widths: 15 40 20
   :header-rows: 1
   :file: ocdb-suffixes.csv
```

## Field Modifiers

```eval_rst

.. csv-table:: The contents of 
   :widths: 15 40 20
   :header-rows: 1
   :file: ocdb-modifiers.csv
```

## Fields


```eval_rst

.. csv-table:: The contents of 
   :widths: 15 40 20
   :header-rows: 1
   :file: ocdb_fields.csv
```

