import * as React from "react";
import ChipsArray from "../../components/search/ChipsArray";
import { DatasetQuery } from "src/model";


interface AdvancedSearchLogProps {
    datasetQuery: DatasetQuery;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
}

class AdvancedSearchLog extends React.PureComponent<AdvancedSearchLogProps> {
    constructor(props: AdvancedSearchLogProps) {
        super(props);
    }

    getFilterChipEntries() {
        let chips = [];
        const datasetQuery = this.props.datasetQuery;

        if (datasetQuery.wavelengthsMode && datasetQuery.wavelengthsMode  !== "all") {
            const label = 'wavelength: ' + datasetQuery.wavelengthsMode;
            chips.push({key: 'wavelength', label: label});
        }

        if (datasetQuery.wdepth[0] && datasetQuery.wdepth[1]) {

            const label = 'water depth: ' + datasetQuery.wdepth.join(' ');
            chips.push({key: 'waterdepth', label: label});
        }

        if (datasetQuery.productNames.length > 0) {
            const label = 'products: ' + datasetQuery.productNames.join(', ');
            chips.push({key: 'products', label: label});
        }

        if (datasetQuery.shallow) {
            const label = 'opt shallow:' + datasetQuery.shallow;
            chips.push({key: 'optshallow', label: label});
        }

        return chips;
    }

    handleFilterDelete = (key: string) => {
        let datasetQuery = this.props.datasetQuery;
        switch (key) {
            case 'wavelength': {
                datasetQuery = {...this.props.datasetQuery, wavelengthsMode: 'all'}
                this.props.updateDatasetQuery(datasetQuery);
                break;
            }
            case 'waterdepth': {
                datasetQuery = {...this.props.datasetQuery, wdepth: [null, null]}
                this.props.updateDatasetQuery(datasetQuery);
                break;
            }
            case 'products': {
                datasetQuery = {...this.props.datasetQuery, productNames: []}
                this.props.updateDatasetQuery(datasetQuery);
                break;
            }
            case 'optshallow': {
                datasetQuery = {...this.props.datasetQuery, shallow: null}
                this.props.updateDatasetQuery(datasetQuery);
                break;
            }
        }
    };

    render() {
        return (
            <ChipsArray chipData={this.getFilterChipEntries()} onDelete={this.handleFilterDelete}/>
        );
    }
}

export default AdvancedSearchLog;
