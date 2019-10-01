const TERMS_EUMETSAT_SB_DATA = `
The in-situ data you are about to download are made available by the Copernicus Database of Ocean Colour In Situ Fiducial Reference Measurements. This Copernicus OCDB provides stewardship and welcomes submissions of fiducial-reference in situ data from various providers (hereafter the Principle Investigators (PIs)).
The following conditions must be observed when using the Copernicus OCDB data:

* When using the Copernicus OCDB data, you are required to contact the PI about your data usage.
* When publishing or presenting the data, you must acknowledge the PI(s) for the provision of data as well as Copernicus and EUMETSAT for establishing and maintaining the OCDB. For example, the acknowledgment may read: “We thank (name of PI(s)) for their effort in collecting the data used in this investigation and for making them available for publication. We also thank the EC Copernicus Programme and EUMETSAT for establishing and maintaining the OCDB”.
* When publishing, you must offer a co-authorship to the PI(s) if their in-situ data is central to your publication. For publications drawing on numerous sources of in-situ data, the co-authorship may be considered for one or many of the PI(s), to be determined based on the significance of the respective in-situ data to the overall results of the publication.

If you accept the above conditions, please click the "__Accept__" button below to proceed downloading. If you do not agree with the above conditions, click "__Decline__" to return to the website.
Effort is undertaken to ensure good quality of the Copernicus OC-DB data records. Nevertheless, neither EUMETSAT nor any other entity involved in the creation of the OCDB can guarantee the accuracy and completeness of the published data or their suitability for any specific purposes and, thus, shall not be held liable for any damage derived from the use.
`;


const TERMS_EUMETSAT_MATCHUP_FILE = `
The _in-situ_ data, contained in the Matchup Database files you are about to download, were derived from _in-situ_ data 
in the Copernicus Database of Ocean Colour In Situ Fiducial Reference Measurements. The data are contributed, on a 
voluntary basis, by different Principal Investigators (PIs) responsible for data collection and processing. 
The Database and the Matchup Database are maintained by EUMETSAT. 

See Matchup Database description for more information about matchup retrieval. 

## Using data

Please consult with the PIs via e-mail on the use of the data. PIs’ names, affiliations, projects, and contacts are provided together with the data. 

## Guidelines for data use and publication

It is requested that every practical attempt is made to honour the following guidelines:
- Always acknowledge the data providers! The acknowledgement may read: We thank the PI(s) for their effort in collecting the data used in this investigation and for making them available.
- Publishing data from a 'few’ selected projects, sites or cruises: Please consider co-authorship for the PI(s).
- If the _in-situ_ data are a principal component of the publication: Offer co-authorship to the PI(s).

__If you accept the above conditions, please click the "Accept" button below to proceed downloading. If you do not agree with the above conditions, click "Do Not Accept" to return to the website.__

EUMETSAT will not be held responsible for any data misuse.
`;

const TERM_EUMETSAT_OLCI_AERONET = `
# OLCI-AERONET-OC Matchups Database Download Terms and Conditions

The AERONET-OC _in-situ_ data, contained in the Matchups Database files you are about to download, 
were derived from AERONET-OC network (Zibordi aet al., xx), available at 
[aeronet.gsfc.nasa.gov](https://aeronet.gsfc.nasa.gov/cgi-bin/draw_map_display_seaprism_v3). They are contributed by 
the International AERONET Federation. Each site has a Principal Investigator(s) (PI), responsible for deployment, 
maintenance and data collection. The PI has priority use of the data collected at the site. The PI is entitled to 
be informed of any other use of that site data. See Matchup Database description for more information about matchup 
retrieval.

## Using data

The Principal Investigator(s) name and contacts are indicated for each matchup in the Matchups Database files. 
If you intend to use the following data please consult with him/her/them via e-mail(s).

__If you accept the above conditions, please click the "Accept" button below to download the file. 
If you do not agree with the above conditions, click "Do Not Accept" to return to the website.__
 
EUMETSAT will not be held responsible for any data misuse.
`;


const TERMS = {
    'SB': TERMS_EUMETSAT_SB_DATA,
    'OA': TERM_EUMETSAT_OLCI_AERONET,
    'OM': TERMS_EUMETSAT_MATCHUP_FILE,
};

export default TERMS;