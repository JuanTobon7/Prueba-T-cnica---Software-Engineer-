# Tabla de Historias de Usuario — Gestor de Tareas

## Nota rápida sobre la decisión de diseño

Decisión: se implementó como una todo-daily porque el documento de requerimientos contenía palabras clave que enfatizan la captura rápida y la gestión diaria de tareas. (Se dejó la opción de extenderlo como mejora documentada.)





| ID | Título | Prioridad | Descripción | Criterios de Aceptación |
|----|--------|-----------|-------------|-------------------------|
| US-01 | Ver todas mis tareas | 🔴 Alta | Como usuario, quiero ver todas mis tareas al abrir la app para evaluar rápidamente lo pendiente | • Al abrir la app veo una lista con todas mis tareas actuales.
• Cada tarea muestra su título y si está hecha o pendiente.
• Puedo actualizar la lista fácilmente (gesto de "actualizar").
• Si no hay tareas, aparece un mensaje claro con un botón para agregar una nueva.
• Si falla la carga, el sistema muestra un mensaje y me permite reintentar. |
| US-02 | Crear tarea rápido | 🔴 Alta | Como usuario, quiero agregar tareas con formulario mínimo para capturar ideas sin fricción | • Puedo añadir una tarea con un formulario muy simple (solo título obligatorio, descripción opcional).
• La nueva tarea aparece de inmediato en la lista para que no pierda la información.
• Si hubo un problema al guardar, recibo un aviso y puedo intentar nuevamente. |
| US-03 | Editar tarea | 🟠 Media | Como usuario, quiero cambiar título y descripción para corregir o añadir detalles | • Puedo abrir una tarea y editar su título o descripción desde la propia lista.
• Los cambios se reflejan en la lista una vez guardados.
• Si ocurre un error al guardar, el sistema me informa y mantiene la versión anterior hasta que se confirme el guardado. |
| US-04 | Marcar/desmarcar completada | 🔴 Alta | Como usuario, quiero togglear estado para llevar control rápido del progreso | • Con un toque puedo marcar una tarea como completada o volverla pendiente.
• El cambio se muestra inmediatamente para dar feedback visual (por ejemplo, una animación o cambio de estilo).
• Si hay un problema al guardar el estado, recibo un aviso y el sistema intenta recuperar el estado correcto. |
| US-05 | Eliminar tarea | 🟠 Media | Como usuario, quiero eliminar tareas irrelevantes para mantener la lista limpia | • Puedo eliminar una tarea con un gesto o botón y debo confirmar la acción.
• La tarea desaparece de la lista al confirmar.
• El sistema ofrece una opción de "deshacer" durante unos segundos en caso de que haya sido un borrado accidental. |
| US-06 | Autenticación y aislamiento | ⚫ Crítica | Como usuario, quiero mis tareas privadas para evitar acceso no autorizado | • Cada usuario debe iniciar sesión para ver sus tareas.
• Solo yo puedo ver y modificar mis propias tareas; otras personas no tienen acceso a ellas.
• Si intento acceder sin iniciar sesión, el sistema me pedirá que ingrese mis credenciales. |
| US-07 | Señales de estados de red | 🔴 Alta | Como usuario, quiero feedback claro para saber si operaciones cargan o fallan | • Mientras se cargan datos o se realizan acciones importantes, la app muestra indicadores visibles de progreso.
• Si ocurre un error, se muestra un mensaje claro con la opción de reintentar.
• Las acciones críticas quedan deshabilitadas mientras se procesan para evitar confusión. |

---
