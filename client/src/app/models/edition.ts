export class Edition {
	id: number;
	name: string;
	parentId:number | null;
	action:string;
	isRootNode?: boolean;
	
	// constructor( id = 0, name = '', isRootNode = false, action = "", parentId = null ) {
	// 	this.id = id;
	// 	this.name = name;
	// 	this.isRootNode = isRootNode
	// 	this.action = action;
	// 	this.isRootNode = isRootNode;
	// 	this.parentId = parentId;
	// }
	
};

