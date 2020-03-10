const UNIT_EPSILON = 0.001;
const CMP_EPSILON = 0.00001;
const CMP_EPSILON2 = CMP_EPSILON * CMP_EPSILON;
const CMP_NORMALIZE_TOLERANCE = 0.000001;
const CMP_POINT_IN_PLANE_EPSILON = 0.00001;
const Math_SQRT12 = 0.7071067811865475244008443621048490;
const Math_SQRT2 = 1.4142135623730950488016887242;
const Math_LN2 = 0.6931471805599453094172321215;
const Math_TAU = 6.2831853071795864769252867666;
const Math_PI = 3.1415926535897932384626433833;
const Math_E = 2.7182818284590452353602874714;
const MATH_CHECKS = false;

export enum Margin {
	MARGIN_LEFT,
	MARGIN_TOP,
	MARGIN_RIGHT,
	MARGIN_BOTTOM
};

export function register_global_class(cls: Function, name: string) {
	if (typeof window === 'object') {
		window[name] = cls;
	} else if (typeof globalThis === 'object') {
		globalThis[name] = cls;
	} else if (typeof global === 'object') {
		global[name] = cls;
	}
};

export function SGN(m_v: number): number {
	return m_v < 0 ? -1 : 1;
}
export function CLAMP(m_a: number, m_min: number, m_max: number): number {
	return ((m_a) < (m_min)) ? (m_min) : (((m_a) > (m_max)) ? m_max : m_a);
}

interface MathType {
	clone<T>(): T;
	cloneTo<T>(target: T);
	assign<T>(p_src: T): T;
}

function SWAP<T>(m_x: MathType, m_y: MathType) {
	let temp = m_x.clone();
	m_x.assign(m_y);
	m_y.assign(temp);
}

export const ABS = Math.abs;
export const MIN = Math.min;
export const MAX = Math.max;

export function posmod(p_x: number, p_y: number) {
	let value = p_x % p_y;
	if ((value < 0 && p_y > 0) || (value > 0 && p_y < 0)) {
		value += p_y;
	}
	return value;
}

export function stepify(p_value: number, p_step: number) {
	if (p_step != 0) {
		return Math.floor(p_value / p_step + 0.5) * p_step;
	}
	return p_value;
}

export function is_equal_approx(a: number, b: number, tolerance: number = CMP_EPSILON): boolean {
	if (a == b)
		return true;
	return Math.abs(a - b) < tolerance;
}

export function deg2rad(p_y: number): number {
	return p_y * Math.PI / 180.0;
}

export function rad2deg(p_y: number): number {
	return p_y * 180.0 / Math.PI;
}

export enum Axis {
	AXIS_X,
	AXIS_Y,
	AXIS_Z
};

/**
 * 二维向量类
 */
export class Vector2 {

	static ONE: Readonly < Vector2 > = new Vector2(1, 1);
	static ZERO: Readonly < Vector2 > = new Vector2(0, 0);
	static UP: Readonly < Vector2 > = new Vector2(0, 1);
	static DOWN: Readonly < Vector2 > = new Vector2(0, -1);
	static LEFT: Readonly < Vector2 > = new Vector2(-1, 0);
	static RIGHT: Readonly < Vector2 > = new Vector2(1, 0);

	x: number = 0;
	y: number = 0;

	constructor(x = 0, y = 0) {
		this.x = x || 0;
		this.y = y || 0;
	}

	set_axis(p_axis: Axis, p_value: number) {
		switch (p_axis) {
			case Axis.AXIS_X:
				this.x = p_value;
				break;
			case Axis.AXIS_Y:
				this.y = p_value;
				break;
		}
	}

	get_axis(p_axis: Axis) {
		switch (p_axis) {
			case Axis.AXIS_X:
				return this.x;
				break;
			case Axis.AXIS_Y:
				return this.y;
				break;
		}
	}

	public get width(): number {
		return this.x;
	}
	public set width(v: number) {
		this.x = v;
	}
	public get height(): number {
		return this.y;
	}
	public set height(v: number) {
		this.y = v;
	}

	/** 面积 */
	public get area(): number {
		return this.x * this.y;
	}
	/** 长度 */
	public get length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	/** 长度的平方 */
	public get length_squared(): number {
		return this.x * this.x + this.y * this.y;
	}
	/** 角度 */
	public get angle(): number {
		return Math.atan2(this.y, this.x);
	}

