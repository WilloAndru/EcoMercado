export function dateToDay(fecha) {
  const fechaProporcionada = new Date(fecha);
  const hoy = new Date();
  fechaProporcionada.setHours(0, 0, 0, 0);
  hoy.setHours(0, 0, 0, 0);
  const diferenciaEnMilisegundos = hoy - fechaProporcionada;
  const milisegundosEnUnDia = 24 * 60 * 60 * 1000;
  const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / milisegundosEnUnDia);
  return diferenciaEnDias;
}