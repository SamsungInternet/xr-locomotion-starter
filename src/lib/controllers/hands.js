import {Handy} from 'handy.js';
import {renderer, rafCallbacks} from '../scene.js';

const hand1 = renderer.xr.getHand( 0 );
const hand2 = renderer.xr.getHand( 1 );

Handy.makeHandy( hand1 );
Handy.makeHandy( hand2 );

rafCallbacks.add(function () {
	Handy.update();
});

export {
	hand1, hand2
}