	assign(v: Vector2) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}

	nevigate(): Vector2 {
		return new Vector2(-this.x, -this.y);
	}

	add(v: Vector2): Vector2 {
		return new Vector2(this.x + v.x, this.y + v.y);
	}

	add_assign(v: Vector2) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	subtract(v: Vector2): Vector2 {
		return new Vector2(this.x - v.x, this.y - v.y);
	}

	subtract_assign(v: Vector2) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	multiply(v: number | Vector2): Vector2 {
		if (typeof v === 'number') {
			return new Vector2(this.x * v, this.y * v);
		} else {
			return new Vector2(this.x * v.x, this.y * v.y);
		}
	}

	multiply_assign(v: number | Vector2) {
		if (typeof v === 'number') {
			this.x *= v;
			this.y *= v;
		} else {
			this.x *= v.x;
			this.y *= v.y;
		}
		return this;
	}

	divide(v: number | Vector2): Vector2 {
		if (typeof v === 'number') {
			return new Vector2(this.x / v, this.y / v);
		} else {
			return new Vector2(this.x / v.x, this.y / v.y);
		}
	}

	divide_assign(v: number | Vector2) {
		if (typeof v === 'number') {
			this.x /= v;
			this.y /= v;
		} else {
			this.x /= v.x;
			this.y /= v.y;
		}
		return this;
	}

	cross(p_other: Vector2): number {
		return this.x * p_other.y - this.y * p_other.x;
	}

	dot(p_other: Vector2): number {
		return this.x * p_other.x + this.y * p_other.y;
	}

	sign(): Vector2 {
		return new Vector2(SGN(this.x), SGN(this.y));
	}

	floor(): Vector2 {
		return new Vector2(Math.floor(this.x), Math.floor(this.y));
	}

	ceil(): Vector2 {
		return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
	}

	round(): Vector2 {
		return new Vector2(Math.round(this.x), Math.round(this.y));
	}

	abs(): Vector2 {
		return new Vector2(Math.abs(this.x), Math.abs(this.y));
	}

	normalize() {
		let l = this.x * this.x + this.y * this.y;
		if (l != 0) {
			l = Math.sqrt(l);
			this.x /= l;
			this.y /= l;
		}
	}

	normalized(): Vector2 {
		let v = this.clone();
		v.normalize();
		return v;
	}

	is_normalized(): boolean {
		return is_equal_approx(this.length_squared, 1, UNIT_EPSILON);
	}

	posmod(v: number | Vector2): Vector2 {
		if (typeof v === 'number') {
			return new Vector2(posmod(this.x, v), posmod(this.y, v));
		} else if (v instanceof Vector2) {
			return new Vector2(posmod(this.x, v.x), posmod(this.y, v.y));
		}
	}

	project(p_b: Vector2) {
		return p_b.multiply(this.dot(p_b) / p_b.length_squared);
	}

	plane_project(p_d: number, p_vec: Vector2): Vector2 {
		return p_vec.subtract(this.multiply((this.dot(p_vec) - p_d)));
	}

	clamped(p_len): Vector2 {
		let l = this.length;
		let v = this.clone();
		if (l > 0 && p_len < l) {
			v.divide_assign(l);
			v.multiply_assign(p_len);
		}
		return v;
	}

	slide(p_normal: Vector2): Vector2 {
		if (MATH_CHECKS && !p_normal.is_normalized()) return new Vector2();
		return this.subtract(p_normal.multiply(this.dot(p_normal)));
	}

	bounce(p_normal: Vector2): Vector2 {
		return this.reflect(p_normal).nevigate();
	}

	reflect(p_normal: Vector2): Vector2 {
		if (MATH_CHECKS && !p_normal.is_normalized()) return new Vector2();
		return p_normal.multiply(this.dot(p_normal)).multiply(2).subtract(this);
	}

	linear_interpolate(p_b: Vector2, p_t: number): Vector2 {
		let res = this.clone();
		res.x += (p_t * (p_b.x - this.x));
		res.y += (p_t * (p_b.y - this.y));
		return res;
	}

	slerp(p_b: Vector2, p_t: number): Vector2 {
		if (MATH_CHECKS && !this.is_normalized()) return new Vector2();
		let theta = this.angle_to(p_b);
		return this.rotated(theta * p_t);
	}

	cubic_interpolate(p_b: Vector2, p_pre_a: Vector2, p_post_b, p_t: number): Vector2 {
		let p0 = p_pre_a.clone();
		let p1 = this.clone();
		let p2 = p_b.clone();
		let p3 = p_post_b.clone();

		let t = p_t;
		let t2 = t * t;
		let t3 = t2 * t;
		let out = (
			(
				(p1.multiply(2.0)).add(
				(p0.nevigate().add(p2)).multiply(t)).add(
				(p0.multiply(2.0).subtract(p1.multiply(5.0)).add(p2.multiply(4.0)).subtract(p3)).multiply(t2)).add(
				(p0.nevigate().add(p1.multiply(3.0)).subtract(p2.multiply(3.0)).add(p3)).multiply(t3))
			).multiply(0.5)
		);
		return out;
	}

	move_toward(p_to: Vector2, p_delta): Vector2 {
		let v = this.clone();
		let vd = p_to.subtract(v);
		let len = vd.length;
		if ((len <= p_delta) || len < CMP_EPSILON) {
			return p_to;
		} else {
			return v.add(vd.divide(len).multiply(p_delta));
		}
	}

	snap(p_by) {
		this.x = stepify(this.x, p_by.x);
		this.y = stepify(this.y, p_by.y);
	}

	snapped(p_by): Vector2 {
		return new Vector2(stepify(this.x, p_by.x), stepify(this.y, p_by.y));
	}

	aspect(): number {
		return this.x / this.y;
	}

	tangent(): Vector2 {
		return new Vector2(this.y, -this.x);
	}

	rotated(p_by: number) {
		let v = new Vector2();
		v.set_rotation(this.angle + p_by);
		v.multiply(this.length);
		return v;
	}

	set_rotation(p_radians: number) {
		this.x = Math.cos(p_radians);
		this.y = Math.sin(p_radians);
	}

	distance_to(p_vector2: Vector2): number {
		return Math.sqrt((this.x - p_vector2.x) * (this.x - p_vector2.x) + (this.y - p_vector2.y) * (this.y - p_vector2.y));
	}

	distance_squared_to(p_vector2: Vector2): number {
		return (this.x - p_vector2.x) * (this.x - p_vector2.x) + (this.y - p_vector2.y) * (this.y - p_vector2.y);
	}

	angle_to(p_vector2: Vector2): number {
		return Math.atan2(this.cross(p_vector2), this.dot(p_vector2));
	}

	direction_to(p_b: Vector2): Vector2 {
		let ret = new Vector2(p_b.x - this.x, p_b.y - this.y);
		ret.normalize();
		return ret;
	}

	angle_to_point(p_vector2: Vector2): number {
		return Math.atan2(this.y - p_vector2.y, this.x - p_vector2.x);
	}

	clone(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	cloneTo(target: {x: number, y: number}) {
		target.x = this.x;
		target.y = this.y;
	}

	is_equal_approx(p_v: Vector2): boolean {
		return is_equal_approx(this.x, p_v.x) && is_equal_approx(this.y, p_v.y);
	}

	equals(p_v: Vector2): boolean {
		return this.is_equal_approx(p_v);
	}

	toString(): string {
		return `(${this.x},${this.y})`;
	}
};
export const Point2 = Vector2;
export const Size2 = Vector2;
register_global_class(Vector2, 'Vector2');
register_global_class(Point2, 'Point2');
register_global_class(Size2, 'Size2');


export class Rect2 {
	readonly position = new Point2();
	readonly size = new Size2();


	constructor(position_x?: Vector2 | number, size_y?: Vector2 | number, width?: number, height?: number) {
		if (arguments.length > 3) {
			this.size.height = height;
			this.size.width = width;
			this.position.x = position_x as number;
			this.position.y = size_y as number;
		} else {
			if (position_x) this.position.assign(position_x as Vector2);
			if (size_y) this.size.assign(size_y as Vector2);
		}
	}

	get end() { return this.position.add(this.size); }
	get area() { return this.size.width * this.size.height; }

	intersects(p_rect: Rect2): boolean {
		if (this.position.x >= (p_rect.position.x + p_rect.size.width))
			return false;
		if ((this.position.x + this.size.width) <= p_rect.position.x)
			return false;
		if (this.position.y >= (p_rect.position.y + p_rect.size.height))
			return false;
		if ((this.position.y + this.size.height) <= p_rect.position.y)
			return false;
		return true;
	}

	intersects_touch(p_rect: Rect2): boolean {
		if (this.position.x > (p_rect.position.x + p_rect.size.width))
			return false;
		if ((this.position.x + this.size.width) < p_rect.position.x)
			return false;
		if (this.position.y > (p_rect.position.y + p_rect.size.height))
			return false;
		if ((this.position.y + this.size.height) < p_rect.position.y)
			return false;
		return true;
	}

	distance_to(p_point: Vector2): number {
		let dist = 0.0;
		let inside = true;

		if (p_point.x < this.position.x) {
			let d = this.position.x - p_point.x;
			dist = d;
			inside = false;
		}
		if (p_point.y < this.position.y) {
			let d = this.position.y - p_point.y;
			dist = inside ? d : MIN(dist, d);
			inside = false;
		}
		if (p_point.x >= (this.position.x + this.size.x)) {
			let d = p_point.x - (this.position.x + this.size.x);
			dist = inside ? d : MIN(dist, d);
			inside = false;
		}
		if (p_point.y >= (this.position.y + this.size.y)) {
			let d = p_point.y - (this.position.y + this.size.y);
			dist = inside ? d : MIN(dist, d);
			inside = false;
		}
		if (inside)
			return 0;
		else
			return dist;
	}

	encloses(p_rect: Rect2): boolean {
		return (p_rect.position.x >= this.position.x) && (p_rect.position.y >= this.position.y) &&
			   ((p_rect.position.x + p_rect.size.x) <= (this.position.x + this.size.x)) &&
			   ((p_rect.position.y + p_rect.size.y) <= (this.position.y + this.size.y));
	}

	has_no_area() {
		return (this.size.x <= 0 || this.size.y <= 0);
	}

	clip(p_rect: Rect2): Rect2 { /// return a clipped rect
		let new_rect = new Rect2(p_rect.position, p_rect.size);
		if (!this.intersects(new_rect))
			return new Rect2();
		new_rect.position.x = MAX(p_rect.position.x, this.position.x);
		new_rect.position.y = MAX(p_rect.position.y, this.position.y);

		let p_rect_end = p_rect.position.add(p_rect.size);
		let end = this.position.add(this.size);
		new_rect.size.x = MIN(p_rect_end.x, end.x) - new_rect.position.x;
		new_rect.size.y = MIN(p_rect_end.y, end.y) - new_rect.position.y;

		return new_rect;
	}

