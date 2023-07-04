import { isString } from "../utils/utils";
import { axiosChannel } from "../service/channels/AxiosChannel";
import { Apix } from "../service/Apix";
import { SqlGraph } from "./interpreters/ISql";
import { checkGroup, checkToken, GraphParser, searchData } from "./GraphSupport";
import { ArrayRemove, isEmpty } from "../core/util";
//import { openPopup } from "../components/Popup";


function EmptyData() {
}

function Entity(schema) {
  this.schema = schema; // key -> Link || defaultSchema
  this.relations = null;
  this.sources = new Set();
  this.etype = schema.etype;
  this.index = 0;

  this.getNode = function (name, context, any) {
    let ds = this.sources[context ? name + '@' + context : name];
    console.log("Entity GET NODE", this.etype, name, context, ds, any);
    if (!ds && any && context)
      ds = this.source[name];
    return ds;
  }

  this.shareNode = function (node) {
    console.log("ENTITY SHARE SOURCE", this.etype, node.name, node.source, node.sourceName());
    if (!this.sources.has(node))
      this.sources.add(node);
  }

  this.unshareNode = function (node) {
    console.log("ENTITY UNSHARE SOURCE", this.etype, node.name, node.source, node.sourceName());
    this.sources.delete(node);
  }

  /**
   * Questo deve farlo direttamente node
   * @param {GraphNode} node 
   */
  this.setSource = function (node, context) {
    console.log("SET SOURCE", this.etype, node.name, context, node.source, node.sourceName());
    let name = context ? node.name + '@' + context : node.name;//node.sourceName();
    this.sources[name] = node;
    /**
     * @type {GraphNode}
     */
    let ds = this.sources[name];

    console.log("SET SOURCE NAME", name, ds);

    if (ds && node.isRoot()) { //&& node.isRoot()
      node.observers = ds.observers;
      //this.sources[name] = node;
      //Devo fare clear di node mutation per il source? ovvero remove source e mutaion map
      //ds.setSource(node.source);
      console.log("SET SOURCE NOTIFY")
      node.notify();
    }

    this.sources[name] = node;
  }

  this.removeSource = (name) => {
    let sources = this.sources;
    let ds = sources[name];
    if (ds) {
      ds.traverse(function (node) {
        DataGraph.getEntity(node.etype).source[node.sourceName()] = null;
      }, true);

      if (ds.isRoot())
        DataGraph.unregisterGraph(ds.graph);

      this.sources[name] = null; //Delete property?
    }
  }

  this.nextIndex = function () {
    return --this.index;
  }

  this.syncronize = function (item) {
    console.log("SYNC SOURCES", this.sources);
    let source;
    for (const key in this.sources) {
      source = this.sources[key];
      if (source instanceof GraphNode) {
        console.log("SYNC SOURCE", key, source);
        source.syncronize(item);
      }
    }
  }

  this.subscribe = function (name, observer) {
    console.log("ENTITY SUBSCRIBE ", name, this);
    this.getNode(name).observe(observer);
  }

  this.unscribe = function (name, observer, permanent) {
    let empty = this.getNode(name).unobserve(observer);
    console.log("UNSCRIBE ", name, permanent)
    if (empty && !permanent) {
      this.removeSource(name);
    }
  }

  this.clear = function () {
    for (const key in this.sources) {
      if (Object.hasOwnProperty.call(this.sources, key)) {
        const obs = this.sources[key].observers;
        let active = false;
        for (let i = 0; i < obs.length; i++) {
          if (obs[i].active) {
            active = true;
            break;
          }
        }
        if (!active) {
          this.removeSource(key);
        }
      }
    }
  }

  this.createGraph = function (sourceName) {
    let graph = new Graph();
    let query = (sourceName || "") + ": " + this.etype + "{*";
    if (this.schema) {
      for (const key in this.schema) {
        if (key !== "primarykey") {
          query += ", " + key + ": " + this.schema[key].etype + "(*)";
        }
      }
    }
    query += "}";
    graph.query = query;
    return graph;
  };
}

