const convertNumber = (number) => Number(number).toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export default convertNumber;
