import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { perfil, oferta, cvBase, nombre, empresa } = req.body;

  console.log('🟡 Recibido en API:', { perfil, oferta, cvBase });

  const prompts = [
    {
      name: 'cvAdaptado',
      prompt: `Adapta este CV:\n${cvBase}\n\nal perfil:\n${perfil}\ny a la oferta:\n${oferta}`,
    },
    {
      name: 'carta',
      prompt: `Redacta una carta de presentación con este perfil:\n${perfil}\npara esta oferta:\n${oferta}`,
    },
    {
      name: 'email',
      prompt: `Escribe un correo breve y profesional para enviar esta candidatura:\nPerfil: ${perfil}\nOferta: ${oferta}`,
    }
  ];

  try {
    console.log('🚀 Ejecutando prompts en paralelo...');
    const respuestas = await Promise.all(
      prompts.map(async ({ name, prompt }) => {
        const chat = await openai.chat.completions.create({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: prompt }],
        });
        return { name, content: chat.choices[0].message.content };
      })
    );

    const resultados = {};
    respuestas.forEach(({ name, content }) => {
      resultados[name] = content;
    });

    res.status(200).json(resultados);
  } catch (error) {
    console.error('❌ Error en API:', error);
    res.status(500).json({ error: 'Error en generación IA' });
  }
}
