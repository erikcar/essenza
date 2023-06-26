import { Vista, useVista } from "essenza";
import { FirstAccess } from "../../view/profile/login_firstaccess";

function Controller(c) {
    c.skin = FirstAccessVista;
}

export function FirstAccessVista() {
    const [ctx] = useVista(FirstAccessVista, Controller);
    return (
        <Vista context={ctx} >
            <div className='content-max-width'>
                <div className='block-md-width centered'>
                    <FirstAccess />
                </div>
            </div>
        </Vista>
    )
}