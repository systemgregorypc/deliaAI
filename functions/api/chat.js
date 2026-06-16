export async function onRequestPost(context) {
  try {
    // 1. Leer el texto enviado desde app.js
    const { prompt } = await context.request.json();

    // 2. Llamar al modelo Llama 3 del catálogo de Workers AI utilizando el enlace 'AI'
    const aiResponse = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { 
          role: 'system', 
          content: 'Hola, soy DeliaAI. ¿En qué proyecto técnico o investigación de FILTRACION Y DE CODIFICAR vamos a trabajar hoy?' 
        },
        { 
          role: 'user', 
          content: prompt 
        }
      ]
    });

    // 3. Extraer el texto generado por la IA (Cloudflare lo guarda en .response)
    const textResult = aiResponse.response;

    // 4. Devolverlo en un JSON estructurado exactamente como { "response": "texto de la IA" }
    return new Response(JSON.stringify({ response: textResult }), {
      headers: { 
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    // En caso de error, devolvemos un formato legible para que no rompa la interfaz
    return new Response(JSON.stringify({ response: `Error interno: ${error.message}` }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
