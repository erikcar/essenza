import { useDecorator } from "../hook/StyleHook";

export function Button({ type, theme, children}) {

    const deco = useDecorator(type || "Button", theme);

    return <button className={deco.className} style={deco.style} >{children}</button>; //Oppure Box ???
}