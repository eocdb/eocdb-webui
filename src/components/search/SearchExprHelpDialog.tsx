import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';


interface SearchExprHelpDialogProps {
    open: boolean;
    onClose: () => void;
}


export function SearchExprHelpDialog(props: SearchExprHelpDialogProps) {

    const headers = [];
    for (let key of Object.keys(HEADERS)) {
        let description = HEADERS[key];
        headers.push(<p><code>{key}</code> {description}</p>);
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            scroll="paper"
            aria-labelledby="exprHelpDialogTitle"
        >
            <DialogTitle id="exprHelpDialogTitle">Search Expression Help</DialogTitle>
            <DialogContent>
                <SearchExprHelp/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}


export function SearchExprHelp() {

    const headers = [];
    for (let key of Object.keys(HEADERS)) {
        let description = HEADERS[key];
        headers.push(<p><code>{key}</code> {description}</p>);
    }

    return (
        <DialogContentText>
            <p>
                The expression syntax allows querying all fields or individual header fields. Based on
                a header field's data type, different queries are possible.
            </p>

            <h5>Textual Values</h5>
            <p>
                Syntax:
                <ul>
                    <li><i>text</i></li>
                    <li><i>field</i><code>:</code><i>text</i><br/></li>
                    <li><i>field</i><code>:</code><i>wildcard</i><br/></li>
                </ul>
                where <i>field</i> is a valid header field name. The first form matches any
                occurrence of <i>text</i> in any textual field value. The second form matches any
                occurrence of <i>text</i> in the given field's value.
                The third form matches a <i>wildcard</i> gainst the field's value. The wildcard may contain
                any number of wildcard characters star (<code>*</code>) or question mark. The star matches
                any character sequence or even none, while the question mark matches any single letter.
            </p>
            <p>
                Example: <code>cruise:BOU*</code>
            </p>

            <h5>Numeric Values</h5>
            <p>
                Syntax:
                <ul>
                    <li><i>field</i><code>:[</code><i>upper</i><code> TO </code><i>lower</i><code>]</code>
                    </li>
                    <li><i>field</i><code>:(</code><i>upper</i><code> TO </code><i>lower</i><code>)</code>
                    </li>
                </ul>
                with <i>upper</i> and <i>lower</i> being the endpoints of a bounded interval.
                One of <i>upper</i> and <i>lower</i> may be missing to form unbounded intervals.
                The second form using parentheses is used to describe excluded interval endpoints.
                Parentheses and brackets may be mixed.
            </p>
            <p>
                Example: <code>cloud_percent:(0 TO 30]</code>
            </p>

            <h5>Combinations</h5>
            <p>You can combine multiple text and number queries by separating multiple textual or numeric queries
                by spaces. They will be combined by a logical <code>AND</code> operation.
                You can also use the logical operators <code>OR</code>, <code>AND</code>, <code>NOT</code>
                and use parentheses to group expressions.
            </p>
            <p>
                Example: <code>cruise:BOU* AND water_depth:[0 TO 1000] AND cloud_percent:[0 TO 30]</code>
            </p>

            <h5>Valid Headers Fields</h5>
            {headers}
        </DialogContentText>
    );
}


const HEADERS = {
    investigators: 'The contributor of the data file. Principal investigator is listed first, followed by any associate investigators.',
    affiliations: 'A list of affiliations (e.g. university, laboratory) for each investigator.',
    contact: 'An email address for one of the investigators or point of contact for the data file.',
    experiment: 'The name of the over-arching, long-term research project or funding program. Experiment names are used to generate a dataset-specific DOI and, generally, will contain multiple cruises or deployments and encompass data spanning multiple months or years. Please do not exceed 25 characters.',
    cruise: 'The name of the specific cruise (or subset of the experiment) where the data in the file were collected. Please do not exceed 25 characters.',
    station: 'The name of the station or deployment where data in the file were obtained.',
    data_file_name: 'The current name of the data file.',
    documents: 'Refers to cruise reports, station logs, digital images, and other associated documentation that provide additional information about the experiment and cruise. Every SeaBASS submission must be accompanied by an instrumentation/calibration report that describes the instruments used, how they were calibrated and how data were collected and processed.',
    data_type: 'Describes the general collection method for the data. Accepted values include',
    calibration_files: 'Refers to supplementary files containing coefficients and techniques used to calibrate the instruments used in data collection.',
    start_date: 'The earliest date data in the file were collected (in YYYYMMDD).',
    end_date: 'The latest date data in the file were collected (in YYYYMMDD).',
    north_latitude: 'The farthest north data in the file were collected (in decimal degrees). This header requires a [DEG] trailer. Latitudes south of the equator are negative.',
    south_latitude: 'The farthest south data in the file were collected (in decimal degrees). This header requires a [DEG] trailer. Latitudes south of the equator are negative.',
    east_longitude: 'The farthest east data in the file were collected (in decimal degrees). This header requires a [DEG] trailer. Longitudes west of the Prime Meridian are negative.',
    west_longitude: 'The farthest west data in the file were collected (in decimal degrees). This header requires a [DEG] trailer. Longitudes west of the Prime Meridian are negative.',
    water_depth: 'The water (bottom) depth at the station where the data were collected (in meters).',
    measurement_depth: 'If all the data in the file were collected at a discrete depth, this is that depth (in meters). Applicable (and required) for bottle samples, and buoys and moored radiometers.',
    above_detection_limit: 'Refers to the numeric NULL value used a placeholder for measurements that were made but were above detection limits. If the file contains those types of values, this header is required and those values should be flagged (e.g., set to -7777 or another defined value). Above detection limit values convey some information and are not the same as "missing" values, as missing implies that data were either not measured or invalid.',
    below_detection_limit: 'Refers to the numeric NULL value used a placeholder for measurements that were made but were below detection limits. If the file contains those types of values, this header is required and those values should flagged (e.g., set to -8888 or another negative number that is distinct from the range of valid measurements). Below detection limit values convey some information and are not the same as "missing" values, as missing implies that data were either not measured or invalid for other reasons.',
    volfilt: 'The volume filtered (in units of liters) of the field(s) in a file. This header is only applicable for files with measurement(s) from a discrete sample (for example, to indicate the volume of water filtered for the ap measurement in a /type=scan file).',
    optical_depth_warning: 'Include the header using the syntax /optical_depth_warning=true if a file contains measurements that are known or suspected to be in optically shallow conditions where the bottom reflectance would impact water leaving values. Using default SeaBASS search settings, files with this header will be excluded from results. Don\'t include this header for typical files with measurements that are assumed to be optically deep.',
    associated_archives: 'Include this header using the syntax: /associated_archives=my_related_data_bundle.tgz if a SeaBASS file has an accompanying TAR archive bundle of image, auxiliary, or ancillary files. For multiple TAR bundles, separate entries with a comma.',
    associated_archive_types: 'Include this header using the syntax: /associated_archive_types=DNA-FASTA if a SeaBASS file has an accompanying TAR archive bundle that is being reported with the /associated_archives header. For multiple entries, separate with a comma.',
    associated_files: 'Include this header using the syntax: /associated_files=my_related_data_file.jpg if a SeaBASS file has an accompanying image, auxiliary, or ancillary file. For multiple files, separate entries with a comma.',
    associated_file_types: 'Include this header if a SeaBASS file has an accompanying auxiliary or ancillary file that is being reported with the /associated_files header. For multiple entries, separate with a comma.',
    HPLC_lab: 'Applicable (and required) for HPLC data. This header should contain the name of the lab where the HPLC analysis was run.',
    HPLC_lab_technician: 'Applicable (and required) for HPLC data. This header should contain the name of the lab technician who ran the HPLC analysis.',
    chemical_formula: 'The chemical formula of a reported compound, typically associated with the PTR-TOF/MS instrument measuring VOCC concentrations.',
    mass_to_charge: 'The numeric expression of the mass to charge ratio for a chemical compound, typically associated with the PTR-TOF/MS instrument measuring VOCC concentrations.',
    data_status: 'The condition, or status, of the data file. The value preliminary is used when the data are new and the investigator intends to analyze the data further. The value update indicates the data are being resubmitted and informs users that an additional resubmission will occur in the future. The value final is used when the investigator has no intention of revisiting the data set.',
    secchi_depth: 'The secchi depth at the station where the data were collected (in meters).',
    cloud_percent: 'Percent cloud cover for the entire sky.',
    wave_height: 'The wave height at the station where the data were collected (in meters).',
    wind_speed: 'The wind speed at the station where the data were collected (in meters per second).',
    comments: 'A space for additional comments. Common comments include additional ancillary information about the data file, sea and sky states, difficulties encountered during data collection, methods of data collection, instruments used, and a description of nonstandard SeaBASS field names included in the data file. Comments must always be preceded by a exclamation point (!).',
    original_file_name: 'The original name of the data file, if different from the current /data_file_name.',
    area: 'Use this header to describe the area a sample occupies.',
//
//     null_correction
// optional
//
// Use this header to describe the null correction applied.
//
//     station_alt_id
// optional, (use ONLY if station header is already in use)
//
// An alternate name or identifier for the station or deployment where data were obtained.
//
//
//
//     biotic_setting
// optional
//
// Biotic Setting, Biotic Component, level 1. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// biotic_class
// optional
//
// Biotic Class, Biotic Component, level 2. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// biotic_subclass
// optional
//
// Biotic Subclass, Biotic Component, level 3. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// biotic_group
// optional
//
// Biotic Group, Biotic Component, level 4. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// biotic_community
// optional
//
// Biotic Community, Biotic Component, level 5. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// geoform_tectonic_setting
// optional
//
// Geoform Component Tectonic Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// geoform_physiographic_setting
// optional
//
// Geoform Component Physiographic Setting Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// geoform_origin
// optional
//
// Geoform Origin, Geoform Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// geoform
// optional
//
// Geoform, Geoform Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// geoform_type
// optional
//
// Geoform Type. Geoform Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// substrate_origin
// optional
//
// Substrate Origin, Substrate Component level 1. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// substrate_class
// optional
//
// Substrate Class, Substrate Component level 2. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// substrate_subclass
// optional
//
// Substrate Subclass, Substrate Component level 3. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// substrate_group
// optional
//
// Substrate Group, Substrate Component level 4. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// substrate_subgroup
// optional
//
// Substrate Subgroup, Substrate Component level 5. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// water_column_biogeochemical_feature
// optional
//
// Water Column Biogeochemical Feature Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// water_column_hydroform_class
// optional
//
// Water Column Hydroform Subcomponent level 1. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// water_column_hydroform
// optional
//
// Water Column Hydroform Subcomponent level 2. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// water_column_hydroform_type
// optional
//
// Water Column Hydroform Subcomponent level 3. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// water_column_layer
// optional
//
// Water Column Layer Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// water_column_salinity
// optional
//
// Water Column Salinity Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// water_column_temperature
// optional
//
// Water Column Temperature Subcomponent. CMECS Units, with no spaces, use underscores instead.
//
//     Refers to a data classifier in the Coastal and Marine Ecological Classification Standard (CMECS, https://www.cmecscatalog.org/).
//
//
//
// Restricted Use Headers
// The following headers are created by SeaBASS staff after the files have been submitted to the SeaBASS archive. Data submitters should NOT add these headers to their SeaBASS files.
//     identifier_product_doi
// assigned and entered by SeaBASS staff
//
// The DOI (Digital Object Identifier; see http://www.doi.org/) associated with the experiment.
//
//
//
//     received
// assigned and entered by SeaBASS staff
//
// The date that the files were submitted to SeaBASS.
};