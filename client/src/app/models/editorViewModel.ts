export class EditorViewModel {
	id: number;
	name: string;
	isRootNode: boolean;
	action:string;

	constructor( id = new Date().getTime(), name = "MyNewNode", isRootNode = true, action = "" ) {
		this.id = id;
		this.name = name;
		this.isRootNode = isRootNode
		this.action = action;
	}
};
