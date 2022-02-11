import * as React from "react";
import ChipsArray from "../../components/search/ChipsArray";
import { SliderRange } from "../../types/advancedSearchDialog";


interface AdvancedSearchLogProps {
    onWavelengthChange: (item: string) => void;
    wavelengthValue: string;

    onWaterDepthChange: (waterDepth: SliderRange) => void;
    waterDepthValue: SliderRange;

    onOptShallowChange: (optShallow: string) => void;
    optShallowValue: string;

    onProductsChange: (products: string[]) => void;
    productsValue: string[];
}

class AdvancedSearchLog extends React.PureComponent<AdvancedSearchLogProps> {
    constructor(props: AdvancedSearchLogProps) {
        super(props);
    }

    getFilterChipEntries() {
        let chips = [];

        if (this.props.wavelengthValue !== "all") {
            const label = 'wavelength: ' + this.props.wavelengthValue;
            chips.push({key: 'wavelength', label: label});
        }

        if (this.props.waterDepthValue[0] !== 0 && this.props.waterDepthValue[1] !== 1000) {
            const label = 'water depth: ' + this.props.waterDepthValue.join(' ');
            chips.push({key: 'waterdepth', label: label});
        }

        if (this.props.productsValue.length > 0) {
            const label = 'products: ' + this.props.productsValue.join(', ');
            chips.push({key: 'products', label: label});
        }

        if (this.props.optShallowValue) {
            const label = 'opt shallow:' + this.props.optShallowValue;
            chips.push({key: 'optshallow', label: label});
        }

        return chips;
    }

    handleFilterDelete = (key: string) => {
        switch (key) {
            case 'wavelength': {
                return this.props.onWavelengthChange("all");
            }
            case 'waterdepth': {
                return this.props.onWaterDepthChange([0, 1000]);
            }
            case 'products': {
                return this.props.onProductsChange([]);
            }
            case 'optshallow': {
                return this.props.onOptShallowChange('');
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
