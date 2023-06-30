import { DataModel as Model } from "essenza";

export function SubscriptionModel() {
    Model.call(this, "data");
  
    this.detail = () => {
      this.ExecuteQuery("detail: [subscription] {*}");
    };
}