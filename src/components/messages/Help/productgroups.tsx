import { List, ListItem, ListItemText } from "@material-ui/core";
import * as React from "react";


function listItem(item: string, descr: string): any {
    return (
        <ListItem component={'span'} key={item}>
            <ListItemText secondary={descr} primary={item}/>
        </ListItem>
    )
}

export const ProductGroupsInfo = (
    <div>
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