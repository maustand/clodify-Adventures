var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ApiService } from '../utils/api/api.service';
var NodesService = (function () {
    function NodesService(apiService) {
        this.apiService = apiService;
    }
    NodesService.prototype.all = function () {
        return this.apiService
            .get('nodes/')
            .map(function (data) { return data; });
    };
    NodesService.prototype.create = function (payload) {
        return this.apiService
            .post('/sessions/', payload)
            .map(function (data) { return data; });
    };
    NodesService.prototype.buildTree = function (list) {
        var rootItems = [];
        // stores all already processed items with ther ids as key so we can easily look them up
        var lookup = {};
        // idea of this loop:
        // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
        // in the lookup object and fill it with the data of the parent later
        // if an item has no parentId, add it as a root element to rootItems
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var itemId = item[config.id];
            var parentId = item[config.parentId];
            // look whether item already exists in the lookup table
            if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
                // item is not yet there, so add a preliminary item (its data will be added later)
                lookup[itemId] = { data: null, children: [] };
            }
            // add the current item's data to the item in the lookup table
            lookup[itemId].data = item;
            var TreeItem = lookup[itemId];
            if (parentId === null) {
                // is a root item
                rootItems.push(TreeItem);
            }
            else {
                // has a parent
                // look whether the parent already exists in the lookup table
                if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
                    // parent is not yet there, so add a preliminary parent (its data will be added later)
                    lookup[parentId] = { data: null, children: [] };
                }
                // add the current item to the parent
                lookup[parentId].children.push(TreeItem);
            }
        }
        return rootItems;
    };
    return NodesService;
}());
NodesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ApiService])
], NodesService);
export { NodesService };
//# sourceMappingURL=/home/maustand/Desktop/cloudifytest/client/src/app/shared/nodes.service.js.map