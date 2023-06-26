import { Button, Spin } from 'antd';
import { Vista, useVista, AppService, useApp } from "essenza";
import { FirstAccess } from '../view/profile/login_firstaccess';
import { Logo } from '../layout/logo';

function WelcomeController(c) {
    c.skin = Welcome;
    c.intent = {
        EMAIL_CHECK : ({ value, data })=>{
            c.request(AppService, m => m.emailConfirm(value).then(r => data.login(r)));
        }
    }
}

export function Welcome({content, token}) {
    const [ctx, model, control] = useVista(Welcome, WelcomeController);
    const app = token.current;

    if (!app.irequest)
        content = content || <>
            <h1 className='text-center py-lg'>Benvenuto</h1>
            <Button className="centered btn-dark" onClick={() => app.navigate("/login")}>Vai al Login</Button>
        </>;
    else if (app.irequest.type === "FA")
        content = <FirstAccess request={app.irequest} />;
    else if (app.irequest.type === "EM"){
        model.emit("EMAIL_CHECK", {id: app.irequest.data.get("emid"), token: app.irequest.data.get("emreq")}, app);
        content = <Spin />;
    }
    else if (app.irequest.type === "LOG"){
        setTimeout(()=>{control.navigate("home")}, 2000)
        content = <Spin size='large' className='centered' />
    }
    else
        content = <>
            <Button className="centered btn-dark" onClick={() => app.navigate("/login")}>Vai al Login</Button>
        </>;
    return (
        <Vista context={ctx} >
            <div className='content-max-width'>
                <div className='max-width-md centered'>
                    <Logo className="centered" style={{ marginTop: "120px", }} />
                    {content}
                </div>
            </div>
        </Vista>
    )
}