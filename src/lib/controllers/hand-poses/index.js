import HandPose from "comlink:./handpose.js";
import peace from './poses/peace.js';
import {renderer} from '../../scene.js';
import {transfer} from 'comlink'; 

class HandInfo {
	#ready

	constructor({
		source, handPose
	}) {
		this.handPose = handPose;
		this.handPose.registerPose(peace);
		this.size = source.hand.size;
		this.jointKeys = Array.from(source.hand.keys());
		this.jointValues = source.hand.values();
		this.jointMatrixArray = new Float32Array(source.hand.size * 16);
		this.handedness = source.handedness

		this.#ready = true;
	}

	async update(xrViewerPose) {
		if (!this.#ready) {
			console.warn('Pose detection taking too long');
			return;
		}

		// transfer the pose array buffer to the thread, we now cannot do anything until it returns so mark it as not ready
		this.#ready = false;
		this.jointMatrixArray = await this.handPose.update(xrViewerPose, transfer(this.jointMatrixArray, [this.jointMatrixArray.buffer]), this.handedness);
		this.#ready = true;
	}
}
const hands = new Map();

async function update(referenceSpace, frame) {
	const session = renderer.xr.getSession();
	let i = 0;
	if (session) {
		const xrViewerPose = frame.getViewerPose(referenceSpace);
		for (const source of session.inputSources) {
			if (!source.hand) continue;

			const hand = renderer.xr.getHand(i++);
			if (!hands.has(i)) {
				const handPose = await new HandPose();
				hands.set(i, new HandInfo(source, handPose));
			}

			const handInfo = hands.get(i);
			frame.fillPoses( handInfo.jointValues , referenceSpace, handInfo.jointMatrixArrayBuffer );
			handInfo.update(xrViewerPose);
			
			hand.dispatchEvent( { type: 'hand-pose', message: {
				poses: []
			}});
		}
	}
}

export {
	update,
}