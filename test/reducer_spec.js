import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('has an initial state', () => {
        const action = {
            type: 'SET_ENTRIES',
            entries: ['Enema of the State']
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Enema of the State']
        }));
    });

    it('handles SET_ENTRIES', () => {
        const initialState = Map({});
        const action = {
            type: 'SET_ENTRIES',
            entries: ['Enema of the State']
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Enema of the State']
        }))
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Enema of the State', 'Dookie']
        });
        const action = {
            type: 'NEXT'
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Enema of the State', 'Dookie']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Enema of the State', 'Dookie']
            },
            entries: []
        });
        const action = {
            type: 'VOTE',
            entry: 'Enema of the State'
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Enema of the State', 'Dookie'],
                tally: {
                    'Enema of the State': 1
                }
            },
            entries: []
        }));
    });

    it('can be used with reduce', () => {
        const actions = [
            {
                type: 'SET_ENTRIES',
                entries: ['Enema of the State', 'Dookie']
            },
            {
                type: 'NEXT'
            },
            {
                type: 'VOTE',
                entry: 'Enema of the State'
            },
            {
                type: 'VOTE',
                entry: 'Enema of the State'
            },
            {
                type: 'VOTE',
                entry: 'Dookie'
            },
            {
                type: 'NEXT'
            }
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: 'Enema of the State'
        }));
    });
});