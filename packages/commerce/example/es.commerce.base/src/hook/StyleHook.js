import { useMemo, useState } from "react";
import { isString } from "essenza"


const properties = {
    font: 'F',
    /*Fw*/thin: 'w', extralight: 'w', light: 'w', normal: 'w', medium: 'w', semibold: 'w', bold: 'w', extrabold: 'w', black: 'w',
    /*Ff*/sans: 'f', serif: 'f', mono: 'f',

    text: 'T', //=>
    
    /*Tp - bgp - */
    left: 'p', center: 'p', right: 'p', justify: 'p', start: 'p', end: 'p', bottom: 'p', top: 'p',
    /*Ts*/xs: 's', sm: 's', base: 's', lg: 's', xl: 's', '2xl': 's', '3xl': 's', '4xl': 's', '5xl': 's', '6xl': 's', '7xl': 's', '8xl': 's', '9xl': 's',

    /*T - D - FR / VI / TO*/
    inherit: 'c', current: 'c', transparent: 'c', black: 'c', white: 'c', slate: 'c', gray: 'c', zinc: 'c', neutral: 'c', stone: 'c', red: 'c', orange: 'c', amber: 'c', yellow: 'c',
    lime: 'c', green: 'c', emerald: 'c', teal: 'c', cyan: 'c', sky: 'c', blue: 'c', indigo: 'c', violet: 'c', purple: 'c', fuchsia: 'c', pink: 'c', rose: 'c',

    /*DS */
    solid: 'S', double:'S', dotted:'S', dashed: 'S', wavy: 'S',

    antialiased: 'n', 'subpixel-antialiased': 'n',
    italic: 'i', 'not-italic': 'i',
    'normal-nums': 'v', ordinal: 'v', 'slashed-zero': 'v', 'lining-nums': 'v', 'oldstyle-nums': 'v', 'proportional-nums': 'v', 'tabular-nums': 'v', 'diagonal-fractions': 'v', 'stacked-fractions': 'v',
    
    tracking: true,
    leading: true,
    indent: true,
    align: true,
    whitespace: true,
    break: true,
    hyphens: true,

    clamp: 'C', 
    line: '', no:'',//line: {clamp: 'l'}
    
    list: { image: 'I', inside: 'p', outside: 'p', none: 't', disc: 't', decimal: 't' },
    /*DECORATION*/
    underline:'d', overline: 'd', through:'d', //line-through
    decoration: 'D',
    offset: 'O',
    uppercase: 't', lowercase:'t', capitalize: 't', normale: 't', case:'', //Exception
    truncate: 'To', ellipsis: 'o', clip: 'o',

    //BACKGROUND
    bg: 'bg',
    fixed: 't', local: 't', scroll: 't',
    //bg-clip => 'bgo'
    origin: 'n',
    repeat: 'r',
    auto: 's', cover: 's', contain: 's',
    gradient: 'g', //bg-none???
    from: 'FR', via: "VI", to: 'TO'
}

export const essenza = {
    theme: {
        selected: false,
        data: {
            Bar: {
                className: "flex gap-4 p-4",
                $item: {
                    $box: { className: "flex-1 cursor-pointer hover:bg-red-500", selected: { className: "bg-black hover:bg-black", skip: "hover:bg-red-500" } },
                    $label: { selected: "text-white" }
                }
            },
            LinkBar: {
                className: "flex justify-evenly text-gray-500",
                $item: {
                    $box: { className: "cursor-pointer", selected: { className: "border-b border-b-primary", } },
                    $label: { selected: "text-black font-bold" }
                }
            },
            LabelView: {
                className: "flex justify-evenly flex-wrap text-center",
                $row: "grid grid-rows-2 gap-2 mb-2",
                $label: "text-primary font-semibold"
            },
            Button: {
                className: "rounded drop-shadow-lg hover:drop-shadow-xl px-4 py-1 bg-sky-500 hover:bg-sky-600 active:ring active:bg-sky-700",
            }
        }
    }
}

function Decorator(ClassName, Style) {
    this._className = ClassName || "";
    this._style = Style || {};
    this._selected = null;

    Object.defineProperty(this, "className", {
        get() {
            console.log("SELECTABLE-GET", Selection.selected, this._selected);
            return essenza.theme.selected && this._selected?._className
                ? this._selected._className
                : this._className;
        },
    });

    Object.defineProperty(this, "style", {
        get() {
            return essenza.theme.selected && this._selected?._style
                ? { ...this._style, ...this._selected._style }
                : this._style;
        },
    });

    this.parse = function (source) {
        if (source) {
            if (isString(source))
                this._className += ' ' + source;
            else {
                if (source.hasOwnProperty("className")) {
                    this._className += ' ' + source.className;
                    //delete source.className;
                }

                if (source.hasOwnProperty("selected")) {
                    this._selected = new Decorator(this._className).parse(source.selected);
                    //delete source.selected;
                }

                for (const key in source) {
                    if (Object.hasOwnProperty.call(source, key)) {
                        if (key.charAt(0) === '$') this[key] = (this[key] ? this[key] : new Decorator()).parse(source[key]);
                        else if (key === "className" || key === "selected") continue;
                        else this.format(key, source[key]);
                    }
                }
            }
        }
        return this;
    }

    this.format = function (key, value) {
        if (key === "skip") {
            const values = value.split(' ');
            for (let k = 0; k < values.length; k++) {
                this._className = this._className.replace(values[k], '');
            }
        }
        else this._style[key] = value;
    }
}

//const variableToString = varObj => Object.keys(varObj)[0]

export function useDecorator(name, theme) {
    return useMemo(() => {
        if (theme instanceof Decorator) return theme;

        const defaultTheme = essenza.theme.data[isString(name) ? name : name.name];
        const deco = new Decorator();

        if (!theme?.override) {
            deco.parse(defaultTheme);
        }

        return deco.parse(theme);
    }, [])
}

export function useSelection(value, unselectable, multiselection) {
    //if(selectable === undefined) selectable = true;
    const [v, setter] = useState(value);
    setter.value = unselectable === undefined ? v : -1;
    return [setter, (i) => i === v]
}

/*const format = (source, target) => {
    target = target || new Decorator();
    if (source) {
        if (isString(source)) 
            target._className += ' ' + source;
        else
            for (const key in source) {
                if (Object.hasOwnProperty.call(source, key)) {
                    //const value = source[key];
                    //const iss = isString(value);
                    //const c = key.charAt(0);
                    if (key.charAt(0) === '$') continue;
                    target.format(key, source[key]);
                    /*if (key === "className" || (iss && c === '_')) target._className += ' ' + value;
                    if (key === "selected") target._selected = format(value);
                    else if (c === '_') format(value, target);
                    else if (c !== '$') target._style[key] = value;
                    else target[key] = iss ? new Decorator(value) : format(value);/
                }
            }
    }
    return target;
}
return format(css, format(theme || defaultTheme));*/