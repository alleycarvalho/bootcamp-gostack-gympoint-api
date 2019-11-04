import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { enrollment, student, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Nova matrícula!',
      template: 'enrollment',
      context: {
        student: student.name,
        startDate: format(parseISO(enrollment.start_date), 'PPPP', {
          locale: ptBR,
        }),
        endDate: format(parseISO(enrollment.end_date), 'PPPP', {
          locale: ptBR,
        }),
        plan: plan.title,
        price: enrollment.price,
      },
    });
  }
}

export default new EnrollmentMail();
