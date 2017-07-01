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

  private viewModel: Edition = new Edition();
  public  visible:boolean = false;
  private visibleAnimate:boolean = false;
  private isEdition: boolean = false;

  constructor(){
  }

  public show(isEditing): void {

    this.visible = true;
    this.visibleAnimate = true;
    this.isEdition = isEditing;
    this.viewModel.name = (isEditing) ? this.lastSltedNode.name : '';
  }

  private hide(): void {
    console.log(this.viewModel)
    this.visibleAnimate = false;
    this.visible = false;
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
      myEdition.parentId = (this.viewModel.isRootNode) ? null: this.lastSltedNode.id;
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
  }
  

}
