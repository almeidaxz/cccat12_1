// @ts-nocheck
export class Document {
  CPF_RANGE = 11;
  CPF_MAX_RANGE = 14;
  DocumentNumber;

  constructor(documentNumber) {
    if (!this.isValidString(documentNumber)) throw new Error("String inválida");
    if (this.isValidDocumentLength(documentNumber))
      throw new Error("Tamanho do documento inválido");
    if (this.isOnlyRepeatedNumbers(documentNumber))
      throw new Error("Não pode ser somente números repetidos");
    if (!this.validateDocumentDigits(documentNumber))
      throw new Error("Documento inválido");
  }

  isValidString(documentNumber) {
    return documentNumber ? true : false;
  }

  isValidDocumentLength(documentNumber) {
    return (
      documentNumber.length < this.CPF_RANGE ||
      documentNumber.length > this.CPF_MAX_RANGE
    );
  }

  isOnlyRepeatedNumbers(documentNumber) {
    return documentNumber.split("").every((c) => c === documentNumber[0]);
  }

  replaceDocumentSpecialCharacters(documentNumber) {
    this.DocumentNumber = documentNumber
      .replace(".", "")
      .replace(".", "")
      .replace("-", "")
      .replace(" ", "");
  }

  calculateSumProduct() {
    let MULTIPLY_NUMBER = 2;
    let sumResultFirstDigit = 0,
      sumResultSecondDigit = 0;
    try {
      for (let i = 8; i >= 0; i--) {
        sumResultFirstDigit +=
          parseInt(this.DocumentNumber[i]) * MULTIPLY_NUMBER;
        sumResultSecondDigit +=
          parseInt(this.DocumentNumber[i]) * (MULTIPLY_NUMBER + 1);
        MULTIPLY_NUMBER++;
      }
      return { sumResultFirstDigit, sumResultSecondDigit };
    } catch (e) {
      return {}
    };
  }

  returnExpectedDigitNumber(divisionRest) {
    return divisionRest < 2 ? 0 : this.CPF_RANGE - divisionRest;
  }

  validateExpectedDigits(digitsSumProduct) {
    let divisionRest = digitsSumProduct.sumResultFirstDigit % this.CPF_RANGE;
    let expectedDigit1 = this.returnExpectedDigitNumber(divisionRest);
    digitsSumProduct.sumResultSecondDigit += 2 * expectedDigit1;
    divisionRest = digitsSumProduct.sumResultSecondDigit % this.CPF_RANGE;
    let expectedDigit2 = this.returnExpectedDigitNumber(divisionRest);
    return `${expectedDigit1}${expectedDigit2}`;
  }

  validateDocumentDigits(documentNumber) {
    this.replaceDocumentSpecialCharacters(documentNumber);
    let digitsSumProduct = this.calculateSumProduct();
    let digitsResult = this.validateExpectedDigits(digitsSumProduct);
    let documentNumberDigits = this.DocumentNumber.slice(-2);
    return documentNumberDigits == digitsResult;
  }
}