import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import * as React from "react";
import Stepper from "@material-ui/core/Stepper/Stepper";
import Typography from "@material-ui/core/Typography/Typography";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Step from "@material-ui/core/Step/Step";
import FileUpload from "./FileUpload";
import { Cancel } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});


function getSteps() {
    return ['Uploading data file(s)', 'Validating', 'Reviewing', 'Accepted'];
}


interface SubmitStepsProps extends WithStyles<typeof styles> {
    show: boolean;
    closeSubmitSteps: () => void;

    setActiveStepUp: () => void;
    setActiveStepDown: () => void;
    activeStep: number;
}


interface SubmitStepsState {
    files: File[];
}


class SubmitSteps extends React.Component<SubmitStepsProps, SubmitStepsState> {
    constructor(props: SubmitStepsProps) {
        super(props);

        this.state = {
            files: [],
        };
    }

    handleCloseSubmitSteps = () => {
        this.props.closeSubmitSteps();
    };


    isStepOptional = (step: number) => {
        return step === 1;
    };

    getStepContent = (step: number) => {
        const {classes} = this.props;

        switch (step) {
            case 0:
                return <FileUpload
                    onDrop={this.handleOndrop}
                    files={this.state.files}
                />;
            case 1:
                return <Typography className={classes.instructions}>{'We are validating your data files'}</Typography>;
            case 2:
                return <Typography
                    className={classes.instructions}>{'Scientists are reviewing your data files'}</Typography>;
            case 3:
                return <Typography className={classes.instructions}>{'Your data is available now.'}</Typography>;
            default:
                throw new Error("not implemented");
        }
    };

    handleNext = () => {
        this.props.setActiveStepUp();
    };

    handleBack = () => {
        this.props.setActiveStepDown();
    };

    handleReset = () => {
        console.log('helölo');
        // this.props.setActiveStep(0);
    };

    // noinspection JSUnusedLocalSymbols
    handleOndrop = (acceptedFiles: any, rejectedFiles: any) => {
        // noinspection JSPrimitiveTypeWrapperUsage
        let files = new Array();
        acceptedFiles.forEach((file: any) => {
            files.push(file);
        });

        this.setState({
            files: [...this.state.files, ...files],
        });

    };

    render() {
        if(!this.props.show){
            return null;
        }

        const {classes, activeStep} = this.props;
        const steps = getSteps();

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {
                            completed: false,
                        };
                        const labelProps = {
                            optional: null as any,
                        };
                        if (this.isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                    <Grid container justify={"flex-end"}>
                        <Button variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.handleCloseSubmitSteps}
                        >
                            Cancel
                            <Cancel/>
                        </Button>
                    </Grid>
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&quot;re finished
                            </Typography>
                            <Button onClick={this.handleReset} className={classes.button}>
                                Reset
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {this.getStepContent(activeStep)}
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(SubmitSteps);