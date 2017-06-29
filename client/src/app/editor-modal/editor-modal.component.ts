import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.scss']
})
export class EditorModalComponent implements OnInit {
  
  public visible: boolean;
  private visibleAnimate:boolean;

  constructor(){
  	this.visible = false;
  	this.visibleAnimate = false;
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public save(): void {
  	console.log("OnSaveMOdal")
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
  ngOnInit() {
  }

}
