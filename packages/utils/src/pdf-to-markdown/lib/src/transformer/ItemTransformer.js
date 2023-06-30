"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransformDescriptor_1 = require("../TransformDescriptor");
class ItemTransformer {
    constructor(name, description, descriptorPartial, schemaTransformer = (schema) => schema) {
        this.name = name;
        this.description = description;
        this.descriptor = TransformDescriptor_1.toDescriptor(descriptorPartial);
        this.schemaTransformer = schemaTransformer;
    }
}
exports.default = ItemTransformer;
