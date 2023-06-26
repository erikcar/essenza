import { useMemo } from "react"
import { Box } from "../Box";
import { Label } from "../Label";
import { useDecorator, useSelection } from "../../hook/StyleHook";
import { Selectable } from "../Selection";

/*const item = {
    key: 0,
    value: "A",
    label: "FIRST",
    disabled: false,
    icon: <icon></icon>
}*/



function BarItem({ data, theme, onClick, selected }) {
    console.log("ITEM THEME", theme);
    return (
        <Selectable selected={selected}>
            <Box onClick={onClick} theme={theme?.$box} ><Label theme={theme?.$label} text={data.label} /></Box>
        </Selectable>
    )
}

export function Bar({ items, type, theme, onClick, children, unselectable }) {

    const [selection, isSelected] = useSelection(0, unselectable);
    const deco = useDecorator(type || "Bar", theme);
    const Template = children?.type || BarItem;

    const itemClick = (item, e) => {
        console.log("ITEM CLICK", item, e);
        if (onClick) onClick(item);
        selection(item.key);
    }

    const content = useMemo(() => {
        return items ? items.map((item, index) => <Template selected={isSelected(index)} onClick={(e) => itemClick(item, e)} theme={deco?.$item} data={item} />) : null;//
    }, [items, selection.value]);

    return <div className={deco.className} style={deco.style} >{content}</div>; //Oppure Box ???
}

export function BarExample() {
    const items = [
        {
            key: 0,
            value: "A",
            label: "FIRST",
            disabled: false,
        },
        {
            key: 1,
            value: "B",
            label: "SECOND",
            disabled: false,
        },
        {
            key: 2,
            value: "C",
            label: "THIRD",
            disabled: false,
        }
    ];

    //const result = str.split(/(?=[A-Z])/);
    return (
        <Bar items={items} type="LinkBar" ></Bar>
    )
}


/**
 * 
 * <Bar items={items} css={
                { //come fare ref a child dello stesso tipo che potrebebro essere presenti condizionalmente
                    //Come fare override di classi tilewind??? (Es bg del box) => ogni componente o template definisce delle proprietà di stile che se esistono vengono override
                    Bar: { className: "mt-2", fontSize: "1.5em", bgColor: "" },
                    Item_Box: "pb-2",
                    Item_Label: "px-4"
                }
            }>
            </Bar>

            <Bar items={items} css={
                {
                    Bar: { className: "mt-2", fontSize: "1.5em", bgColor: "" },
                }
            }>
                <Bar.Item css={
                    {
                        Box: "pb-2",
                        Label: "px-4"
                    }
                } />
            </Bar>

            <Bar items={items} css={{ Bar: { className: "mt-2", fontSize: "1.5em", bgColor: "" }, }}>
                <Bar.Item css={{ Box: "pb-2", Label: "px-4" }} />
            </Bar>

            <Bar items={items} css={{ Bar: { className: "mt-2", fontSize: "1.5em", bgColor: "" }, }}>
                <BarItem css={{ Box: "pb-2", Label: "px-4" }} />
            </Bar>
 */
