import React,{ useMemo } from "react";

export const GridItem = ({ grid, ...rest }) => {
    useMemo(() => {
        if (grid) {
            grid.push(rest);
        }
    }, [grid]);

    return null;
}
