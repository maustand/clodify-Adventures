export class NodeItem {

	id: number;
	name: string;
	parentId: number | null;
	children: any[];
	action: string;
	isNew: boolean;

	constructor(id = 0, name = "MyNewNode", parentId = null, children = [], action = "", isNew = false) {
		this.id = id;
		this.name = name;
		this.parentId = parentId;
		this.children = children;
		this.action = action;
		this.isNew = isNew;
	}
};