	 merge(p_rect: Rect2): Rect2 { ///< return a merged rect

		let new_rect = new Rect2();

		new_rect.position.x = MIN(p_rect.position.x, this.position.x);
		new_rect.position.y = MIN(p_rect.position.y, this.position.y);

		new_rect.size.x = MAX(p_rect.position.x + p_rect.size.x, this.position.x + this.size.x);
		new_rect.size.y = MAX(p_rect.position.y + p_rect.size.y, this.position.y + this.size.y);

		new_rect.size.assign(new_rect.size.subtract(new_rect.position)); //make relative again

		return new_rect;
	}

	has_point(p_point: Vector2) : boolean {
		if (p_point.x < this.position.x)
			return false;
		if (p_point.y < this.position.y)
			return false;
		if (p_point.x >= (this.position.x + this.size.x))
			return false;
		if (p_point.y >= (this.position.y + this.size.y))
			return false;
		return true;
	}

	is_equal_approx(p_rect: Rect2) {
		return this.position.is_equal_approx(p_rect.position) && this.size.is_equal_approx(p_rect.size);
	}

	equals(p_rect): boolean {
		return this.position.equals(p_rect.position) && this.size.equals(p_rect.size);
	}

	grow(p_by: number) : Rect2 {
		let g = new Rect2(this.position, this.size);
		g.position.x -= p_by;
		g.position.y -= p_by;
		g.size.width += p_by * 2;
		g.size.height += p_by * 2;
		return g;
	}

	grow_margin(p_margin: Margin, p_amount: number): Rect2 {
		let g = new Rect2(this.position, this.size);
		g = g.grow_individual((Margin.MARGIN_LEFT == p_margin) ? p_amount : 0,
				(Margin.MARGIN_TOP == p_margin) ? p_amount : 0,
				(Margin.MARGIN_RIGHT == p_margin) ? p_amount : 0,
				(Margin.MARGIN_BOTTOM == p_margin) ? p_amount : 0);
		return g;
	}

	grow_individual(p_left: number, p_top: number, p_right: number, p_bottom: number) : Rect2{
		let g = new Rect2(this.position, this.size);
		g.position.x -= p_left;
		g.position.y -= p_top;
		g.size.width += p_left + p_right;
		g.size.height += p_top + p_bottom;
		return g;
	}

	expand(p_vector: Vector2): Rect2 {
		let r = new Rect2(this.position, this.size);
		r.expand_to(p_vector);
		return r;
	}

	expand_to(p_vector: Vector2) { //in place function for speed

		let begin = this.position;
		let end = this.position.add(this.size);

		if (p_vector.x < begin.x)
			begin.x = p_vector.x;
		if (p_vector.y < begin.y)
			begin.y = p_vector.y;

		if (p_vector.x > end.x)
			end.x = p_vector.x;
		if (p_vector.y > end.y)
			end.y = p_vector.y;

		this.position.assign(begin);
		this.size.assign(end.subtract(begin));
	}

	abs() : Rect2 {
		return new Rect2(new Point2(this.position.x + MIN(this.size.x, 0), this.position.y + MIN(this.size.y, 0)), this.size.abs());
	}

	toString() {
		return `${this.position}, ${this.size}`;
	}

};
register_global_class(Rect2, 'Rect2');

/**
 * 三维向量类
 */
export class Vector3 {

	x: number;
	y: number;
	z: number;

