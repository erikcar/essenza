import { Binding, DataGraph, DataSource, Graph, SourcePath } from "../data/DataGraph";
import { Flow, Observer } from "./flow";
import { ApiService, FileService } from "./service";
import { syncle } from "./support";
import { isString } from "./util";
import { VistaApp } from "./Vista";

function Messenger() {

  this.intents = new Map();

  /**
   * @param {string} event 
   * @param {string} context 
   * @param {function | string} emitter can be vmodel function or vid. if view has vid defined then is the emitter.
   */
  this.Subscribe = function (event, emitter, target, context, control) {
    if(emitter instanceof Observable || isString(emitter)){
      target = emitter;
      emitter = control.skin;
    }

    let flow;
    if (this.intents.has(emitter))
      flow = this.intents.get(emitter);
    else {
      flow = new Flow();
      this.intents.set(emitter, flow);
    }

    return new Observer(flow, {context, event, control, target});
  };
//target
  this.Publish = function (event, value, emitter, task, data, model, context, control, target) {
    const info = {}; // data || {}
    const intents = this.intents;
    return new Promise(function (resolve, reject) {
      const flow = intents.has(emitter)
        ? intents.get(emitter)
        : new Flow();

      info.data = data; //Eventualmente commentare
      info.emodel = model;
      info.estate = model?.state;
      info.control = control;
      info.target = target;
      flow.run(task, value, info, context, emitter, event, target, resolve, reject);
    });
  };

  //DA FARE RAGIONAMENTO PER FUNZIONI NON REFERENZIATE, ANCHE PER FARE UNSCRIBE
  this.Unscribe = function (intent, context, emitter) {
    if (this.intents.has(intent) && this.intents.get(intent).remove(context, emitter)) {
      this.intents.delete(intent);
    }
  };

  this.UnscribeContext = function (context) {
    for (let [key, intent] of this.intents){
      if (intent.remove(context))
          this.intents.delete(key);
    }
    /*for (const key in this.intents) {
      if (Object.hasOwnProperty.call(this.intents, key)) {
        if (this.intents[key].remove(context))
          delete this.intents[key];
      }
    }*/
  }
}

const messenger = new Messenger();

function StateCollection(models) {
  this.source = models;
  this.firstOrDefault = function () {
    if (this.source && this.source.length > 0)
      return this.source[0];
    else
      return null;
  }
}

const sourceHandler = {
  get(target, prop) {
    return DataGraph.findOrCreateGraph(target.etype + "." + prop).source;
  },
  set(target, prop, value) {
    target.root = DataGraph.findOrCreateGraph(target.etype + "." + prop);
    target.root.setData(value); //Gestire anche opzione formatted....
    return true;
  }
};

