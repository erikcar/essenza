import React from 'react';

const ChartContext = React.createContext(null);

export const ChartProvider = ({ chart, children}) => {
    return(
        <ChartContext.Provider value={chart} >
            {children}
        </ChartContext.Provider>
    )
}

const useChart= () => React.useContext(ChartContext);

export default useChart;