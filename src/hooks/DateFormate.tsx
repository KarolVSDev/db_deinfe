
export const formatToInputDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
export const formateDateToPtBr = (date: string): string => {
  const parsedDate = new Date(date)

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear()
  return `${day}/${month}/${year}`;
};

export default { formatToInputDate,formateDateToPtBr }

