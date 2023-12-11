/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Buffer } from "buffer";

import xdr from './src/xdr';

import { Networks, WebAuth } from 'stellar-sdk';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [xdrParsingSuccess, setXdrParsingSuccess] = useState<boolean | undefined>(undefined);
  const [stringOutcome, setStringOutcome] = useState("");

  // See: https://laboratory.stellar.org/#xdr-viewer?input=AAAAAgAAAACujgze1ivBKlbuOmtG%2B45%2B3OZ69eQIkvdX1DYyH1GW%2FgAAAMgAAAAAAAAAAAAAAAEAAAAAZWjFDgAAAABlaMY6AAAAAAAAAAIAAAABAAAAABFIDN%2F57JxjKEzm%2BSCZi2BUm9fr71zRPwDzlRVIB1mTAAAACgAAABdkZXYudmlicmFudGFwcC5jb20gYXV0aAAAAAABAAAAQG9TUEF6aGt2S20yYVdxRTJObXhtZ05HeUR3TmRQUUVSN1lPaXJrT1RQVThIZjdORFNmejhidi9NR0FCTmFGZXYAAAABAAAAAK6ODN7WK8EqVu46a0b7jn7c5nr15AiS91fUNjIfUZb%2BAAAACgAAAA93ZWJfYXV0aF9kb21haW4AAAAAAQAAABp3ZWJhdXRoLWRldi52aWJyYW50YXBwLmNvbQAAAAAAAAAAAAEfUZb%2BAAAAQIRb0%2B0I%2Fgah5Ox4W79QzckZikjprFMUX3PQp%2BCY00MsveDnEU%2FWa2eMtBThInAER9DxBynRbryvwoH8Fg4saQo%3D&type=TransactionEnvelope&network=test
  const stringEnvelope = "AAAAAgAAAACujgze1ivBKlbuOmtG+45+3OZ69eQIkvdX1DYyH1GW/gAAAMgAAAAAAAAAAAAAAAEAAAAAZWjFDgAAAABlaMY6AAAAAAAAAAIAAAABAAAAABFIDN/57JxjKEzm+SCZi2BUm9fr71zRPwDzlRVIB1mTAAAACgAAABdkZXYudmlicmFudGFwcC5jb20gYXV0aAAAAAABAAAAQG9TUEF6aGt2S20yYVdxRTJObXhtZ05HeUR3TmRQUUVSN1lPaXJrT1RQVThIZjdORFNmejhidi9NR0FCTmFGZXYAAAABAAAAAK6ODN7WK8EqVu46a0b7jn7c5nr15AiS91fUNjIfUZb+AAAACgAAAA93ZWJfYXV0aF9kb21haW4AAAAAAQAAABp3ZWJhdXRoLWRldi52aWJyYW50YXBwLmNvbQAAAAAAAAAAAAEfUZb+AAAAQIRb0+0I/gah5Ox4W79QzckZikjprFMUX3PQp+CY00MsveDnEU/Wa2eMtBThInAER9DxBynRbryvwoH8Fg4saQo=";
  const expectedOperationDataValue = "oSPAzhkvKm2aWqE2NmxmgNGyDwNdPQER7YOirkOTPU8Hf7NDSfz8bv/MGABNaFev";

  useEffect(() => {
    try {
      const buffer = Buffer.from(stringEnvelope, 'base64');

      const xdrTxEnvelope = xdr.TransactionEnvelope.fromXDR(buffer);

      const operation = xdrTxEnvelope.value().tx().operations()[0];
      console.log(">>>>> operation: ", operation);
      /* 
        Outcome with "js-xdr": "1.3.0":
        >>>>> operation:  
        {
          "_attributes":{
              "body":{
                "_arm":"manageDataOp",
                "_armType":[
                    "Function ChildStruct"
                ],
                "_switch":[
                    "ChildEnum"
                ],
                "_value":[
                    "ChildStruct"
                ]
              },
              "sourceAccount":{
                "_arm":"ed25519",
                "_armType":[
                    "Opaque"
                ],
                "_switch":[
                    "ChildEnum"
                ],
                "_value":[
                    "Buffer"
                ]
              }
          }
        }

        Outcome with "js-xdr": "3.0.0":
        >>>>> operation:  
        {
          "_attributes":{
              "body":{
                "_arm":"manageDataOp",
                "_armType":[
                    "Function n"
                ],
                "_switch":[
                    "n"
                ],
                "_value":[
                    "n"
                ]
              },
              "sourceAccount":{
                "_arm":"ed25519",
                "_armType":[
                    "F"
                ],
                "_switch":[
                    "n"
                ],
                "_value":[
                    Uint8Array
                ]
              }
          }
        }

      */

      const dataValue = operation.body().value().dataValue();
      console.log(">>>>> dataValue: ", dataValue);
      /* 
        Outcome with "js-xdr": "1.3.0":
        >>>>> dataValue:  
        { 
          "data": [111, 83, 80, 65, 122, 104, 107, 118, 75, 109, 50, 97, 87, 113, 69, 50, 78, 109, 120, 109, 103, 78, 71, 121, 68, 119, 78, 100, 80, 81, 69, 82, 55, 89, 79, 105, 114, 107, 79, 84, 80, 85, 56, 72, 102, 55, 78, 68, 83, 102, 122, 56, 98, 118, 47, 77, 71, 65, 66, 78, 97, 70, 101, 118], 
          "type": "Buffer"
        }

        Outcome with "js-xdr": "3.0.0":
        >>>>> dataValue:  
        [111, 83, 80, 65, 122, 104, 107, 118, 75, 109, 50, 97, 87, 113, 69, 50, 78, 109, 120, 109, 103, 78, 71, 121, 68, 119, 78, 100, 80, 81, 69, 82, 55, 89, 79, 105, 114, 107, 79, 84, 80, 85, 56, 72, 102, 55, 78, 68, 83, 102, 122, 56, 98, 118, 47, 77, 71, 65, 66, 78, 97, 70, 101, 118]

      */

      const stringDataValue = dataValue.toString();
      console.log(">>>>> stringDataValue: ", stringDataValue);
      /* 
        Outcome with "js-xdr": "1.3.0":
        >>>>> stringDataValue:
        oSPAzhkvKm2aWqE2NmxmgNGyDwNdPQER7YOirkOTPU8Hf7NDSfz8bv/MGABNaFev

        Outcome with "js-xdr": "3.0.0":
        >>>>> stringDataValue:
        111,83,80,65,122,104,107,118,75,109,50,97,87,113,69,50,78,109,120,109,103,78,71,121,68,119,78,100,80,81,69,82,55,89,79,105,114,107,79,84,80,85,56,72,102,55,78,68,83,102,122,56,98,118,47,77,71,65,66,78,97,70,101,118
      */
      
      setStringOutcome(stringDataValue);
      setXdrParsingSuccess(stringDataValue === expectedOperationDataValue);
    } catch (error) {
      console.log("X X X ERROR while parsing XDR transaction or operation: ", error);
    }

  },[]);

  useEffect(() => {
    try {
      // ***NOTE: for this test to work you'll need to comment out the code that
      // returns a "The transaction has expired" error on the stellar-sdk here:
      // https://github.com/stellar/js-stellar-sdk/blob/master/src/webauth/utils.ts#L267-L269
      // Since the Challenge Tx has a short expiration time so you don't need
      // to create one yourself
      const resp = WebAuth.readChallengeTx(
        stringEnvelope, 
        "GCXI4DG62YV4CKSW5Y5GWRX3RZ7NZZT26XSAREXXK7KDMMQ7KGLP4DGX", 
        Networks.TESTNET, 
        ["dev.vibrantapp.com"], 
        "webauth-dev.vibrantapp.com"
        );

      console.log(">>>>> readChallengeTx response: ", resp);
    } catch (error) {
      console.log("X X X ERROR while reading challenge transaction: ", error);
    }
  },[]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

          {xdrParsingSuccess !== undefined && 
            <View style={styles.sectionContainer}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: xdrParsingSuccess ? "green" : "red",
                  },
                ]}>
                {xdrParsingSuccess ? "XDR Parsing Success! :)" : "XDR Parsing Failed :'("}
              </Text>
              <Text
                style={[
                  styles.sectionDescription,
                  {
                    color: xdrParsingSuccess ? "green" : "red",
                  },
                ]}>
                <Text style={styles.highlight}>EXPECTED:</Text> {expectedOperationDataValue}
              </Text>
              <Text
                style={[
                  styles.sectionDescription,
                  {
                    color: xdrParsingSuccess ? "green" : "red",
                  },
                ]}>
                <Text style={styles.highlight}>RECEIVED:</Text> {stringOutcome}
              </Text>
            </View>
          }

          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits. Here we go!
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
