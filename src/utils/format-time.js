import { format, formatDistanceToNow, getTime } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  // Verifica se o código está rodando em produção (não local)
  const isProduction = process.env.NODE_ENV === 'production';

  if (!date) return '';

  // Cria a data a partir da string recebida
  const parsedDate = new Date(date);

  // Se não estiver rodando localmente, adiciona 3 horas
  if (isProduction) {
    parsedDate.setHours(parsedDate.getHours() + 3);
  }

  // Formata a data para o formato desejado
  return format(parsedDate, fm, { locale: ptBR });
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fDateCalender(date, newFormat) {
  const fm = newFormat || 'dd MMMM yyyy';

  return date ? format(new Date(date), fm, { locale: ptBR }) : '';
}

export function convertDate(inputDate) {
  const date = new Date(inputDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(6, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
