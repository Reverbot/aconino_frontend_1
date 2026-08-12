# Spec: Rediseño de Donation Sidebar "Centro de Impacto"

**Estado:** 🏗️ En Revisión
**Fecha:** 2026-03-18
**Autor:** Gemini CLI

## 1. Visión General
Transformar el actual `DonationWidget` (modal) en un **Sidebar Lateral (DonationSidebar)** que funcione como un "gancho" profesional y emocional para maximizar las donaciones. El diseño será híbrido: directo en la acción pero rico en narrativa de impacto.

## 2. Objetivos de Negocio
*   **Maximizar Conversión:** Reducir la fricción mediante una interfaz de "un solo vistazo".
*   **Storytelling de Impacto:** Traducir montos monetarios en beneficios tangibles (materiales, terapias).
*   **Profesionalismo:** Alinear la estética con el estándar de la industria (Fintech/Non-profit) y el sistema de diseño de Aconiño.
*   **Escalabilidad:** Permitir añadir nuevas causas o categorías de donación sin tocar el núcleo del componente.

## 3. Arquitectura del Componente (`DonationSidebar.tsx`)

### 3.1 Estructura Modular
El sidebar se dividirá en sub-componentes internos para facilitar el mantenimiento:

1.  **`SidebarHeader`**: Selector de pestañas (Tabs) con gradientes dinámicos. Incluye botón "X" de cierre.
2.  **`ImpactStory`**: Visualización del progreso actual.
    *   Imagen/Ilustración dinámica.
    *   Barra de progreso minimalista ("Faltan 10 bultos...").
3.  **`DonationGrid`**: Rejilla de botones de monto (Cards).
    *   Cada card incluye: Monto + Icono + Micro-descripción.
4.  **`CustomAmountInput`**: Campo de entrada con "Calculadora de Impacto" en tiempo real.
5.  **`SidebarFooter`**: Botón de acción principal ("¡QUIERO APOYAR!"), logos de seguridad y enlace a donación empresarial.

### 3.2 Comportamiento y Animaciones (Framer Motion)
*   **Entrada:** `x: '100%' -> 0` con un `spring` suave.
*   **Cierre:** Botón "X" en la esquina superior derecha del `SidebarHeader` y clic en el backdrop oscurecido.
*   **Interacción:** Hover states en las tarjetas de monto con sutil elevación y cambio de color perimetral.
*   **Feedback:** Al seleccionar un monto, el botón de acción debe iluminarse con un pulso de color `accent`.

## 4. Diseño Visual y Estilos

### 4.1 Colores y Tipografía
*   **Fondo:** White / Gray-50.
*   **Gradientes:** Uso de `from-primary to-secondary` para Construcción y `from-secondary to-accent` para Plan Padrino.
*   **Tipografía:** 
    *   Títulos: `font-black text-primary uppercase`.
    *   Montos: `font-bold text-2xl`.
    *   Impacto: `font-medium text-sm text-gray-500`.

### 4.2 Responsividad
*   **Escritorio:** Sidebar lateral derecho (ancho: 450px - 500px).
*   **Móvil:** Pantalla completa (Full-screen overlay) con scroll interno.

## 5. Implementación Técnica

### 5.1 Flujo de Pago
El sidebar actúa como un **selector de intención y monto**. Al hacer clic en el botón de acción principal ("¡QUIERO APOYAR!"), el sistema debe:
1.  Validar el monto seleccionado (min: $5.000 COP).
2.  Redirigir al usuario a la pasarela de pago externa (Wompi/PayPal) inyectando el monto y la referencia de la causa seleccionada.
*Nota: El sidebar NO procesa transacciones directamente, solo orquestra la selección.*

### 5.2 Esquema de Datos (`src/data/donation-options.ts`)
Para garantizar la escalabilidad, el esquema debe ser:
```typescript
interface DonationOption {
  id: string;
  category: 'construction' | 'padrino';
  title: string;
  items: Array<{
    value: number;
    label: string;
    impact: string; // ej: "1 bulto de cemento"
    icon: string; // nombre del icono de react-icons
  }>;
}
```

### 5.3 Validación y Estados
*   **Input Personalizado:** Validar numéricamente; el botón de acción se deshabilita si el monto es inferior al mínimo.
*   **Carga Fallida:** Si no hay datos en la configuración o el archivo `donation-options.ts` no se carga, mostrar un mensaje amigable invitando a contactar directamente.

## 6. Próximos Pasos (Plan de Acción)
1.  Crear estructura de archivos modular.
2.  Implementar la lógica de Tabs y visualización de impacto.
3.  Desarrollar la rejilla de donaciones dinámica.
4.  Refactorizar `DonationProvider` para soportar el nuevo Sidebar.
5.  Añadir animaciones finales y pulido visual.
