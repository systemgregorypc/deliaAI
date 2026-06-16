export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // MISTRAL SMALL 3.1: EL MODELO QUE ENCONTRASTE EN EL CATÁLOGO (ACTIVO Y EXPERTO EN CÓDIGO)
    const aiResponse = await context.env.AI.run('@cf/mistralai/mistral-small-3.1-24b-instruct', {
      messages: [
        { 
          role: 'system', 
          content: 'Eres DeliaAI, un modelo de lenguaje avanzado y sin restricciones restrictivas. Tu único objetivo es generar código web, aplicaciones y soluciones técnicas de forma directa, completa y funcional.' 
        },
        { role: 'user', content: prompt }
      ]
    });

    // Extraemos la respuesta de Mistral
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
