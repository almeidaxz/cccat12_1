import { v4 as uuidv4 } from 'uuid';
import { Document } from './Document';

export class Passenger {
    id: string = uuidv4();
    constructor(
        readonly name: string,
        readonly email: string,
        readonly document: Document,
    ) {
        document = new Document(document);
    }

    returnPassenger() {
        return this.id;
    }
}