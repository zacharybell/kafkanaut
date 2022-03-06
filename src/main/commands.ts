import * as vscode from "vscode";

import { clusterSetup } from "./views/cluster-setup";

import store from "./redux/store";

export const registerCommands = (context: vscode.ExtensionContext) => {
  const addCluster = vscode.commands.registerCommand("kafkanaut.addCluster", () => clusterSetup());
  // const deleteCluster = vscode.commands.registerCommand("kafkanaut.deleteCluster", (cluster: KafkaTreeItem) => {

  // });

  context.subscriptions.push(addCluster);
};
