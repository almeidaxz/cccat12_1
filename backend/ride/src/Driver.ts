import { v4 as uuidv4 } from 'uuid';
import { Document } from "./Document";

export class Driver {
  driver_id: string = uuidv4();
  constructor(
    readonly name: string,
    readonly email: string,
    readonly document: Document,
    readonly carPlate: string,
  ) {
    document = new Document(document);
  }

  retornarMotorista() {
    return this.driver_id;
  }
}
