import React, { useEffect } from 'react';
import { UserModel, useGraph, useModel } from 'essenza';
import iuser from '../../assets/icon/user-ss.png';
import { LabelView } from '../../component/Viewer';
import { SubscriptionModel } from '../../model/SubscriptionModel';
import { Button } from '../../component/button';

function Controller(c) {
    c.skin = SubscriptionView;
    c.intent = {
        PAUSE: ({value, model}) => {
            const state = !value.paused;
            c.request(SubscriptionModel, m => m.pause(state)).then(r => {
                value.paused = state;
                model.refresh();
            });
        }
    }
}

export function SubscriptionView() {
    const [model, control] = useModel(SubscriptionView, Controller);

    const subscription = useGraph(SubscriptionModel, "detail");

    useEffect(() => {
        if (control) {
            control.request(SubscriptionModel, m => m.detail());
        }
    }, [control]);

    const data = subscription.data;
    if (!data) return null;
//5gg prima della consegna non è possibile cambiare stato
//Dettaglio contenuto abbonamento se c'è
    return (
        <div>
            <div>Prossima consegna {}</div>
            <Button onClick={()=>model.emit("PAUSE", data)}>{data.paused ? "Riattiva Abbonamento" : "Metti in pausa"}</Button>
            
        </div>
    )
}
