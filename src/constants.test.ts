import * as types from "./constants"

describe("type test", () => {
    it("QUERY_MEASUREMENTS", () =>{
       expect(types.QUERY_MEASUREMENTS).toEqual("QUERY_MEASUREMENTS");
    });

    it("MEASUREMENT_RESULTS", () =>{
        expect(types.MEASUREMENT_RESULTS).toEqual("MEASUREMENT_RESULTS");
    });

    it("MEASUREMENT_FAIL", () =>{
        expect(types.MEASUREMENT_FAIL).toEqual("MEASUREMENT_FAIL");
    });
});