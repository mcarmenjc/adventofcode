import {expect}  from 'chai';
import { Cart, moveCart, moveCartsUntilCrash, moveUntilOneCartIsLeft } from '../src/day13';

describe('Day 13', () => {
    describe('Cart', () => {
        let cart;
        beforeEach(() => {
            cart = new Cart(5,5, 'left');
        });
        it('should move correctly to the left', () => {
            cart.direction = 'left';
            let expectedCartPostion = [5, 4];
            cart.move();
            expect(cart.row).to.equal(expectedCartPostion[0]);
            expect(cart.column).to.equal(expectedCartPostion[1]);
        });
        it('should move correctly to the right', () => {
            cart.direction = 'right';
            let expectedCartPostion = [5, 6];
            cart.move();
            expect(cart.row).to.equal(expectedCartPostion[0]);
            expect(cart.column).to.equal(expectedCartPostion[1]);
        });
        it('should move correctly up', () => {
            cart.direction = 'up';
            let expectedCartPostion = [4, 5];
            cart.move();
            expect(cart.row).to.equal(expectedCartPostion[0]);
            expect(cart.column).to.equal(expectedCartPostion[1]);
        });
        it('should move correctly down', () => {
            cart.direction = 'down';
            let expectedCartPostion = [6, 5];
            cart.move();
            expect(cart.row).to.equal(expectedCartPostion[0]);
            expect(cart.column).to.equal(expectedCartPostion[1]);
        });
        it('should confirm it has to turn in a \\ corner', () => {
            expect(cart.shouldChangeDirection('\\')).to.be.true;
        });
        it('should confirm it has to turn in a / corner', () => {
            expect(cart.shouldChangeDirection('/')).to.be.true;
        });
        it('should not turn if path is -', () => {
            expect(cart.shouldChangeDirection('-')).to.be.false;
        });
        it('should not turn if path is |', () => {
            expect(cart.shouldChangeDirection('|')).to.be.false;
        });
        describe('in a \\ corner', () => {
            it('should change direction from left to up', () => {
                cart.direction = 'left';
                cart.changeDirection('\\');
                expect(cart.direction).to.equal('up');
            });
            it('should change direction from up to left', () => {
                cart.direction = 'up';
                cart.changeDirection('\\');
                expect(cart.direction).to.equal('left');
            });
            it('should change direction from right to down', () => {
                cart.direction = 'right';
                cart.changeDirection('\\');
                expect(cart.direction).to.equal('down');
            });
            it('should change direction from down to right', () => {
                cart.direction = 'down';
                cart.changeDirection('\\');
                expect(cart.direction).to.equal('right');
            });
        });
        describe('in a / corner', () => {
            it('should change direction from left to down', () => {
                cart.direction = 'left';
                cart.changeDirection('/');
                expect(cart.direction).to.equal('down');
            });
            it('should change direction from down to left', () => {
                cart.direction = 'down';
                cart.changeDirection('/');
                expect(cart.direction).to.equal('left');
            });
            it('should change direction from right to up', () => {
                cart.direction = 'right';
                cart.changeDirection('/');
                expect(cart.direction).to.equal('up');
            });
            it('should change direction from up to right', () => {
                cart.direction = 'up';
                cart.changeDirection('/');
                expect(cart.direction).to.equal('right');
            });
        });
        describe('in an intersection (+)', () => {
            describe('when next instruction is left', () => {
                it('should update lastIntersectionMove to 0 (left)', () => {
                    cart.lastIntersectionMove = 2;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.lastIntersectionMove).to.equal(0);
                });
                it('should change direction from left to down', () => {
                    cart.direction = 'left';
                    cart.lastIntersectionMove = 2;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.direction).to.equal('down');
                });
                it('should change direction from down to right', () => {
                    cart.direction = 'down';
                    cart.lastIntersectionMove = 2;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.direction).to.equal('right');
                });
                it('should change direction from right to up', () => {
                    cart.direction = 'right';
                    cart.lastIntersectionMove = 2;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.direction).to.equal('up');
                });
                it('should change direction from up to left', () => {
                    cart.direction = 'up';
                    cart.lastIntersectionMove = 2;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.direction).to.equal('left');
                });
            });
            describe('when next instruction is right', () => {
                it('should update lastIntersectionMove to 2 (right)', () => {
                    cart.lastIntersectionMove = 1;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.lastIntersectionMove).to.equal(2);
                });
                it('should change direction from left to up', () => {
                    cart.direction = 'left';
                    cart.lastIntersectionMove = 1;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.direction).to.equal('up');
                });
                it('should change direction from up to right', () => {
                    cart.direction = 'up';
                    cart.lastIntersectionMove = 1;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.direction).to.equal('right');
                });
                it('should change direction from right to down', () => {
                    cart.direction = 'right';
                    cart.lastIntersectionMove = 1;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.direction).to.equal('down');
                });
                it('should change direction from down to left', () => {
                    cart.direction = 'down';
                    cart.lastIntersectionMove = 1;
                    cart.setNewDirectionAtIntersection();
                    expect(cart.direction).to.equal('left');
                });
            });
        });
    });
    describe('Carts in a track', () => {
        let track;
        let carts;
        before(() => {
            track = [];
            track.push('/---\\        '.split(''));
            track.push('|   |  /----\\'.split(''));
            track.push('| /-+--+-\\  |'.split(''));
            track.push('| | |  | |  |'.split(''));
            track.push('\\-+-/  \\-+--/'.split(''));
            track.push('  \\------/   '.split(''));

            carts = [];
            carts.push(new Cart(0, 2, 'right'));
            carts.push(new Cart(3, 9, 'down'));
        });
        beforeEach(() => {
            carts[0].row = 0;
            carts[0].column = 2;
            carts[0].direction = 'right';
            carts[0].lastIntersectionMove = -1;
            carts[1].row = 3;
            carts[1].column = 9;
            carts[1].direction = 'down';
            carts[1].lastIntersectionMove = -1;
        });
        it('should move depending on their direction', () => {
            moveCart(track, carts[0]);
            moveCart(track, carts[1]);
            let expectedPosForCart1 = [0, 3];
            let expectedPosForCart2 = [4, 9];
            expect(carts[0].row).to.equal(expectedPosForCart1[0]);
            expect(carts[0].column).to.equal(expectedPosForCart1[1]);
            expect(carts[1].row).to.equal(expectedPosForCart2[0]);
            expect(carts[1].column).to.equal(expectedPosForCart2[1]);
        });
        it('should keep their direction if no corner or intersection', () => {
            moveCart(track, carts[0]);
            let expectedDirectionForCart1 = 'right';
            expect(carts[0].direction).to.equal(expectedDirectionForCart1);
        });
        it('should change direction on corners', () => {
            moveCart(track, carts[0]);
            moveCart(track, carts[0]);
            let expectedDirectionForCart1 = 'down';
            expect(carts[0].direction).to.equal(expectedDirectionForCart1);
        });
        it('should change direction on intersection if next move is left', () => {
            moveCart(track, carts[1]);
            let expectedDirectionForCart2 = 'right';
            expect(carts[1].direction).to.equal(expectedDirectionForCart2);
        });
        it('should keep direction on intersection if next move is straight', () => {
            for (let i =0; i < 6;i++){
                moveCart(track, carts[0]);
            }
            let expectedDirectionForCart1 = carts[0].direction;
            moveCart(track, carts[0]);
            expect(carts[0].direction).to.equal(expectedDirectionForCart1);
        });
        it('should keep direction on intersection if next move is straight', () => {
            for (let i =0; i < 11;i++){
                moveCart(track, carts[0]);
            }
            let expectedDirectionForCart1 = 'left';
            expect(carts[0].direction).to.equal(expectedDirectionForCart1);
        });
        it('should be moving until a crash happens', () => {
            let crashPosition = moveCartsUntilCrash(track, carts);
            let expectedCrashPosition = [7, 3];
            expect(carts[crashPosition[0]].column).to.equal(expectedCrashPosition[0]);
            expect(carts[crashPosition[0]].row).to.equal(expectedCrashPosition[1]);
        });
        it('should be removed if they crash and keep moving until one is left', () => {
            let otherTrack = [];
            otherTrack.push('/>-<\\  '.split(''));
            otherTrack.push('|   |  '.split(''));
            otherTrack.push('| /<+-\\'.split(''));
            otherTrack.push('| | | v'.split(''));
            otherTrack.push('\\>+</ |'.split(''));
            otherTrack.push('  |   ^'.split(''));
            otherTrack.push('  \\<->/'.split(''));

            let otherCarts = [];
            otherCarts.push(new Cart(0, 1, 'right'));
            otherCarts.push(new Cart(0, 3, 'left'));
            otherCarts.push(new Cart(2, 3, 'left'));
            otherCarts.push(new Cart(3, 6, 'down'));
            otherCarts.push(new Cart(4, 1, 'right'));
            otherCarts.push(new Cart(4, 3, 'left'));
            otherCarts.push(new Cart(5, 6, 'up'));
            otherCarts.push(new Cart(6, 3, 'left'));
            otherCarts.push(new Cart(6, 5, 'right'));

            let remainingCart = moveUntilOneCartIsLeft(otherTrack, otherCarts);
            let lastCart = [6, 4];
            expect(remainingCart.column).to.equal(lastCart[0]);
            expect(remainingCart.row).to.equal(lastCart[1]);
        });
    });
});