export function Graph(query, params, permanent, context, deep) {
  /**
   * @type {GraphNode}
   */
  this.root = null;
  this.query = query;
  this.interpreted = null;
  this.params = params;
  this.typedef = null;
  this.parameters = null;
  this.context = context;
  this.permanent = permanent;
  this.uid = null;
  this.key = 0; //Deve essere string perchè non si può rischiare due risultati diversi
  this.keyp = 0;
  this.nonQuery = false;
  this.isCollection = false;
  this.deep = deep;
  /**
   * @type {number}
   * Cache strategy of Graph Source. Default rule clean data source when no observer are observing graph.
   */
  this.cacheRule = 0;

  this.getKey = function () {
    if (this.root)
      return this.root.getKey()
    else
      throw new Error("getKey error: Graph not parsed.")
  }

  this.parse = function () {
    if (!this.query) return false;
    if (this.root === null) {
      this.root = GraphParser(this);
      this.share();
      DataGraph.registerGraph(this);
    }
    return true;
  };

  this.share = function () {
    this.root.traverse((node) => {
      DataGraph.shareNode(node);
    }, true);
  }

  this.unshare = function () {
    this.root.traverse((node) => {
      DataGraph.unshareNode(node);
    }, true);
  }

  this.absorb = function (graph) {
    if (graph.root && this.root) {
      this.root.observers = graph.root.observers;//this.root.observers.concat(...graph.root.observers);
      console.log("ABSORB", graph.root.observers, this.root.observers);
    }
  }

  this.GenerateSource = function (option) {
    this.parse();
    if (this.parameters) {
      //Calculate keyp
    }
    //return new dataRequest2(this, option).Execute().then(r => this.root.source = r);
    //return this.root.source;
  }
  /**
   * 
   * @param {*} etype 
   * @param {*} name 
   * @param {*} isCollection 
   * @param {*} condition 
   * @param {*} complete 
   * @param {*} schema 
   * @returns {Graph}
   */
  this.fromSchema = function (etype, name, isCollection, condition, complete, schema) {
    this.isCollection = isCollection;
    this.deep = complete;
    this.condition = condition;
    this.query = DataGraph.getSchema(new SourcePath(name + ":" + etype), schema);
    console.log("FROM SCHEMA", this.query);
    return this;
  }

  this.ExecuteQuery = (option) => {
    if (!this.parse())
      return Promise.reject("Query non impostata o formalmente errata.")

    const root = this.root;
    let table = DataGraph.getEntity(root.etype);
    option = DataGraph.formatOption(option, table);
    let int = option.interpreter || DataGraph.getInterpreter(option.etype);
    this.interpreted = int.translate(this);

    console.log("EXECUTE QUERY ", root.condition, this.interpreted, this.typedef, this.parameters, option.op);

    let ds = table.getNode(root.name || DataGraph.config.defaultSource || "data");
    //Come confronto condition???
    if (ds && ds.Equal(root)) //Non rendirizzo di nuovo è la stesso source
    {
      //deve avere stesse condizioni e stessa struttura
      ds.notify(root.condition, ds.source);//???
      return Promise.resolve(ds.source);
    }
    else {
      let data = { interpreted: this.interpreted, typedef: this.typedef };
      if (this.parameters)
        data.parameters = this.parameters;
      return Apix.call(option.dataOp, data, option).then((result) => {
        console.log("DATA REQUEST" + root.etype + "." + root.name + " RESULT:", result);
        root.source = result.data;
        return result.data;
      }, er => { console.log("ERROR Graph ExecuteQuery", er); throw er; });
    }
  };

  this.ExecuteApi = function (option) {
    if (!this.parse())
      return Promise.reject("Struttura Graph non impostata o formalmente errata.");

    const root = this.root;
    let table = DataGraph.getEntity(root.etype);
    option = DataGraph.formatOption(option, table);
    return Apix.call(option.apiUrl + (option.apiOp || root.name), this.params, option).then((result) => {
      console.log("DATA REQUEST" + root.etype + "." + root.name + " RESULT:", result);
      const source = result.data;
      root.source = source;

      if (option.many && root.children) {
        let graph;
        let node;
        for (let k = 0; k < root.children.length; k++) {
          node = root.children[k];
          graph = new Graph();
          graph.root = node;
          DataGraph.registerGraph(graph);
          node.source = source[node.name];
        }
      }
      return result.data;
    }, er => { console.log("ERROR Graph ExecuteQuery", er); throw er; });
  };

  this.ShareSource = function (option) {
    let source = this.GenerateSource(option);
    if (this.root.name !== "") {
      let root = this.root;
      DataGraph.getEntity(root.etype).setSource(root.name, this.getKey(), root);
      root.traverse(function (node) {

      }, true);
    }
    return source;
  };

  this.clear = function () {
    //Clear DataSource Three
    DataGraph.unregisterGraph(this);
  };

  this.isParentOf = function (ancestor, node) {
    return node && ancestor.hasOwnProperty(node.name) && !ancestor.hasOwnProperty("__ancestor__");
  };

  this.findParent = function (ancestor, node) {
    if (this.isParentOf(ancestor, node))
      return ancestor;

    if (ancestor.hasOwnProperty("__ancestor__")) {
      //return this.createParentOf(ancestor, ancestor.__ancestor__, node);
      const p = node.path.split('.');
      node = ancestor.__ancestor__ || this.root;
      let parent, isCollection;

      for (let k = 0; k < p.length - 1; k++) {
        isCollection = node.isCollection;
        node = node.getChild(p[k]);
        parent = ancestor[p[k]];

        if (isCollection) {
          if (!parent) {
            parent = [];
            ancestor[p[k]] = parent;
          }
          ancestor = node.newItem(ancestor); //Passo ancestor come parent e poi al return diventa il nuovo item creato
          parent.push(ancestor);
        }
        else {
          if (!parent) {
            parent = node.newItem(ancestor);
            ancestor[p[k]] = parent;
          }
          ancestor = parent;
        }
      }

      return ancestor;
    }
    else {
      //Potrei provare a fare ricerca se non ci fosse nessuno node isCollction...
      return null;
    }
  };

  if (query)
    this.parse();
}

export function ExecuteQuery(query, params, relations) {
  return new Graph(query, params, relations).ExecuteQuery();
}

export function ExecuteApi(query, params, many, permanent) {
  /*return nonQuery
    ? Apix.call(query, params)
    : new Graph(query, params).ExecuteApi();*/
  return new Graph(query, params, permanent).ExecuteApi({ many: many });
}

export const GraphSchema = {
  Create: function (query, schema) {
    let path = new SourcePath(query); // gestire anche condition con path?
    const graph = new Graph(DataGraph.getSchema(path, schema))
    graph.isCollection = path.isCollection;
    graph.deep = true;
    return graph;
  },

  CreateSource: function (etype, item) {
    const graph = new Graph().fromSchema(etype, "root", Array.isArray(item), null, true);
    graph.parse();
    const node = graph.root;
    node.addData(item, null, true);
    return new DataSource(item, node);
  }
}

export const Link = { DOWN_WISE: 'd', UP_WISE: 'u', BIDIRECTIONAL: 'b' };

export function GraphLink(pk, fk, direction, association) {
  this.pk = pk;
  this.fk = fk;
  this.direction = direction;
  this.association = association;
}

export function BottomLink(pk, fk, direction, association) {
  GraphLink.call(this, pk, fk, direction, association);
  /**
   * 
   * @param {*} parent 
   * @param {*} child 
   * @param {GraphNode} node 
   */
  this.apply = function (parent, child, node) {
    const link = node.link;
    const schema = node.parent; //node.parent.schema;
    if (parent.id <= 0) {
      child.__tempkey = {};
      child.__tempkey[link.fk] = parent.id;
    }
    if (schema.identity) {
      node.mutate(link.fk, parent[link.pk], child);
    }
    else {
      const keys = link.pk.split(',');
      let field;
      for (let k = 0; k < keys.length; k++) {
        field = keys[k];
        node.mutate(field + schema.etype, parent[field], child);
      }
    }
    child.__linked = true;
  }
}

export function TopLink(pk, fk, direction, association) {
  GraphLink.call(this, pk, fk, direction, association);
  this.apply = function (parent, child, node) {
    const link = node.link;
    if (child.id < 1) {
      child.__tempkey = {};
      child.__tempkey[link.fk] = parent.id;
    }

    if (node.identity) {
      node.parent.mutate(link.fk, child[link.pk], parent);
    }
    else {
      const keys = link.pk.split(',');
      let field;
      for (let k = 0; k < keys.length; k++) {
        field = keys[k];
        node.mutate(field + node.etype, child[field], parent);
      }
    }

    child.__linked = true;
  }
}

export function DoubleLink(pk, fk, direction, association) {
  GraphLink.call(this, pk, fk, direction, association);
  this.apply = function (parent, child, node) {
    const link = node.link;
    const linked = {};
    const mutation = {};
    linked.tempkey = {};

    if (parent.id < 1)
      linked.tempkey[link.pk] = parent.id;

    mutation[link.pk] = parent.id;

    if (child.id < 1)
      linked.tempkey[link.fk] = child.id;

    mutation[link.fk] = child.id;
    linked.mutated = mutation;

    child.__linked = linked;
  }
}

