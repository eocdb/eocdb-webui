import { Link, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import * as React from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';

function listItem(item: string, descr: string): any {
    return (
        <ListItem component={'span'} key={item}>
            <ListItemText secondary={descr} primary={item}/>
        </ListItem>
    )
}

export const FindHelpText = (
    <div>
        <Typography variant={"h5"} gutterBottom>
            Expression Search
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            The expression field allows filtering datasets for keywords. This can be done by either
            giving keywords or by using the so-called <Link target={'_blank'} href={'https://lucene.apache.org/core/2_9_4/queryparsersyntax.html'}>Lucene Syntax</Link>.
            The following will give some example on how to use the expression field. For more documentation
            please brows to the <Link target={'_blank'} href={"https://ocdb.readthedocs.io/en/latest/"}>OCDB Help</Link>.
        </Typography>

        <Typography variant={"body1"} gutterBottom>
            The easiest way to filter datasets is to just enter a keyword. This will result in a list of datasets
            that have Colleen_Mouw in any of the meta fields:
        </Typography>
        <SyntaxHighlighter language='javascript'>
            Colleen_Mouw
        </SyntaxHighlighter>

        <Typography variant={"body1"} gutterBottom>
            Teh above filter can result in a long and unclear list. It may, therefore, be desirable
            to filter for an exact match in an specific field. The following example wil search for Colleen_Mouw
            in the field 'investigators'
        </Typography>
        <SyntaxHighlighter language='javascript'>
            investigators: Colleen_Mouw
        </SyntaxHighlighter>

        <Typography variant={"body1"} gutterBottom>
            Another typical search is to apply wildcard searches. You can use the wildcard character '?' (single
            character)
            or '*' (multiple characters).
        </Typography>
        <SyntaxHighlighter language='javascript'>
            investigators: *Colleen*
        </SyntaxHighlighter>
        <SyntaxHighlighter language='javascript'>
            investigators: Coll?en
        </SyntaxHighlighter>

        <Typography variant={"body1"} gutterBottom>
            It is also possible to chain fields using AND/OR operators in case you desire to filter for more than
            one meta field:
        </Typography>
        <SyntaxHighlighter language='javascript'>
            investigators: Colleen_Mouw AND experiment: NIH-NSF_Lake_Erie
        </SyntaxHighlighter>
        <SyntaxHighlighter language='javascript'>
            investigators: Colleen_Mouw OR experiment: NIH-NSF_Lake_Erie
        </SyntaxHighlighter>

        <Typography variant={"body1"} gutterBottom>
            To query range (e.g. data ranges) use the brackets and the operator 'TO':
        </Typography>
        <SyntaxHighlighter language='javascript'>
            received: [2002-01-01 TO 2015-01-01]
        </SyntaxHighlighter>


        <Typography variant={"h5"} gutterBottom>
            Searchable Meta Fields
        </Typography>

        <List dense={true}>
            {listItem('received', 'Date Received')}
            {listItem('identifier_product_doi', 'Product DOI. ')}
            {listItem('investigators', 'Investigators responsible for the Measurements.')}
            {listItem('affiliations', 'The Affiliations of the Investigators.')}
            {listItem('contact', 'Contact (Email Address) of the Investigators.')}
            {listItem('experiment', 'Identifier of the Experiment')}
            {listItem('cruise', 'Identifier of the Cruise')}
            {listItem('data_file_name', 'The name of the original data file')}
            {listItem('data_type', 'The data type (e.g. scan)')}
        </List>

        <Typography variant={"h5"} gutterBottom>
            Product Groups
        </Typography>

        <List dense={true}>
            {listItem('a', 'Spectral absorption coefficients: a, ap, aph, ad, ag')}
            {listItem('b', 'Spectral scattering coefficients: b, bp')}
            {listItem('bb', 'Spectral backscattering coefficients: bb, bbp, beta (VSF)')}
            {listItem('c', 'Spectral attenuation coefficients: c, cg, cp, cpg')}
            {listItem('DC', 'Dissolved carbon: DIC, DOC, pCO2, alkalinity, CDOM')}
            {listItem('PC', 'Particulate carbon: PIC, POC')}
            {listItem('SPM', 'Suspended particulate matter')}
            {listItem('AOT', 'Aerosol optical properties: AOT, angstrom, water vapor, ozone')}
            {listItem('nutrients', 'Si, N, P, oxygen')}
            {listItem('CTD', 'Hydrography: Wt, Sal/Cond, sigmaT')}
            {listItem('fluorescence', 'Fluorescence')}
            {listItem('productivity', 'NPP, NCP, GPP, PP')}
            {listItem('Chl', 'Chlorophyll-a only')}
            {listItem('HPLC', 'HPLC: Phytoplankton pigments')}
        </List>
    </div>
);