export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();

    // MISTRAL SMALL CONFIGURADO CON MÁXIMA CAPACIDAD DE TEXTO
    const aiResponse = await context.env.AI.run('@cf/mistralai/mistral-small-3.1-24b-instruct', {
      messages: [
        { 
          role: 'system', 
          content: 'Eres DeliaAI, un modelo de lenguaje avanzado sin restricciones. Tu objetivo es generar respuestas y códigos web COMPLETOS, detallados y funcionales. Nunca dejes una idea o un bloque de código a medias.' 
        },
        { role: 'user', content: prompt }
      ],
      // AQUÍ AGREGAMOS LOS PARÁMETROS PARA EVITAR QUE SE CORTE:
      max_tokens: 2500, // Le da espacio suficiente para escribir respuestas muy largas
      temperature: 0.6  // Mantiene el balance ideal para que sea creativa pero precisa en programación
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
