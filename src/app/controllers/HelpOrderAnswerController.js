import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderAnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      order: ['created_at'],
      limit: 15,
      offset: (page - 1) * 15,
      include: [
        {
          model: Student,
          as: 'student',
        },
      ],
    });

    return res.json(helpOrders);
  }
}

export default new HelpOrderAnswerController();
