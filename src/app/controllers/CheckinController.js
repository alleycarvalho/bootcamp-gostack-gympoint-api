import { startOfDay, endOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const student_id = req.params.studentId;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id,
      },
      order: [['created_at', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { student_id } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    const dateToday = new Date();

    const checkinExists = await Checkin.findOne({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(dateToday), endOfDay(dateToday)],
        },
      },
    });

    if (checkinExists) {
      return res.status(401).json({
        error: 'Student already checked in today',
      });
    }

    const checkinsCount = await Checkin.count({
      where: {
        student_id,
        created_at: {
          [Op.between]: [subDays(dateToday, 7), dateToday],
        },
      },
    });

    if (checkinsCount === 5) {
      return res.status(403).json({
        error: 'Maximum of 5 checkins in 7 calendar days',
      });
    }

    await Checkin.create({ student_id });

    return res.json({
      message: 'Student checked in successfully',
    });
  }
}

export default new CheckinController();
