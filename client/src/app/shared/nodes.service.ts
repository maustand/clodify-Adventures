import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../utils/api/api.service';
import { NodeItem } from '../models/node-item';
import { Edition } from '../models/edition';
import * as _ from "lodash";



@Injectable()
export class NodesService {

	constructor(private apiService:ApiService) {
	}

	all() {
		return this.apiService
		.get('nodes/')
		.map(data => data );
	}

	update(payload: Edition[]) {
		return this.apiService
		.put('nodes/', payload )
		.map(data => data);
	}




	/*** Aux functions ***/

	removeNodeById(nodeId:number, list:any[]) :any[] {
		return _.reject(list, (item) => {
			return item.id === nodeId || item.parentId === nodeId;  
      });
	}
	

	buildTree(list:NodeItem[]): NodeItem[] {

		let treeList = [];
		let lookup = {};

		list.forEach(function(obj) {

			lookup[obj['id']] = obj;
			obj['children'] = [];
		});

		list.forEach(function(obj) {

			if (obj['parentId'] != null) { // has subnodes
				lookup[obj['parentId']]['children'].push(obj);
			} else {
				treeList.push(obj);
			}
		});

		return treeList;
	}

}

