import { v4 as uuidv4 } from 'uuid';
import { Document } from "./Document";

export class Driver {
  id: string = uuidv4();
  constructor(
    readonly name: string,
    readonly email: string,
    readonly document: Document,
    readonly carPlate: string,
  ) {
    document = new Document(document);
  }

  returnDriver() {
    return this.id;
  }
}
