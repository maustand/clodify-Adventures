/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { TreeviewComponent } from './treeview.component';
describe('TreeviewComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [TreeviewComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(TreeviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/home/maustand/Desktop/cloudifytest/client/src/app/treeview/treeview.component.spec.js.map