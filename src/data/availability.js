// src/data/availability.js

/**
 * Este archivo gestiona la disponibilidad para días específicos en el calendario.
 * 
 * Por defecto, todos los días aparecen en verde (disponibles).
 * Puedes añadir fechas a este objeto con el formato 'YYYY-MM-DD' y asignarles un estado:
 * 
 * - 'yellow': Pocas plazas (color amarillo/naranja). El usuario PUEDE reservar, pero creará urgencia.
 * - 'red': Agotado o cerrado (color rojo/gris). El día estará BLOQUEADO y el usuario NO PODRÁ seleccionarlo.
 */

export const dateAvailability = {
    // Ejemplos (puedes borrarlos o modificarlos):
    // '2024-05-20': 'yellow', // Marca el 20 de Mayo con pocas plazas
    // '2024-05-25': 'red',    // Bloquea el 25 de Mayo (no seleccionable)
};

/**
 * Función para obtener el estado de una fecha específica
 */
export const getDateStatus = (date) => {
    // Formateamos la fecha a YYYY-MM-DD local, asumiendo date es objeto Date
    const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(date.getTime() - tzOffset)).toISOString().split('T')[0];
    
    return dateAvailability[localISOTime] || 'green'; // 'green' por defecto si no está en la lista
};

/**
 * Función para verificar si una fecha debe estar deshabilitada
 */
export const isDateDisabled = (date) => {
    const status = getDateStatus(date);
    return status === 'red'; // Si es 'red', el día no se puede seleccionar
};
