//import './style.scss';
import React, { useRef } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';

import { version, Test, AppRoot, useBreakPoint } from 'essenza';

import { AppSchema } from './schema';
import { MainLayout } from './layout/MainLayout';
import { ProfileVista } from './vista/profile/ProfileVista';
import { MobileLayout } from './layout/MobileLayout';
import { LoginVista } from './vista/profile/LoginVista';
import { SigninVista } from './vista/profile/SigninVista';
import { RecoverVista } from './vista/profile/RecoverVista';
import { Welcome } from './vista/Welcome';
import { CheckEmail } from './vista/profile/Signin';
import { SettingVista } from './vista/profile/SettingVista';
import { UserFormVista } from './vista/profile/UserFormVista';
import { HomeVista } from './vista/home';
import { UserVista } from './vista/profile/UserVista';

let initialized = false;

/**
 * 
 * @param {VistaApp} app 
 */
function initApp(app) {

  console.log("INIT APP", app);

  if (!initialized) {
    /*return fetch(window.location.origin + "/app/appsettings.json", { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }).then(r => r.json()).then(r => {
      console.log("CONFIG-DATA", r);
      initialized = true;
    });*/
    initialized = true;
    //Common.initialize(app);
    app.settings.roles = ['Admin']; //Ruoli lable
    app.settings.usertype = 0; //Ruoli (itype) se gestisce più ruoli mettere array
    app.settings.defaultRole = 0; //Ruolo di deforult
    app.settings.defaultRoute = ""; //Default route dell'app ('/' | '/admin')
    app.settings.route =  null; //["/admin","/partner"];//Per ciascun usertype piattaforma corrispondente
    //app.navigate("/settings");
  }

  return null;
}

function onload(app) {

}

/**
 * 
 * @param {VistaApp} app 
 */
function onlogin(app) {
  console.log("ON LOGIN", app);
  app.navigate("/home");
}

function AppController(c) {
  c.skin = App;
  c.command = null;
}

//http://geco.iconsultant.it/  https://localhost:44380/

function App() {
  console.log("APP-PROVIDER-BP", version, Test);
  const nav = useNavigate();
  const [qp] = useSearchParams();
  const token = useRef();
  const breakpoint = useBreakPoint('md');

  return (
    <AppRoot dev token={token} init={initApp} control={AppController} navigator={nav} qp={qp} onlogin={onlogin} baseurl="https://app.praticheamiche.it/" schema={AppSchema}>
      <Routes>
        {breakpoint.md.active
          ? <Route path="/" element={<MainLayout token={token} />}>
            <Route path="home" element={<HomeVista/>} />
            <Route path="settings" element={<SettingVista />} />
            <Route path="userform" element={<UserFormVista />} />
            <Route path="profile" element={<ProfileVista />} />
            <Route path="user" element={<UserVista />} />
          </Route>
          :
          <Route path="/" element={<MobileLayout token={token} />}>
          </Route>
        }
        <Route index element={<Welcome token={token} />} />
        <Route path="login" element={<LoginVista />} />
        <Route path="signin" element={<SigninVista />} />
        <Route path="onsignin" element={<CheckEmail />} />
        <Route path="loginrec" element={<RecoverVista />} />
      </Routes>
    </AppRoot>
  );
}

export default App;
