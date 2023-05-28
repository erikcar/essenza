import React from "react";

function Close(){
    //Ho bisogno di ctx per fare closure
    return null;
}

export function Widget({ children }) {
    //Model lo ricavo da useModel? oppure widget fa solo closure???
    return (<>
        {children}
        <Close />
    </>)
}