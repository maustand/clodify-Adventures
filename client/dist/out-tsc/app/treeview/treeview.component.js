var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NodesService } from '../shared/nodes.service';
import { TreeComponent } from 'angular-tree-component';
var TreeviewComponent = (function () {
    function TreeviewComponent(_nodeService) {
        this._nodeService = _nodeService;
        this.nodes = [
            {
                id: 100,
                name: 'aaaaa'
            },
            {
                id: 1,
                name: 'root1',
                children: [
                    { id: 2, name: 'child1' },
                    { id: 3, name: 'child2' }
                ]
            },
            {
                id: 4,
                name: 'root2',
                children: [
                    { id: 5, name: 'child2.1' },
                    {
                        id: 6,
                        name: 'child2.2',
                        children: [
                            { id: 7, name: 'subsub' }
                        ]
                    }
                ]
            }
        ];
        this.NodesList = [];
    }
    TreeviewComponent.prototype.loadNodesList = function () {
        this._nodeService.all().subscribe(function (nodesResponse) {
        });
    };
    TreeviewComponent.prototype.onTreeNodeActived = function (event) {
        console.log(event.node.data.id);
    };
    TreeviewComponent.prototype.ngOnInit = function () {
        this.loadNodesList();
    };
    return TreeviewComponent;
}());
__decorate([
    ViewChild(TreeComponent),
    __metadata("design:type", TreeComponent)
], TreeviewComponent.prototype, "tree", void 0);
TreeviewComponent = __decorate([
    Component({
        selector: 'app-treeview',
        templateUrl: './treeview.component.html',
        styleUrls: ['./treeview.component.scss'],
        providers: [
            NodesService
        ]
    }),
    __metadata("design:paramtypes", [NodesService])
], TreeviewComponent);
export { TreeviewComponent };
//# sourceMappingURL=/home/maustand/Desktop/cloudifytest/client/src/app/treeview/treeview.component.js.map