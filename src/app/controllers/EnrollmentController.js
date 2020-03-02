import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isBefore, parseISO, startOfDay } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const term = req.query.term || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const enrollments = await Enrollment.findAndCountAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      order: ['start_date'],
      where: {
        [Op.or]: [
          {
            '$student.name$': {
              [Op.iLike]: `%${term}%`,
            },
          },
          {
            '$plan.title$': {
              [Op.iLike]: `%${term}%`,
            },
          },
        ],
      },
      limit: perPage,
      offset: (page - 1) * perPage,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    const totalPage = Math.ceil(enrollments.count / perPage);

    return res.json({
      page,
      perPage,
      data: enrollments.rows,
      total: enrollments.count,
      totalPage,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    if (!enrollment) {
      res.status(404).json({
        error: 'Enrollment not found',
      });
    }

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { student_id, plan_id, start_date } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(404).json({
        error: 'Plan not found',
      });
    }

    const start_date_day = startOfDay(parseISO(start_date));
    const today_day = startOfDay(new Date());

    if (isBefore(start_date_day, today_day)) {
      return res.status(401).json({
        error: 'Registration date must be later than today',
      });
    }

    const enrollment = await Enrollment.create({
      ...req.body,
      start_date: start_date_day,
    });

    // Send email
    const student = await enrollment.getStudent();
    const plan = await enrollment.getPlan();

    await Queue.add(EnrollmentMail.key, {
      enrollment,
      student,
      plan,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({
        error: 'Enrollment not found',
      });
    }

    const { student_id, plan_id, start_date } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(404).json({
        error: 'Student not found',
      });
    }

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(404).json({
        error: 'Plan not found',
      });
    }

    const start_date_day = startOfDay(parseISO(start_date));
    const today_day = startOfDay(new Date());

    if (isBefore(start_date_day, today_day)) {
      return res.status(401).json({
        error: 'Registration date must be later than today',
      });
    }

    const updatedEnrollment = await enrollment.update({
      ...req.body,
      start_date: start_date_day,
    });

    return res.json(updatedEnrollment);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      res.status(404).json({
        error: 'Enrollment not found',
      });
    }

    await enrollment.destroy();

    return res.json();
  }
}

export default new EnrollmentController();
