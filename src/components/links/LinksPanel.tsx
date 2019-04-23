import * as React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import ReactMarkdown from"markdown-to-jsx";

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        title: {},
        listItem: {
            marginTop: theme.spacing.unit,
        },
    });

interface LinksPanelProps extends WithStyles<typeof styles> {
    show: boolean;
    content: string;
}

class LinkaPanel extends React.PureComponent<LinksPanelProps> {
    constructor(props: LinksPanelProps) {
        super(props);
    }

    options = {
        overrides: {
            h1: { component: (props: any) => <Typography gutterBottom variant="h4" {...props} /> },
            h2: { component: (props: any) => <Typography gutterBottom variant="h6" {...props} /> },
            h3: { component: (props: any) => <Typography gutterBottom variant="subtitle1" {...props} /> },
            h4: { component: (props: any) => <Typography gutterBottom variant="caption" paragraph {...props} /> },
            p: { component: (props: any) => <Typography paragraph {...props} /> },
            li: {
                component: withStyles(styles)(({ classes, ...props }: any) => (
                    <li className={this.props.classes.listItem}>
                        <Typography component="span" {...props} />
                    </li>
                )),
            },
        },
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes} = this.props;
        return (
            <div>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    BROWSE
                </Typography>
                <ReactMarkdown options={this.options}>
                    {this.props.content}
                </ReactMarkdown>
            </div>
        );
    }
}

export default withStyles(styles)(LinkaPanel);
