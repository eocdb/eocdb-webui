export function tot_page(tot_num: number, rowsPerPage: number): number {
    return Math.max(0, Math.ceil(tot_num / rowsPerPage) - 1);
}
