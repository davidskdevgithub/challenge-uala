# Flujo de Trabajo de Filtros

## Arquitectura

![Arquitectura de Filtros](/public/filters-architecture.png)

El sistema de filtros sigue una arquitectura organizada en tres capas principales:

1. **Stores**: Almacenes de datos que mantienen el estado de la aplicación
   - `filters store`: Almacena la configuración actual de los filtros
   - `transactions store`: Almacena las transacciones que serán filtradas

2. **Hooks**: Proporcionan funcionalidad y lógica reutilizable
   - `useFilters`: Hook para gestionar los filtros
   - `useTransactions`: Hook para gestionar las transacciones

3. **Componentes**: Elementos visuales que interactúan con el usuario
   - `Filters`: Referencia a componentes que muestra los filtros disponibles
   - `Transactions`: Referencia a componentes que muestra las transacciones filtradas

## Flujo de Datos

El flujo de datos sigue estos pasos (numerados según la imagen):

1. El `transactions store` devuelve una lista de transacciones obtenidas desde una API
2. El `filters store` devuelve los filtros a aplicar con sus valores
3. El hook `useTransactions` combina ambos datos y retorna una lista de transacciones filtradas al componente
4. El hook `useFilters` devuelve los filtros aplicados con sus valores
5. El componente `Filters` tiene sus propios estados para trabajar con el usuario
6. Solo después de presionar "Apply", envía esos estados al hook
7. El hook envía los datos al `filters store`

Después del paso 7, el paso 2 ocurrirá nuevamente porque el store con Zustand tiene este "binding" y la lista de transacciones se actualizará automáticamente.

## Conclusión

Esta arquitectura permite una separación clara de responsabilidades y facilita la gestión del estado de la aplicación, haciendo que el sistema de filtros sea mantenible y escalable.