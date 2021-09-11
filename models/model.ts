import IModel from "../interfaces/model";

export default class Model implements IModel {
    createdAt;
    deletedAt;
    doc;
    id;
    updatedAt;

    constructor(data: IModel) {
        this.createdAt = data.createdAt;
        this.deletedAt = data.deletedAt;
        this.doc = data.doc;
        this.id = data.id;
        this.updatedAt = data.updatedAt;
    }
}
