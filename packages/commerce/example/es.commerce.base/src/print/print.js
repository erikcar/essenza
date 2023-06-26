import './print.scss';
import {Col, Row } from "antd";
import React from "react";

/** THIS IS AN EXAMPLE */
export const PrintAgenda = React.forwardRef(({ visits, type }, ref) => {
    let day;
    let start;
    return (<div ref={ref} style={{ width: '100%' }} className="container">
        {type === 1 && <div className="p-value" style={{ marginTop: '12px' }}>MEDICINA SPORTIVA</div>}
        {
            visits && type === 1
                ? visits.map((visit) => {
                    console.log("PRINT-VISIT", visit);
                    if (visit.branca !== 1) return null;
                    start = new Date(visit.StartTime);
                    let printday = day !== start.getDate();
                    day = start.getDate();

                    return (<>
                        {printday && <div className="p-value" style={{ marginTop: '12px' }}>{start.toLocaleString('it-IT', { 'weekday': 'long', 'month': 'long', 'day': '2-digit' }).toUpperCase()}</div>}
                        <Row className="w100" style={{ marginTop: '12px' }}>
                            <Col style={{ color: 'black' }} className="p-value" span={24}>
                                {start.toLocaleString('it-IT', { hour: 'numeric', minute: 'numeric', }) + ' - ' + new Date(visit.EndTime).toLocaleString('it-IT', { hour: 'numeric', minute: 'numeric', }) + ' ' + visit.Subject}
                                <span>{visit.detail}</span>
                            </Col>
                        </Row>
                    </>)
                }
                )
                : null}
        {type === 2 && <div className="p-value" style={{ marginTop: '12px' }}>FISITERAPIA</div>}
        {
            visits && type === 2
                ? visits.map((visit) => {
                    console.log("PRINT-VISIT", visit);
                    if (visit.branca !== 2) return null;
                    start = new Date(visit.StartTime);
                    let printday = day !== start.getDate();
                    day = start.getDate();
                    return (<>
                        {printday && <div className="p-value" style={{ marginTop: '12px' }}>{start.toLocaleString('it-IT', { 'weekday': 'long', 'month': 'long', 'day': '2-digit' }).toUpperCase()}</div>}
                        <Row className="w100" style={{ marginTop: '12px' }}>
                            <Col style={{ color: 'black' }} className="p-value" span={24}>
                                {start.toLocaleString('it-IT', { hour: 'numeric', minute: 'numeric', }) + ' - ' + new Date(visit.EndTime).toLocaleString('it-IT', { hour: 'numeric', minute: 'numeric', }) + ' ' + visit.Subject}
                                <span>{visit.detail}</span>
                            </Col>
                        </Row>
                    </>)
                }
                )
                : null}
    </div>)
})