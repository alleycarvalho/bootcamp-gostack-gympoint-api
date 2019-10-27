import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({
        error: 'Student not found',
      });
    }

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .integer()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { email } = req.body;

    const studentExists = await Student.findOne({
      where: { email },
    });

    if (studentExists) {
      return res.status(400).json({
        error: 'Student already exists',
      });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .integer()
        .positive(),
      weight: Yup.number().positive(),
      height: Yup.number()
        .integer()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { id } = req.params;
    const { email } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({
        error: 'Student not found',
      });
    }

    if (email && email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });

      if (studentExists) {
        return res.status(400).json({
          error: `Email ${email} is already being used by another student`,
        });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(404).json({
        error: 'Student not found',
      });
    }

    await student.destroy();

    return res.json();
  }
}

export default new StudentController();
