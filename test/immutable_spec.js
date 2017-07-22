import {expect} from 'chai';

describe('immutability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutabile', () => {
            let state = 42;
            let nextState = increment(state);

            expect(state).to.equal(42);
            expect(nextState).to.equal(43);
        });
    })
});