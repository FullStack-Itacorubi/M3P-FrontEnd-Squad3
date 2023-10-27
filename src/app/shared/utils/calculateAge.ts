export const calculateAge = (dateStr: string) => {
  if (!dateStr) return;

  const [day, month, year] = dateStr.split('/');
  const date = new Date(+year, +month - 1, +day);
  const ageDate = new Date(Date.now() - date.getTime());

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
