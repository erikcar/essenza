import { Row, Col, Button } from 'antd';
import React, { useEffect } from 'react';
import { UserModel, useGraph, useModel, useVista, Vista } from 'essenza';
import { ProfileForm } from '../../view/profile/ProfileForm';

function ProfileVistaController(c) {
    c.skin = ProfileVista;
}

export function ProfileVista() {
    const [ctx, model, control] = useVista(ProfileVista, ProfileVistaController);

    const user = useGraph(UserModel, "profile");
    
    useEffect(() => {
        if (model) {
            model.request(UserModel, m => m.profile());
        }
    }, [model]);

    if (!user.data) return null;

    return (
        <Vista context={ctx} >
            <div className="w100">
                <div className="max-width-md centered padding-sm">
                    <Row className=' padding-sm' align='middle'>
                        {/* <Col><h1 className="spacing-b10"><span className="pointer" onClick={()=>control.navigate(-1)}>&lt;</span></h1></Col> */}
                        <Col flex="auto"><h1 style={{ marginBottom: '0' }} className='pt-md pb-sm'>Gestisci il tuo profilo</h1></Col>
                        <Col flex="none" >
                            <Button className='btn-lite' onClick={() => control.navigate(-1)}>
                                Torma alla App
                            </Button>
                        </Col>
                    </Row>
                    <ProfileForm source={user} />
                    <div className="ec-form bg-block radius-md my-lg padding-xl text-center">
                        <Button className='btn-dark' onClick={() => control.navigate('/')}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </Vista>
    )
}