import { useMemo } from "react";
import { useDecorator } from "../hook/StyleHook";

export function LabelView({ items, type, theme}) {

    const deco = useDecorator(type || "LabelView", theme);

    const content = useMemo(() => {
        return items
            ? items.map((item, index) =>
                <div className={deco.$row?.className}>
                    <div className={deco.$label?.className}>{item.label}</div>
                    <div className={deco.$content?.className}>{item.content}</div>
                </div>)
            : null;
    }, [items, deco]);

    return <div className={deco.className} style={deco.style} >{content}</div>; //Oppure Box ???
}