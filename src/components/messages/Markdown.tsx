import * as React from 'react';
import { Typography } from "@mui/material";
const ReactMarkdown = require('markdown-to-jsx');


/*
const styles = (theme: Theme) => ({
    listItem: {
        marginTop: theme.spacing.unit,
    },
});
*/

const options = {
    overrides: {
        h1: { component: (props: any) => <Typography gutterBottom variant="h4" {...props} /> },
        h2: { component: (props: any) => <Typography gutterBottom variant="h6" {...props} /> },
        h3: { component: (props: any) => <Typography gutterBottom variant="subtitle1" {...props} /> },
        h4: { component: (props: any) => <Typography gutterBottom variant="caption" paragraph {...props} /> },
        p: { component: (props: any) => <Typography paragraph {...props} /> },
/*
        li: {
            component: withStyles(styles)(({ classes, ...props }) => (
                <li className={classes.listItem}>
                    <Typography component="span" {...props} />
                </li>
            )),
        },
*/
    },
};


class Markdown extends React.Component{
    render(){
        return <ReactMarkdown options={options} {...this.props} />;
    }
}

export default Markdown;
