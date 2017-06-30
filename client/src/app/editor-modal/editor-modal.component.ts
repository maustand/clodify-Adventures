import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { NodeItem } from '../models/node-item';
import { Edition } from '../models/edition';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.scss']
})
export class EditorModalComponent implements OnInit {

  @Input() lastSltedNode: NodeItem;
  @Output() evtOnEditionSave  = new EventEmitter();

  private visible: boolean;
  private visibleAnimate:boolean;
  private isEdition: boolean;
  private viewModel: Edition;
  private actionsList: any[];

  constructor(){
  }

  public show(isEditing): void {

    if (isEditing) {
      this.viewModel.name = this.lastSltedNode.name;

      if (this.lastSltedNode.isNew === false ) {
        this.viewModel.action = environment.actions.EDIT;
      }
    }
    else {
      this.viewModel.action = environment.actions.ADD;
      this.viewModel.name = '';
    }

    this.visible = true;
    this.visibleAnimate = true;

    this.viewModel.isRootNode =  false;
    this.isEdition = isEditing;
  }

  private hide(): void {
    this.visibleAnimate = false;
    this.visible = false;
  }

  private save(event): void {

    if(!this.viewModel.name){
      this.viewModel.name = environment.NODEDEFAULTNAME;
    }

    if(this.isEdition) {
      this.viewModel.id = this.lastSltedNode.id;
    }
    else {
      this.viewModel.id = new Date().getTime();
      this.viewModel.parentId = (this.viewModel.isRootNode) ? null: this.lastSltedNode.id;
    }


    this.evtOnEditionSave.emit({ data: this.viewModel, isEdition: this.isEdition });
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
