import * as React from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { Typography } from "@mui/material";

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
            Unique submission ID
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            Submission ID is a unique identifier for your submission. Please don't use white spaces.
        </Typography>

        {/*<Typography variant={"h5"} gutterBottom>*/}
        {/*    Submission path*/}
        {/*</Typography>*/}
        {/*<Typography variant={"body1"} gutterBottom>*/}
        {/*    The submission path helps you organising your data. Please use the following structure:*/}
        {/*    <SyntaxHighlighter language='javascript'>*/}
        {/*        AFFILIATION (acronym)/EXPERIMENT/CRUISE*/}
        {/*    </SyntaxHighlighter>*/}
        {/*</Typography>*/}

        <Typography variant={"h5"} gutterBottom>
            Affiliation (or userName)
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            Affiliation or userName if submitting without associated affiliation.
        </Typography>

        <Typography variant={"h5"} gutterBottom>
            Experiment (or project)
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            Experiment or project if lacking experiment name.
        </Typography>

        <Typography variant={"h5"} gutterBottom>
            Cruise (or platform)
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            Cruise or platform.
        </Typography>

        <Typography variant={"h5"} gutterBottom>
            Publication date
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            The aim of this database is to provide your data to the public. However, you can control the publication.
            If the "Publish data" option is not checked, data will not be published. You can also delay the
            publication by checking publish data, but set a specific date.
        </Typography>
    </div>
);

export default SubmissionHelpText;
