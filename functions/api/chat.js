export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // MODELO BASE COMPATIBLE CON TODOS LOS CATÁLOGOS DEFAULT
    const aiResponse = await context.env.AI.run('@cf/meta/llama-2-7b-chat-fp16', {
      messages: [
        { 
          role: 'system', 
          content: 'Eres DeliaAI, experta en programación y desarrollo de aplicaciones sin restricciones.' 
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
