# Bolsa de Empleo App (React Native)

Aplicación móvil construida con **Expo + React Native** que replica los flujos de la Bolsa de Empleo de la Cámara de Industrias de Loja directamente desde el diseño de Figma. El bundle incluye todo el recorrido de autenticación, el espacio del candidato y el panel del empleador con datos simulados.

## Requisitos

- Node.js 18 o superior
- npm 9+ (o pnpm/yarn si lo prefieres)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalada globalmente (`npm install -g expo-cli`) para ejecutar en dispositivos/emuladores

## Instalación y ejecución

```bash
npm install
npm run start       # abre Expo DevTools
npm run android     # lanza la app en un emulador/dispositivo Android
npm run ios         # requiere macOS + Xcode
npm run web         # modo web vía Metro
```

## Estructura principal

```
App.tsx                # Maneja la sesión y enruta entre auth, candidato y empleador
src/
  components/ui/       # Mini design system (botones, tarjetas, chips, inputs, etc.)
  data/mockData.ts     # Información simulada para ofertas y perfiles
  screens/             # Pantallas de auth, candidato y empleador
  theme/colors.ts      # Paleta central utilizada por los componentes
```

## Funcionalidades cubiertas

- Selección de rol, login y registro con validaciones básicas.
- Flujo especial para empleadores que deben cambiar contraseña en el primer inicio.
- Espacio del candidato: descubrimiento de ofertas, postulaciones, alertas y edición de perfil.
- Espacio del empleador: gestión de ofertas vigentes, recepción de postulaciones y edición de perfil empresarial.
- Componentes reutilizables totalmente nativos, sin dependencias web.

Integra tu backend/API conectando las acciones (`onSuccess`, `onApply`, etc.) dentro de las pantallas correspondientes.