	constructor(x: number = 0, y: number = 0, z: number = 0) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}

	assign(v: Vector3) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;
	}

	nevigate(): Vector3 {
		return new Vector3(-this.x, -this.y, -this.z);
	}

	clone(): Vector3 {
		return new Vector3(this.x, this.y, this.z);
	}

	cloneTo(target: {x: number, y: number, z: number}) {
		target.x = this.x;
		target.y = this.y;
		target.z = this.z;
	}

	set_axis(p_axis: Axis, p_value: number) {
		switch (p_axis) {
			case Axis.AXIS_X:
				this.x = p_value;
				break;
			case Axis.AXIS_Y:
				this.y = p_value;
				break;
			case Axis.AXIS_Z:
				this.z = p_value;
				break;
		}
	}

	get_axis(p_axis: Axis) {
		switch (p_axis) {
			case Axis.AXIS_X:
				return this.x;
				break;
			case Axis.AXIS_Y:
				return this.y;
				break;
			case Axis.AXIS_Z:
				return this.z;
				break;
		}
	}

	min_axis(): Axis {
		return this.x < this.y ? (this.x < this.z ? Axis.AXIS_X : Axis.AXIS_Z) : (this.y < this.z ? Axis.AXIS_Y : Axis.AXIS_Z);
	}

	max_axis(): Axis {
		return this.x < this.y ? (this.y < this.z ? Axis.AXIS_Z : Axis.AXIS_Y) : (this.x < this.z ? Axis.AXIS_Z : Axis.AXIS_X);
	}

	get length() : number {
		let x2 = this.x * this.x;
		let y2 = this.y * this.y;
		let z2 = this.z * this.z;
		return Math.sqrt(x2 + y2 + z2);
	}

	get length_squared(): number {
		let x2 = this.x * this.x;
		let y2 = this.y * this.y;
		let z2 = this.z * this.z;
		return x2 + y2 + z2;
	}


	add(v: Vector3): Vector3 {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	add_assign(v: Vector3) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	subtract(v: Vector3): Vector3 {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	subtract_assign(v: Vector3) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}

	multiply(v: number | Vector3): Vector3 {
		if (typeof v === 'number') {
			return new Vector3(this.x * v, this.y * v, this.z * v);
		} else {
			return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
		}
	}

	multiply_assign(v: number | Vector3) {
		if (typeof v === 'number') {
			this.x *= v;
			this.y *= v;
			this.z *= v;
		} else {
			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;
		}
		return this;
	}

	divide(v: number | Vector3): Vector3 {
		if (typeof v === 'number') {
			return new Vector3(this.x / v, this.y / v, this.z / v);
		} else {
			return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
		}
	}

	divide_assign(v: number | Vector3) {
		if (typeof v === 'number') {
			this.x /= v;
			this.y /= v;
			this.z /= v;
		} else {
			this.x /= v.x;
			this.y /= v.y;
			this.z /= v.z;
		}
		return this;
	}

	cross(p_b: Vector3) : Vector3 {
		return new Vector3(
			(this.y * p_b.z) - (this.z * p_b.y),
			(this.z * p_b.x) - (this.x * p_b.z),
			(this.x * p_b.y) - (this.y * p_b.x)
		);
	}

	dot(p_b: Vector3) : number {
		return this.x * p_b.x + this.y * p_b.y + this.z * p_b.z;
	}

	abs() : Vector3 {
		return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
	}

	sign() : Vector3 {
		return new Vector3(SGN(this.x), SGN(this.y), SGN(this.z));
	}

	floor() : Vector3 {
		return new Vector3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
	}

	ceil() : Vector3 {
		return new Vector3(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
	}

	round() : Vector3 {
		return new Vector3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
	}

	normalize() {
		let lengthsq = this.length_squared;
		if (lengthsq == 0) {
			this.x = this.y = this.z = 0;
		} else {
			let length = Math.sqrt(lengthsq);
			this.x /= length;
			this.y /= length;
			this.z /= length;
		}
	}

	normalized() : Vector3 {
		let v = this.clone();
		v.normalize();
		return v;
	}

	is_normalized() : boolean {
		return is_equal_approx(this.length_squared, 1.0, UNIT_EPSILON);
	}

	inverse() : Vector3 {
		return new Vector3(1.0 / this.x, 1.0 / this.y, 1.0 / this.z);
	}

	zero() {
		this.x = this.y = this.z = 0;
		return this;
	}

	snap(p_val: Vector3) {
		this.x = stepify(this.x, p_val.x);
		this.y = stepify(this.y, p_val.y);
		this.z = stepify(this.z, p_val.z);
	}

	snapped(p_val: Vector3) : Vector3 {
		let v = this.clone();
		v.snap(p_val);
		return v;
	}

	rotate(p_axis: Vector3, p_phi: number) {
		let b = new Basis();
		b.set_axis_angle(p_axis, p_phi);
		return this.assign(b.xform(this));
	}

	rotated(p_axis: Vector3, p_phi: number): Vector3 {
		let r = this.clone();
		return r.rotate(p_axis, p_phi);
	}

	linear_interpolate(p_b: Vector3, p_t: number): Vector3 {
		return new Vector3(
			this.x + (p_t * (p_b.x - this.x)),
			this.y + (p_t * (p_b.y - this.y)),
			this.z + (p_t * (p_b.z - this.z))
		);
	}

	slerp(p_b: Vector3, p_t: number) {
		let theta = this.angle_to(p_b);
		return this.rotated(this.cross(p_b).normalized(), theta * p_t);
	}

	cubic_interpolate(p_b: Vector3, p_pre_a: Vector3, p_post_b: Vector3, p_t: number): Vector3 {
		let p0 = p_pre_a.clone();
		let p1 = this.clone();
		let p2 = p_b.clone();
		let p3 = p_post_b.clone();

		let t = p_t;
		let t2 = t * t;
		let t3 = t2 * t;

		let out = (
			(p1.multiply(2.0)).add(
			(p0.nevigate().add(p2)).multiply(t)).add(
			(p0.multiply(2.0).subtract(p1.multiply(5.0)).add(p2.multiply(4.0)).subtract(p3)).multiply(t2)).add(
			(p0.nevigate().add(p1.multiply(3.0)).subtract(p2.multiply(3.0)).add(p3)).multiply(t3))
		).multiply(0.5);
		return out;
	}

	cubic_interpolaten(p_b: Vector3, p_pre_a: Vector3, p_post_b: Vector3, p_t: number) : Vector3 {
		let p0 = p_pre_a.clone();
		let p1 = this.clone();
		let p2 = p_b.clone();
		let p3 = p_post_b.clone();

		{
			//normalize
			let ab = p0.distance_to(p1);
			let bc = p1.distance_to(p2);
			let cd = p2.distance_to(p3);

			if (ab > 0)
				p0 = p1.add(p0.subtract(p1).multiply(bc / ab));
			if (cd > 0)
				p3 = p2.add(p3.subtract(p2).multiply(bc / cd));
		}

		let t = p_t;
		let t2 = t * t;
		let t3 = t2 * t;

		let out = (
			(p1.multiply(2.0)).add(
			(p0.nevigate().add(p2)).multiply(t)).add(
			(p0.multiply(2.0).subtract(p1.multiply(5.0)).add(p2.multiply(4.0)).subtract(p3)).multiply(t2)).add(
			(p0.nevigate().add(p1.multiply(3.0)).subtract(p2.multiply(3.0)).add(p3)).multiply(t3))
		).multiply(0.5);
		return out;
	}

	move_toward(p_to: Vector3, p_delta: number) : Vector3 {
		let v = this.clone();
		let vd = p_to.subtract(v);
		let len = vd.length;
		return len <= p_delta || len < CMP_EPSILON ? p_to : v.add(vd.divide(len).multiply(p_delta));
	}

	distance_to(p_b: Vector3) : number {
		return p_b.subtract(this).length;
	}

	distance_squared_to(p_b: Vector3) : number {
		return p_b.subtract(this).length_squared;
	}

	posmod(p_mod: number): Vector3 {
		return new Vector3(posmod(this.x, p_mod), posmod(this.y, p_mod), posmod(this.z, p_mod));
	}

	posmodv(p_modv: Vector3): Vector3 {
		return new Vector3(posmod(this.x, p_modv.x), posmod(this.y, p_modv.y), posmod(this.z, p_modv.z));
	}

	project(p_b: Vector3): Vector3 {
		return p_b.multiply(this.dot(p_b) / p_b.length_squared);
	}

	angle_to(p_b: Vector3): number {
		return Math.atan2(this.cross(p_b).length, this.dot(p_b));
	}

	direction_to(p_b: Vector3): Vector3 {
		let ret = new Vector3(p_b.x - this.x, p_b.y - this.y, p_b.z - this.z);
		ret.normalize();
		return ret;
	}

	slide(p_normal: Vector3): Vector3 {
		if (MATH_CHECKS && !p_normal.is_normalized()) return new Vector3();
		return this.subtract(p_normal.multiply(this.dot(p_normal)));
	}

	bounce(p_normal: Vector3): Vector3 {
		return this.reflect(p_normal).nevigate();
	}

	reflect(p_normal: Vector3): Vector3 {
		if (MATH_CHECKS && !p_normal.is_normalized()) return new Vector3();
		return p_normal.multiply(2.0).multiply(this.dot(p_normal)).subtract(this);
	}

	is_equal_approx(p_v: Vector3): boolean {
		return is_equal_approx(this.x, p_v.x) && is_equal_approx(this.y, p_v.y) && is_equal_approx(this.z, p_v.z);
	}

	equals(p_v: Vector3): boolean {
		return this.is_equal_approx(p_v);
	}

	toString(): string {
		return `(${this.x},${this.y},${this.z})`;
	}
};
register_global_class(Vector3, 'Vector3');


export class Quat {

	x: number = 0;
	y: number = 0;
	z: number = 0;
	w: number = 1;

	get length(): number {
		return Math.sqrt(this.length_squared);
	}

	get length_squared(): number {
		return this.dot(this);
	}

	set euler(p_euler: Vector3) { this.set_euler_yxz(p_euler); }
	get euler(): Vector3 { return this.get_euler_yxz(); }

	constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;
	}

	assign(p_quat: Quat) {
		this.x = p_quat.x;
		this.y = p_quat.y;
		this.z = p_quat.z;
		this.w = p_quat.w;
		return this;
	}

	set(p_x: number, p_y: number, p_z: number, p_w: number) {
		this.x = p_x;
		this.y = p_y;
		this.z = p_z;
		this.w = p_w;
	}

	clone(): Quat {
		return new Quat(this.x, this.y, this.z, this.w);
	}

	cloneTo(target: {x: number, y: number, z: number, w: number}) {
		target.x = this.x;
		target.y = this.y;
		target.z = this.z;
		target.w = this.w;
	}

	set_axis_angle(axis: Vector3, angle: number) {
		if (MATH_CHECKS && axis.is_normalized()) {
			let d = axis.length;
			if (d == 0)
				this.set(0, 0, 0, 0);
			else {
				let sin_angle = Math.sin(angle * 0.5);
				let cos_angle = Math.cos(angle * 0.5);
				let s = sin_angle / d;
				this.set(axis.x * s, axis.y * s, axis.z * s, cos_angle);
			}
		}
	}

	get_axis_angle(r_axis: Vector3): number {
		let r = 1.0 / Math.sqrt(1 - this.w * this.w);
		r_axis.x = this.x * r;
		r_axis.y = this.y * r;
		r_axis.z = this.z * r;
		let r_angle = 2 * Math.acos(this.w);
		return r_angle;
	}

	add(q2: Quat): Quat {
		let q1 = this;
		return new Quat(q1.x + q2.x, q1.y + q2.y, q1.z + q2.z, q1.w + q2.w);
	}

	add_assign(q2: Quat) {
		let q = this.add(q2);
		this.assign(q);
		return this;
	}

	subtract(q2: Quat): Quat {
		let q1 = this;
		return new Quat(q1.x - q2.x, q1.y - q2.y, q1.z - q2.z, q1.w - q2.w);
	}

	subtract_assign(q2: Quat) {
		let q = this.subtract(q2);
		this.assign(q);
		return this;
	}

	multiply(v: Vector3|Quat| number): Quat {
		if (typeof v == 'number') {
			return new Quat(this.x * v, this.y * v, this.z * v, this.w * v);
		} else {
			return new Quat(
				this.w * v.x + this.y * v.z - this.z * v.y,
				this.w * v.y + this.z * v.x - this.x * v.z,
				this.w * v.z + this.x * v.y - this.y * v.x,
				-this.x * v.x - this.y * v.y - this.z * v.z
			);
		}
	}

	multiply_assign(v: Vector3|Quat| number) {
		let q = this.multiply(v);
		this.assign(q);
		return this;
	}

	divide(s: number): Quat {
		return this.multiply(1.0 / s);
	}

	divide_assign(s: number) {
		return this.multiply_assign(1.0 / s);
	}

	dot(q: Quat) : number {
		return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w;
	}

	normalize() {
		this.divide_assign(this.length);
	}

	normalized(): Quat {
		return this.divide(this.length);
	}

	is_normalized(): boolean {
		return is_equal_approx(this.length_squared, 1.0, UNIT_EPSILON);
	}

	inverse(): Quat {
		let q = this.normalized();
		return new Quat(-q.x, -q.y, -q.z, q.w);
	}
	/**
	* set_euler_xyz expects a vector containing the Euler angles in the format
	* (ax,ay,az), where ax is the angle of rotation around x axis,
	* and similar for other axes.
	* The current implementation uses XYZ convention (Z is the first rotation).
	*/
	set_euler_xyz(p_euler: Vector3) {
		let half_a1 = p_euler.x * 0.5;
		let half_a2 = p_euler.y * 0.5;
		let half_a3 = p_euler.z * 0.5;

		// R = X(a1).Y(a2).Z(a3) convention for Euler angles.
		// Conversion to quaternion as listed in https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/19770024290.pdf (page A-2)
		// a3 is the angle of the first rotation, following the notation in this reference.

		let cos_a1 = Math.cos(half_a1);
		let sin_a1 = Math.sin(half_a1);
		let cos_a2 = Math.cos(half_a2);
		let sin_a2 = Math.sin(half_a2);
		let cos_a3 = Math.cos(half_a3);
		let sin_a3 = Math.sin(half_a3);

		this.set(sin_a1 * cos_a2 * cos_a3 + sin_a2 * sin_a3 * cos_a1,
				-sin_a1 * sin_a3 * cos_a2 + sin_a2 * cos_a1 * cos_a3,
				sin_a1 * sin_a2 * cos_a3 + sin_a3 * cos_a1 * cos_a2,
				-sin_a1 * sin_a2 * sin_a3 + cos_a1 * cos_a2 * cos_a3);
	}

	/**
	* get_euler_xyz returns a vector containing the Euler angles in the format
	* (a1,a2,a3), where a3 is the angle of the first rotation, and a1 is the last
	* (following the convention they are commonly defined in the literature).
	*
	* The current implementation uses XYZ convention (Z is the first rotation),
	* so euler.z is the angle of the (first) rotation around Z axis and so on,
	*
	* And thus, assuming the matrix is a rotation matrix, this function returns
	* the angles in the decomposition R = X(a1).Y(a2).Z(a3) where Z(a) rotates
	* around the z-axis by a and so on.
	*/
	get_euler_xyz() : Vector3 {

		// Euler angles in XYZ convention.
		// See https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix
		//
		// rot =  cy*cz          -cy*sz           sy
		//        cz*sx*sy+cx*sz  cx*cz-sx*sy*sz -cy*sx
		//       -cx*cz*sy+sx*sz  cz*sx+cx*sy*sz  cx*cy
		let m = new Basis();
		m.quat = this;
		return m.get_euler_xyz();
	}

	// set_euler_yxz expects a vector containing the Euler angles in the format
	// (ax,ay,az), where ax is the angle of rotation around x axis,
	// and similar for other axes.
	// This implementation uses YXZ convention (Z is the first rotation).
	set_euler_yxz(p_euler: Vector3) {
		let half_a1 = p_euler.y * 0.5;
		let half_a2 = p_euler.x * 0.5;
		let half_a3 = p_euler.z * 0.5;

		// R = Y(a1).X(a2).Z(a3) convention for Euler angles.
		// Conversion to quaternion as listed in https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/19770024290.pdf (page A-6)
		// a3 is the angle of the first rotation, following the notation in this reference.

		let cos_a1 = Math.cos(half_a1);
		let sin_a1 = Math.sin(half_a1);
		let cos_a2 = Math.cos(half_a2);
		let sin_a2 = Math.sin(half_a2);
		let cos_a3 = Math.cos(half_a3);
		let sin_a3 = Math.sin(half_a3);

		this.set(sin_a1 * cos_a2 * sin_a3 + cos_a1 * sin_a2 * cos_a3,
				sin_a1 * cos_a2 * cos_a3 - cos_a1 * sin_a2 * sin_a3,
				-sin_a1 * sin_a2 * cos_a3 + cos_a1 * cos_a2 * sin_a3,
				sin_a1 * sin_a2 * sin_a3 + cos_a1 * cos_a2 * cos_a3);
	}

	/**
	* get_euler_yxz returns a vector containing the Euler angles in the format
	* (ax,ay,az), where ax is the angle of rotation around x axis,
	* and similar for other axes.
	* This implementation uses YXZ convention (Z is the first rotation).
	 */
	get_euler_yxz() : Vector3 {
		if (MATH_CHECKS && !this.is_normalized()) debugger;
		let m = new Basis();
		m.quat = this;
		return m.get_euler_yxz();
	}

	slerp(q: Quat, t: number): Quat {
		if ((MATH_CHECKS && !this.is_normalized() || !q.is_normalized())) return new Quat();
		let to1 = new Quat();
		let omega, cosom, sinom, scale0, scale1;
		// calc cosine
		cosom = this.dot(q);

		// adjust signs (if necessary)
		if (cosom < 0.0) {
			cosom = -cosom;
			to1.x = -q.x;
			to1.y = -q.y;
			to1.z = -q.z;
			to1.w = -q.w;
		} else {
			to1.x = q.x;
			to1.y = q.y;
			to1.z = q.z;
			to1.w = q.w;
		}

		// calculate coefficients

		if ((1.0 - cosom) > CMP_EPSILON) {
			// standard case (slerp)
			omega = Math.acos(cosom);
			sinom = Math.sin(omega);
			scale0 = Math.sin((1.0 - t) * omega) / sinom;
			scale1 = Math.sin(t * omega) / sinom;
		} else {
			// "from" and "to" quaternions are very close
			//  ... so we can do a linear interpolation
			scale0 = 1.0 - t;
			scale1 = t;
		}
		// calculate final values
		return new Quat(
			scale0 * this.x + scale1 * to1.x,
			scale0 * this.y + scale1 * to1.y,
			scale0 * this.z + scale1 * to1.z,
			scale0 * this.w + scale1 * to1.w
		);
	}

	slerpni(q: Quat, t: number): Quat {
		if ((MATH_CHECKS && !this.is_normalized() || !q.is_normalized())) return new Quat();

		let from = this.clone();

		let dot = from.dot(q);

		if (Math.abs(dot) > 0.9999) return from;

		let theta = Math.acos(dot),
			sinT = 1.0 / Math.sin(theta),
			newFactor = Math.sin(t * theta) * sinT,
			invFactor = Math.sin((1.0 - t) * theta) * sinT;

		return new Quat(
			invFactor * from.x + newFactor * q.x,
			invFactor * from.y + newFactor * q.y,
			invFactor * from.z + newFactor * q.z,
			invFactor * from.w + newFactor * q.w
		);
	}

	cubic_slerp(q: Quat, prep: Quat, postq: Quat, t: number): Quat {
		if (MATH_CHECKS && (!this.is_normalized() || !q.is_normalized())) return new Quat();
		//the only way to do slerp :|
		let t2 = (1.0 - t) * t * 2;
		let sp = this.slerp(q, t);
		let sq = prep.slerpni(postq, t);
		return sp.slerpni(sq, t2);
	}

	xform(v: Vector3): Vector3 {
		if (MATH_CHECKS && !this.is_normalized()) return v;
		let u = new Vector3(this.x, this.y, this.z);
		let uv = u.cross(v);
		return v.add((uv.multiply(this.w).add(u.cross(uv))).multiply(2));
	}

	is_equal_approx(p_quat: Quat): boolean {
		return is_equal_approx(this.x, p_quat.x) && is_equal_approx(this.y, p_quat.y) && is_equal_approx(this.z, p_quat.z) && is_equal_approx(this.w, p_quat.w);
	}

	equals(p_quat: Quat): boolean {
		return this.is_equal_approx(p_quat);
	}

	toString(): string {
		return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
	}
}
register_global_class(Quat, 'Quat');

