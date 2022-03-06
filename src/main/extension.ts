// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { eventNames } from "process";
import * as vscode from "vscode";
import { registerCommands } from "./commands";
import { fetchTopics, selectById } from "./redux/reducers/cluster-reducer";
import store from "./redux/store";
import { ClusterTreeProvider } from "./views/clusters-treeview";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const clusterTreeProvider = new ClusterTreeProvider();
  
  store.subscribe(() => {
    clusterTreeProvider.refresh();
  });

  const tree = vscode.window.createTreeView("clusters", {
    treeDataProvider: clusterTreeProvider,
  });

  tree.onDidChangeSelection(event => {
    if (event.selection.length === 1) {
      vscode.window.showInformationMessage(event.selection[0].label);
    }
  });

  tree.onDidExpandElement(event => {
    if (event.element.contextValue === 'cluster') {
        const clusterId = event.element.id;
        const topics = selectById(store.getState().cluster, clusterId!)?.topics;

        if (!topics) {
          store.dispatch(fetchTopics(clusterId!));
        }
    }
  });

  registerCommands(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
