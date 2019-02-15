import * as React from "react";
import { TextField, Theme, WithStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Downshift from 'downshift';
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";


const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

function renderInput(inputProps: any) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

interface Suggestion {
    label: string;
}

interface renderSuggestionProps {
    highlightedIndex: number | null;
    index: number;
    itemProps: object;
    selectedItem: string;
    suggestion: Suggestion;
}


function renderSuggestion(props: renderSuggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = props;

    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}



function getSuggestions(value: string|null) {
    if(!value){
        return [];
    }

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

interface DownshiftMultipleProps extends WithStyles{

}

interface DownshiftMultipleState{
    inputValue: string;
    selectedItem: string[];
}


class DownshiftMultiple extends React.Component<DownshiftMultipleProps, DownshiftMultipleState> {
    constructor(props: DownshiftMultipleProps) {
        super(props);

        this.state = {
            inputValue: '',
            selectedItem: [],
        };
    }

    handleKeyDown = (event: React.KeyboardEvent) => {
        const { inputValue, selectedItem } = this.state;
        if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
            this.setState({
                selectedItem: selectedItem.slice(0, selectedItem.length - 1),
            });
        }
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: event.target.value });
    };

    handleChange = (item: string) => {
        let { selectedItem } = this.state;

        if (selectedItem.indexOf(item) === -1) {
            selectedItem = [...selectedItem, item];
        }

        this.setState({
            inputValue: '',
            selectedItem,
        });
    };

    handleDelete = (item: string) => () => {
        this.setState(state => {
            const selectedItem = [...state.selectedItem];
            selectedItem.splice(selectedItem.indexOf(item), 1);
            return { selectedItem };
        });
    };

    render() {
        const { classes } = this.props;
        const { inputValue, selectedItem } = this.state;

        // noinspection JSRemoveUnnecessaryParentheses
        return (
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={this.handleChange}
                selectedItem={selectedItem}
            >
                {({
                      getInputProps,
                      getItemProps,
                      isOpen,
                      inputValue: inputValue2,
                      selectedItem: selectedItem2,
                      highlightedIndex,
                  }) => (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            InputProps: getInputProps({
                                startAdornment: selectedItem.map(item => (
                                    <Chip
                                        key={item}
                                        tabIndex={-1}
                                        label={item}
                                        className={classes.chip}
                                        onDelete={this.handleDelete(item)}
                                    />
                                )),
                                onChange: this.handleInputChange,
                                onKeyDown: this.handleKeyDown,
                                placeholder: 'Select multiple countries',
                            }),
                            label: 'Label',
                        })}
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue2).map((suggestion: Suggestion, index: number) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion.label }),
                                        highlightedIndex,
                                        selectedItem: selectedItem2,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                )}
            </Downshift>
        );
    }
}

export default withStyles(styles)(DownshiftMultiple);