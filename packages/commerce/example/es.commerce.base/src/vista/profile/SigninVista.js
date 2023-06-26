import { Vista, useVista } from "essenza";
import { Logo } from "../../layout/logo";
import { Signin } from "../../view/profile/signin_form";

function Controller(c) {
    c.skin = SigninVista;
}

export function SigninVista() {
    const [ctx] = useVista(SigninVista, Controller);
    return (
        <Vista context={ctx} >
            <div className='w100 flex-middle h-main'>
                <div className='max-width-md centered bg-block padding-xl w100 radius-md'>
                    <Logo className="mb-lg" style={{ verticalAlign: "top" }} />
                    <h1>
                        Registarti
                    </h1>
                    <Signin />
                </div>
            </div>
        </Vista>
    )
}