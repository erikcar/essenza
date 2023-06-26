import { useDecorator } from "../hook/StyleHook";


export function Box({children, theme, name, onClick}){
    const deco = useDecorator(Box, theme);
    //STATES: hover, selected, active, focus, 
    //PROPERTIES: border, bg,  corner, shadow
    console.log("BOX-DECO", deco?.className);
    return(
        <div onClick={onClick} className={deco?.className} style={deco?.style}>{children}</div>
    )
}