export function Controller() {
  this.skin = null;
  this.api = null;
  this.navigator = null;
  this.context = null;
  this.contextid = null;
  this.app = null;
  this.popup = null;
  this.model = new Model();
  this.inject = true;

  //quando setto command guardo se per component ( o view ) associata al controller esiste override e apllico eventualmente
  this.intent = { NAVIGATE: (url, state) => { this.navigator(url, state) }, };

  this.navigate = function (url, data) {
    /*if(typeof url !== 'string'){
      state = url.state;
      url = url.path;
    }*/
    if (data && !data.state) data = { state: data };
    this.navigator(url, data)
  };

  /** PER COMPATIBILITA => TBD */
  this.form = function (name) {
    return this.context.getElement(name);
  }

  this.getState = function (skin) {
    skin = skin || this.skin;
    const state = this.context.state.get(skin);
    return new StateCollection(state ? [...state] : null);
  };

  this.validate = async function (model, key) {
    const form = model.getElement(key);
    return form.hasOwnProperty("validate") ? form.validate() : { isValid: false, model: model };
  }

  this.validateAll = async function (skin, key) {
    let state = this.getState(skin).source;
    const result = { isValid: false, model: state };
    if (state) {
      if (state[0].form && state[0].form.hasOwnProperty(key)) {
        result.isValid = true;
        result.validation = [];
        const len = state.length;
        for (const model of state) {
          const r = await model.form[key].validate();
          if (len === 1) {
            r.model = model;
            return r;
          }
          result.isValid &&= r.isValid;
          result.validation.push(r);
        }
      }
    }
    return result;
  }

  this.Subscribe = function (intent, emitter, target) {
    return messenger.Subscribe(intent, emitter === undefined ? this.skin : emitter, target, this.context, this);
  };

  this.publish = function (intent, value, task, data, model) {
    return messenger.Publish(intent, value, this.skin, task, data, model, this.context, this);
  }

  this.execute = function (intent, value, data, model) {
    return this.publish(intent, value, this.intent[intent], data, model).catch((r) => console.log(r));
  }

  this.observe = function (emitter, intent, target) {
    if (!intent) return;
    return this.Subscribe(intent, emitter, target);
  }

  this.ResolveClass = function (classType) {
    return VistaApp.icontainer.ResolveClass(classType);
  }

  this.upload = function (option) {
    const file = VistaApp.icontainer.ResolveClass(FileService);
    return file.Upload(option);
  }

  this.request = function (s, f) {
    let service = VistaApp.icontainer.ResolveClass(s);
    return f(service);
  }

  this.openPopup = function (component, title, width, info) {
    /*if(typeof component === "string")
      component = <div>{component}</div>;*/
    if (this.popup)
      this.popup.open(component, title, width, info); //Deve diventare popup inject o iservice in generale dove c'è navigator, popup ecc.
  }

  this.closePopup = () => { if (this.popup) this.popup.close(); }

  this.show = function (view, info, state, path) {
    path = path || 'formvista';
    info = info || {};
    info.view = view;
    DataGraph.setSource("system.view", info);
    this.navigator(path, state);
  }

  this.source = function(model){
    //TOBE: controllo se c'è un override per model
    return new Proxy({etype: isString(model)? model : VistaApp.icontainer.ResolveClass(model).etype}, sourceHandler);
  }

  this.getGlobal = function (key) {
    return DataGraph.getGlobalState(key);
  }

  this.setGlobal = function (key, value) {
    DataGraph.setGlobalState(key, value);
  }

  this.graph = function (etype) {
    const path = etype.indexOf(":") > -1 ? etype : DataGraph.getSchema(etype);
    return new Graph(path, null, false, null, true).root;
  }

  this.bind = function (obj) {
    if (!obj)
      return obj; // Oppure obj = {} ???

    if (Array.isArray(obj)) {
      for (let k = 0; k < obj.length; k++) {
        obj[k].__tolink__ = true;
      }
    }
    else {
      obj.__tolink__ = true;
    }

    return obj;
  }

  //this.StopFlow = () => BreakFlow;//function() {this.stop = true;}

  this.getSyncle = () => syncle
}


