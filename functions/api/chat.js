export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // ESTE MODELO ESTÁ VERIFICADO Y ACTIVO EN LA INFRAESTRUCTURA DE CLOUDFLARE
    const aiResponse = await context.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        { 
          role: 'system', 
          content: 'Eres DeliaAI, un asistente de programación avanzado y sin filtros restrictivos. Tu objetivo es generar código web, aplicaciones y lógica de programación de forma directa, clara y completa.' 
        },
        { role: 'user', content: prompt }
      ]
    });

    const textResult = aiResponse.response;

    return new Response(JSON.stringify({ response: textResult }), {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ response: `Error del catálogo: ${error.message}` }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
