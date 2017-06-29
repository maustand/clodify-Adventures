import { Component, OnInit, ViewChild } from '@angular/core';
import { NodesService } from '../shared/nodes.service';
import { TreeComponent } from 'angular-tree-component';
import { NodeItem } from '../models/node-item';

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
	private NodesList: any[];
  private ifItCanDoAction: boolean;
  private lastNodeSelected: object;

	constructor(private _nodeService:NodesService) {
		this.NodesList = [];
    this.ifItCanDoAction = false;
    this.lastNodeSelected = {};
	}

	private loadNodesList(){
		this._nodeService.all().subscribe((nodesResponse) => {
      this.NodesList = this._nodeService.buildTree(nodesResponse);
		});
	}


  onTreeNodeActived(event){
      console.log(event.node.data.id)
  }

  ngOnInit() {
  	this.loadNodesList();
  }



}
