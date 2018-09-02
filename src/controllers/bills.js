import responseModels from '../commons/response';

class BillsController {
    constructor(Bill) {
        this.Bill = Bill;
    };

    get(req, res) {
        return this.Bill.find({})
            // .select('name description price')
            .then(doc => responseModels.getSuccess(res, doc))
            .catch(err => responseModels.getFail(res, err));
    }

    getById(req, res) {
        const { params: { id } } = req;
        return this.Bill.find({ _id: id })
            .then(doc => responseModels.getSuccess(res, doc))
            .catch(err => responseModels.getFail(res, err));
    }

    create(req, res) {
        const bill = new this.Bill(req.body);

        return bill.save()
            .then(doc => responseModels.createSuccess(res, doc))
            .catch(err => responseModels.createFail(res, err));
    }

    update(req, res) {
        return this.Bill.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(doc => responseModels.updateSuccess(res, doc))
            .catch(err => responseModels.updateFail(res, err));
    }

    remove(req, res) {
        return this.Bill.remove({ _id: req.params.id })
            .then(doc => responseModels.removeSuccess(res, doc))
            .catch(err => responseModels.removeFail(res, err));
    }
}

export default BillsController;