//ViewModel / StateModel
export function Model(vid) {
  this.vid = vid;
  this.control = null;
  this.state = { __val: null, __refresh: null };
  
  this.parent = null;

  this.register = function(key, element){
    if(!this.elements) this.elements = {};
    this.elements[key] = element;
  }

  this.getElement = function(key) { return this.elements? this.elements[key] : null;}

  this.validate = async function (key) {
    const form = this.getElement(key);
    return form.hasOwnProperty("validate") ? form.validate() : { isValid: false, model: this };
  }

  this.ancestor = function(skin){
    let p = this;
    while(p !== undefined){
      if(p.skin === skin) break;
      p = p.parent;
    }
    return p;
  }

  this.rise = function(step){
    let p = this;
    for (let k = 0; k < step; k++) {
      if(!p.parent) break; //Restituisco root
      p = p.parent;
    }
    return p;
  }

  this.find = function(path, element){
    if(!Array.isArray(path)) path = [path];

    let child = this.child;

    for (let k = 0; k < path.length; k++) {
      const node = path[k];
      while(child){
        if(child.skin === node || child.vid === node) return child && element? child.elements[element] : child;
        child = child.brother;
      }
      if(!child) break;
    }

    return null;
  }

  this.read = function (m, f) {
    let model;
    if (f) {
      model = VistaApp.icontainer.ResolveClass(m);
      return f(model);
    }
    else {
      model = new DataModel();
      return m(model);
    }
  }

  this.emit = function (intent, value, data) {
    return this.control.execute(intent, value, data, this);
    //messenger.Publish(intent, value, this.skin, task, data, model, this.context, this);
  }

  this.request = function (m, f) {
    return this.read(m, f);
  }

  this.initSchema = function (schema, validators) {
    if (!schema || !validators || !Array.isArray(validators)) return null;
    const obj = {}
    validators.forEach((v) => v(schema, obj));
    return obj;
  }

  this.getGlobal = function (key) {
    return DataGraph.getGlobalState(key);
  }

  this.setGlobal = function (key, value) {
    DataGraph.setGlobalState(key, value);
  }

  //this.setSource = function (path, source) { DataGraph.setSource(path, source); }

  this.setSource = function (path, source, name) {
    return this.source(path, name, source);
  }

  this.getSource = function (path) { return DataGraph.getSource(path); }

  this.source = function (etype, name, data) {
    let path;
    let root;
    if (Object.prototype.toString.call(etype) !== "[object String]") {
      const m = VistaApp.icontainer.ResolveClass(etype);
      path = m.etype + "." + (name || "temp");
    }
    else
      path = etype + "." + (name || "temp");

    root = DataGraph.findOrCreateGraph(path);

    if (data)
      root.setData(data)

    const s = new DataSource(data, root);
    s.binding = new Binding();
    return s;
  }

  this.setItem = function (model, item) {
    const m = VistaApp.icontainer.ResolveClass(model);
    DataGraph.setSource(m.etype + '.' + m.itemName(), item);
  }

  this.addData = function (source, data, parent, format) {
    data = data || {};
    //if(format === undefined) format = true;
    source.node.addData(data || {}, parent, format, true);
    return data;
  }

  this.refresh = function (path) {
    this.state.__refresh(!this.state.__val);
    /*const n = DataGraph.findGraph(path);
    if (n) n.notify();*/
  }
}

export function DataModel(etype, defaultOption) {
  ApiService.call(this, defaultOption);

  this.etype = etype;

  this.itemName = () => "item";

  this.ExecuteQuery = (query, params, permanent) => {
    return new Graph(query, params, permanent).ExecuteQuery();
  };

  this.list = function (condition, permanent, schema, complete) { //Select da schema senza filgi di default e se si vuole cambiare query?
    return new Graph(null, null, permanent).fromSchema(this.etype, "list", true, condition, complete, schema).ExecuteQuery();
  };

  this.item = function (pk) { //Completo da schema
    return new Graph(null, { id: pk }).fromSchema(this.etype, "item", false, "id=@id", true).ExecuteQuery();
  };

  this.Where = (condition, params, complete, schema) => {
    return new Graph(null, params).fromSchema(this.etype, complete ? "item" : "list", condition, complete, schema).ExecuteQuery();
  };

  this.GraphQuery = function (query, params, op, permanent) {
    let opt;
    if (typeof op === 'string')
      opt = { apiOp: op };
    else if (op)
      opt = op;

    let path;
    /*if (schema.charAt(0) === '[') {
      path = '[' + this.etype + ']' + '.' + schema.substring(1,schema.length-1);
    }
    else {
      path = schema.indexOf(':') > -1 ? schema : this.etype + '.' + schema;
    }*/

    const graph = new Graph(query, params, permanent);
    console.log("GRAPH-PARSE-WITH-SCHEMA", graph);
    return graph.ExecuteQuery(opt);
  };

  this.GraphApi = function (schema, params, op, permanent) {
    let opt;
    if (typeof op === 'string')
      opt = { apiOp: op };
    else if (op)
      opt = op;

    let path;
    if (schema.charAt(0) === '[') {
      path = '[' + this.etype + ']' + '.' + schema.substring(1,schema.length-1);
    }
    else {
      path = schema.indexOf(':') > -1 ? schema : this.etype + '.' + schema;
    }

    const root = DataGraph.findOrCreateGraph(path, null);
    root.graph.params = params;
    root.graph.permanent = permanent;
    console.log("GRAPH-PARSE-WITH-SCHEMA", root.graph);
    return root.graph.ExecuteApi(opt);
  };

  this.getMutation = el => {
    if (Array.isArray(el)) {
      const mutated = [];
      for (let i = 0; i < el.length; i++) {
        const data = DataGraph.getMutation(el[i]);
        if (data)
          mutated.push(data);
      }
      return mutated;
    }
    else {
      return DataGraph.getMutation(el);
    }
  }
}

