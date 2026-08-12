# AIRWEAVE_SETUP.md

Para integrar **Airweave** como un servidor MCP en tu entorno de desarrollo (específicamente en Cursor o cualquier IDE compatible con MCP), sigue estos pasos:

## 1. Obtener Credenciales
Primero, asegúrate de tener una cuenta en [Airweave Cloud](https://app.airweave.ai) o tener tu instancia auto-alojada corriendo.
- Ve al Dashboard de Airweave y genera un **API Key**.
- Copia el **Readable ID** de la colección que deseas usar (ej. `my-collection`).

## 2. Configuración en Cursor (Opencode)
1. Abre **Settings** en Cursor (Ctrl + ,).
2. Ve a la pestaña **Features** y selecciona **MCP Servers**.
3. Haz clic en **+ Add new global MCP server**.
4. Usa los siguientes valores:
   - **Name**: `Airweave`
   - **Type**: `command`
   - **Command**: `npx airweave-mcp-search`
   - **Environment Variables**:
     - `AIRWEAVE_API_KEY`: `TU_API_KEY_AQUI`
     - `AIRWEAVE_COLLECTION`: `TU_COLLECTION_ID_AQUI`

## 3. Uso
Una vez configurado, puedes pedirle al asistente de Cursor:
- *"Busca información en mi colección de Airweave sobre [tema]."*
- *"Lista los pagos fallidos según mi colección de Airweave."*

## 4. (Opcional) Auto-alojado
Si prefieres correrlo localmente:
```bash
git clone https://github.com/airweave-ai/airweave.git
cd airweave
./start.sh
```
Luego configura el MCP apuntando a tu instancia local si es necesario (el servidor MCP por defecto usa la API de Airweave Cloud).

---
*Este guía fue generada para ayudarte a integrar Airweave en tu flujo de trabajo de Aconiño.*
