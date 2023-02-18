import { useMemo } from "react";

const GridItem = ({ grid, ...rest }) => {
    useMemo(() => {
        if (grid) {
            grid.push(rest);
        }
    }, [grid]);

    return null;
}

export default GridItem;