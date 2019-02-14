import * as React from "react";
import {WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "react-select/lib/Select";


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
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));


const styles = () => createStyles({
    root: {},
});

interface MultipleSelectTextFieldProps extends WithStyles<typeof styles>{

}


interface MultipleSelectTextFieldState{
    inputValue: string;
    menuIsOpen: boolean | undefined;
}


class MultipleSelectTextField extends React.Component<MultipleSelectTextFieldProps, MultipleSelectTextFieldState>{
    constructor(props: MultipleSelectTextFieldProps) {
        super(props);

        this.state = {
            inputValue:'',
            menuIsOpen: false,
        }
    }

    onInputChange = (inputValue: string, { action }: any) => {
        console.log(inputValue, action);
        switch (action) {
            case 'input-change':
                this.setState({ inputValue });
                return;
            case 'menu-close':
                console.log(this.state.inputValue);
                let menuIsOpen = undefined;
                if (this.state.inputValue) {
                    menuIsOpen = true;
                }
                this.setState({
                    menuIsOpen: menuIsOpen
                });
                return;
            default:
                return;
        }
    };

    render(){
        const {classes} = this.props;
        const { inputValue, menuIsOpen } = this.state;

        return(
            <div className={classes.root}>
               <Select
                   isMulti
                   defaultValue={suggestions[0]}
                   isClearable
                   isSearchable
                   inputValue={inputValue}
                   onInputChange={this.onInputChange}
                   name="color"
                   options={suggestions}
                   menuIsOpen={menuIsOpen}
               />
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(MultipleSelectTextField)