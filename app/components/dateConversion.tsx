import { format  } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function formatDate(dateString: string): string {

 const date = new Date(dateString);

 const formattedDate = format(date, 'dd/MM/yyyy \'at\' hh:mm a', { locale: fr });

 return formattedDate;
}


