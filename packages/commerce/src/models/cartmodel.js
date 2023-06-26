import { DataModel  } from "essenza";

export function CartModel(etype){
    DataModel.call(this, etype || "cart");

    this.add = (item) => {
        this.ExecuteApi("add: cart {*}", {item: item});
    };

    this.remove = (item) => {
        this.ExecuteApi("remove: cart {*}", {item: item});
    };
}