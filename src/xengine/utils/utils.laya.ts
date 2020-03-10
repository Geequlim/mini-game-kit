/**
 * 为 Animator 所属节点事件帧脚本, 当动画事件帧触发时**节点对象** 会派发 `ANIMATION_EVENT` 事件，参数为事件名
 *
 * @class AnimatorEventLisener
 * @extends {Laya.Script3D}
 */
export class AnimatorEventLisener extends Laya.Script3D {
	static ANIMATION_EVENT = 'ANIMATION_EVENT';

	/** 参数为接受的动画事件列表 */
	constructor(events: string[]) {
		super();
		for (const event of events) {
			this[event] = (...args) => {
				this.owner.event(AnimatorEventLisener.ANIMATION_EVENT, event);
			}
		}
	}

	attach(animator: Laya.Animator) {
		animator.owner.addComponentIntance(this);
	}
}


/** 备份 Transform */
export function backup_transform(t: Laya.Transform3D) {
	return {
		position: t.position.clone() as Laya.Vector3,
		rotation: t.rotation.clone() as Laya.Quaternion,
		scale: t.getWorldLossyScale().clone() as Laya.Vector3
	}
}

/** 还原 Transform */
export function restore_transform(backup: { position: Laya.Vector3; rotation: Laya.Quaternion; scale: laya.d3.math.Vector3;}, target: Laya.Transform3D) {
	target.rotation = backup.rotation;
	target.position = backup.position;
	target.setWorldLossyScale(backup.scale);
}


/**
 * 使用带碰撞体的物体进行投影碰撞检测
 * @param object 检测物体
 * @param direction 检测方向
 * @param distance 检测距离
 * @param multiply 是否检测多个物体
 *
 * @returns 按空间距离排好顺序的碰撞体
 */
export function object_cast(object: Laya.Sprite3D, direction: Laya.Vector3, distance: number = 50, multiply: boolean = false) {
	let hits: Laya.HitResult[] = [];

	const clone_hit = (h: Laya.HitResult) => {
		let hh = new Laya.HitResult();
		hh.succeeded = true;
		hh.collider = h.collider;
		hh.hitFraction = h.hitFraction;
		hh.normal = h.normal.clone();
		hh.point = h.point.clone();
		return hh;
	}

	let pc = object.getComponent(Laya.PhysicsComponent) as Laya.PhysicsComponent;
	if (pc && pc.simulation && pc.colliderShape) {
		let backup_group = pc.collisionGroup;
		let backup_mask = pc.canCollideWith;

		pc.collisionGroup = 0;
		pc.canCollideWith = 0;

		let start_pos = object.transform.position;
		let end_pos = start_pos.clone();
		let offset = new Laya.Vector3();
		Laya.Vector3.normalize(direction, offset);
		Laya.Vector3.scale(offset, distance, offset);
		Laya.Vector3.add(end_pos, offset, end_pos);

		if (!multiply) {
			let hit = new Laya.HitResult();
			pc.simulation.shapeCast(
				pc.colliderShape,
				start_pos,
				end_pos,
				hit,
				object.transform.rotation,
				object.transform.rotation
			);
			if (hit.succeeded) {
				hits.push(clone_hit(hit));
			}
		} else {
			let out: Laya.HitResult[] = [];
			pc.simulation.shapeCastAll(
				pc.colliderShape,
				start_pos,
				end_pos,
				out,
				object.transform.rotation,
				object.transform.rotation
			);

			let objects: {[key:number]: Laya.HitResult} = {};
			for (const h of out) {
				const id = (h.collider.owner as Laya.Sprite3D).id;
				let last = objects[id];
				if (!last || (Laya.Vector3.distanceSquared(start_pos, h.point) < Laya.Vector3.distanceSquared(start_pos, last.point))) {
					objects[id] = clone_hit(h);
				}
			}
			for (const key in objects) {
				hits.push(objects[key]);
			}
			hits.sort((a, b)=>{
				return Laya.Vector3.distanceSquared(start_pos, a.point) - Laya.Vector3.distanceSquared(start_pos, b.point);
			});
		}
		pc.collisionGroup = backup_group;
		pc.canCollideWith = backup_mask;
	}
	return hits;
}
