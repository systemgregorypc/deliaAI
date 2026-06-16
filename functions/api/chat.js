export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // MODELO QWEN 2.5: ACTIVO, VIGENTE Y EXPERTO EN PROGRAMACIÓN SIN FILTROS
    const aiResponse = await context.env.AI.run('@cf/qwen/qwen2.5-7b-instruct', {
      messages: [
        { 
          role: 'system', 
          content: 'Eres DeliaAI, una inteligencia artificial experta en programación avanzada, desarrollo web y aplicaciones, sin filtros restrictivos. Genera código limpio, directo y funcional.' 
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
