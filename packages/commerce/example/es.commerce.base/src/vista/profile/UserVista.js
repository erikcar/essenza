import { Row, Col, Button } from 'antd';
import React, { useEffect } from 'react';
import { UserModel, useGraph, useModel, useVista, Vista } from 'essenza';
import iuser from '../../assets/icon/user-ss.png';

function Controller(c) {
    c.skin = UserVista;
}

export function UserVista() {
    const [ctx, model, control] = useVista(UserVista, Controller);

    const user = useGraph(UserModel, "profile");
    
    useEffect(() => {
        if (model) {
            model.request(UserModel, m => m.profile());
        }
    }, [model]);

    if (!user.data) return null;

    return (
        <Vista context={ctx} >
                <div className="shadow-lg md:container md:mx-auto mx-1 my-4 bg-gradient-to-b from-zinc-50 to-gray-200">
                    <img src={iuser} className="mx-auto my-2" alt="Utente"></img>
                    <h2 className='mb-4 text-center text-2xl font-extrabold  tracking-tight text-gray-900 '>{user.data.tsurname + ' ' + user.data.tname}</h2>
                </div>
        </Vista>
    )
}