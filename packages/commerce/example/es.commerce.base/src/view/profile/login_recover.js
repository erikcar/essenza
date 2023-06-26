import React, { useState } from 'react';
import * as yup from 'yup';

import { Button, Input} from 'antd';

import { DataSource, AppModel, useModel, useForm, useGraph, Formix, FormixItem  } from 'essenza';

function Controller(c) {
    c.skin = LoginRecover;
    c.state = null;
    c.intent = {
        RECOVERY: async ({ value, model, data, app }) => {
            let form = c.form("loginrec-form");
            let result = await form.validate();
            if (result.isValid) {
                model.read(AppModel, m => m.passwordRequest(result.data.temail, data || app.settings.defaultRoute).then(r => value(true)));
            }
        }, 
        RESEND: ({app}) =>{
            if(c.state){
                c.request(AppModel, m => m.passwordRequest(c.state.temail, c.state.route || app.settings.defaultRoute).then(r => c.navigate("/loginrec")));
            }
        }
    }
}

export function LoginRecover({ route }) {
    const [model, control] = useModel(LoginRecover, Controller);
    const [emailed, setEmailed] = useState(false);
    const form = useForm("form", new DataSource({}), model, null, yup.object({
        temail: yup.string().required("Email è una informazione richiesta.").email("Formato email non corretto"),
    }));

    return (
        <>
            {!emailed ?
                <Formix form={form} layout='vertical' className="layout-form">
                    <FormixItem label="E-mail" name="temail">
                        <Input ></Input>
                    </FormixItem>
                    <div className='text-right'>
                        <Button className='btn-dark' onClick={() => model.emit("RECOVERY", setEmailed, {route: route, form: form})}>
                            Invia Richiesta
                        </Button>
                    </div>
                    <Button style={{ padding: '0' }} className='fw-6 fs-6 centered' type="link" onClick={() => control.navigate("/login")}>Torna a Login</Button>
                </Formix>
                : <>
                    <h6>Check your email to recover your password.</h6>
                    <p style={{marginTop: '16px'}}>Email not got? <Button className='bolder h6 primary' type="link" onClick={() => setEmailed(false)}>
                        Send agin.
                    </Button></p>
                    <div>
                        <Button className='bolder h6 primary' onClick={() => control.navigate("/login")}>
                            Torna a Login
                        </Button>
                    </div>
                </>
            }
        </>
    )
}