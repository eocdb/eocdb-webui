export interface SearchFormState {
    searchExpr?: string;
    startDate?: string;
    endDate?: string;
    productNames?: string[];
    productGroupNames?: string[];
}

export function newSearchFormState() {
    return {};
}