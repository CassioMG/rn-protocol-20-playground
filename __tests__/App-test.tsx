/**
 * @format
 */

import 'react-native';
import xdr from '../src/xdr';
import { Buffer } from 'buffer';

it('Correctly parses data value', () => {
  
  // See: https://laboratory.stellar.org/#xdr-viewer?input=AAAAAgAAAACujgze1ivBKlbuOmtG%2B45%2B3OZ69eQIkvdX1DYyH1GW%2FgAAAMgAAAAAAAAAAAAAAAEAAAAAZWjFDgAAAABlaMY6AAAAAAAAAAIAAAABAAAAABFIDN%2F57JxjKEzm%2BSCZi2BUm9fr71zRPwDzlRVIB1mTAAAACgAAABdkZXYudmlicmFudGFwcC5jb20gYXV0aAAAAAABAAAAQG9TUEF6aGt2S20yYVdxRTJObXhtZ05HeUR3TmRQUUVSN1lPaXJrT1RQVThIZjdORFNmejhidi9NR0FCTmFGZXYAAAABAAAAAK6ODN7WK8EqVu46a0b7jn7c5nr15AiS91fUNjIfUZb%2BAAAACgAAAA93ZWJfYXV0aF9kb21haW4AAAAAAQAAABp3ZWJhdXRoLWRldi52aWJyYW50YXBwLmNvbQAAAAAAAAAAAAEfUZb%2BAAAAQIRb0%2B0I%2Fgah5Ox4W79QzckZikjprFMUX3PQp%2BCY00MsveDnEU%2FWa2eMtBThInAER9DxBynRbryvwoH8Fg4saQo%3D&type=TransactionEnvelope&network=test
  const stringEnvelope = "AAAAAgAAAACujgze1ivBKlbuOmtG+45+3OZ69eQIkvdX1DYyH1GW/gAAAMgAAAAAAAAAAAAAAAEAAAAAZWjFDgAAAABlaMY6AAAAAAAAAAIAAAABAAAAABFIDN/57JxjKEzm+SCZi2BUm9fr71zRPwDzlRVIB1mTAAAACgAAABdkZXYudmlicmFudGFwcC5jb20gYXV0aAAAAAABAAAAQG9TUEF6aGt2S20yYVdxRTJObXhtZ05HeUR3TmRQUUVSN1lPaXJrT1RQVThIZjdORFNmejhidi9NR0FCTmFGZXYAAAABAAAAAK6ODN7WK8EqVu46a0b7jn7c5nr15AiS91fUNjIfUZb+AAAACgAAAA93ZWJfYXV0aF9kb21haW4AAAAAAQAAABp3ZWJhdXRoLWRldi52aWJyYW50YXBwLmNvbQAAAAAAAAAAAAEfUZb+AAAAQIRb0+0I/gah5Ox4W79QzckZikjprFMUX3PQp+CY00MsveDnEU/Wa2eMtBThInAER9DxBynRbryvwoH8Fg4saQo=";
  const expectedOperationDataValue = "oSPAzhkvKm2aWqE2NmxmgNGyDwNdPQER7YOirkOTPU8Hf7NDSfz8bv/MGABNaFev";

  try {
    const buffer = Buffer.from(stringEnvelope, 'base64');

    const xdrTxEnvelope = xdr.TransactionEnvelope.fromXDR(buffer);

    const operation = xdrTxEnvelope.value().tx().operations()[0];
    console.log(">>>>> App-test operation: ", operation);

    const dataValue = operation.body().value().dataValue();
    console.log(">>>>> App-test dataValue: ", dataValue);

    const stringDataValue = dataValue.toString();
    console.log(">>>>> App-test stringDataValue: ", stringDataValue);

    expect(stringDataValue).toEqual(expectedOperationDataValue);
  } catch (error) {
    console.log("X X X ERROR while parsing XDR transaction or operation: ", error);
  }
});
