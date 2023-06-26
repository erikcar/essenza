import { Vista, useVista } from "essenza";
import { Logo } from "../../layout/logo";
import { LoginRecover } from "../../view/profile/login_recover";

function RecoverVistaController(c) {
    c.skin = RecoverVista;
}

export function RecoverVista() {
    const [ctx] = useVista(RecoverVista, RecoverVistaController);
    return (
        <Vista context={ctx} >
            <div className='w100 flex-middle h-main'>
                <div className='max-width-md centered bg-block padding-xl w100 radius-md'>
                    <Logo className="mb-lg" style={{ verticalAlign: "top", width: "560px" }} />
                    <h1>
                        Recupero Password
                    </h1>
                    <LoginRecover />
                </div>
            </div>
        </Vista>
    )
}