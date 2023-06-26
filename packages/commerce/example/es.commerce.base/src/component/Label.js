import { useDecorator } from "../hook/StyleHook";

export function Label({theme, text}){
    const deco = useDecorator(Label, theme);
    console.log("LABEL-DECO", deco?.className);
    return(
        <span className={deco?.className} style={deco?.style}>{text}</span>
    )
}