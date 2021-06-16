import { t as transfer, e as expose } from './comlink-594073c5.js';

// this runs as a web worker

console.log('Worker started');

class HandPose {
    #poses
    #matches
    constructor () {
        debugger;
        this.#poses = [];
        this.#matches = [];
    }
    registerPose(pose) {
        this.#poses.push(pose);
    }
    update (headPose, handPose, handedness) {
        const jointMatrixArray = new Float32Array(handPose);

        debugger;

        console.log(headPose, handPose);
        for (const pose of this.#poses) {
            
        }

        return transfer(jointMatrixArray, [jointMatrixArray.buffer]);
    }
    getMatchedPoses () {
        return this.#matches;
    }
}

var m = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': HandPose
});

expose(m);
//# sourceMappingURL=handpose-a3860818.js.map