export class Basis {

	readonly elements: Vector3[] = [ new Vector3(), new Vector3(), new Vector3() ];
	get euler() { return this.get_euler_yxz(); }
	set euler(p_euler: Vector3) { this.set_euler_yxz(p_euler); }

	constructor() {
		this.elements[0].set_axis(0, 1);
		this.elements[0].set_axis(1, 0);
		this.elements[0].set_axis(2, 0);
		this.elements[1].set_axis(0, 0);
		this.elements[1].set_axis(1, 1);
		this.elements[1].set_axis(2, 0);
		this.elements[2].set_axis(0, 0);
		this.elements[2].set_axis(1, 0);
		this.elements[2].set_axis(2, 1);
	}

	add(p_matrix: Basis) {
		let b = this.clone();
		b.add_assign(p_matrix);
		return b;
	}

	add_assign(p_matrix: Basis) {
		this.elements[0].add_assign(p_matrix.elements[0]);
		this.elements[1].add_assign(p_matrix.elements[1]);
		this.elements[2].add_assign(p_matrix.elements[2]);
		return this;
	}

	subtract(p_matrix: Basis) {
		let b = this.clone();
		b.subtract_assign(p_matrix);
		return b;
	}

	subtract_assign(p_matrix: Basis) {
		this.elements[0].subtract_assign(p_matrix.elements[0]);
		this.elements[1].subtract_assign(p_matrix.elements[1]);
		this.elements[2].subtract_assign(p_matrix.elements[2]);
		return this;
	}

