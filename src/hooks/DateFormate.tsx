// import { useState, useEffect } from 'react';
// import { format, toDate } from 'date-fns';

// const useFormatDate = (dateProp: string | Date | undefined): string | null => {
//   const [formattedDate, setFormattedDate] = useState<string | null>(null);

//   useEffect(() => {
//     if (dateProp) {
//       const date = toDate(new Date(dateProp));
//       const formatted = format(date, 'dd/MM/yyyy');
//       setFormattedDate(formatted);
//     }
//   }, [dateProp]);

//   return formattedDate;
// };

// export default useFormatDate;

