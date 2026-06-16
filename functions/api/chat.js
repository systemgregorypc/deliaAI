export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // Llamada nativa al modelo Llama de Cloudflare Workers AI
    const response = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: 'Eres DeliaAI, una red neuronal avanzada creada por el investigador José Gregorio Hernández Calderón de System Gregory PC.' },
        { role: 'user', content: prompt }
      ]
    });

    return new Response(JSON.stringify({ response: response.response }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