	multiply(p_matrix: Basis|number) {
		let b = this.clone();
		b.multiply_assign(p_matrix);
		return b;
	}

	multiply_assign(p_matrix: Basis|number) {
		if (typeof p_matrix == 'number') {
			this.elements[0].multiply_assign(p_matrix);
			this.elements[1].multiply_assign(p_matrix);
			this.elements[2].multiply_assign(p_matrix);
		} else {
			this.set(
				p_matrix.tdotx(this.elements[0]), p_matrix.tdoty(this.elements[0]), p_matrix.tdotz(this.elements[0]),
				p_matrix.tdotx(this.elements[1]), p_matrix.tdoty(this.elements[1]), p_matrix.tdotz(this.elements[1]),
				p_matrix.tdotx(this.elements[2]), p_matrix.tdoty(this.elements[2]), p_matrix.tdotz(this.elements[2])
			);
		}
		return this;
	}

	clone() {
		let b = new Basis();
		b.assign(this);
		return b;
	}

	cloneTo(target: Basis) {
		target.assign(this);
	}

	assign(target: Basis) {
		for (let i = 0; i < Axis.AXIS_Z; i++) {
			this.elements[i].assign(target.elements[i]);
		}
		return this;
	}

	equals(p_basis: Basis) {
		return this.is_equal_approx(p_basis);
	}

	is_equal_approx(p_basis: Basis) {
		return this.elements[0].is_equal_approx(p_basis.elements[0]) && this.elements[1].is_equal_approx(p_basis.elements[1]) && this.elements[2].is_equal_approx(p_basis.elements[2]);
	}

	private cofac(row1: number, col1: number, row2: number, col2: number) {
		return this.elements[row1].get_axis(col1) * this.elements[row2].get_axis(col2) - this.elements[row1].get_axis(col2) * this.elements[row2].get_axis(col1);
	}

	tdotx(v: Vector3): number {
		return this.elements[0].get_axis(0) * v.get_axis(0) + this.elements[1].get_axis(0) * v.get_axis(1) + this.elements[2].get_axis(0) * v.get_axis(2);
	}

	tdoty(v: Vector3): number {
		return this.elements[0].get_axis(1) * v.get_axis(0) + this.elements[1].get_axis(1) * v.get_axis(1) + this.elements[2].get_axis(1) * v.get_axis(2);
	}

	tdotz(v: Vector3): number {
		return this.elements[0].get_axis(2) * v.get_axis(0) + this.elements[1].get_axis(2) * v.get_axis(1) + this.elements[2].get_axis(2) * v.get_axis(2);
	}

	rotate(p_euler_quat_axis: Vector3|Quat, p_phi?: number) {
		return this.assign(this.rotated(p_euler_quat_axis, p_phi));
	}

	rotated(p_euler_quat_axis: Vector3|Quat, p_phi?: number) {
		let b = new Basis();
		if (typeof p_phi === 'number') {
			b.set_axis_angle(p_euler_quat_axis as Vector3, p_phi);
		} else {
			if (p_euler_quat_axis instanceof Vector3) {
				b.euler = p_euler_quat_axis;
			} else {
				b.quat = p_euler_quat_axis;
			}
		}
		return b.multiply_assign(this);
	}

	get_axis(p_axis: Axis) {
		return new Vector3(this.elements[0].get_axis(p_axis), this.elements[1].get_axis(p_axis), this.elements[2].get_axis(p_axis));
	}

	set_axis(p_axis: Axis, p_value: Vector3) {
		this.elements[0].set_axis(p_axis, p_value.x);
		this.elements[1].set_axis(p_axis, p_value.y);
		this.elements[2].set_axis(p_axis, p_value.z);
	}

	set(xx_px: number|Vector3, xy_py: number|Vector3, xz_pz: number|Vector3, yx?: number, yy?: number, yz?: number, zx?: number, zy?: number, zz?: number) {
		if (arguments.length === 9) {
			this.elements[0].set_axis(0, xx_px as number);
			this.elements[0].set_axis(1, xy_py as number);
			this.elements[0].set_axis(2, xz_pz as number);
			this.elements[1].set_axis(0, yx);
			this.elements[1].set_axis(1, yy);
			this.elements[1].set_axis(2, yz);
			this.elements[2].set_axis(0, zx);
			this.elements[2].set_axis(1, zy);
			this.elements[2].set_axis(2, zz);
		} else if (arguments.length == 3) {
			this.set_axis(0, xx_px as Vector3);
			this.set_axis(1, xy_py as Vector3);
			this.set_axis(2, xz_pz as Vector3);
		} else if (MATH_CHECKS) {
			debugger
		}
	}

