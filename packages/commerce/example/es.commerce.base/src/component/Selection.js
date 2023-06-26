import { essenza } from "../hook/StyleHook";

function Unselect(){
    console.log("SELECTABLE2");
    essenza.theme.selected = false;
    return null;
}

export function Selectable({ selected, children }) {
    console.log("SELECTABLE", essenza.theme.selected, selected);
    essenza.theme.selected = selected;
    return (
        <>
            {children}
            <Unselect />
        </>
    )
}