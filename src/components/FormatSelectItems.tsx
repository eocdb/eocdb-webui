/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import * as React from "react";

import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";

export interface IFormat {
    /** Title of film. */
    title: string;
    /** IMDb ranking. */
    rank: number;
}

/** Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top */
export const FORMATS: IFormat[] = [
    { title: "SCREEN" },
    { title: "XLSX" },
    { title: "CSV" },
    { title: "XARRAY" },
].map((m, index) => ({ ...m, rank: index + 1 }));

export const renderFormat: ItemRenderer<IFormat> = (format, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    const text = `${format.rank}. ${format.title}`;
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            key={format.rank}
            onClick={handleClick}
            text={highlightText(text, query)}
        />
    );
};

export const filterFormat: ItemPredicate<IFormat> = (query, format) => {
    return `${format.rank}. ${format.title.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
};

function highlightText(text: string, query: string) {
    let lastIndex = 0;
    const words = query
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(escapeRegExpChars);
    if (words.length === 0) {
        return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens: React.ReactNode[] = [];
    while (true) {
        const match = regexp.exec(text);
        if (!match) {
            break;
        }
        const length = match[0].length;
        const before = text.slice(lastIndex, regexp.lastIndex - length);
        if (before.length > 0) {
            tokens.push(before);
        }
        lastIndex = regexp.lastIndex;
        tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
        tokens.push(rest);
    }
    return tokens;
}

function escapeRegExpChars(text: string) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