	set quat(p_quat: Quat) {
		let d = p_quat.length_squared;
		let s = 2.0 / d;
		let xs = p_quat.x * s, ys = p_quat.y * s, zs = p_quat.z * s;
		let wx = p_quat.w * xs, wy = p_quat.w * ys, wz = p_quat.w * zs;
		let xx = p_quat.x * xs, xy = p_quat.x * ys, xz = p_quat.x * zs;
		let yy = p_quat.y * ys, yz = p_quat.y * zs, zz = p_quat.z * zs;
		this.set(
			1.0 - (yy + zz), xy - wz, xz + wy,
			xy + wz, 1.0 - (xx + zz), yz - wx,
			xz - wy, yz + wx, 1.0 - (xx + yy)
		);
	}

	get quat() {

		if (MATH_CHECKS && !this.is_rotation()) debugger; // Basis must be normalized in order to be casted to a Quaternion. Use get_rotation_quat() or call orthonormalized() instead.
		/* Allow getting a quaternion from an unnormalized transform */
		let m = this.clone();
		let trace = m.elements[0].get_axis(0) + m.elements[1].get_axis(1) + m.elements[2].get_axis(2);
		let temp = [0, 0, 0, 0];

		if (trace > 0.0) {
			let s = Math.sqrt(trace + 1.0);
			temp[3] = (s * 0.5);
			s = 0.5 / s;

			temp[0] = ((m.elements[2].get_axis(1) - m.elements[1].get_axis(2)) * s);
			temp[1] = ((m.elements[0].get_axis(2) - m.elements[2].get_axis(0)) * s);
			temp[2] = ((m.elements[1].get_axis(0) - m.elements[0].get_axis(1)) * s);
		} else {
			let i = Math.floor(
						m.elements[0][0] < m.elements[1][1] ?
							(m.elements[1].get_axis(1) < m.elements[2].get_axis(2) ? 2 : 1) :
							(m.elements[0].get_axis(0) < m.elements[2].get_axis(2) ? 2 : 0)
					);
			let j = Math.floor((i + 1) % 3);
			let k = Math.floor((i + 2) % 3);
			let s = Math.sqrt(m.elements[i][i] - m.elements[j][j] - m.elements[k][k] + 1.0);
			temp[i] = s * 0.5;
			s = 0.5 / s;
			temp[3] = (m.elements[k].get_axis(j) - m.elements[j].get_axis(k)) * s;
			temp[j] = (m.elements[j].get_axis(i) + m.elements[i].get_axis(j)) * s;
			temp[k] = (m.elements[k].get_axis(i) + m.elements[i].get_axis(k)) * s;
		}

		return new Quat(temp[0], temp[1], temp[2], temp[3]);
	}

	scale(p_scale: Vector3) {
		this.elements[0].x *= p_scale.x;
		this.elements[0].y *= p_scale.x;
		this.elements[0].z *= p_scale.x;
		this.elements[1].x *= p_scale.y;
		this.elements[1].y *= p_scale.y;
		this.elements[1].z *= p_scale.y;
		this.elements[2].x *= p_scale.z;
		this.elements[2].y *= p_scale.z;
		this.elements[2].z *= p_scale.z;
	}

	scaled(p_scale: Vector3) {
		let m = this.clone();
		m.scale(p_scale);
		return m;
	}

	scale_local(p_scale: Vector3) {
		// performs a scaling in object-local coordinate system:
		// M -> (M.S.Minv).M = M.S.
		this.assign(this.scaled_local(p_scale));
	}

	scaled_local(p_scale: Vector3) {
		let b = new Basis();
		b.set_diagonal(p_scale);
		return this.multiply(b);
	}


	set_quat_scale(p_quat: Quat, p_scale: Vector3) {
		this.set_diagonal(p_scale);
		this.rotate(p_quat);
	}

	set_euler_scale(p_euler: Vector3, p_scale: Vector3) {
		this.set_diagonal(p_scale);
		this.rotate(p_euler);
	}

	set_axis_angle_scale(p_axis: Vector3, p_phi: number, p_scale: Vector3) {
		this.set_diagonal(p_scale);
		this.rotate(p_axis, p_phi);
	}

	set_axis_angle(p_axis: Vector3, p_phi: number) {
		// Rotation matrix from axis and angle, see https://en.wikipedia.org/wiki/Rotation_matrix#Rotation_matrix_from_axis_angle
		if (MATH_CHECKS && !p_axis.is_normalized()) debugger // "Axis must be normalized."

		let axis_sq = new Vector3(p_axis.x * p_axis.x, p_axis.y * p_axis.y, p_axis.z * p_axis.z);
		let cosine = Math.cos(p_phi);
		this.elements[0].set_axis(0, axis_sq.x + cosine * (1.0 - axis_sq.x));
		this.elements[1].set_axis(1, axis_sq.y + cosine * (1.0 - axis_sq.y));
		this.elements[2].set_axis(2, axis_sq.z + cosine * (1.0 - axis_sq.z));

		let sine = Math.sin(p_phi);
		let t = 1 - cosine;

		let xyzt = p_axis.x * p_axis.y * t;
		let zyxs = p_axis.z * sine;
		this.elements[0].set_axis(1, xyzt - zyxs);
		this.elements[1].set_axis(0, xyzt + zyxs);

		xyzt = p_axis.x * p_axis.z * t;
		zyxs = p_axis.y * sine;
		this.elements[0].set_axis(2, xyzt + zyxs);
		this.elements[2].set_axis(0, xyzt - zyxs);

		xyzt = p_axis.y * p_axis.z * t;
		zyxs = p_axis.x * sine;
		this.elements[1].set_axis(2, xyzt - zyxs);
		this.elements[2].set_axis(1, xyzt + zyxs);
	}

	set_diagonal(p_diag: Vector3) {
		this.elements[0].set_axis(0, p_diag.x);
		this.elements[0].set_axis(1, 0);
		this.elements[0].set_axis(2, 0);

		this.elements[1].set_axis(0, 0);
		this.elements[1].set_axis(1, p_diag.y);
		this.elements[1].set_axis(2, 0);

		this.elements[2].set_axis(0, 0);
		this.elements[2].set_axis(1, 0);
		this.elements[2].set_axis(2, p_diag.z);
	}

	get_euler_xyz() {
		// Euler angles in XYZ convention.
		// See https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix
		//
		// rot =  cy*cz          -cy*sz           sy
		//        cz*sx*sy+cx*sz  cx*cz-sx*sy*sz -cy*sx
		//       -cx*cz*sy+sx*sz  cz*sx+cx*sy*sz  cx*cy

		let euler = new Vector3();
		if (MATH_CHECKS && !this.is_rotation()) return euler;
		let sy = this.elements[0].get_axis(2);
		if (sy < 1.0) {
			if (sy > -1.0) {
				// is this a pure Y rotation?
				if (this.elements[1].get_axis(0) == 0.0 && this.elements[0].get_axis(1) == 0.0 && this.elements[1].get_axis(2) == 0 && this.elements[2].get_axis(1) == 0 && this.elements[1].get_axis(1) == 1) {
					// return the simplest form (human friendlier in editor and scripts)
					euler.x = 0;
					euler.y = Math.atan2(this.elements[0].get_axis(2), this.elements[0].get_axis(0));
					euler.z = 0;
				} else {
					euler.x = Math.atan2(-this.elements[1].get_axis(2), this.elements[2].get_axis(2));
					euler.y = Math.asin(sy);
					euler.z = Math.atan2(-this.elements[0].get_axis(1), this.elements[0].get_axis(0));
				}
			} else {
				euler.x = -Math.atan2(this.elements[0].get_axis(1), this.elements[1].get_axis(1));
				euler.y = -Math_PI / 2.0;
				euler.z = 0.0;
			}
		} else {
			euler.x = Math.atan2(this.elements[0].get_axis(1), this.elements[1].get_axis(1));
			euler.y = Math_PI / 2.0;
			euler.z = 0.0;
		}
		return euler;
	}

