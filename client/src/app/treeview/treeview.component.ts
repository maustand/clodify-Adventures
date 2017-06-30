import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NodesService } from '../shared/nodes.service';
import { TreeComponent } from 'angular-tree-component';
import { environment } from '../../environments/environment'
import { NodeItem } from '../models/node-item';
import { EditorViewModel } from '../models/editorViewModel';
import { Action } from '../models/action'; 

import * as _ from "lodash";


@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss'],
    providers: [
    NodesService
  ]
})
export class TreeviewComponent implements OnInit {
  
  @ViewChild(TreeComponent)

  private tree: TreeComponent;
  private lastSltedNode: NodeItem; 
  private NodesList: NodeItem[];
  private originalNodeList: NodeItem[];
  private actionsList:Action[];
  private ifItCanDoAction: boolean;
  private IsEdition: boolean;

	constructor(private _nodeService:NodesService) {
		this.NodesList = [];
    this.actionsList = [];
    this.ifItCanDoAction = false;
    this.IsEdition = false;
	}

  // loads the treeview and buid it
	private loadNodesList() : void {
		this._nodeService.all().subscribe((nodesResponse) => {
      this.originalNodeList = nodesResponse;
      this.NodesList = this._nodeService.buildTree(nodesResponse);
		});
	}

  public onTreeNodeActived(event) : void {
    this.lastSltedNode = event.node.data;

  }

  public removeNode() : void {
      if (this.lastSltedNode) {
      
      this.originalNodeList = _.reject(this.originalNodeList, (item) => {
        return item.id === this.lastSltedNode.id || item.parentId === this.lastSltedNode.id;  
      });


      if (this.lastSltedNode.action === environment.actions.ADD) {
        this.actionsList = _.reject(this.actionsList, (item) => {
          return item.id === this.lastSltedNode.id || item.parentId === this.lastSltedNode.id;  
        });
      }
      else {

        let myAction = new Action();

        myAction.id = this.lastSltedNode.id;
        myAction.action = environment.actions.REMOVE;
        this.actionsList.push(myAction)
      }

      this.NodesList = this._nodeService.buildTree(this.originalNodeList);
      this.tree.treeModel.update();

    }
  }

  public saveAll() : void {
    console.log(this.actionsList);
  }


  public handleNewNodeEdition(newNode): void {
    if (newNode.action === environment.actions.ADD) {
      this.actionsList.push(newNode);
    }
  }

  ngOnInit() {
  	this.loadNodesList();
  }


}
