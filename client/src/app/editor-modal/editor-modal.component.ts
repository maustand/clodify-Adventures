import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { NodeItem } from '../models/node-item';
import { EditorViewModel } from '../models/editorViewModel';
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
  private viewModel: EditorViewModel;
  private actionsList: any[];


  constructor(){
    this.viewModel = new EditorViewModel();
    this.visible = false;
    this.visibleAnimate = false;
    this.isEdition = false;
  }

  public show(isEdition): void {
    this.visible = true;
    this.visibleAnimate = true;
    this.isEdition = isEdition;
    console.log(this.lastSltedNode.name, "fon editor")

    if (isEdition) {
      this.viewModel.name = this.lastSltedNode.name;

    }
    else {

      this.viewModel.action = environment.actions.ADD;

    }
  }

  public hide(): void {
    this.visibleAnimate = false;
    this.visible = false;
  }

  private save(event): void {
    let myNewNode = new NodeItem();
    this.evtOnEditionSave.emit(this.viewModel);
  }

  private onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  ngOnInit() {
  }

}
