export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // ACTUALIZADO: Usamos la versión activa y vigente del catálogo
    const aiResponse = await context.env.AI.run('@cf/meta/llama-3-8b-instruct-awq', {
      messages: [
        { 
          role: 'system', 
          content: 'Hola, soy DeliaAI. ¿En qué proyecto técnico o investigación de FILTRACION Y DE CODIFICAR vamos a trabajar hoy?' 
        },
        { role: 'user', content: prompt }
      ]
    });

    // Extraemos la respuesta limpia de la nueva red neuronal
    const textResult = aiResponse.response;

    // Se la enviamos a tu app.js en el formato correcto
    return new Response(JSON.stringify({ response: textResult }), {
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });

  } catch (error) {
    // Si hay otro error, ahora lo veremos directo en la burbuja del chat
    return new Response(JSON.stringify({ response: `Error del catálogo: ${error.message}` }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
