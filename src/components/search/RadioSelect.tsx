import { WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import Radio from "@material-ui/core/Radio/Radio";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = createStyles({
    root: {}
});

export interface RadioItem {
    value: string;
    label: string;
}

interface RadioSelectProps extends WithStyles<typeof styles> {
    items: RadioItem[];

    onChange: (selectedValue: string) => void;
    selectedValue: string;
}

class RadioSelect extends React.Component<RadioSelectProps> {
    constructor(props: RadioSelectProps) {
        super(props);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value);
    };

    render() {
        const {items} = this.props;
        return (
            <div>
                {items.map((item: RadioItem) => {
                    return (
                        <FormControlLabel
                            key={item.value}
                            value={item.value}
                            label={item.label}
                            control={
                                <Radio
                                    key={item.value}
                                    checked={this.props.selectedValue === item.value}
                                    value={item.value}
                                    aria-label={item.label}
                                    onChange={this.handleChange}
                                />
                            }
                        />

                    )
                })}
            </div>
        )
    }
}

export default withStyles(styles)(RadioSelect)