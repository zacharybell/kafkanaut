import * as vscode from "vscode";
import { selectAll, selectById } from "../redux/reducers/cluster-reducer";
import store from "../redux/store";

export class ClusterTreeProvider implements vscode.TreeDataProvider<KafkaTreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<KafkaTreeItem | undefined | void> = new vscode.EventEmitter<KafkaTreeItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<KafkaTreeItem | undefined | void> = this._onDidChangeTreeData.event;

  getTreeItem(element: KafkaTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: KafkaTreeItem): vscode.ProviderResult<KafkaTreeItem[]> {
    if (element && element.contextValue === 'cluster') {
      const cluster = selectById(store.getState().cluster, element.id!);
      const topics = cluster?.topics;

      return topics?.map(topic => new KafkaTreeItem(topic, 'topic', vscode.TreeItemCollapsibleState.None));
    } else {
      const clusters = selectAll(store.getState().cluster);
      
      return clusters.map(cluster => new KafkaTreeItem(cluster.name, 'cluster', vscode.TreeItemCollapsibleState.Collapsed, cluster.id));
    }
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}

class KafkaTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string, 
    public readonly contextValue: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly id?: string
  ) {
    super(label, collapsibleState);
  }
}