/**
 * @param {*} source 
 * @param {GraphNode} node 
 * @param {*} parent 
 * @property {boolean}  scalar 
 * @property {boolean}  derived 
 */
export function DataSource(source, node, parent) {

  //Creo set/get data che si comporta in base a value se è cambiato e aggiunge added e mutation
  this.data = source;

  /** @type {GraphNode} */
  this.node = node || new GraphNode("temp");

  this.parent = parent;

  /** @type {Binding} */
  this.binding = !node || node.isRoot() ? new Binding() : null;//new Binding();

  this.build = function (data, inode, iparent, derived, scalar) {
    const ds = new DataSource(data, inode, iparent);
    ds.binding = this.binding;



    if (derived) {
      ds.derived = true;
      ds.owner = this.owner;
    }
    else {
      ds.owner = this;
      ds.bind();
    }

    if (scalar)
      ds.__scalar = true;
    return ds;
  }

  this.get = function (name) {
    if (!this.scalar)
      return this.build(null, node.getChild(name), null, true);

    return this.build(this.data ? this.data[name] : null, node.getChild(name), this.data);
  }

  this.getLast = function (name) {
    const ds = this.get(name);
    if (Array.isArray(ds.data) && ds.data.length > 0) {
      ds.data = ds.data[ds.data.length - 1];
    }
    return ds;
  }

  this.discendant = function (path) {
    return node.discendant(path);
  }

  this.clone = (data) => this.build(data || this.data, node, parent, this.derived, this.__scalar);

  /* BINDING SECTION*/

  this.bind = function () {
    this.binding.apply(this, this.parent);
  }

  this.defaultValue = function (value) {
    if (!this.data) {
      this.binding.add(value, this);
      this.data = this.scalar ? value : [value];
    }
    return this;
  }

  this.temp = function (value, unshift, check) {
    value.__temp__ = 'T';
    const ds = this.build(value, this.node, this.parent, true, true);
    ds.check = check || [];
    if (unshift) value.__unshift = true;
    return ds;
  }
  //Fixed
  this.always = function (value, check) {
    if (!this.scalar) {
      value.__temp__ = 'F'
      this.data = this.data ? this.data.push(value) : [value];
    }
    return this;
  }

  this.add = function (value, unshift, notrack) {
    if (!this.scalar) {
      if (this.binding)
        this.binding.add(value, this, unshift, notrack);
      if (!this.data) this.data = [];
      //this.data.push(value);
    }
  }

  this.remove = function (value, model) {
    value = value || this.data;
    if (!Array.isArray(value)) {
      if (value.id < 0) {
        this.binding.remove(value, this);
        ArrayRemove(this.data, value);
      }
      else {
        this.node.delete(value, this.parent);
      }
    }
  }

  this.set = function (value, bind) {
    if (this.scalar) {
      this.data = value;
      bind ? this.binding.format(value, this, false) : this.node.deepFormat(value, this.parent);
    }
  }

  this.clear = function (value) {
    if (this.scalar) {
      this.data = value;
    }
  }

  this.mutate = function (field, value, data) {
    data = data || this.data;
    if (data) {
      if (data.hasOwnProperty('__temp__')) {
        data.__temp__ === 'F' ? this.binding.add(data, this) : this.binding.format(data, this);
        delete data.__temp__;
      }
      this.node.mutate(field, value, data);
    }
  }

  this.format = function (data) {
    data = data || this.data;
    if (data.hasOwnProperty('__temp__')) {
      data.__temp__ === 'F' ? this.binding.add(data, this) : this.binding.format(data, this, false);
      delete data.__temp__;
    }
  }

  this.mutateParent = function (field, value) {
    if (this.owner)
      this.owner.mutate(field, value);
  }

  /* END BINDING SECTION*/

  this._filter = function (predicate, data, find) {
    if (!data) return data;
    if (!Array.isArray(data))
      data = [data];

    return find ? data.find(predicate) : data.filter(predicate);
  }

  this.filter = function (predicate) {
    return this.build(this._filter(predicate, this.data), this.node, this.parent, true);
  }

  this.find = function (predicate) {
    return this.build(this._filter(predicate, this.data, true), this.node, this.parent, true, true);
  }

  this.map = function (callback) {
    let ar;
    if (this.data) {
      let data = this.data;
      if (!Array.isArray(data)) {
        data = [this.data];
      }
      ar = [];
      for (let k = 0; k < data.length; k++) {
        ar.push(callback(this.build(data[k], this.node, this.parent, true, true), data[k], k));
      }
    }
    return ar;
  }

  this.at = function (index) {
    if (this.data && Array.isArray(this.data) && this.data.length > index) {
      return this.build(this.data[index], this.node, this.parent, true, true);
    }
    return this.clone();
  }

  /**** DATA SECTION ******/

  this.getData = function (path, mustarray) {
    let d = null;
    if (this.data) {
      d = path ? this.data[path] : this.data;
      if (Array.isArray(d)) {
        d = [...d];
        if (!d[0])
          d = [];
      }
      else d = { ...d };
    }

    console.log("DS GET DATA", d);

    if (mustarray && !Array.isArray(d)) {
      d = d && !isEmpty(d) ? [d] : [];
      if (path) this.data[path] = []; else this.data = [];
    }

    return d;
  }

  this.getCollection = function (path) {
    return this.getData(path, true);
  }

  this.save = function (option, parameters) {
    return this.node.save(option, parameters);
  }

  this.notify = function () {
    this.node.notify();
  }
  /**** END DATA SECTION ******/
  /*
const creator = () =>function(){ this.a = "prova";}; const f = {}; f.instance = creator(); Object.defineProperty(f.instance.prototype, "key", {
  get() {
    return "key";
  },
});var i = new f.instance(); var y = function(){}; console.log(i.key, new y().key);
  */
}

Object.defineProperty(DataSource.prototype, "key", {
  get() {
    return this.node.etype + (this.parent ? this.parent.id : 0);
  },
});

Object.defineProperty(DataSource.prototype, "scalar", {
  get() {
    return !this.node.isCollection || this.__scalar;
  },
});

Object.defineProperty(DataSource.prototype, "empty", {
  get() {
    if (Array.isArray(this.data)) return this.data.length === 0;
    else return !this.data;
  },
});

