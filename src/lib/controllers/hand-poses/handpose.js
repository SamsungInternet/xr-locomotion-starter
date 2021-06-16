// this runs as a web worker
import {transfer} from 'comlink'; 

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

export default HandPose;