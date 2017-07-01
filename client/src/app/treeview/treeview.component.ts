import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NodesService } from '../shared/nodes.service';
import { NotificationsService } from 'angular2-notifications-lite';
import { TreeComponent } from 'angular-tree-component';
import { environment } from '../../environments/environment'
import { NodeItem } from '../models/node-item';
import { Edition } from '../models/edition';
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
  private actionsList:Edition[];
  private isExpanded: boolean;

  public optionsNotification = {
    position: ["bottom", "right"],
    timeOut: 3000,
    lastOnBottom: true,
  };

	constructor(private _nodeService:NodesService, private _notifyService: NotificationsService) {
		this.NodesList = [];
    this.actionsList = [];
    this.isExpanded = false;
	}

  // Aux function to refresh the treeview, when crud operation has been done.
  private refreshTree(data) :void {
      this.NodesList = this._nodeService.buildTree(data);
      this.tree.treeModel.update();
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
        this.originalNodeList = this._nodeService.removeNodeById(this.lastSltedNode.id , this.originalNodeList);

      if (this.lastSltedNode.action === environment.actions.ADD) {
        this.actionsList = this._nodeService.removeNodeById(this.lastSltedNode.id , this.actionsList);
      }
      else {

        let myAction = new Edition();

        myAction.id = this.lastSltedNode.id;
        myAction.action = environment.actions.REMOVE;
        this.actionsList.push(myAction);
      }

      this.lastSltedNode = null;
      this.refreshTree(this.originalNodeList);
    }
  }

  public saveAll() : void {
    this._nodeService.update(this.actionsList).subscribe((response) => {
      this.actionsList = [];

       this._notifyService.success(
            environment.i18n.TITLE,
            environment.i18n.MESSAGE, {
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: true
           }
       )
    });
  }

  public onClickExpandCollapse() : void {
    if(!this.isExpanded){
      this.tree.treeModel.expandAll()
      this.isExpanded = true;
    }
    else {
      this.tree.treeModel.collapseAll()
      this.isExpanded = false;
    }
  }



  /** 
    This func is the handler of the eventEmitter, 
    dispatched from the child cmp "Editor Modal" 
    It deals with the new/editon nodes and adds 
    an action to the actionList for being sent to the server.
  **/
  public handleNewNodeEdition(event): void {

  let index = 0;

  if (!event.isEdition) {
      
      // creates a new item in the originalNodeList ( util for build the tree after with the new element included)
      this.originalNodeList.push(new NodeItem(event.data.id,
        event.data.name,
        event.data.parentId,
        [],
        event.data.action,
        true
      )); 

      this.actionsList.push(event.data); 

    }
    else {

      this.originalNodeList.map((x) => {
        if (x.id === event.data.id ){
          x.name = event.data.name;
        }
        return x;
      });

      index = _.findIndex(this.actionsList, ['id', event.data.id ]);

      if (index >= 0) {
        this.actionsList[index].name = event.data.name;

      }
      else {
        this.actionsList.push(event.data); //  it is editing a pre existing element.

      }
    }
  
    this.refreshTree(this.originalNodeList);
  }

  ngOnInit() {
  	this.loadNodesList();
  }


}
