import { Document } from "../src/Document";

test("Dado um dado inválido, deve lançar um erro", function () {
    expect(() => new Document(null)).toThrow(new Error("String inválida"));
});

test("Dado um documento com tamanho incorreto, deve lançar um erro", function () {
    const documentLengthLongerThan14 = "000.000.000-1111";
    const documentLengthLesserThan11 = "000.000";
    expect(() => new Document(documentLengthLongerThan14)).toThrow(new Error("Tamanho do documento inválido"));
    expect(() => new Document(documentLengthLesserThan11)).toThrow(new Error("Tamanho do documento inválido"));
});

test("Dado um documento com dígito inválido, deve lançar um erro", function () {
    const documentWithInvalidDigits = "000.000.000-11";
    expect(() => new Document(documentWithInvalidDigits)).toThrow(new Error("Documento inválido"));
});