export function GraphNode(name, uid, parent, graph, etype) {
  this.name = name;
  this.uid = uid || 0; //(graph.uid << 16) & uid;
  this.parent = parent;
  this.graph = graph;
  this.data = null;
  this.condition = new nodeCondition();
  this.children = null;
  this.observers = [];
  this.isCollection = false;
  this.returning = null;

  /**
   * Indexing è dedicato a mutation, questo potrebbe generare confusione con implementazione futura di indicizzazione di source.
   */
  this.Mutation = new Map();

  Object.defineProperty(this, "source", {
    get() {
      return new DataSource(this.data, this);
    },
    set(v) {
      //this.datasource = new DataSource(v, this);
      this.data = v;
      this.notify();
    }
  });

  this.etype = etype;
  this.identity = true;
  this.primarykey = "id";
  this.link = {};
  this.link.direction = 'd';
  this.path = parent ? parent.path + (parent.isRoot() ? "" : ".") + name : "";
  //this.linkDirection = 1;

  this.joined = null;
  this.fields = "";
  this.orderby = null;
  this.groupby = null;
  this.lastUdpated = new Date();

  Object.defineProperty(this, "permanent", {
    get() {
      return this.graph?.permanent; //Remote lib check for null???
    }
  });

  this.isRoot = function () { return this.uid === 0 };
  this.getKey = function () { return this.etype + '.' + this.name; }
  this.sourceName = function () { return this.uid === 0 ? this.name : (this.name + "_" + this.graph.uid + "_" + this.uid); }

  this.addField = function (field) {
    this.fields += this.fields !== "" ? "," + field : field;
  }
  this.orderBy = function (field) {
    this.orderby = this.orderby ? this.orderby + "," + field : field;
  };
  this.groupBy = function (field) {
    this.groupby = this.groupby ? this.groupby + "," + field : field;
  };
  this.addCondition = function (c) {
    if (!this.condition) { this.condition = new nodeCondition(); }
    this.condition.add(c)
  };
  this.push = function (c) {
    if (!this.children) { this.children = []; }
    this.children.push(c);
  };

  this.setSchema = function (schema) {
    this.etype = schema.etype;
    this.primarykey = schema.primarykey;
    this.identity = schema.identity;
  }

  this.getSchema = function (schema) {
    return { etype: this.etype, primarykey: this.primarykey, identity: this.identity }
  }
  /**
 * This callback is displayed as a global member.
 * @callback traverseCallback
 * @param {GraphNode} node
 * @param {any} source
 * @param {object} ancestor
 */

  /**
   * 
   * @param {traverseCallback} callback 
   * @param {boolean} deep  
   * @param {boolean} deep 
   * @returns void
   */
  this.traverse = function (callback, deep, source, ancestor, generate) {
    const stop = callback(this, source, ancestor);
    if (!this.children || stop) return;
    for (let k = 0; k < this.children.length; k++) {
      if (generate)
        source[this.children[k].name] = {};
      if (deep) {
        if (source) {
          if (Array.isArray(source)) {
            for (let j = 0; j < source.length; j++) {
              const parent = source[j];
              if (!parent) continue;
              this.children[k].traverse(callback, deep, parent[this.children[k].name], parent, generate);
            }
          }
          else
            this.children[k].traverse(callback, deep, source[this.children[k].name], source, generate);
        }
        else
          this.children[k].traverse(callback, deep, null, source, generate);
      }
      else
        callback(this.children[k], source ? source[this.children[k].name] : null, source, generate);
    }
  }

  this.store = function (context) {
    this.traverse((node) => {
      DataGraph.getEntity(node.etype).setSource(node, context);
    }, true);
  }

  this.getChild = function (name) {
    if (!this.children)
      return null;

    for (let k = 0; k < this.children.length; k++) {
      if (this.children[k].name === name)
        return this.children[k];
    }

    return null;
  }

  this.discendant = function (path) {
    if (!path)
      return null;
    console.log("NODE DISCENDANT", path)
    const p = path.split('.');
    let n = this;
    for (let k = 0; k < p.length; k++) {
      n = n.getChild(p[k]);
      console.log("NODE DISCENDANT CHILD", n);
      /*if(!n)
        error handle*/
    }

    return n;
  }
  /**
   * 
   * @param {GraphNode} node 
   * @returns {boolean} 
   */
  this.Equal = function (node) {
    if (this.condition.value !== node.condition.value)
      return false;

    if (!this.children) {
      return (!node.children)
    }

    if (this.children.length !== node.children.length)
      return false;

    for (let k = 0; k < this.children.length; k++) {
      if (!this.children[k].Equal(node.children[k]))
        return false;
    }

    return true;
  }

  this.binding = new Map();

  /**
   * 
   * @param {*} data 
   * @param {*} parent 
   * @returns 
   */
  this.formatData = function (data, parent, notrack) {
    console.log("DEBUG-NODE", data, parent);
    if (!data) return;

    if (!Array.isArray(data))
      data = [data];

    //const nolink = data.hasOwnProperty("__nolink__");
    let tolink;

    for (let k = 0; k < data.length; k++) {
      const source = data[k];

      if (!source) continue;

      let mutated = source.hasOwnProperty("__mutation");

      tolink = source.hasOwnProperty("__tolink__");

      if (!source.hasOwnProperty("id") && Object.isExtensible(source)) {

        tolink = true;

        source.id = DataGraph.getEntity(this.etype).nextIndex();

        if (!mutated) {
          source["__mutation"] = { id: source.id, mutated: {}, count: 0 };
          mutated = true;
        }

        for (const key in source) {
          if (Object.hasOwnProperty.call(source, key) && !this.getChild(key) && key.charAt(0) !== "_" && key !== "id") {
            source["__mutation"].mutated[key] = source[key];
            source["__mutation"].count++;
          }
        }

        /*if (mutated) {
          source["__mutation"].mutated.id = source.id;
          source["__mutation"].count++;
        }
        else {
          source["__mutation"] = { id: source.id, mutated: { id: source.id }, count: 1 };
          mutated = true;
        }*/
      }


      if (!notrack && mutated)
        this.Mutation.set(source.id, source); // Sempre vero che va aggiunto o solo se mutated?

      if (parent) { // && tolink) { //è possibile capire se ha già link impostato? es quando aggiungo da un node o query dove data è già formattata
        this.link.apply(parent, source, this); //Dovrei fare un reset delle rule già impostate se esitono

        if (notrack && this.Mutation.has(source.id)) {
          this.Mutation.delete(source.id);
        }
        //TODO: check link prima di applicare
        /*if (source.hasOwnProperty("__tolink__"))
          delete source.__tolink__;*/
      }

      console.log("DEBUG-NODE", parent, source, this.link, this);
    }
  }

  this.deepFormat = function (data, parent, notrack) {
    this.traverse((node, data, parent) => {
      node.formatData(data, parent, notrack);
    }, true, data, parent);
  }

  this.setData = function (value, parent, add, formatted, notrack, unshift, notNotify) {
    formatted ? this.formatData(value, parent, notrack) : this.deepFormat(value, parent, notrack);
    DataGraph.setItem(value, this, parent, !add, unshift);
    !notNotify && this.notify();
    return this;
  }

  this.mutate = function (field, value, obj) {
    const data = DataGraph.mutate(field, value, obj);
    console.log("Node Mutation result: ", data);
    if (data.mutated) {
      if (!this.Mutation.has(obj.id))
        this.Mutation.set(obj.id, obj);
    }
    else if (data.removed)
      this.Mutation.delete(obj.id);

    console.log("Node Mutating: ", this.Mutation);

    return data;

    /**
    * TODO: controllo se esiste un altro node dello stesso etype che ha questa istanza in mutating
    * DataGraph.getEntity(this.etype).checkConflict(obj);
    */
  }

  this.clearMutation = function () {
    this.traverse((node) => {
      node.Mutation.clear();
    }, true);
  }

  /**
   * 
   * @param {object} option se si desidera salvare solo mutation del node e non le mutation dei nodi discendenti
   * @returns 
   */
  this.save = function (option, parameters) {
    option = DataGraph.formatOption(option, this.etype);
    let data = {};
    this.traverse((node, source, parent) => {
      if (parent) {
        if (!parent.hasOwnProperty("children"))
          parent.children = [];
        parent.children.push(source);
        delete parent[node.name];
      }
      source.name = node.name;
      source.etype = (DataGraph.config.prefix ? DataGraph.config.prefix + '.' : '') + node.etype;
      source.identity = node.identity;
      source.isCollection = node.isCollection;
      source.primarykey = node.primarykey;
      source.path = node.path;
      source.link = node.link;

      if (node.returning)
        source.returning = node.returning;

      const s = DataGraph.getSchema(node);
      //Se voglio usare uno schema diverso??? complicato passare ad ogni node! 
      //potrei fare una cosa generica che sovrascrive temporaneamente DEFAULT Schema

      if (!isString(s)) { // Else usa nomlecatura first caracter per gestire type
        source.TypeSchema = {};
        for (const key in s) {
          const v = s[key];
          if (!isNaN(v)) {
            source.TypeSchema[key] = v;
          }
        }
      }

      if (node.Mutation.size > 0) {
        source.Mutation = [];

        let mutated;
        let data;
        node.Mutation.forEach(function (value, key) {
          data = { id: value.id, tempkey: value.__tempkey, linked: value.__linked };
          if (value.__mutation.remove) {
            data.crud = 3;
            source.Mutation.push(data);
          }
          else {
            mutated = value.__mutation?.mutated;
            if (mutated) {
              data.mutated = {};
              for (const key in mutated) {
                if (Object.hasOwnProperty.call(source.TypeSchema, key)) {
                  data.mutated[key] = value[key];
                }
              }
              source.Mutation.push(data);
            }
          }
        });
      }
      //source.typeSChema = node.typeSChema;
    }, true, data, null, true);

    console.log("SAVE Node JSON: ", data);
    option.excludeParams = true;

    if (parameters) {
      data = { Root: data, Value: parameters }
    }

    return Apix.call(option.queryOp, data, option).then((result) => {
      console.log("Node Save RESULT:", result);
      this.traverse((node) => {
        if (result.data.mutation) {
          const m = result.data.mutation[node.etype];
          if (m) {
            m.forEach(el => {
              if (el.index < 0) {
                const item = node.Mutation.get(el.index);
                console.log("BIND-LOG-INDEX", el, item);
                if (item) item.id = el.id;
              }
            });
          }
        }

        node.Mutation.forEach(function (value, key) {
          console.log("BIND-LOG", value, key);
          if (value.__bind) {
            console.log("BIND-LOG-IN", value, node);
            const binding = value.__bind;
            DataGraph.setItem(value, node, binding.parent, null, value.__unshift);
            delete value.__bind;
          }
          delete value.__mutation;
        });
        delete node.binding;
        node.Mutation.clear();
      }, true);
      this.refresh();
      return result;
    }, er => {
      console.log("ERROR GraphNode Save", er);
      throw er;
      /*this.traverse((node) => {
        node.Mutation.clear();
      }, true);*/
      //openPopup(<div >Si è verificato un errore si prega di riprovare.</div>, "Errore", "OK");
    });
  }

  this.delete = function (items, parent) {
    if (items) {
      if (!Array.isArray(items))
        items = [items];

      const node = { etype: (DataGraph.config.prefix ? DataGraph.config.prefix + '.' : '') + this.etype, Mutation: [] };
      let item;
      for (let k = 0; k < items.length; k++) {
        item = items[k];
        node.Mutation.push(typeof item === "string" || item instanceof String || typeof item === 'number'
          ? { id: item }
          : { id: item.id });
      }
      return Apix.call("api/jdelete", node, { excludeParams: true }).then(() => {
        this.remove(items[0], parent);
        /*const source = this.isRoot()?this.source : searchData(this.graph.root.source, items[0], this.path)?.parent[this.name];
        if(Array.isArray(source)){
          for( var i = 0; i < source.length; i++){ 
            if ( source[i].id === items[0]) { 
                source.splice(i, 1);
                break;
            }
          }
        }
        this.refresh();*/
      }).catch((er) => {
        console.log(er);
      }

      );
    }
  }

  this.remove = function (items, parent, deferred) {
    if (!items) return;
    if (!Array.isArray(items))
      items = [items];

    const node = { etype: this.etype, Mutation: [], Temp: [] };
    let item;
    for (let k = 0; k < items.length; k++) {
      item = items[k];
      item = typeof item === "string" || item instanceof String || typeof item === 'number'
        ? { id: item }
        : { id: item.id };

      if (item.id < 1) {
        node.Temp.push(item); // => se si salta in backoffice id<0 si puà mettere tutto in Mutation
        continue;
      }

      deferred ?
        DataGraph.remove(item, this, parent)
        : node.Mutation.push(item);
    }

    if (deferred) {
      this.notify();
      return Promise.resolve();
    }
    else {
      return Apix.call("api/jdelete", node, { excludeParams: true }).then(() => {
        for (let k = 0; k < node.Mutation.length; k++) {
          DataGraph.deleteItem(node.Mutation[k], this, parent);
        }
        node.Temp.forEach(item => DataGraph.deleteItem(item, this, parent));
        this.notify();
      }).catch((er) => {
        console.log(er);
      });
    }
  }

  this.unremove = function (item, parent) {
    if (!item) return;
    DataGraph.unremove(item, this);
    //se null lo fa comunque => add elemento in root node 
    if (parent !== undefined) {
      DataGraph.setItem(item, this, parent);
      this.refresh();
    }
  }

  this.notify = function () {
    //Da gestire caso in cui non è root
    //A: notify root node (aggiorno tutto)
    //B: risalgo su ancestor fino a che non trovo un node che è un source diretto (ovvero ha observers????) e come faccio in questo caso a fornire source da root e path
    //considerando che nel path ci possono essere delle collection?
    //Per ora non prevedo di usare un child direttamente come source, quindi aggiorno sempre da root tutto
    console.log("NOTIFY");
    if (this.isRoot() || this.data) {
      //this.datasource = new DataSource(this.source, this);//{ data: this.source, node: this };
      console.log("NOTIFY ROOT", this.observers);
      for (let i = 0; i < this.observers.length; i++) {
        this.observers[i](this.source);
      }
    }
    else {
      this.graph.root.notify();
    }

    this.udpated = new Date();
  }

  this.observe = function (observer) {
    console.log("Node Observer", this.sourceName())
    this.observers.push(observer);
  }

  this.unobserve = function (observer) {
    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i] === observer) {
        console.log("UNOBSERVE OK");
        this.observers.slice(i, 1);
        break;
      }
    }

    return this.observers.length === 0;
  }

  this.sync = function (item) {
    //debugger;
    if (!this.source) return;
    if (this.isRoot()) {
      const d = this.source;
      if (Array.isArray(d)) {
        for (let k = 0; k < d.length; k++) {
          if (d[k].id === item.id) {
            this.source[k] = { ...item };
            this.notify();
            break;
          }
        }
      }
      else if (d.id === item.id) {
        this.source = { ...item };
        this.notify();
      }
    }
  }

  this.refresh = function () {
    if (this.isRoot()) {
      const temp = this.source;
      this.source = null;
      this.notify();
      this.source = temp;
      this.notify();
    }
    else {
      this.graph.root.refresh();
    }
  }

  this.syncronize = function (item, ref, shouldNotify) { //Se ho chiave diversa da id? o multichiave, per ora testo con caso chiave è id
    //Da gestire se è add, update o remote
    if (!item) return;

    if (item.crud === 'ADD') {
      //Check condition
      if (!this.condition || this.condition.check(item)) {
        //Se è root faccio set altrimenti devo cercare in base a info relazione
        if (this.isRoot()) {
          DataGraph.setItem(item, this);
        }
        else {
          const result = searchData(this.graph.root.source, item.id, this.path);
          if (result) {
            DataGraph.setItem(item, this, result.parent);
          }
          else {
            //Qualche notifica???
          }
        }
      }
    }
    else if (item.crud === 'UPD') {
      const obj = searchData(this.graph.root.source, this.path.split(','), item.id); // Qui tutto il path però
      if (obj)
        DataGraph.updateItem(obj, item.mutation);
    }
    else if (item.crud === 'DEL') {
      const parent = searchData(this.graph.root.source, this.path.split(','), item.id); //oppure restituisce sia parent che ite
      if (parent)
        DataGraph.removeItem(item, this, parent);
    }
    else {
      throw new Error("Sync data on " + this.etype + "." + this.name + " crud operation: " + item.crud + " not supported.");
    }

    if (shouldNotify)
      this.notify();
  }
}