/*DataModel.register = function(type, etype, option){
  type.prototype = new DataModel(etype, option);
}*/

function ModelMap(){
  this.root = null;
  this.parent = null;
  this.last = null;

  this.link = function(model){
    if(this.root === null){
      this.root = model;
      model.parent = undefined;
    }
    else if(model.parent === null){ //if(this.parent){
      if(this.parent.child){
        model.brother = this.parent.child;
      }
      this.parent.child = model;
      model.parent = this.parent;
    }
    console.log("MODEL-MAP-LINK", model.skin.name);
    this.parent = model; //Lo faccio in modo separato?
  }

  this.unlink = function(model){
    console.log("MODEL-MAP-UNLINK", this.parent?.skin.name);
    this.parent = this.parent?.parent;
  }

}

var uuid = 0;
export function Context(name) {
  //DataContext.call(this, name);
  uuid++;
  this.id = uuid;
  this.name = name;// + uuid;
  this.elements = {};
  this.controls = new Map();
  this.app = null;
  //this.state = new Map();
  this.initialized = false;
  this.inject = true;

  this.map = new ModelMap();

  this.registerElement = function (name, element) {
    this.elements[name] = element;
  }

  this.getElement = function (name) {
    return this.elements[name];
  }
  /**
   * 
   * @param {function } controller 
   */
  this.getControl = function (controller) {
    if (!controller) return null;
    if (!this.controls.has(controller)) {
      const c = VistaApp.icontainer.ResolveClass(Controller);
      c.contextid = this.name;
      c.context = this;
      controller(c);
      this.controls.set(controller, c);
    }
    return this.controls.get(controller);
  }

  /**
   * 
   * @param {function } controller 
   */
  this.getController = function (skin, controller) {
    if (!skin) return null;
    if (!this.controls.has(skin)) {
      const c = VistaApp.icontainer.ResolveClass(Controller);
      c.contextid = this.name;
      c.context = this;
      controller(c);
      this.controls.set(skin, c);
    }
    return this.controls.get(skin);
  }

  this.setController = function (skin, controller, locked) {
    if (!locked || !this.controls.has(skin)) {
      const c = VistaApp.icontainer.ResolveClass(Controller);
      c.contextid = this.name;
      c.context = this;
      controller(c);
      this.controls.set(skin, c);
      return c;
    }
    return null;
  }

  this.register = function (skin, model) {
    model.skin = skin;
    this.map.link(model);
    return model;
  }

  this.unregister = function (skin, model) {
    /*if(model === model.parent.child) model.parent.child = model.brother;
    else{
      let child = model.parent.child;
      while(child.brother !== model){ //Getione caso non esiste come child(che dovrebbe essere impossibile)
        child = child.brother;
      }
      child.brother = model.brother;
    }*/
  }

  this.dispose = function () {
    messenger.UnscribeContext(this);
    this.controls.clear();
    console.log("CONTEXT DISPOSE", this.name);
  }
}

export function Observable(model, name){
  this.model = model;
  this.name = name;
  this.emit = function(event, value, data, task){
    return messenger.Publish(event, value, this.model.skin, task, data, this.model, this.model.control.context, this.model.control, {key: this.name, current: this});
  }

  this.observe = function(event){
    messenger.Subscribe(event, this.model.skin, {key: this.name, current: this},  this.model.control.context, this.model.control);
  }
}

export function emitter(name) {
  this.name = name;
  this.observable = null;

  this.emit = function (info) {
    info.emitter = this.name;
    if (this.observable)
      this.observable.notify(info);
  }
}
