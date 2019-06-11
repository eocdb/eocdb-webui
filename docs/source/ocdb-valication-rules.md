# OCDB Data Import Validation Rules

The OCDB database system applies data validation rules during data submission. Teh aim is to
ensure inter-operability. Please refer to for more information about the structure
of these rules. This chapter will list the current rules.

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

## Raw list of Validation rules

```json
{
  "header": [
    {
      "name": "investigators",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "affiliations",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "contact",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "experiment",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "cruise",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "station",
      "type": "field_optional",
      "warning": "@field_value_missing"
    },
    {
      "name": "north_latitude",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "south_latitude",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "east_longitude",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "west_longitude",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "start_date",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "end_date",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "start_time",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "end_time",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "station_alt_id",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "data_file_name",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "associated_archives",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "associated_archive_types",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "associated_files",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "associated_file_types",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "original_file_name",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "documents",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "calibration_files",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "data_type",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "missing",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "delimiter",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "fields",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "units",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "data_status",
      "type": "field_optional",
      "warning": "@field_value_missing"
    },
    {
      "name": "parameters",
      "type": "field_obsolete",
      "warning": "Header /parameters is no longer required, just use /fields."
    },
    {
      "name": "water_depth",
      "type": "field_required",
      "error": "@required_field_missing"
    },
    {
      "name": "measurement_depth",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "secchi_depth",
      "type": "field_optional",
      "warning": "@field_value_missing"
    },
    {
      "name": "cloud_percent",
      "type": "field_optional",
      "warning": "@field_value_missing"
    },
    {
      "name": "wave_height",
      "type": "field_optional",
      "warning": "@field_value_missing"
    },
    {
      "name": "wind_speed",
      "type": "field_optional",
      "warning": "@field_value_missing"
    },
    {
      "name": "volfilt",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "begin_header",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "end_header",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "end_header@",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "received",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "identifier_product_doi",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "below_detection_limit",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "above_detection_limit",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "optical_depth_warning",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "area",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "null_correction",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "biotic_setting",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "biotic_class",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "biotic_subclass",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "biotic_group",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "biotic_community",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "geoform_tectonic_setting",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "geoform_physiographic_setting",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "geoform_origin",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "geoform",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "geoform_type",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "substrate_origin",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "substrate_class",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "substrate_subclass",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "substrate_group",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "substrate_subgroup",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "water_column_biogeochemical_feature",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "water_column_hydroform_class",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "water_column_hydroform",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "water_column_hydroform_type",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "water_column_layer",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "water_column_salinity",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "water_column_temperature",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "chemical_formula",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "name": "mass_to_charge",
      "type": "field_obsolete",
      "warning": "@obsolete_field"
    },
    {
      "type": "field_compare",
      "reference": "north_latitude",
      "compare": "south_latitude",
      "operation": ">=",
      "data_type": "number",
      "error": "@south_north_mismatch"
    },
    {
      "type": "field_compare",
      "reference": "east_longitude",
      "compare": "west_longitude",
      "operation": ">=",
      "data_type": "number",
      "warning": "@crossing_date_line"
    },
    {
      "type": "field_compare",
      "reference": "start_date",
      "compare": "end_date",
      "operation": "<=",
      "data_type": "date",
      "error": "@header_start_after_finish"
    },
    {
      "type": "field_compare",
      "reference": "experiment",
      "compare": "cruise",
      "operation": "!=",
      "data_type": "string",
      "error": "@cruise_same_as_experiment"
    }
  ],
  "record": [
    {
      "name": "a",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "a*ph",
      "unit": "m^2/mg",
      "lower_bound": -0.00001,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "a*srfa",
      "unit": "m^2/mg",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "aaer",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs_blank_ap",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs_blank_ad",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs_blank_ag",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs*",
      "unit": "m^2/mg",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs_ad",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs_ag",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs_ap",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abs_nacl",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "abundance",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ad",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ad_unc",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "adg",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ag",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "agp",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "asrfa",
      "unit": "1/m",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "allo",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "alpha-beta-car",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "altitude",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "am",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "angstrom",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "anth",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "aot",
      "unit": "none",
      "lower_bound": 0.005,
      "upper_bound": 2.0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "amc",
      "unit": "umol",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "amc-leu",
      "unit": "umol/l/hr",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ap",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ap_unc",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "aph",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "aph_unc",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "associated_files",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "associated_file_types",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "asta",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "at",
      "unit": "degreesC",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "aw",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "b",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bb",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bbp",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bbp_bp",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bbw",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bchl_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bactp",
      "unit": "pmol/L/hr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bact_abun",
      "unit": "cells/L",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "benthic_type",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "beta-beta-car",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "beta-epi-car",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "beta-psi-car",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bin_depth",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bincount",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bottle",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "bp",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bsi",
      "unit": "mmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "but-fuco",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "bw",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "c",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "c2h3n_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "c2h4o_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "c2h6s_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "c3h6o_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "c5h8_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "c6h6_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cantha",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cdmf",
      "unit": "volts,ppb",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cdom",
      "unit": "mg/m^3,ug/l,ppb",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cg",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cgp",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ch4o_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ch4s_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "upper_bound": 100,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_ex",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "upper_bound": 100,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "upper_bound": 100,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_a_allom",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_a_prime",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_c",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_c1",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_c1c2",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_c2",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chl_c3",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chlide_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chlide_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "chors_id",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "cloud",
      "unit": "%",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cnw",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "comment",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "cond",
      "unit": "mmho/cm",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cp",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cp_gamma",
      "unit": "none",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "croco",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cw",
      "unit": "1/m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "cycle",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "date",
      "min_year": 1975,
      "data_type": "date"
    },
    {
      "name": "date_processed",
      "min_year": 1975,
      "data_type": "date"
    },
    {
      "name": "day",
      "unit": "dd",
      "lower_bound": 1,
      "opper_bound": 31,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "depth",
      "unit": "m,meters",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dewpoint",
      "unit": "degreesC",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "diadchr",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "diadino",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "diato",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dic",
      "unit": "umol/kg",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dino",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dmsa",
      "unit": "ppt",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dmssw",
      "unit": "nmol/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dna",
      "unit": "mg/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "doc",
      "unit": "umol/kg",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dp",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dv_chl_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "dv_chl_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "echin",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ed",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "lower_bound": -0.001,
      "upper_bound": 250.0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "edgnd",
      "unit": "volts",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "edpitch",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "edroll",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "elapsed_time",
      "unit": "seconds",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "elw",
      "unit": "uW/cm^2",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "epar",
      "unit": "uE/cm^2/s",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "epi-epi-car",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "es",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "lower_bound": -0.001,
      "upper_bound": 250.0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "esgnd",
      "unit": "volts",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "esky",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "espitch",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "esroll",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "esun",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "esw",
      "unit": "uW/cm^2",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "et-8-carot",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "et-chlide_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "et-chlide_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "eu",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "eugnd",
      "unit": "volts",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "eupar",
      "unit": "uE/cm^2/s",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "f0",
      "unit": "uW/cm^2/nm",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "f-initial",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "fm",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "fv_fm",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "fuco",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "g",
      "unit": "d-1,1/d,d^-1",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "g_herb",
      "unit": "d-1,1/d,d^-1",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "gyro",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "heading",
      "unit": "degrees",
      "lower_bound": 0,
      "upper_bound": 360.0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "hex-fuco",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "hex-kfuco",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "hour",
      "unit": "hh",
      "lower_bound": 0,
      "upper_bound": 23,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "hpl_id",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "hplc_gsfc_id",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "it",
      "unit": "degreesC",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "iso_c2h3n_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "iso_c2h4o_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "iso_c2h6s_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "iso_c3h6o_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "iso_ch4o_h",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "jd",
      "unit": "jjj",
      "lower_bound": 1,
      "upper_bound": 366,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "kd",
      "unit": "1/m,m-1",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "kl",
      "unit": "1/m,m-1",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "knf",
      "unit": "1/m,m-1",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "kpar",
      "unit": "1/m,m-1",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ku",
      "unit": "1/m,m-1",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lat",
      "unit": "degrees",
      "lower_bound": -90.0,
      "upper_bound": 90.0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lightlevel",
      "unit": "%",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lon",
      "unit": "degrees",
      "lower_bound": -180.0,
      "upper_bound": 180.0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lsi",
      "unit": "mmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lsky",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lt",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lu",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "lower_bound": -0.001,
      "upper_bound": 5.0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lugnd",
      "unit": "volts",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lut",
      "unit": "mg/m^3,ug/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lw",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "lower_bound": -0.001,
      "upper_bound": 5.0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lwn",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "lower_bound": -0.001,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lwnex",
      "unit": "uW/cm^2/nm,uWcm-2nm-1",
      "lower_bound": -0.001,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "lyco",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "me-chlinde_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "me-chlinde_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "mg_dvp",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "minute",
      "unit": "mn",
      "lower_bound": 0,
      "upper_bound": 60,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "monado",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "month",
      "unit": "mo",
      "lower_bound": 1,
      "upper_bound": 12,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "mpf",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "muf",
      "unit": "umol",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "muf-but",
      "unit": "umol/l/hr",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "muf-glu",
      "unit": "umol/l/hr",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "muf-po4",
      "unit": "umol/l/hr",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "mv_chl_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "mv_chl_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "mz",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "n2_fix",
      "unit": "ug/m^3/d",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "nadir",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "nanoeukaryote_abun",
      "unit": "cell/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "nanoeukaryote_biovol",
      "unit": "m^3/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "nanoeukaryote_ug/l",
      "unit": "m^3/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "natf",
      "unit": "nE/m^2/sr/s",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "neo",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "nccb",
      "unit": "nmol/m^2/hr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ncpb",
      "unit": "nmol/m^2/hr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "nh4",
      "unit": "nmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "no2",
      "unit": "nmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "no2_no3",
      "unit": "nmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "no3",
      "unit": "nmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "npf",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "npp",
      "unit": "mg/m^3/d,ug/l/d",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "nrb",
      "unit": "photoelectrons/usec/shot",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "oxygen",
      "unit": "ml/L",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "oxygen_saturation",
      "unit": "%",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "oz",
      "unit": "dobson",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "p-457",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "par",
      "unit": "uE/cm^2/s",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pc",
      "unit": "mg/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pco2",
      "unit": "uatm",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "perid",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pdrift",
      "unit": "mbar",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ph",
      "unit": "none",
      "lower_bound": 0,
      "upper_bound": 14,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phaeo",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phide_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phide_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phide_c",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phytin_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phytin_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phytin_c",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phytyl-chl_c",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "phyto_carbon",
      "unit": "ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pic",
      "unit": "mol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pim",
      "unit": "mg/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "picoeukaryote_abun",
      "unit": "cell/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "picoeukaryote_biovol",
      "unit": "m^3/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "picoeukaryote_carbon",
      "unit": "ug/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pitch",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pn",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "po4",
      "unit": "nmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "poc",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pom",
      "unit": "mg/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pon",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pp",
      "unit": "mgC/mgchla/hr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ppc",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ppc_tcar",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ppc_tpg",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "ppf",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pras",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pressure",
      "unit": "dbar",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pressure_atm",
      "unit": "mbar",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "prochlorococcus_abun",
      "unit": "cell/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "prochlorococcus_biovol",
      "unit": "m^3/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "prochlorococcus_carbon",
      "unit": "ug/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "psc",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "psc_tcar",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "psd",
      "unit": "ul/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "psp",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "psp_tpg",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pulse_width",
      "unit": "seconds",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pvel",
      "unit": "m/s",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pyrophide_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pyrophytin_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pyrophytin_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "pyrophytin_c",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "q",
      "unit": "sr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "quality",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "qc",
      "unit": "none",
      "data_type": "number",
      "error": "@field_is_empty"
    },
    {
      "name": "*_qc",
      "unit": "none",
      "data_type": "number",
      "error": "@field_is_empty"
    },
    {
      "name": "r",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "relabundance",
      "unit": "%",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "relaz",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "rf",
      "unit": "uW/cm^2/nm/sr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "rl",
      "unit": "1/sr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "roll",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "rpi",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "rrs",
      "unit": "1/sr,sr^-1",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "rtilt",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "s_ad",
      "unit": "Slope",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "s_ag",
      "unit": "Slope",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sal",
      "unit": "PSU",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sample",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "saz",
      "unit": "degrees",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sdy",
      "unit": "ddd",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "second",
      "unit": "ss",
      "lower_bound": 0,
      "upper_bound": 59,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "senz",
      "unit": "degrees",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sig",
      "unit": "mV",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sigma_psii",
      "unit": "angstrom^2",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sigma_theta",
      "unit": "kg/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sigmat",
      "unit": "kg/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sio4",
      "unit": "mmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "siphn",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "siphx",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sn",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "species",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "speed_f_w",
      "unit": "m/s",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "spm",
      "unit": "mg/L",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sst",
      "unit": "degreesC",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "station",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "station_alt_id",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "stimf",
      "unit": "volts",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "synechococcus_abun",
      "unit": "cell/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "synechococcus_biovol",
      "unit": "m^3/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "synechococcus_carbon",
      "unit": "ug/l",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sz",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "sza",
      "unit": "degrees",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tacc",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tacc_tchla",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "taxa_1",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "taxa_2",
      "data_type": "string",
      "error": "@field_is_empty"
    },
    {
      "name": "tcar",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tchl",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tchl_tcar",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tchla_tpg",
      "unit": "none",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tdn",
      "unit": "mmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tdrift",
      "unit": "degreesC",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tilt",
      "unit": "degrees",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "time",
      "unit": "hh:mm:ss",
      "data_type": "time",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "time_processed",
      "unit": "hh:mm:ss",
      "data_type": "time",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tot_chl_a",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tot_chl_b",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tot_chl_c",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "tpg",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "trans",
      "unit": "%",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "turbidity",
      "unit": "NTU",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "u",
      "unit": "d-1,1/d,d^-1",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "u_ph",
      "unit": "d-1,1/d,d^-1",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "u_zoo",
      "unit": "d-1,1/d,d^-1",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "urea",
      "unit": "mmol/m^3",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "vauch",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "velnorth",
      "unit": "m/s",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "veleast",
      "unit": "m/s",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "velup",
      "unit": "m/s",
      "data_type": "number",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "viola",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "vocair",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "vocair",
      "unit": "ppbv",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "volfilt",
      "unit": "L",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "vsf",
      "unit": "1/m/sr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "vsfg",
      "unit": "1/m/sr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "vsfp",
      "unit": "1/m/sr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "vsfw",
      "unit": "1/m/sr",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "vsf_angle",
      "unit": "degrees",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "water_depth",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "waveht",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "wavelength",
      "unit": "nm",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "wdir",
      "unit": "degrees",
      "lower_bound": 0,
      "upper_bound": 360,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "wind",
      "unit": "m/s",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "wt",
      "unit": "degreesC",
      "lower_bound": -4,
      "upper_bound": 40,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "wvp",
      "unit": "cm",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "year",
      "unit": "yyyy",
      "lower_bound": 1975,
      "upper_bound": 2019,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "z_90",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "z_dcm",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "z_eu",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "z_mld",
      "unit": "m",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    },
    {
      "name": "zea",
      "unit": "mg/m^3,ug/l",
      "lower_bound": 0,
      "data_type": "number",
      "value_error": "@field_out_of_bounds",
      "unit_error": "@field_has_wrong_unit"
    }
  ],
  "errors": [
    {
      "name": "south_north_mismatch",
      "message": "South_latitude is larger than north_latitude"
    },
    {
      "name": "header_start_after_finish",
      "message": "Header error: start date/time ({ref_val}) must occur before end date/time ({comp_val})"
    },
    {
      "name": "required_field_missing",
      "message": "The required header field /{reference} is not present"
    },
    {
      "name": "cruise_same_as_experiment",
      "message": "Header /cruise should not be the same as /experiment, please make /cruise a 'subset' of /experiment."
    },
    {
      "name": "field_has_wrong_unit",
      "message": "The units of '{field_name}', should be '{unit}', not '{bad_unit}'."
    },
    {
      "name": "field_out_of_bounds",
      "message": "Measurement #{line}: The '{field_name}' field has value ({value}) outside expected range [{lower_bound} - {upper_bound}]."
    },
    {
      "name": "field_number_not_a_number",
      "message": "Measurement #{line}: The '{field_name}' field has value ({value}) which does not evaluate to a number."
    },
    {
      "name": "field_is_empty",
      "message": "Measurement #{line}: The value for '{field_name}' is empty."
    },
    {
      "name": "data_invalid_date",
      "message": "Measurement #{line}: The value for '{field_name}' is malformed (format is YYYYMMDD)"
    },
    {
      "name": "data_date_bounds_error",
      "message": "Measurement #{line}: The value for '{field_name}' is out of bounds [{lower_bound} - {upper_bound}]"
    },
    {
      "name": "data_invalid_month",
      "message": "Measurement #{line}: The value for '{field_name}' is malformed (invalid month detected)"
    },
    {
      "name": "data_invalid_day_of_month",
      "message": "Measurement #{line}: The value for '{field_name}' is malformed (invalid day of month detected)"
    },
    {
      "name": "invalid_time_record",
      "message": "Measurement #{line}: The value for '{field_name}' is malformed (invalid time pattern)"
    },
    {
      "name": "invalid_time_value",
      "message": "Measurement #{line}: The value for '{field_name}' is out of bounds"
    }
  ],
  "warnings": [
    {
      "name": "crossing_date_line",
      "message": "/east_longitude [{ref_val}] < west_longitude [{comp_val}], implies crossing the dateline! If you did not do so, please check these values"
    },
    {
      "name": "field_value_missing",
      "message": "The value of the header field /{reference} is missing"
    },
    {
      "name": "obsolete_field",
      "message": "The header field /{reference} is marked as obsolete, please check the documentation."
    }
  ]
}
```
