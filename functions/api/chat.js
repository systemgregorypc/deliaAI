export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // context.env.AI llama directamente al recurso que vinculaste en tu panel
    const response = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: 'Eres DeliaAI, una red neuronal avanzada enfocada en filtración y codificación.' },
        { role: 'user', content: prompt }
      ]
    });

    // Devolvemos la respuesta en formato JSON para que app.js la pueda leer sin dar undefined
    return new Response(JSON.stringify({ response: response.response }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