function nodeCondition() {
  this.condition = [];
  this.fcheck = null;
  this.value = "";
  this.add = function (c) {
    this.value += typeof c === 'string' ? c : (c.not ? " !(" : " ") + c.field + (jsINT[c.operator] || c.operator) + c.value + (c.not ? ") " : " ");
    this.condition.push(c);
  }

  this.check = function (item) {
    if (this.condition.length === 0)
      return true;
    return checkGroup(new checkToken(this.condition, item));
  }

  this.length = () => this.condition.length;
  this.at = index => this.condition[index];
}

const jsINT = { "&": "&&", "|": "||", "=": "==" }

export function EntitySchema(etype) {
  this.etype = etype;
  this.primarykey = "id";
  this.identity = true;
}

export function DataContext(name) {
  this.name = name;
  this.graphs = {};
  /**
   * 
   * @param {Graph} graph 
   */
  this.registerGraph = function (graph) {

    const key = graph.getKey();

    if (!key) return; // Worning for develop state?
    const g = this.graphs[key];
    console.log("REGISTER GRAPH", key, graph, g);
    if (g) {
      g.unshare();
      graph.absorb(g)
    }
    this.graphs[key] = graph;
    graph.share();
  }

  this.unregisterGraph = function (key) {
    console.log("UNREGISTER-GRAPH");
    // Non devo fare unshare?
    /*const g = this.graphs[key];
    g.unshare();*/
    delete this.graphs[key];
  }

  this.getGraph = function (key) { return this.graphs[key]; }
}

