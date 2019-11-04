import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { student_id, question } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    const helpOrder = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
