import React, { useContext } from "react";
import { VistaContext } from "./Vista";

function Close(){
    //Ho bisogno di ctx per fare closure
    console.log("MODEL-MAP-CLOSE");
    const ctx = useContext(VistaContext);
    if(ctx) ctx.map.unlink();
    return null;
}

export function Widget({ children }) {
    //Model lo ricavo da useModel? oppure widget fa solo closure???
    console.log("MODEL-MAP-WIDGET", children);
    return (<>
        {children}
        <Close />
    </>)
}