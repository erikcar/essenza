import React, { useMemo } from "react";

export const Axis = ({ axis, ...rest }) => {
  useMemo(() => {
    if (axis) {
      axis.push(rest);
    }
}, [axis]);

};

export default Axis;