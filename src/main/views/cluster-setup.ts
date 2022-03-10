import * as vscode from "vscode";

import { addCluster } from "../redux/reducers/cluster-reducer";
import store from "../redux/store";


export async function clusterSetup() {
  const clusterName = await vscode.window.showInputBox({
    title: 'Cluster Name',
		placeHolder: 'My Cluster',
    prompt: 'Enter a name for your Kafka cluster...'
	});

  if (clusterName) {
    const brokerAddress = await vscode.window.showInputBox({
      title: 'Broker Address',
      placeHolder: 'localhost:9092',
      prompt: 'Enter the broker address for your Kafka cluster...'
    });

    if (brokerAddress) {
      store.dispatch(addCluster({
        name: clusterName,
        brokers: [ brokerAddress ]
      }));
    }
  }
}
