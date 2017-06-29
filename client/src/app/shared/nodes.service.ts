import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../utils/api/api.service';
import { NodeItem } from '../models/NodeItem';



@Injectable()
export class NodesService {

	constructor(private apiService:ApiService) {
	}

	all() {
		return this.apiService
		.get('nodes/')
		.map(data => data );
	}

	update(payload: any) {
		return this.apiService
		.put('/this/', payload )
		.map(data => data);
	}


	buildTree(list:NodeItem[],  Config = { idAttr: 'id', parentAttr: 'parentId', childrenAttr: 'children' }) :NodeItem[] {


		let treeList = [];
		let lookup = {};

		list.forEach(function(obj) {

			lookup[obj[Config.idAttr]] = obj;
			obj[Config.childrenAttr] = [];
		});

		list.forEach(function(obj) {

			if (obj[Config.parentAttr] != null) { // has subnodes
				lookup[obj[Config.parentAttr]][Config.childrenAttr].push(obj);
			} else {
				treeList.push(obj);
			}
		});

		return treeList;
	}

}

