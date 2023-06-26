import React, { useEffect } from 'react';
import { useGraph, UserModel, useVista, Vista } from 'essenza';
import { StartForm } from '../../view/profile/StartForm';
import { useLocation } from 'react-router-dom';

function Controller(c) {
    c.skin = StartVista;
}

export function StartVista({ vmodel }) {
    const [ctx, model, control] = useVista(StartVista, Controller);

    const user = useGraph(UserModel, "profile");
    const info = useLocation().state;

    useEffect(() => {
        if (control) {
            if (info.user === "F")
                control.request(UserModel, m => m.eprofile(info.email));
            else {
                control.setSource(UserModel, { temail: info.email }, "profile");
            }
        }
    }, [control]);

    if (!user.data) return null;

    return (
        <Vista context={ctx} >
            <div className="w100">
                <div className="max-width-md centered padding-sm">
                    <h1 style={{ marginBottom: '0' }} className='py-lg'>Completa il tuo profilo</h1>
                    <StartForm source={user} />
                </div>
            </div>
        </Vista>
    )
}