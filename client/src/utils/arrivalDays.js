export function arrivalDays(fecha) {
  const fechaProporcionada = new Date(fecha);
  const hoy = new Date();
  
  fechaProporcionada.setHours(0, 0, 0, 0);
  hoy.setHours(0, 0, 0, 0);

  const fechaMaximaEntrega = new Date(fechaProporcionada);
  fechaMaximaEntrega.setDate(fechaMaximaEntrega.getDate() + 5);

  const diferenciaEnMilisegundos = fechaMaximaEntrega - hoy;
  const milisegundosEnUnDia = 24 * 60 * 60 * 1000;

  const diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / milisegundosEnUnDia);

  return diferenciaEnDias > 0 ? `Llega en ${diferenciaEnDias} ${diferenciaEnDias !== 1 ? "días" : "día"}` : "Adquirido"
}