const DataGraph = {
  isPrefixMode: false,

  config: {},

  entities: {},

  channels: { default: new axiosChannel() },

  interpreters: { default: new SqlGraph() },

  schema: {},

  graphs: { uid: 0 },

  context: new DataContext("datagraph"),

  state: new Map(),

  init: function (typedef) {
    if (typedef) {
      let def = JSON.parse(typedef)
      def.forEach(t => this.getEntity(t.table).typedef = t.typedef);
    }
  },
  /**
   * 
   * @param {string | SourcePath} etype 
   * @returns {Entity}
   */
  getEntity: function (etype) {
    if (!etype) {
      etype = "__global";
    }
    if (!this.entities[etype]) {
      this.entities[etype] = new Entity(new EntitySchema(etype));
    }
    return this.entities[etype];
  },

  getESchema: function (etype) {
    return this.getEntity(etype).schema;
  },

  getSchema: function (path, name) { //per schema default come collection
    name = name || 'DEFAULT';
    let etype = path.etype || path; //Caso passo solo etype
    const s = this.schema[name];

    console.log("DG SCHEMA", path, etype, name, this.schema, s);
    //debugger;
    if (s && s.hasOwnProperty(etype))
      return { ...s[etype], __name: path.name };
    else {
      for (const key in this.schema) {
        if (Object.hasOwnProperty.call(this.schema[key], etype)) {
          return { ...this.schema[key][etype], __name: path.name }; //Il primo che trova se non specifico name of schema
        }
      }
    }

    if (path.isCollection)
      etype = '[' + etype + ']';

    return path.name + ': ' + etype + ' {*}';
  },

  setSchema: function (schema, name) {
    this.schema[name || 'DEFAULT'] = schema;
    if (typeof schema !== 'string') {
      for (const key in schema) {
        const p = schema[key];
        if (typeof p !== 'string' && !p.hasOwnProperty('__etype')) {
          p.__etype = key;
        }
      }
    }
    console.log("SET-GET-SCHEMA", schema, name, this.schema);
  },

  getLink: function (etype, name) {
    const links = this.getEntity(etype).relations;
    return links ? links[name] : null;
  },

  link: function (data) {
    if (data) data.__tolink__ = true;
    return data;
  },

  getChannel: function (etype) {
    return this.channels[etype] || this.channels.default;
  },

  setChannel: function (etype, channel) {
    this.channels[etype] = channel;

    /*if (this.tables[etype]) {
      this.tables[etype].channel = channel;
    }*/
  },

  getInterpreter: function (etype) {
    return this.interpreters[etype] || this.interpreters.default;
  },

  setInterpreter: function (etype, interpeter) {
    this.interpreters[etype] = interpeter;
  },

  registerGraph: function (graph) {
    console.log("REGISTER GRAPH", graph, this.context);
    this.context.registerGraph(graph);
  },

  unregisterGraph: function (key) {
    this.context.unregisterGraph(key);
  },

  registerGlobalState: function (key, data, setter, context) {
    console.log("REG D-GLOBAL", key, data, setter);
    this.state.set(key, { value: data, setter: setter, context: context });
  },

  unregisterGlobalState: function (key) {
    console.log("UNREG D-GLOBAL", key);
    this.state.delete(key);
  },

  setGlobalState: function (key, data, context) {
    const state = this.state.get(key);
    console.log("SET D-GLOBAL", key, data, state);
    if (state) {
      state.value = data;
      if (state.setter)
        state.setter(data);
    } else {
      this.state.set(key, { value: data, context: context });
    }
  },

  getGlobalState: function (key) {
    console.log("GET D-GLOBAL", key, this.state);
    return this.state.get(key)?.value;
  },

  clearGlobalState: function (context) {
    console.log("CLEAR D-GLOBAL");
    this.state.forEach((v, k) => { if (v && v.context === context) this.state.delete(k); })
  },

  shareNode: function (node) {
    console.log("DG SHARE NODE")
    if (node)
      this.getEntity(node.etype).shareNode(node);
  },

  unshareNode: function (node) {
    console.log("DG SHARE NODE")
    if (node)
      this.getEntity(node.etype).unshareNode(node);
  },

  /**
   * @param {string | SourcePath} path 
   * @param {DataContext=} context
   * @returns {GraphNode} 
   */
  findGraph: function (path, context) {
    let graph;
    if (!path) {
      throw new Error("Graph Path can not be null.")
    }
    path = new SourcePath(path);
    context = this.context;
    console.log("DEBUG find Graph", context, path, graph);
    graph = context.getGraph(path.value);
    console.log("DEBUG find Graph", context, path, graph);
    if (graph) graph.root.isCollection = path.isCollection;
    return graph?.root;
  },

  /**
   * @param {string | SourcePath} path 
   * @param {DataContext} context
   * @returns {GraphNode}
   */
  findOrCreateGraph: function (path, context) {
    path = new SourcePath(path);
    context = this.context;
    let root = this.findGraph(path, context);
    if (!root) {
      console.log("FIND GET SCHEMA ", path.schema, path, path.isSchema);

      if (path.isSchema)
        root = new Graph(path.schema, null, true, context, true).root;
      else
        root = new Graph(this.getSchema(path), null, true, context, true).root;
    }
    if (!root) {
      console.warn("findOrCreateGraph wrong path format.");
    }
    return root;
  },

  subscribe: function (path, observer) {
    let p = new SourcePath(path);
    console.log("SUBSCRIBE SOURCE ", p.etype, p.name);
    this.getEntity(p.etype).subscribe(p.name, observer);
  },

  unscribe: function (path, observer, permanent) {
    let p = new SourcePath(path);
    console.log("UNSCRIBE SOURCE ", p.etype, p.name);
    this.getEntity(p.etype).unscribe(p.name, observer, permanent);
  },

  setItem: function (item, node, parent, override, unshift) {
    let name;
    const isCollection = node.isCollection;
    if (parent) {
      name = node.name;
      node = node.parent;
    }
    else {
      parent = node;
      name = "source";
    }

    if (isCollection && !override) {//in teoria non dovrebbe esistere questa ipotesi
      if (!parent[name]) parent[name] = [];
      unshift ? parent[name].unshift(item) : parent[name].push(item);
    }
    else
      parent[name] = item;

    console.log("DATA-DEBUG", item, node, name);
  },

  updateItem: function (target, source) {
    if (source.hasOwnProperty("changed")) {
      const changed = source.changed;
      for (const key in changed) {
        if (Object.hasOwnProperty.call(changed, key)) {
          target[key] = changed[key];
        }
      }
    }
  },

  deleteItem: function (item, node, parent) {
    let el = parent ? parent[node.name] : node.source;
    if (el) {
      if (Array.isArray(el)) {
        for (let k = 0; k < el.length; k++) {
          if (el[k].id === item.id) {
            el.splice(k, 1);
            break;
          }
        }
      }
      else if (parent)
        parent[node.name] = null;
      else
        node.source = null;
    }
  },

  remove: function (obj, node, parent) {
    if (obj.id < 1) return;

    let mutation = obj.__mutation;

    if (!mutation) {
      mutation = { id: obj.id, mutated: {}, count: 0 };
      obj.__mutation = mutation;
    }

    mutation.remove = true;
    if (!node.Mutation.has(obj.id)) node.Mutation.set(obj.id, obj);
    this.deleteItem(obj, node, parent);
  },

  unremove: function (obj, node) {
    let mutation = obj.__mutation;

    if (mutation) {
      delete mutation.remove;

      if (mutation.count === 0) {
        if (node.Mutation.has(obj.id)) node.Mutation.delete(obj.id);
        delete obj.__mutation;
      }
    }
  },

  mutate: function (field, value, obj) {
    console.log("DataGraph Mutate: ", field, value, obj)
    const result = { mutated: false };
    let mutation = obj.__mutation;
    if (obj[field] === value) { return result; }
    else if (mutation && mutation.mutated[field] === value) {
      delete mutation.mutated[field];
      mutation.count--;

      if (mutation.count === 0) {
        delete obj.__mutation;
        result.removed = true;
      }
    }
    else {
      if (!mutation) {
        mutation = { id: obj.id, mutated: {}, count: 0 };
        obj.__mutation = mutation;
      }

      if (!mutation.mutated.hasOwnProperty(field)) {
        mutation.mutated[field] = obj[field];//value;
        mutation.count++;
      }

      result.mutated = true;
      obj[field] = value;
    }

    return result;
  },

  getMutation: el => {
    if (el.hasOwnProperty("__mutation")) {
      const mutated = el.__mutation.mutated;
      const data = { id: el.id };
      for (const key in mutated) {
        if (Object.hasOwnProperty.call(mutated, key)) {
          data[key] = el[key];
        }
      }
      return data;
    }
    else
      return null;
  },

  formatOption: function (opt, table) {
    if (table) {
      if (!table instanceof Entity)
        table = DataGraph.getEntity(table)
    }
    else
      table = {};
    opt = opt || {};
    //table = table || {};
    //opt.parser = opt.parser || table.parser || this.config.parser || Apix.parser;
    opt.dataOp = opt.dataOp || table.dataOp || this.dataOp || Apix.dataOp;
    opt.queryOp = opt.queryOp || table.queryOp || this.queryOp || Apix.queryOp;
    opt.apiUrl = opt.apiUrl || Apix.apiUrl;
    opt.channel = opt.channel || DataGraph.getChannel(table.etype) || this.channel || Apix.channel;
    for (let key in this.config) {
      if (!opt.hasOwnProperty(key)) {
        opt[key] = this.config[key];
      }
    }
    console.log("FORMATTED Option: ", opt);
    return opt;
  },
};

