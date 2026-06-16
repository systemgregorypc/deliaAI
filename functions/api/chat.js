export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // AQUÍ ES DONDE SE SELECCIONA LLAMA 3 DEL CATÁLOGO
    const aiResponse = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { 
          role: 'system', 
          content: 'Hola, soy DeliaAI. ¿En qué proyecto técnico o investigación de FILTRACION Y DE CODIFICAR vamos a trabajar hoy?' 
        },
        { role: 'user', content: prompt }
      ]
    });

    // Cloudflare guarda la respuesta de Llama en 'aiResponse.response'
    const textResult = aiResponse.response;

    // Se lo enviamos limpio a tu app.js para que no diga undefined
    return new Response(JSON.stringify({ response: textResult }), {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ response: `Error: ${error.message}` }), { status: 500 });
  }
}
