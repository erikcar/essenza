import { ApiService } from "essenza";

export function AppService() {
  ApiService.call(this);

  this.test = (message) => {
    return this.ExecuteApi("test_api", {value: message});
  };

}