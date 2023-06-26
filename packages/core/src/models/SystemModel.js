import { DataModel } from "../core/system";
import { AppConfig } from "../core/Vista";

export function SystemModel() {
  DataModel.call(this, "system");
}

export function AppModel(etype) {
    
    DataModel.call(this, etype || "app");
  
    this.login = (user, password) => {
      return this.ExecuteApi("login", { username: user, password: password }, { apiUrl: AppConfig.serviceRoute });
    }

    this.elogin = (user, password, itype) => {
      return this.ExecuteApi("elogin", { username: user, password: password, itype: itype || 0 }, { apiUrl: AppConfig.serviceRoute });//, excludeParams: true
    }
  
    this.platformin = (user, password, itype) => {
      return this.ExecuteApi("platformin", { username: user, password: password, itype: itype || 0 }, { apiUrl: AppConfig.serviceRoute });//, excludeParams: true
    }

    this.testupload = () => {
      return this.ExecuteApi("testupload");
    }
  
    this.test = (data) => {
      return this.ExecuteApi("jlesson", data);
    }
  
    this.signin = (email, password) => {
      return this.ExecuteApi("esignin", { email: email, password: password }, { apiUrl: AppConfig.serviceRoute });
    }
  
    this.invitein = (user, route) => {
      const data = this.getMutation(user);
      data.route = route || '';
      /*const info = { tname: user.tname, tsurname: user.tsurname, temail: user.temail, itype: user.itype,  route: route || '' };
      if(user.hasOwnProperty("tbusinessname"))
        info.tbusinessname = user.tbusinessname;
      if(user.hasOwnProperty("idplatform"))
        info.idplatform = user.idplatform;*/
      return this.ExecuteApi("invitein", data, { apiUrl: AppConfig.serviceRoute });
    }
  
    this.passwordRequest = (email, route) => {
      return this.ExecuteApi("passrequest", {email:email, route: route}, { apiUrl: AppConfig.serviceRoute });
    }
  
    this.passwordReset = (request) => {
      return this.ExecuteApi("passreset", request, { apiUrl: AppConfig.serviceRoute });
    }
  
    this.changePassword = (user) => {
      return this.ExecuteApi("passchange", { currentPassword: user.tpassword, newPassword: user.npassword }, { apiUrl: AppConfig.serviceRoute });
    }
  
    this.updateProfile = (user) => {
      return this.ExecuteApi("updateprofile", this.getMutation(user), { apiUrl: AppConfig.serviceRoute });
    }

    this.createProfile = (user, emailed) => {
      const data = this.getMutation(user);
      if(emailed) data.temail = user.temail;
      return this.ExecuteApi("createprofile", data, { apiUrl: AppConfig.serviceRoute });
    }
    
    this.validate = (token) => {
      return this.ExecuteApi("validate", { token: token }, { apiUrl: AppConfig.serviceRoute }).catch(e => console.log(e));
    }
  
    this.checkSession = (app) => {
      return this.ExecuteApi("session", null, { apiUrl: AppConfig.serviceRoute }).then(r => {
        if (r === 'NACK')
          app.navigate("/login");
        else
          app.onlogin(r);
      }).catch(() => app.navigate("/login"));
    }
  }

  export function UserModel() {
    DataModel.call(this, "users");
  
    this.list = (condition) => {
      if(condition) 
        condition = ' && ' + condition ;
      else
        condition = '';

      return this.GraphQuery('list: [users] (itype>-1 ' + condition + ' ) {*, -O itype#tsurname#temail }');
    }

    this.platformList = (permanent) => {
      return this.GraphApi(`list: [users] {*}`, null, "platformuser", permanent);
    }

    this.partnerList = (permanent, itype) => {
      itype = itype || 2;
      return this.GraphApi(`partners: [users] {*}`, {itype: itype}, null, permanent);
    }
  
    this.profile = () => {
      return this.GraphApi("profile: users");
    }

    this.eprofile = (email) => {
      return this.GraphApi("profile: users", {email: email}, "eprofile");
    }

  }