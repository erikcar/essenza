import { AppModel, Formix, FormixItem, useForm, useModel } from "essenza";
import { Button, Input } from 'antd';
import React from "react";
import * as yup from 'yup';

function Controller(c) {
    c.skin = ProfileForm;
    c.intent = {
        SAVE: async ({ value, control, form }) => {
            let result = await form.validate();
            if (result.isValid) {
                if (result.isValid) {
                    control.request(AppModel, m => m.updateProfile(result.data).then((r) => {
                        if (value)
                            control.navigate(value);
                        else
                            control.closePopup();
                    }));
                }
            }
        },
        CHANGE_PASSWORD: async ({ value:path, control, form }) => {
            let result = await form.validate();
            if (result.isValid) {
                control.request(AppModel, m => m.changePassword(result.data).then((r) => {
                    if (path)
                        control.navigate(path);
                    else
                        control.closePopup();
                }));
            }
        }
    }
}

export function ProfileForm({ source, label, title, npath }) {
    const [model, control] = useModel(ProfileForm, Controller);
    const form = useForm("profile-form", source, model);
    const pform = useForm("password-form", source, model, null, yup.object({
        temail: yup.string().required("Email è una informazione richiesta.").email("Formato email non corretto"),
        npassword: yup.string().required("Password è una informazione richiesta.").matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,24}$/,
            "Deve contenere Almeno 8 Caratteri, almeno una maiuscola, almeno una minuscola, almeno un umero ed almeno un carattere speciale"
        ),
        cpassword: yup.string().required("Conferma password richiesta.").test('passwords-match', 'Passwords non corrispondenti', function (value) {
            return this.parent.npassword === value;
        }),
    }));
    return (
        <>
            <div className="ec-form bg-block radius-md  padding-xl text-left">
                <Formix control={control} form={form}  layout='vertical' >
                    <h2 className="pb-md">Profilo</h2>
                    <FormixItem label="Nome" name="tname">
                        <Input>
                        </Input>
                    </FormixItem>
                    <FormixItem label="Cognome" name="tsurname">
                        <Input >
                        </Input>
                    </FormixItem>
                    <div className="text-right">
                        <Button className="btn-dark" onClick={() => control.execute("SAVE", "/settings",null,null,{form: form})}>
                            Aggiorna
                        </Button>
                    </div>
                </Formix>
            </div>
            <div className="ec-form bg-block radius-lg mt-lg padding-xl text-left">
                <Formix control={control} form={pform} layout='vertical'>
                    <h2 className="pb-md" >Credenziali</h2>
                    <FormixItem label="E-mail" name="temail">
                        <Input >
                        </Input>
                    </FormixItem>
                    <FormixItem label="Password Attuale" name="tpassword">
                        <Input.Password autoComplete="new-password" >
                        </Input.Password>
                    </FormixItem>
                    <FormixItem label="Nuova Password" name="npassword">
                        <Input.Password>
                        </Input.Password>
                    </FormixItem>
                    <FormixItem label="Conferma Nuova Password" name="cpassword">
                        <Input.Password>
                        </Input.Password>
                    </FormixItem>
                    <div className="text-right">
                        <Button className="btn-dark" onClick={() => control.execute("CHANGE_PASSWORD", "/settings",null,null,{form: pform})}>
                            Aggiorna
                        </Button>
                    </div>
                </Formix>
            </div>
        </>
    )
}