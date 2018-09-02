import sinon from 'sinon';

import BillsController from '../../../src/controllers/bills';
import Bill from '../../../src/models/bill';

describe('Controller: Bills', () => {


    const defaultRequest = {
        params: {}
    };

    const defaultBill = [{
        name: 'defautl bill',
        description: 'bill description',
        price: 100,
        date: Date.now()
    }];

    describe('get() bills', () => {
        it('should return a list of bills', () => {
            const response = {
                send: sinon.spy()
            };
            Bill.find = sinon.stub();
            Bill.find.withArgs({}).resolves(defaultBill);

            const billsController = new BillsController(Bill);
            return billsController.get(defaultRequest, response)
                .then(() => {
                    sinon.assert.calledWith(response.send, defaultBill);
                });
        });
    });

    describe('getById() bills', () => {
        it('should return a list of bills', () => {
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id: fakeId
                }
            };
            const response = {
                send: sinon.spy()
            };
            Bill.find = sinon.stub();
            Bill.find.withArgs({}).resolves(defaultBill);

            const billsController = new BillsController(Bill);
            return billsController.get(request, response)
                .then(() => {
                    sinon.assert.calledWith(response.send, defaultBill);
                });
        });
    });

    describe('create() bill', () => {
        it('should call send with a new product', () => {
            const requestWithBody = Object.assign({}, {
                body: defaultBill[0]
            },
                defaultRequest
            );
            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };

            class fakeBill {
                save() { }
            }

            response.status.withArgs(201).returns(response);
            sinon.stub(fakeBill.prototype, 'save').withArgs().resolves();

            const billsController = new BillsController(fakeBill);

            return billsController.create(requestWithBody, response)
                .then(() => {
                    sinon.assert.calledWith(response.send);
                });
        });

        context('when error occurs', () => {
            it('should return 442', () => {
                const response = {
                    send: sinon.spy(),
                    status: sinon.stub()
                };

                class fakeBill {
                    save() { }
                }
                response.status.withArgs(422).returns(response);
                sinon.stub(fakeBill.prototype, 'save').withArgs().rejects({ message: 'Error' });

                const billsController = new BillsController(fakeBill);

                return billsController.create(defaultRequest, response)
                    .then(() => {
                        sinon.assert.calledWith(response.status, 422);
                    });

            });
        });
    });

    // describe('update() bill', () => {
    //     it('should response with 200 when the product is updated', () => {
    //         const fakeId = 'a-fake-id';
    //         const updatedBill = {
    //             _id: fakeId,
    //             name: 'Update bill',
    //             describe: 'update description',
    //             price: 100
    //         };
    //         const request = {
    //             params: {
    //                 id: fakeId
    //             },
    //             body: updatedBill
    //         };

    //         const response = {
    //             send: sinon.spy()
    //         };
    //         class fakeBill {
    //             static findOneAndUpdate() { }
    //         }

    //         const findOneAndUpdateStub = sinon.stub(fakeBill, 'findOneAndUpdate');
    //         findOneAndUpdateStub.withArgs({ _id: fakeId }, updatedBill).resolves(updatedBill);

    //         const billsController = new BillsController(fakeBill);

    //         return billsController.update(request, response)
    //             .then(() => {
    //                 sinon.assert.calledWith(response.sendStatus, 200);
    //             });
    //     });
    // });


    describe('delete() product', () => {
        it('should responde with 204 when delete a bill', () => {
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id: fakeId
                }
            };
            const response = {
                sendStatus: sinon.spy()
            };

            class fakeBill {
                static remove() { }
            }

            const removeStub = sinon.stub(fakeBill, 'remove');
            removeStub.withArgs({ _id: fakeId }).resolves([1]);

            const billsController = new BillsController(fakeBill);

            return billsController.remove(request, response)
                .then(() => {
                    sinon.assert.calledWith(response.sendStatus, 204);
                });
        });

        it('should return 400 when an error occurs', () => {
            const fakeId = 'a-fake-id';

            const request = {
                params: {
                    id: fakeId
                }
            };

            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };

            class fakeBill {
                static remove() { }
            }

            const removeStub = sinon.stub(fakeBill, 'remove');

            removeStub.withArgs({ _id: fakeId }).rejects({ message: 'Error' });
            response.status.withArgs(400).returns(response)

            const billsController = new BillsController(fakeBill);

            return billsController.remove(request, response)
                .then(() => {
                    sinon.assert.calledWith(response.send, 'Error');
                });
        });
    });

});