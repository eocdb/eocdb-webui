import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import * as React from "react";
import Stepper from "@material-ui/core/Stepper/Stepper";
import Typography from "@material-ui/core/Typography/Typography";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Step from "@material-ui/core/Step/Step";
import { FileUpload } from "./FileUpload";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '90%',
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
    return ['Uploading data files(s)', 'Validating', 'Reviewing', 'Accepted'];
}


interface  SubmitStepsProps extends WithStyles<typeof styles> {


}

interface SubmitStepsState {
    activeStep: number;
    skipped: any;
    files: File[];
}


class SubmitSteps extends React.Component<SubmitStepsProps, SubmitStepsState> {
    constructor(props: SubmitStepsProps) {
        super(props);

        this.state = {
            activeStep: 0,
            skipped: new Set(),
            files: [],
        };
    }

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
                return <Typography className={classes.instructions}>{'Scientists are reviewing your data files'}</Typography>;
            case 3:
                return <Typography className={classes.instructions}>{'Your data is available now.'}</Typography>;
            default:
                throw new Error("not implemented");
        }
    };

    handleNext = () => {
        const {activeStep} = this.state;
        let {skipped} = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleSkip = () => {
        const {activeStep} = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step: number) {
        return this.state.skipped.has(step);
    }

    handleOndrop = (acceptedFiles: any, rejectedFiles: any) => {
        let files = new Array();
        acceptedFiles.forEach((file: any) => {
            console.log(file);
            files.push(file);
        });

        this.setState({
            files: [...this.state.files, ...files],
        });

    };

    render() {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;

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
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
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
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                {this.isStepOptional(activeStep) && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSkip}
                                        className={classes.button}
                                    >
                                        Skip
                                    </Button>
                                )}
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