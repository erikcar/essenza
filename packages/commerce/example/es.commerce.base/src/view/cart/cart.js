
import { Row, Col, Button } from 'antd';
import React, { useEffect } from 'react';
import { UserModel, useGraph, useModel, useVista, Vista } from 'essenza';
import iuser from '../../assets/icon/user-ss.png';
import { LabelView } from '../../component/Viewer';

function Controller(c) {
    c.skin = CartItem;
}

export function CartItem({source}) {
    const [model, control] = useModel(CartItem, Controller);
    //Optional può avere comandi
    const data = source.data;

    return (
        <div className="shadow-lg md:container md:mx-auto mx-1 my-4">
            <h3>{data.title}</h3>
            <h3>{data.company}</h3>
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