import useChart from "../../chartContext";
import Feature from "./feature";

const ExportCSV = ({icon, ...rest}) => {
    const chart = useChart();

    rest.icon = icon || 'path://M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3zM6 5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z';
    rest.onclick = function () {
        const data = chart.instance?.getOption().dataset[0]?.source;
        if(data){
            let csvContent = "data:text/csv;charset=utf-8," + data.map(e => e.time + ',' + e.value).join("\n");
            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        }
        
        /* 
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data.csv");
            document.body.appendChild(link); 
            link.click();
        */
    }

	return <Feature name="myFeature" {...rest} />;
};

export default ExportCSV;