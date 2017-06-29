export interface NodeItem {
	id: string;
	name: string;
	parentId: string | null;
	children: any[];
}
;