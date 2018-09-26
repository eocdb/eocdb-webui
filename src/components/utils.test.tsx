import * as React from 'react';
import { valBetween, highlightText } from './utils';


describe("TestUtils", () => {
    it('valBetween works', () => {
        let res = valBetween(-200, -100, 100);
        expect(res).toEqual(-100);
        res = valBetween(1000, -100, 100);
        expect(res).toEqual(100);
        res = valBetween(50, -100, 100);
        expect(res).toEqual(50);
        res = valBetween(50, 100, -100);
        expect(res).toEqual(50); /*!!!*/
        res = valBetween(50, 100, 100);
        expect(res).toEqual(100);
    });

    it('highlightText works', () => {
        const res = highlightText('This is a really weak test', 'weak');
        expect(res).toEqual(["This is a really ", <strong key={21}>weak</strong>, " test"]);
    });
});




