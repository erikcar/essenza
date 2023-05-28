import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { VistaContext } from "../components/Vista";
import { useApp } from "../core/AppContext";
import { Context, EntityModel, VistaApp, Controller } from "@essenza/core";

/**
 * 
 * @param {Controller} controller 
 * @param {Context} ctx 
 * @returns {[Controller]}
 */
export function useControl(controller, ctx) { //Add useModelContext()
    const context = useContext(VistaContext) || ctx || VistaApp.context;
    console.log("USE MODEL", context, controller);
    const c = context.getControl(controller);
    return [c];//[m, source];
}

export function useModel(skin, controller, vid, ctx){
    const model = useRef(new EntityModel(vid)).current;
    const context = ctx || useContext(VistaContext) || VistaApp.context;

    [model.state.__val, model.state.__refresh] = useState(false);

    //Per ora escludo unregister => può avere rilevanza solo nel caso di widget optional ma prendendo comunque ultimo creato come child di un parent non dovrebbe cambiare 
    //da un punto di vista di memoria se molti optional vanno e vengono ci potrebbe essere un pò di problemi 
    //Ci può essere problema di ref circolare??? forse meglio fare unregister???
    /*useEffect(()=>{ 
        return () => context.unregister(skin, model);
    },[context]);*/

    context.parent = useMemo(() => context.register(skin, model), []);
    model.control = context.controls.get(skin);

    if(!model.control){
        if(!controller){
            controller = new Controller();
            controller.skin = skin;
            controller.command = {};
        }
        model.control = context.setController(skin, controller, true);
    }

    return [model, model.control, model.state];
}

export function useVista(skin, controller, contextName) {
    const context = useMemo(() => new Context(contextName || skin.name || controller.name), []); //new Context(contextName || skin.name || controller.name); //useRef(new Context(contextName || skin.name || controller.name));
    const [m, c, s] = useModel(skin, controller, null, context); 
    useEffect(() => { 
        const ctx = context; 
        ctx.map.root = m; 
        ctx.map.parent = m;
        return () => ctx.dispose() }, [context])
    return [context, m, c, s];
}

export function useBreakPoint(size){
    let app = useApp(); //|| VistaApp;
    const bp = app.breakpoint;
    const [breakpoint, setBreakpoint] = useState(bp.getState());
    if(size)
        bp.register(size, setBreakpoint);
    return breakpoint;
}

/*export function useVista(controllerType, info, name) {
    const context = useRef(new Context(name || controllerType.name));
    //graph.context = context.current;
    //useControl(controller)
    const [c] = useControl(controllerType, context.current); 
    console.log("USE VISTA:", c);
    return [context.current, c];
}*/