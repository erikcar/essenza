import { Row, Col, Button } from 'antd';
import React, { useEffect } from 'react';
import { UserModel, useGraph, useModel, useVista, Vista } from 'essenza';
import iuser from '../../assets/icon/user-ss.png';
import { LabelView } from '../../component/Viewer';

function Controller(c) {
    c.skin = UserView;
}

export function UserView() {
    const [model, control] = useModel(UserView, Controller);

    const user = useGraph(UserModel, "profile");

    useEffect(() => {
        if (control) {
            control.request(UserModel, m => m.profile());
        }
    }, [control]);

    if (!user.data) return null;

    return (
        <div className="shadow-lg md:container md:mx-auto mx-1 my-4 bg-gradient-to-b from-zinc-50 to-gray-200">
            <img src={iuser} className="mx-auto my-2" alt="Utente"></img>
            <h2 className='mb-4 text-center text-2xl font-extrabold tracking-tight text-gray-900 '>{user.data.tsurname + ' ' + user.data.tname}</h2>
            <LabelView items={[{label: 'EMAIL', content: user.data.temail}, {label: 'TELEFONO', content: user.data.tphone} ]} />
            {/* <div className='flex justify-evenly flex-wrap text-center'>
                <div className="grid grid-rows-2 gap-2 mb-2">
                    <div>EMAIL</div>
                    <div>{user.data.temail}</div>
                </div>
                <div className="grid grid-rows-2 gap-2 mb-2">
                    <div>TELEFONO</div>
                    <div>{user.data.tphone}</div>
                </div>
            </div> */}
            <h2 className='mb-4 text-center text-2xl font-extrabold tracking-tight text-primary '>PREFERENZE</h2>
        </div>
    )
}