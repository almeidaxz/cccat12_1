import { Document } from "./Document";

export class Driver {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly document: Document,
    readonly carPlate: string
  ) {
    document = new Document(document);
  }

  retornarMotorista() {
    return {
      Nome: this.name,
      Documento: this.document,
      Email: this.email,
      CarPlate: this.carPlate,
    };
  }
}
