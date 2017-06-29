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
	private NodesList: NodeItem[];
  private ifItCanDoAction: boolean;
  private lastNodeSelected: object;
  private IsEdition: boolean;

	constructor(private _nodeService:NodesService) {
		this.NodesList = [];
    this.ifItCanDoAction = false;
    this.lastNodeSelected = {};
    this.IsEdition = false;
	}

	private loadNodesList() : void {
		this._nodeService.all().subscribe((nodesResponse) => {
      this.NodesList = this._nodeService.buildTree(nodesResponse);
		});
	}


  onTreeNodeActived(event) : void {
      console.log(event.node.data.id)
  }

  ngOnInit() {
  	this.loadNodesList();
  }



}
