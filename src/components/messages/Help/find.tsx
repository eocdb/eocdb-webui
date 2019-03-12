import { List, ListItem, Typography } from "@material-ui/core";
import * as React from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';

export const FindHelpText = (
    <div>
        <Typography variant={"h5"} gutterBottom>
            Expression Search
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            The expression field allows to filter datasets for keywords. This can be done by either
            giving keywords or by using the so-called Lucene Syntax (link). The following will give some
            example on how to use the expression field.
        </Typography>

        <Typography variant={"body1"} gutterBottom>
            The easiest way to filter datasets is to just enter a keyword. This will result in a list of datasets
            that have Colleen_Mouw in any of the meta fields:
        </Typography>
        <SyntaxHighlighter language='javascript'>
            Colleen_Mouw
        </SyntaxHighlighter>

        <Typography variant={"body1"} gutterBottom>
            Teh above filter can result in a long and unclear list. It may terefore be desirable
            to filter for an exact match in an specific field. The following example wil search for Colleen_Mouw
            in the field 'investiators'
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
            <ListItem>received</ListItem>
            <ListItem>identifier_product_doi</ListItem>
            <ListItem>investigators</ListItem>
            <ListItem>affiliations</ListItem>
            <ListItem>contact</ListItem>
            <ListItem>experiment</ListItem>
            <ListItem>cruise</ListItem>
            <ListItem>data_file_name</ListItem>
            <ListItem>data_type</ListItem>
        </List>
    </div>
);