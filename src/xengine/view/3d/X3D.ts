import XSprite3D from "./XSprite3D.laya";
import XScene3DLaya from "./XScene3D.laya";

const X3DLaya = {
	"Sprite3D": XSprite3D,
	"Scene3D": XScene3DLaya,
};


export default (function(){
	if (typeof(Laya) !== 'undefined') return X3DLaya;
}());
