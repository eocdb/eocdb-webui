import * as React from "react";
import Select, { components } from "react-select";
import { CSSProperties } from "react";
import { FormControl, InputLabel } from "@mui/material";


export interface Suggestion {
    value: string;
    label: string;
}


// const styles = (theme: Theme) => createStyles({
//     root: {
//         flexGrow: 1,
//         height: 250,
//     },
//     container: {
//         flexGrow: 1,
//         position: 'relative',
//     },
//     paper: {
//         position: 'absolute',
//         zIndex: 1,
//         marginTop: theme.spacing.unit,
//         left: 0,
//         right: 0,
//     },
//     chip: {
//         margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
//     },
//     inputRoot: {
//         flexWrap: 'wrap',
//     },
//     inputInput: {
//         width: 'auto',
//         flexGrow: 1,
//     },
//     divider: {
//         height: theme.spacing.unit * 2,
//     },
//     basicmultiselect: {
//         width: 400,
//         marginLeft: theme.spacing.unit,
//         marginRight: theme.spacing.unit,
//         height: 100,
//     }
// });

const customStyles = {
    control: (base: CSSProperties) => ({
        ...base,
        width: 200,
        'min-height': '56px',
        'background-color': '#FAFAFA',
        label: 'red',
        //zIndex: 999,
    }),
    container: (base: CSSProperties) => ({
        ...base,
        zIndex: 999, // get select item list on top of everything.
    })
};

const customTheme = (theme: any) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary: '#3F51B5',
    }
});


interface MultipleSelectTextFieldProps {
    suggestions: Suggestion[];
    selectedItems: Suggestion[];

    onChange: (selectedItems: Suggestion[]) => void;

    isMulti: boolean;
    closeMenuOnSelect: boolean;

    placeholder?: string;
    inputLabel?: string;
    inputLabelWidth?: number;

    className?: string;
}

const ControlComponent = (props: any) => (
    <div style={{zIndex: 1}}>
        {/*<h1 style={
            {
                textAlign: 'left',
                'margin-top': '-20px',
                height: '20px',
                'line-height': '20px',
                'font-size': '15px',
                fontWeight: 'bold',
            }
        }>
            <span style={{backgroundColor: 'white'}}>kljnd</span>
        </h1>*/}
        <components.Input style={{zIndex: 1}} id={'testin'} {...props} />
    </div>
);


const orderOptions = (values: any) => {
    return values.filter((v: any) => v.isFixed).concat(values.filter((v: any) => !v.isFixed));
};


class MultipleSelectTextField extends React.Component<MultipleSelectTextFieldProps> {
    constructor(props: MultipleSelectTextFieldProps) {
        super(props);
    }

    onChange = (value: Suggestion[], {action, removedValue}: any) => {
        switch (action) {
            case 'remove-value':
            case 'pop-value':
                if (removedValue.isFixed) {
                    return;
                }
                break;
            case 'clear':
                value = this.props.selectedItems.filter((v: any) => v.isFixed);
                break;
        }

        value = orderOptions(value);
        this.props.onChange(value);
    };

    render() {
        // const {placeholder} = this.props;

        //const plh = placeholder? placeholder : 'Select...';
        //const reactSelectStyles = base => ({ ...base, zIndex: 999 })

        return (
            <FormControl>
                <InputLabel
                    style={{zIndex: 1000, backgroundColor: '#FAFAFA', width: this.props.inputLabelWidth, paddingLeft: 8}}
                    shrink
                    variant={"outlined"}
                    htmlFor='testing'
                >
                    {this.props.inputLabel}
                </InputLabel>
                <Select
                    id='async-select'
                    closeMenuOnSelect={this.props.closeMenuOnSelect}
                    value={this.props.selectedItems}
                    isMulti={this.props.isMulti}
                    name="colors"
                    options={this.props.suggestions}
                    onChange={this.onChange}
                    styles={customStyles}
                    placeholder={this.props.placeholder}
                    theme={customTheme}
                    components={{Input: ControlComponent}}

                    className={this.props.className}
                />
            </FormControl>
        );
    }
}


export default MultipleSelectTextField;
