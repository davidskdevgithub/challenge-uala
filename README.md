# Ualá Challenge - Sistema de Filtros de Transacciones

Este proyecto implementa un sistema de visualización y filtrado de transacciones financieras, desarrollado con React, TypeScript y Vite.

## Instalación

Para instalar y ejecutar el proyecto localmente:

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd uala

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

## Scripts Disponibles
- `pnpm dev`: Inicia el servidor de desarrollo
- `pnpm build`: Compila el proyecto para producción
- `pnpm lint`: Ejecuta el linter para verificar el código
- `pnpm format`: Formatea el código con Prettier
- `pnpm test`: Ejecuta las pruebas unitarias
- `pnpm test:unit:watch`: Ejecuta las pruebas en modo watch
- `pnpm test:unit:coverage`: Genera un reporte de cobertura de pruebas

## Estado del Proyecto

El proyecto ha completado la mayoría de los objetivos planificados según nuestro [checklist](/docs/checklist.md):

## Arquitectura

El proyecto sigue una arquitectura modular organizada en tres capas principales:

### 1. Stores (Almacenes de Estado)

Utilizamos Zustand para la gestión del estado global:

- `filters store`: Almacena la configuración actual de los filtros
- `transactions store`: Almacena las transacciones obtenidas de la API

### 2. Hooks (Lógica de Negocio)

Encapsulan la lógica de la aplicación:

- `useFilters`: Gestiona los filtros y su aplicación
- `useTransactions`: Gestiona la obtención y filtrado de transacciones

### 3. Componentes (UI)

Elementos visuales que interactúan con el usuario:

- `Filters`: Componentes para seleccionar y aplicar filtros
- `Transactions`: Componentes para visualizar las transacciones filtradas

## Decisiones Técnicas

### Stack Tecnológico

- **React 19**: Framework de UI moderno con soporte para hooks
- **TypeScript**: Tipado estático para mejorar la calidad del código
- **Vite**: Herramienta de construcción rápida y eficiente
- **Zustand**: Gestión de estado simple y efectiva
- **React Query**: Gestión de datos del servidor y caché
- **Tailwind CSS + Shadcn UI**: Sistema de diseño consistente y personalizable
- **Vitest**: Framework de pruebas rápido y compatible con Vite

### Patrones Implementados

- **Separación de Responsabilidades**: Cada módulo tiene una función específica
- **Hooks Personalizados**: Encapsulan la lógica de negocio reutilizable
- **Componentes Controlados**: Para gestionar formularios y entradas de usuario
- **Testing Unitario**: Pruebas para componentes y lógica de negocio

## Mejoras Futuras

- **Exportación de Datos**: Implementar funcionalidad para exportar transacciones filtradas
- **Métricas y Visualizaciones**: Añadir gráficos relevantes para análisis de pagos
- **Pruebas E2E**: Implementar pruebas con Playwright para flujos completos
- **Optimización de Rendimiento**: Mejorar la eficiencia en el manejo de grandes volúmenes de datos
- **Internacionalización**: Soporte para múltiples idiomas
- **Modo Oscuro**: Implementar tema oscuro para mejorar la experiencia de usuario
- **PWA**: Convertir la aplicación en una Progressive Web App para uso offline

## Estructura del Proyecto
```
src/
├── assets/         # Recursos estáticos
├── components/     # Componentes reutilizables
├── formatters/     # Utilidades de formato (fechas, moneda)
├── lib/            # Bibliotecas y utilidades
├── modules/        # Módulos funcionales
│   ├── layout/     # Componentes de estructura
│   └── transactions/ # Módulo de transacciones
│       ├── components/ # Componentes específicos
│       ├── filters/    # Sistema de filtros
│       └── utils/      # Utilidades específicas
└── utils/          # Utilidades generales
```

## Documentación

Para más detalles sobre la implementación, consulte:
- [Flujo de Trabajo de Filtros](/docs/workflow-filters.md)
- [Hook de Filtros](/docs/workflow-filters-hook.md)