Object.freeze(DataGraph);

// path = "etype.name.name.name"
export function SourcePath(path) {
  if (path instanceof SourcePath)
    return path;
  console.log("PATH", path);
  this.etype = '';
  //this.schema = 'DEFAULT'; //?
  this.isSchema = path.indexOf(':') > -1;
  let delim = '.';
  let k = 1;
  if (this.isSchema) {
    this.schema = path;
    delim = ':';
    k = 0;
  }

  path = path.split(delim);
  this.name = path[0 ^ k].trim();
  path = path[1 ^ k].trim();

  this.isCollection = path.charAt(0) === '[';
  let i = 0;
  delim = ' ';

  if (this.isCollection) {
    i++;
    delim = ']';
  }


  while (path.charAt(i) !== delim && i < path.length) {
    this.etype += path.charAt(i)
    i++;
  }
  console.log("PATH", this.etype + '.' + this.name);
  this.value = this.etype + '.' + this.name;
}


/**
 * Proxy for Entity data source istance to trace mutation on node
 * e se setto un target che rappresenta un identity diverso?
 * @param {GraphNode} node 
 * @param {*} target 
 */
export function DataProxy(node, target, formatter) {
  if (!target && node)
    this._target = node.source;
  else
    this._target = target;

  if (!this._target) //Oppure accetto ma sul set target se non ho definition la eseguo
    throw new Error("DataProxy require a target on initialization.");
  else if (!this._target.__mutated)
    this._target.__mutated = {};

  this.data = null;
  this.formatter = formatter;
  this.values = {};

  Object.defineProperty(this, "target", {
    get() { return this._target; },
    set(value) {
      this._target = value;
      if (this._node)
        this._node.checkMutation(value);
      //Resetto values
      this.values = {};
      if (value) {
        for (const key in value) {
          if (Object.hasOwnProperty.call(value, key)) {
            //Inizializzo subito values => devo farlo anche quando cambio target
            this.values[key] = this.formatter ? this.formatter.convertFrom(value[key], key) : value[key];
          }
        }
      }
    }
  });

  this._node = null;

  Object.defineProperty(this, "node", {
    get() { return this._node; },
    set(value) {
      this._node = value;
      if (value)//this.data && this.data.count > 0)
        value.checkMutation(this._target);//node.addMutated(this.data);
    }
  })

  //this.target = target;
  this.node = node;
  this.values = {};

  //Potrei avere field presenti in mutation del target e non nel target object stesso => dovrei apllicare anche a quei field definizione?
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      //Inizializzo subito values => devo farlo anche quando cambio target
      this.values[key] = this.formatter ? this.formatter.convertFrom(target[key], key) : target[key];

      Object.defineProperty(this, key, {
        get: function () {
          if (!this._target)
            return null;

          if (!this.values.hasOwnProperty(key) && this._target.__mutated.hasOwnProperty(key)) {
            if (this.formatter) {
              this.values[key] = this.formatter.convertFrom(this._target.__mutated[key], key);
            }
            else
              this.values[key] = this._target.__mutated[key];
          }

          return this.values[key];
        },
        set: function (value) {
          if (!this._target)
            return;

          let data;

          if (this._node)
            data = this._node.mutate(key, this.formatter ? this.formatter.convertTo(value, key) : value, this._target);
          else
            data = DataGraph.mutate(key, this.formatter ? this.formatter.convertTo(value, key) : value, this._target);

          if (data.mutated)
            this.values[key] = value;
          else if (data.removed && this.values.hasOwnProperty(key))
            delete this.values[key];
        }
      });
    }
  }

  this.compare = function (data) {
    if (!this.data)
      return;

    for (const key in data) {
      if (Object.hasOwnProperty.call(this.data.target, key)) {
        this[key] = data[key];
      }
    }
  }
}

