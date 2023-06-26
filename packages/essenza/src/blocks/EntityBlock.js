import { Block } from "@essenza/core";

export const entityTask = {

}

export function EntityBlock(fields, intent, context, event, control) {
    Block.call(this, intent, context, event, control);
    
    this.data = {};
    
    this.onFields = function (fields) {
        this.data.fields = fields;
        return this.pipe(({ data, flow }) => {
            if (("," + fields.trim() + ",").indexOf("," + data.field + ",") === -1) flow.BreakBlock();
        })
    }

    this.hasValue = function () {
        return this.pipe(({ data, flow, blockdata }) => {
            const fields = blockdata.fields?.split(",");
            const values = data.values;
            if (fields) {
                for (let k = 0; k < fields.length; k++) {
                    if (!values[fields[k]]) {
                        flow.BreakBlock();
                        break;
                    }
                }
            }
            else{
                flow.BreakBlock();
            }
        })
    }

    if(fields) this.onFields(fields);
}