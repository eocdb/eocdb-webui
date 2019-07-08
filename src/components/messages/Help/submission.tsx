import * as React from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { Typography } from "@material-ui/core";

// function listItem(item: string, descr: string): any {
//     return (
//         <ListItem component={'span'} key={item}>
//             <ListItemText secondary={descr} primary={item}/>
//         </ListItem>
//     )
// }

const SubmissionHelpText = (
    <div>
        <Typography variant={"h5"} gutterBottom>
            Submission Label
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            Submission Label is a unique identifier for your submission. Please don't use white spaces.
        </Typography>

        <Typography variant={"h5"} gutterBottom>
            Submission Path
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            The submission path helps you organising your data. Please user the following stricture:
            <SyntaxHighlighter language='javascript'>
                AFFILIATION (acronym)/EXPERIMENT/CRUISE
            </SyntaxHighlighter>
        </Typography>
        <Typography variant={"h5"} gutterBottom>
            Publication Date
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            The aim of this database is to provide your data to teh public. However, you can control the publication.
            If leave 'publish data' unticked, the admins won't publish your data without further communication
            with you. You can also delay the publication by ticking publish data, but set a specific date.
        </Typography>
    </div>
);

export default SubmissionHelpText;