export function EntityProxy(etype, target, node) {
  this._etype = etype;
  this.target = target || {}; //Traget deve essere settato o nel costruttore oppure tramite setData, no direttamente
  this.node = node;

  Object.defineProperty(this, "etype", {
    get() { return this._etype; },
    set(value) {
      if (this._etype) {
        const schema = DataGraph.getSchema(this._etype);
        for (const key in schema) {
          delete this[key]; //ok anche se sono proprietà getter e setter???
        }
      }
      this._etype = value;
      this.wrap();
    }
  });

  this.absorb = function (obj) {
    for (const key in obj) {
      this[key] = obj[key];
    }
  }

  this.toNode = function (name) {
    if (this.node)
      return this.node;

    const path = this._etype + "." + (name || "item");
    this.node = DataGraph.findOrCreateGraph(path);
    //new GraphNode("proxy", 0, null, null, etype);
    this.node.setSource(this.target, null, true);
    return this.node;
  }

  this.procedure = function (field, script) {
    if (this.node)
      node.mutate('$' + field, script, this.target);
    else
      DataGraph.mutate('$' + field, script, this.target);
  }

  this.wrap = function () {
    if (!this._etype)
      return;

    const schema = DataGraph.getSchema(this._etype);

    for (const key in schema) {
      Object.defineProperty(this, key, {
        get: function () {
          if (this.target)
            return this.target[key];
          else
            return undefined;
        },
        set: function (value) {
          if (this.node)
            node.mutate(key, value, this.target);
          else
            DataGraph.mutate(key, value, this.target);
        }
      });
    }
  }

  this.setData = function (data) {
    this.target = data || {};
    if (this.onTargetChanged)
      this.onTargetChanged(this.target);
  }

  this.wrap();
}

export { DataGraph };

