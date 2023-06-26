import { Vista, useModel, useVista, useGraph } from "essenza";
import { BarExample } from "../component/bar/bar";
import { UserView } from "../view/profile/userView";

export function Controller(c) {
    c.skin = HomeVista;
    c.intent = {

    }
}

export function HomeVista(info) {
    const [ctx, model, control] = useVista(HomeVista, Controller);
    /*const [model] = useModel();

    const procedures = useGraph(ProcedureModel, "list");
    const filter = useRef({ state: '' }).current;

    useEffect(() => {
        console.log("MODEL ", model);
        if (model) {
            //model.read(ProcedureModel, m => m.list());
        }
    }, [model]);*/

    console.log("HOME-VISTA");

    return (
        <Vista context={ctx} >
            <UserView />
        </Vista>
    )
}

export function HomeMobileVista(info) {
    const [ctx, model, control] = useVista(HomeMobileVista, Controller);

    console.log("HOME-MOBILE-VISTA");

    return (
        <Vista context={ctx} >
            <h4 className="mt-lg text-center">La risoluzione minima supportata dall'applicazione è 1024 x 720 px</h4>
        </Vista>
    )
}