import * as React from 'react';
import {Button, Theme, WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "@material-ui/icons";

//const PromiseFtp = require('promise-ftp');

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        root: {},
        title: {
            flexGrow: 1,
        },
    });


// const ftp = new PromiseFtp();
// ftp.connect({host: 'localhost', user: 'anonymous', password: 'hdzierz@gmail.com'})
//     .then(function (serverMessage: string) {
//         console.log('Server message: '+serverMessage);
//         return ftp.list('/');
//     }).then(function (list: any) {
//     console.log('Directory listing:');
//     console.dir(list);
//     return ftp.end();
// });

interface MatchupPanelProps extends WithStyles<typeof styles> {
    show: boolean;
}

class MatchupPanel extends React.PureComponent<MatchupPanelProps> {
    constructor(props: MatchupPanelProps){
        super(props);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div>
                <Button>
                    Edit Links
                    <Link/>
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(MatchupPanel);
