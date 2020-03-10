/**
 * 节点池
 */
export default class NodePool extends Laya.EventDispatcher {

	private node_cache = {}
	private node_usage_cache = {}
	private _pool_size = 0;
	private node_factory_func: Function = null;
	private _release_func = null;

	constructor(nodeFactory: Function, size: number, releaseFunc?: Function) {
		super();
		this.node_factory_func = nodeFactory;
		for (let i = 0; i < size; i++) {
			this.allocate_node();
		}
		this._release_func = releaseFunc;
	}

	private allocate_node(): any {
		let node = this.node_factory_func();
		this.node_cache[this._pool_size] = node;
		this.node_usage_cache[this._pool_size] = true;
		this._pool_size += 1;
		return node;
	}

	private removeNodeFromParent(node: any) {
		if (node) {
			if (this._release_func) {
				this._release_func(node);
			}
			if (node.removeFromParent && node.parent) {
				node.removeFromParent();
			} else if (node.removeSelf && node.parent) {
				node.removeSelf();
			}
		}
	}

	private get_avaliable_index(): number {
		for (let i = 0; i < this._pool_size; i++) {
			if (this.node_usage_cache[i] === true)
				return i;
		}
		return -1;
	}

	public get(): any {
		let index = this.get_avaliable_index();
		if (index == -1) {
			let node = this.allocate_node();
			this.node_usage_cache[this._pool_size -1] = false;
			return node;
		} else {
			this.node_usage_cache[index] = false;
			return this.node_cache[index];
		}
	}

	public release(node: any) {
		for (let i = 0; i < this._pool_size; i++) {
			if (node == this.node_cache[i]) {
				this.node_usage_cache[i] = true;
				this.removeNodeFromParent(node);
				break;
			}
		}
	}

	public release_all() {
		for (let i = 0; i < this._pool_size; i++) {
			this.node_usage_cache[i] = true;
			this.removeNodeFromParent(this.node_cache[i]);
		}
	}
}
