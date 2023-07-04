import { ArrayRemove } from "../core/util";
import { GraphNode } from "./DataGraph";

/** 
 * @constructor
 * @returns {undefined}
*/
export function DataObject() {
    this.data = undefined;
    /**@type {GraphNode} */
    this.node = undefined;
    this.parent = undefined;
    this.owner = undefined;

    this.build = function (data, node, parent, derived) {
        if(!data && node.isCollction) data = []; 
        const ds = new DataObject();
        ds.data = data; //Gestire caso collection data null?
        ds.parent = parent;
        ds.node = node;
        ds.owner = derived ? this.owner : this;

        return Array.isArray(data) ? new DataCollection(ds) : ds;
    }

    this.get = function (name) {
        return this.build(this.data ? this.data[name] : null, this.node.getChild(name), this.data);
    }

    this.set = function (value, formatted, notrack) {
        this.node.setData(value, this.parent, false, formatted, notrack);
    }

    this.format = function (data, deep, notrack) {
        data = data || this.data;
        //if (notrack === undefined) notrack = true;
        deep ? this.node.deepFormat(data, this.parent, notrack) : this.node.formatData(data, this.parent, notrack);
    }

    this.temp = function (value, unshift) {
        value.__temp__ = 'T';
        value.__unshift = unshift;
        return this.build(value, this.node, this.parent, true);
    }

    this.defaultValue = function (value) {
        return this.data ? this : this.temp(value);
    }

    this.clone = (data) => this.build(data || this.data, this.node, this.parent, this.derived);
}

/**
 * 
 * @param {DataObject} source 
 */
export function DataCollection(source) {
    if (!source) throw new Error('DataCollection must define a source.');

    Object.defineProperty(this, "data", {
        get() {
            return source.data;
        }
    });

    /*BINDING SECTION - set/add object, format e temp management */
    
    this.format = function (data, deep, notrack) {
        source.format(data, deep, notrack);
    }

    /** 
     * default and temp can be object or collection (value is array)
     * */
    this.temp = function (value, unshift) {
        if (Array.isArray(value)) {
            value.forEach(v => {
                v.__temp__ = 'T';
                v.__unshift = unshift;
            })
        }
        else {
            value.__temp__ = 'T';
            value.__unshift = unshift;
        }

        return source.build(value, source.node, source.parent, true);
    }

    this.defaultValue = function (value) {
        return source.data ? this : this.temp(value);
    }

    //Fixed
    this.always = function (value) {
        value.__temp__ = 'F'
        source.data = { ...source.data || [], value }
        return this;
    }

    /** si dovrebbe aggiornare tramite node.notify() */
    this.add = function (value, unshift, formatted, notrack) {
        source.node.setData(value, source.parent, true, formatted, notrack, unshift);
    }

    /** si dovrebbe aggiornare tramite node.notify() */
    this.remove = function (value, deferred) {
        source.node.remove(value, source.parent, deferred);
    }
    /* END BINDING SECTION*/


    /* COLLECTION SECTION */
    this.filter = function (predicate) {
        return source.build(source.data?.filter(predicate), source.node, source.parent, true);
    }

    this.find = function (predicate) {
        return source.build(source.data?.find(predicate), source.node, source.parent, true);
    }

    this.map = function (callback) {
        let ar;
        if (source.data) {
            ar = [];
            for (let k = 0; k < source.data.length; k++) {
                ar.push(callback(source.build(source.data[k], source.node, source.parent, true), source.data[k], k));
            }
        }
        return ar;
    }

    this.at = function (index) {
        if (source.data && source.data.length > index) {
            return source.build(source.data[index], source.node, source.parent, true);
        }
        return source.clone();
    }

    this.first = function () {
        return this.at(0);
    }

    this.last = function () {
        return this.at(source.data?.length - 1);
    }

    /* END COLLECTION SECTION */
}


/** 
 * @constructor
 * @this DataObject 
 *  
 * */
export function DataCollectionOld() {
    DataObject.call(this);

    /* BINDING SECTION - set/add object, format e temp management*/
    this.defaultValue = function (value) {
        return this.data ? this : this.temp([value]);
    }

    //Fixed
    this.always = function (value) {
        value.__temp__ = 'F'
        this.data = { ...this.data || [], value }
        return this;
    }

    /** si dovrebbe aggiornare tramite node.notify() */
    this.add = function (value, unshift, formatted, notrack) {
        this.node.setData(value, this.parent, true, formatted, notrack, unshift);
    }

    /**TO IMPLEMENT */
    this.remove = function (value) {
        value = value || this.data;
        ArrayRemove(this.data, value);
        this.node.delete(value, this.parent);
    }
    /* END BINDING SECTION*/


    /* COLLECTION SECTION */
    this.filter = function (predicate) {
        return this.build(this.data?.filter(predicate), this.node, this.parent, true);
    }

    this.find = function (predicate) {
        return this.build(this.data?.find(predicate), this.node, this.parent, true);
    }

    this.map = function (callback) {
        let ar;
        if (this.data) {
            ar = [];
            for (let k = 0; k < this.data.length; k++) {
                ar.push(callback(this.build(this.data[k], this.node, this.parent, true), this.data[k], k));
            }
        }
        return ar;
    }

    this.at = function (index) {
        if (this.data && this.data.length > index) {
            return this.build(this.data[index], this.node, this.parent, true);
        }
        return this.clone();
    }

    this.first = function () {
        return this.at(0);
    }

    this.last = function () {
        return this.at(this.data?.length - 1);
    }

    /* END COLLECTION SECTION */
}
