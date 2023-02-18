import { useEffect } from "react";
import Serie from "./serie";

const Gauge = (props) => {
	return <Serie type="gauge" {...props} />;
};

export default Gauge;