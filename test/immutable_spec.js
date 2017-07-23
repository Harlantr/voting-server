import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {
    describe('a number', () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(state).to.equal(42);
            expect(nextState).to.equal(43);
        });
    })

    describe('a list', () => {
        function addAlbum (currentState, album) {
            return currentState.push(album);
        }

        it('is immutable', () => {
            let state = List.of('Enema of the State', 'Dookie');
            let nextState = addAlbum(state, 'Sticks and Stones');

            expect(state).to.equal(List.of(
                'Enema of the State',
                'Dookie'
            ));
            expect(nextState).to.equal(List.of(
                'Enema of the State',
                'Dookie',
                'Sticks and Stones'
            ))
        });
    });

    describe('a tree', () => {
        function addAlbum (currentState, album) {
            return currentState.update('albums', albums => albums.push(album));
        }

        it('is immutable', () => {
            let state = Map({
                albums: List.of('Enema of the State', 'Dookie')
            });
            let nextState = addAlbum(state, 'Smash');

            expect(state).to.equal(Map(
                {
                    albums: List.of(
                        'Enema of the State',
                        'Dookie'
                    )
                }
            ));
            expect(nextState).to.equal(Map(
                {
                    albums: List.of(
                        'Enema of the State',
                        'Dookie',
                        'Smash'
                    )
                }
            ));
        })
    });
});