	set_euler_xyz(p_euler: Vector3) {

		let c = 0, s = 0;

		c = Math.cos(p_euler.x);
		s = Math.sin(p_euler.x);
		let xmat = new Basis();
		xmat.set(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);

		c = Math.cos(p_euler.y);
		s = Math.sin(p_euler.y);
		let ymat = new Basis();
		ymat.set(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);

		c = Math.cos(p_euler.z);
		s = Math.sin(p_euler.z);
		let zmat = new Basis();
		zmat.set(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);

		//optimizer will optimize away all this anyway
		this.assign(xmat.multiply(ymat.multiply(zmat)));
	}

	set_euler_yxz(p_euler: Vector3) {

		let c = 0, s = 0;

		c = Math.cos(p_euler.x);
		s = Math.sin(p_euler.x);
		let xmat = new Basis();
		xmat.set(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);

		c = Math.cos(p_euler.y);
		s = Math.sin(p_euler.y);
		let ymat = new Basis();
		ymat.set(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);

		c = Math.cos(p_euler.z);
		s = Math.sin(p_euler.z);
		let zmat = new Basis();
		zmat.set(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);

		//optimizer will optimize away all this anyway
		this.assign(ymat.multiply(xmat).multiply(zmat));
	}

	get_euler_yxz() {
		/* checking this is a bad idea, because obtaining from scaled transform is a valid use case
		#ifdef MATH_CHECKS
			ERR_FAIL_COND(!is_rotation());
		#endif
		*/
		// Euler angles in YXZ convention.
		// See https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix
		//
		// rot =  cy*cz+sy*sx*sz    cz*sy*sx-cy*sz        cx*sy
		//        cx*sz             cx*cz                 -sx
		//        cy*sx*sz-cz*sy    cy*cz*sx+sy*sz        cy*cx

		let euler = new Vector3();
		let m12 = this.elements[1].get_axis(2);
		if (m12 < 1) {
			if (m12 > -1) {
				// is this a pure X rotation?
				if (this.elements[1].get_axis(0) == 0 && this.elements[0].get_axis(1) == 0 && this.elements[0].get_axis(2) == 0 && this.elements[2].get_axis(0) == 0 && this.elements[0].get_axis(0) == 1) {
					// return the simplest form (human friendlier in editor and scripts)
					euler.x = Math.atan2(-m12, this.elements[1].get_axis(1));
					euler.y = 0;
					euler.z = 0;
				} else {
					euler.x = Math.asin(-m12);
					euler.y = Math.atan2(this.elements[0].get_axis(2), this.elements[2].get_axis(2));
					euler.z = Math.atan2(this.elements[1].get_axis(0), this.elements[1].get_axis(1));
				}
			} else { // m12 == -1
				euler.x = Math_PI * 0.5;
				euler.y = -Math.atan2(-this.elements[0].get_axis(1), this.elements[0].get_axis(0));
				euler.z = 0;
			}
		} else { // m12 == 1
			euler.x = -Math_PI * 0.5;
			euler.y = -Math.atan2(-this.elements[0].get_axis(1), this.elements[0].get_axis(0));
			euler.z = 0;
		}

		return euler;
	}

	invert() {

		let co = [ this.cofac(1, 1, 2, 2), this.cofac(1, 2, 2, 0), this.cofac(1, 0, 2, 1) ];
		let det = this.elements[0].get_axis(0) * co[0] + this.elements[0].get_axis(1) * co[1] + this.elements[0].get_axis(2) * co[2];
		if (MATH_CHECKS && det == 0) {
			debugger
		}
		let s = 1.0 / det;
		this.set(
			co[0] * s, this.cofac(0, 2, 2, 1) * s,this. cofac(0, 1, 1, 2) * s,
			co[1] * s, this.cofac(0, 0, 2, 2) * s, this.cofac(0, 2, 1, 0) * s,
			co[2] * s, this.cofac(0, 1, 2, 0) * s, this.cofac(0, 0, 1, 1) * s
		);
	}

	transpose() {
		let temp = 0;

		temp = this.elements[0].get_axis(1);
		this.elements[0].set_axis(1, this.elements[1].get_axis(0));
		this.elements[1].set_axis(0, temp);

		temp = this.elements[0].get_axis(2);
		this.elements[0].set_axis(2, this.elements[2].get_axis(0));
		this.elements[2].set_axis(0, temp);

		temp = this.elements[1].get_axis(2);
		this.elements[1].set_axis(2, this.elements[2].get_axis(1));
		this.elements[2].set_axis(1, temp);
	}

	transposed(): Basis {
		let tr = this.clone();
		tr.transpose();
		return tr;
	}

	determinant() {
		return (
			this.elements[0].get_axis(0) * (this.elements[1].get_axis(1) * this.elements[2].get_axis(2) - this.elements[2].get_axis(1) * this.elements[1].get_axis(2)) -
			this.elements[1].get_axis(0) * (this.elements[0].get_axis(1) * this.elements[2].get_axis(2) - this.elements[2].get_axis(1) * this.elements[0].get_axis(2)) +
			this.elements[2].get_axis(0) * (this.elements[0].get_axis(1) * this.elements[1].get_axis(2) - this.elements[1].get_axis(1) * this.elements[0].get_axis(2))
		);
	}

	from_z(p_z: Vector3) {

		if (Math.abs(p_z.z) > Math_SQRT12) {

			// choose p in y-z plane
			let a = p_z[1] * p_z[1] + p_z[2] * p_z[2];
			let k = 1.0 / Math.sqrt(a);
			this.elements[0].assign(new Vector3(0, -p_z[2] * k, p_z[1] * k));
			this.elements[1].assign(new Vector3(a * k, -p_z[0] * this.elements[0].get_axis(2), p_z[0] * this.elements[0].get_axis(1)));
		} else {

			// choose p in x-y plane
			let a = p_z.x * p_z.x + p_z.y * p_z.y;
			let k = 1.0 / Math.sqrt(a);
			this.elements[0].assign(new Vector3(-p_z.y * k, p_z.x * k, 0));
			this.elements[1].assign(new Vector3(-p_z.z * this.elements[0].y, p_z.z * this.elements[0].x, a * k));
		}
		this.elements[2].assign(p_z);
	}

	is_orthogonal() {
		let identity = new Basis();
		let m = this.multiply(this.transposed());
		return m.is_equal_approx(identity);
	}

	is_rotation() {
		return is_equal_approx(this.determinant(), 1, UNIT_EPSILON) && this.is_orthogonal();
	}

	xform(p_vector: Vector3) {
		return new Vector3(
			this.elements[0].dot(p_vector),
			this.elements[1].dot(p_vector),
			this.elements[2].dot(p_vector)
		);
	}

	xform_inv(p_vector) {
		return new Vector3(
			(this.elements[0].get_axis(0) * p_vector.x) + (this.elements[1].get_axis(0) * p_vector.y) + (this.elements[2].get_axis(0) * p_vector.z),
			(this.elements[0].get_axis(1) * p_vector.x) + (this.elements[1].get_axis(1) * p_vector.y) + (this.elements[2].get_axis(1) * p_vector.z),
			(this.elements[0].get_axis(2) * p_vector.x) + (this.elements[1].get_axis(2) * p_vector.y) + (this.elements[2].get_axis(2) * p_vector.z)
		);
	}

	toString(): string {
		let mtx = '';
		for (let i = 0; i < Axis.AXIS_Z; i++) {
			for (let j = 0; j < Axis.AXIS_Z; j++) {
				if (i != 0 || j != 0)
					mtx += ", ";
				mtx += this.elements[i].get_axis(j);
			}
		}

		return mtx;
	}

}
register_global_class(Basis, 'Basis');
