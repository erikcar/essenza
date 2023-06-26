import { Col, Row } from "antd";
import {Vista, useVista} from "essenza";
import LoginScreen from '../../assets/img/login.jpg';
import { Login } from "../../view/profile/login_form";
import { Logo } from "../../layout/logo";

function LoginVistaController(c) {
    c.skin = LoginVista;
}
/**
 * 
 * mode 0 => Login se corrisponde user e password
 * mode 1 => Login se appartiene a uno degli user specificato role (Array)
 * mode 2 => Login se appartiene a uno degli user specificato role (Array), ma gestisce anche la piattaforma di appartenenza (idplatform)
 * @returns 
 */
export function LoginVista() {
    const [ctx] = useVista(LoginVista, LoginVistaController);
    return (
        <Vista context={ctx} >
            <div className='w100 '>
                <div className='max-width-xl centered'>
                    <Row className='max-width-xl h-main padding-sm' align="middle">
                        <Col span={0} md={12} className="">
                            <div>
                                <img src={LoginScreen} className="radius-md h-md" style={{ width: "auto" }} alt="Etna Cover"></img>
                            </div>
                        </Col>
                        <Col span={24} md={12} className="bg-block padding-xl h-md radius-md">
                            <Logo className="mb-lg" />
                            <h1 className="my-lg">
                                Login App!
                            </h1>
                            <Login nosignin role={[0,1,2,3,4]} mode={0} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Vista>
    )
}