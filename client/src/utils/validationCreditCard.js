export function validationCredirCard(cardNumber, expiryDate, cvv, name) {

  const [month, year] = expiryDate.split('/').map(part => part.trim());
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  const sanitizedCardNumber = cardNumber.replace(/\s/g, '');

  if (!/^\d{16}$/.test(sanitizedCardNumber)) {
    return 'Número de tarjeta inválido';
  }

  else if (!/^\d{2}\/\d{2}$/.test(expiryDate) ||
    (parseInt(year) < currentYear) ||
    (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
    return 'Fecha de vencimiento inválida';
  }

  else if (!/^\d{3}$/.test(cvv)) {
    return 'CVV inválido';
  }

  else if (!/^\w+ \w+$/.test(name)) {
    return 'Nombre del titular inválido';
  }

  else {
    return '';
  }
}