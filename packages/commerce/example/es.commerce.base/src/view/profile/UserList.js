import { Button, Table } from 'antd';

import React from 'react';
import { useModel } from 'essenza';

function Controller(c) {
    c.skin = UserList;
    c.intent = {
        EDIT: ({value}) => {
            c.source("users").item = value;
            c.navigate("userform", { state: { label: 'Aggiorna', isUpdate: true  } });
        },

        UPDATE: (item, { value, node, field }) => {
            console.log("USER TYPE", value)
            node.mutate(field, value, item);
            node.save();
        },

        DELETE: ({ value: source, data }) => {
            c.openPopup("Sei sicuro di voler eliminare l'utente selezionato?", "Elimina", 400, {
                onconfirm: () => {
                    source.remove(data);
                }
            });
        },
    }
}

export function UserList({ source }) {
    const [model] = useModel(UserList, Controller);
    console.log("USER-LIST", source);
    return (
        <div className="scrolling-section-104">
            <Table rowKey="id" columns={UserCols(model, source)} dataSource={source?.getData(null, true)} pagination={false} className="setting-table" >
            </Table>
        </div>
    )
}

const users = ["Amministratore", "Operatore", "Partner", "Utente"];
function UserCols(model, source) {
    return [
        {
            title: "Cognome",
            dataIndex: "tsurname",
            key: "id",
        },
        {
            title: "Nome",
            dataIndex: "tname",
            key: "id",
        },
        {
            title: "Email",
            dataIndex: "temail",
            key: "id",
        },
        {
            title: "Ruolo",
            dataIndex: "itype",
            key: "id",
            render: (text, record) => {
                return (<>{users[record.itype]}</>)
            },
            width: "100%"
        },
        {
            key: "id",
            render: (text, record) => {
                return (<Button className='btn-lite' onClick={() => model.emit("DELETE", source, record)}>Elimina</Button>)
            },
        },
        {
            key: "id",
            render: (text, record) => {
                return (<Button className='btn-pri'  onClick={() => model.emit("EDIT", record)} >Modifica</Button>)
            },
        },
    ]
}