import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder, student } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Questão respondida no Gympoint',
      template: 'help-order',
      context: {
        student: student.name,
        question: helpOrder.question,
        created_at: format(parseISO(helpOrder.created_at), 'PPPP', {
          locale: ptBR,
        }),
        answer: helpOrder.answer,
        answer_at: format(parseISO(helpOrder.answer_at), 'PPPP', {
          locale: ptBR,
        }),
      },
    });
  }
}

export default new HelpOrderMail();
