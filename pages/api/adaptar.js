export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
  
    const { perfil, oferta, cvBase } = req.body;
  
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
  
    const resultados = {};
  
    try {
      for (let { name, prompt } of prompts) {
        console.log(`⏳ Generando: ${name}`);
        const start = Date.now();
  
        const chat = await openai.chat.completions.create({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: prompt }],
        });
  
        const end = Date.now();
        console.log(`✅ ${name} generado en ${((end - start) / 1000).toFixed(2)} segundos`);
  
        resultados[name] = chat.choices[0].message.content;
      }
  
      res.status(200).json(resultados);
    } catch (error) {
      console.error('❌ Error en API:', error);
      res.status(500).json({ error: 'Error en generación IA' });
    }
  }
  