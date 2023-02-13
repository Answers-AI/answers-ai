class Vector {
  constructor(id, metadata, values) {
    this.id = id;
    this.metadata = Vector.flattenObject(metadata);
    this.values = values;
  }

  static flattenObject(ob) {
    let toReturn = {};

    for (let i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if (typeof ob[i] == "object") {
        let flatObject = Vector.flattenObject(ob[i]);
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          toReturn[i + x.charAt(0).toUpperCase() + x.slice(1)] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }
}

module.exports = Vector;
