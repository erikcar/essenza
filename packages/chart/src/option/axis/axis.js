import { useMemo } from "react";

const Axis = ({ axis, ...rest }) => {
  useMemo(() => {
    if (axis) {
      axis.push(rest);
    }
}, [axis]);

};

export default Axis;