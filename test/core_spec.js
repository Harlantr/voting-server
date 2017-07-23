import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

    describe('setEntries', () => {

        it('adds entries to the state', () => {
            const state = Map();
            const entries = List.of('Enema of the State', 'Dookie');
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Enema of the State', 'Dookie')
            }));
        });
    });

    describe('next', () => {

        it('takes the next two entries under vote', () => {
            const state = Map ({
                entries: List.of('Enema of the State', 'Dookie', 'Last Stop Suburbia')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Enema of the State', 'Dookie')
                }),
                entries: List.of('Last Stop Suburbia')
            }));
        });

        it('puts winner of current vote back into entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Enema of the State', 'Dookie'),
                    tally: Map({
                        'Enema of the State': 4,
                        'Dookie': 2
                    })
                }),
                entries: List.of('Sticks and Stones', 'Last Stop Suburbia', 'Under Soil and Dirt')
            });
            const newState = next(state);

            expect(newState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sticks and Stones', 'Last Stop Suburbia')
                }),
                entries: List.of('Under Soil and Dirt', 'Enema of the State')
            }));
        });

        it('puts both from tied vote back in entries', () => {
            const state = Map ({
                vote: Map({
                    pair: List.of('Enema of the State', 'Dookie'),
                    tally: Map({
                        'Enema of the State': 4,
                        'Dookie': 4
                    })
                }),
                entries: List.of('Sticks and Stones', 'Last Stop Suburbia', 'Under Soil and Dirt')
            });
            const newState = next(state);

            expect(newState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sticks and Stones', 'Last Stop Suburbia')
                }),
                entries: List.of('Under Soil and Dirt', 'Enema of the State', 'Dookie')
            }));
        });

        it('marks winner when just one entry is left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Enema of the State', 'Dookie'),
                    tally: Map({
                        'Enema of the State': 4,
                        'Dookie': 2
                    })
                }),
                entries: List.of()
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                winner: 'Enema of the State'
            }));
        });
    })

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Enema of the State', 'Dookie')
                }),
                entries: List()
            });
            const nextState = vote(state, 'Enema of the State');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Enema of the State', 'Dookie'),
                    tally: Map({
                        'Enema of the State': 1
                    })
                }),
                entries: List()
            }));
        })

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Enema of the State', 'Dookie'),
                    tally: Map({
                        'Enema of the State': 3,
                        'Dookie': 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Enema of the State');

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Enema of the State', 'Dookie'),
                    tally: Map({
                        'Enema of the State': 4,
                        'Dookie': 2
                    })
                }),
                entries: List()
            }));
        });
    });
});