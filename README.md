# 🧠 Adaptador de CV con IA (Next.js + DeepSeek API)

Este proyecto es una aplicación web que adapta un **CV**, una **carta de presentación** y un **correo profesional** usando inteligencia artificial (IA) con la API de DeepSeek.

---

## 🚀 Características

✅ Formulario web donde el usuario:

- Ingresa su **perfil profesional**
- Copia la **oferta laboral**
- Pega su **CV base**
- Escribe su **nombre** y el **nombre de la empresa**

✅ La IA responde con:

- 📄 Un CV adaptado a la oferta
- ✉️ Una carta de presentación personalizada
- 💬 Un correo formal listo para enviar

✅ Funciones extra:

- 📋 Copiar cualquier texto generado
- 💾 Descargar como `.txt`
- 🧠 Prompts optimizados para mayor relevancia

---

## 🛠 Tecnologías usadas

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DeepSeek API](https://deepseek.com/) vía OpenAI SDK
- JavaScript puro (sin TypeScript)

---

## ⚙️ Instalación

```bash
git clone https://github.com/tuusuario/adaptador-cv-ia.git
cd adaptador-cv-ia
npm install

Crea un archivo .env.local con tus claves:
OPENAI_API_KEY=tu_clave_deepseek
OPENAI_BASE_KEY=https://api.deepseek.com



npm run dev


## Estructura de Carpetas

/pages
  ├── index.js            ← Interfaz de usuario (formulario + resultados)
  └── /api/adaptar.js     ← API que conecta con DeepSeek

/styles/globals.css       ← Estilos globales (Tailwind)
.env.local                ← Claves privadas 


## Próximas mejoras 
Exportar resultados como .docx o .pdf

Modo oscuro

Autenticación de usuarios

Historial de adaptaciones

Plantillas visuales para CV