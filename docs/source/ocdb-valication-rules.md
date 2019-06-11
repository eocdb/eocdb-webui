# OCDB Data Import Validation Rules

The OCDB database system applied validation rules on data submission. These rules are based on
the NASA Seabass rules, but can have differences. The rules apply on the header (meta data) if
a Seabass file as well as on records.

### Header

The header rules essentially check the existence of a header __field__. If a header __field__ is required
an error is reported. An optional or obsolete __field__ is tagged with a warning in the data validation report.

- __field__: investigators: field_required
- __field__: affiliations: field_required
- __field__: contact: field_required
- __field__: experiment: field_required
- __field__: cruise: field_required
- __field__: station: field_optional
- __field__: north_latitude: field_required
- __field__: south_latitude: field_required
- __field__: east_longitude: field_required
- __field__: west_longitude: field_required
- __field__: start_date: field_required
- __field__: end_date: field_required
- __field__: start_time: field_required
- __field__: end_time: field_required
- __field__: station_alt_id: field_obsolete
- __field__: data_file_name: field_required
- __field__: associated_archives: field_obsolete
- __field__: associated_archive_types: field_obsolete
- __field__: associated_files: field_obsolete
- __field__: associated_file_types: field_obsolete
- __field__: original_file_name: field_obsolete
- __field__: documents: field_required
- __field__: calibration_files: field_required
- __field__: data_type: field_required
- __field__: missing: field_required
- __field__: delimiter: field_required
- __field__: fields: field_required
- __field__: __unit__s: field_required
- __field__: data_status: field_optional
- __field__: parameters: field_obsolete
- __field__: water_depth: field_required
- __field__: measurement_depth: field_obsolete
- __field__: secchi_depth: field_optional
- __field__: cloud_percent: field_optional
- __field__: wave_height: field_optional
- __field__: wind_speed: field_optional
- __field__: volfilt: field_obsolete
- __field__: begin_header: field_obsolete
- __field__: end_header: field_obsolete
- __field__: end_header@: field_obsolete
- __field__: received: field_obsolete
- __field__: identifier_product_doi: field_obsolete
- __field__: below_detection_limit: field_obsolete
- __field__: above_detection_limit: field_obsolete
- __field__: optical_depth_warning: field_obsolete
- __field__: area: field_obsolete
- __field__: null_correction: field_obsolete
- __field__: biotic_setting: field_obsolete
- __field__: biotic_class: field_obsolete
- __field__: biotic_subclass: field_obsolete
- __field__: biotic_group: field_obsolete
- __field__: biotic_comm__unit__y: field_obsolete
- __field__: geoform_tectonic_setting: field_obsolete
- __field__: geoform_physiographic_setting: field_obsolete
- __field__: geoform_origin: field_obsolete
- __field__: geoform: field_obsolete
- __field__: geoform_type: field_obsolete
- __field__: substrate_origin: field_obsolete
- __field__: substrate_class: field_obsolete
- __field__: substrate_subclass: field_obsolete
- __field__: substrate_group: field_obsolete
- __field__: substrate_subgroup: field_obsolete
- __field__: water_column_biogeochemical_feature: field_obsolete
- __field__: water_column_hydroform_class: field_obsolete
- __field__: water_column_hydroform: field_obsolete
- __field__: water_column_hydroform_type: field_obsolete
s- __field__: water_column_layer: field_obsolete
- __field__: water_column_salinity: field_obsolete
- __field__: water_column_temperature: field_obsolete
- __field__: chemical_formula: field_obsolete
- __field__: mass_to_charge: field_obsolete

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
+------------+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------+----------------+
+Field Suffix+Units                     +Description                                                                                                                                                                                                         +FIELD4                      +FIELD5          +
+============+==========================+====================================================================================================================================================================================================================+============================+================+
+_abun       +cell/L                    +cell abundance for a particular (phytoplankton) taxonomic type                                                                                                                                                      +                            +                +
+------------+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------+----------------+
+_biovol     +m^3/L                     +bio-volume for a particular (phytoplankton) taxonomic type                                                                                                                                                          +                            +                +
+------------+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------+----------------+
+_carbon     +ug/L                      +carbon concentration for a particular (phytoplankton) taxonomic type                                                                                                                                                +                            +                +
+------------+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------+----------------+
+_bincount   +none                      +Number of records averaged into a bin or reported measurement specific to the prefix that _bincount is attached to. The field "bincount" can simply be used if the bincount applies to all forms of data in the file+ but this field suffix (i.e.+<field>_bincount+
+------------+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------+----------------+
+_cv         +unitless                  +Coefficient of Variation. Append "_cv" to the end of the field name it describes e.g.                                                                                                                               + bb532_cv                   +                +
+------------+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------+----------------+
+_sd         +same as base field's units+Standard Deviation. Append "_sd" to the end of the field name it describes e.g.                                                                                                                                     + chl_sd                     +                +
+------------+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------+----------------+
+_se         +same as base field's units+Standard Error. Append "_se" to the end of the field name it describes                                                                                                                                              + e.g.                       + chl_se         +
+------------+--------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------------+----------------+
```

## Field Modifiers

```eval_rst

.. csv-table:: The contents of 
   :widths: 15 40 20
   :header: "Field Suffix","Units","Description"
   
   _abun,cell/L,cell abundance for a particular (phytoplankton) taxonomic type

```

## Fields

```eval_rst

.. csv-table:: The contents of 
   :widths: 15 40 20
   :header: "Field Suffix","Units","Description"
   :file: ocdb_fields.csv
```
