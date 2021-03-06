import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NodeItem } from '../models/node-item';
import { Edition } from '../models/edition';
import { environment } from '../../environments/environment';
import * as _ from "lodash";

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.scss']
})
export class EditorModalComponent implements OnInit {

  @Input() lastSltedNode: NodeItem;
  @Output() evtOnEditionSave  = new EventEmitter();

  private viewModel: Edition;
  public  visible:boolean;
  private visibleAnimate:boolean;
  private isEdition: boolean;

  constructor(){
  }

  public show(isEditing): void {

    this.visible = true;
    this.visibleAnimate = true;
    this.isEdition = isEditing;
    this.viewModel.name = (isEditing) ? this.lastSltedNode.name : '';
  }

  private hide(): void {
    this.visibleAnimate = false;
    this.visible = false;
  }

  AfterViewInit (){
    this.isEdition = true;
  }

  private save(event): void {
    let myEdition = new Edition();
    
    myEdition.name = (!this.viewModel.name) ? this.viewModel.name = environment.NODEDEFAULTNAME : this.viewModel.name;

    if(this.isEdition) {
      myEdition.id = this.lastSltedNode.id;
      myEdition.action = environment.actions.EDIT;
    }
    else {
      myEdition.id = new Date().getTime();
      myEdition.parentId = (this.viewModel.isRootNode || _.isEmpty(this.lastSltedNode)) ? null: this.lastSltedNode.id; // if is rootNode, it will added to the root of the Treeview.
      myEdition.action = environment.actions.ADD;
    }

    this.evtOnEditionSave.emit({ data: myEdition, isEdition: this.isEdition });
    this.hide();
  }

  private onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  ngOnInit() {
    this.viewModel = new Edition();
    this.visible = false;
    this.visibleAnimate = false;
    this.isEdition = false;
  }
  

}
