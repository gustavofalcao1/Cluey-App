import Constants from 'expo-constants';

export const sendMessageToOpenAI = async (text) => {
  const OPENAI_API_KEY = Constants.expoConfig.extra.openai.apiKey;
  const OPENAI_ORG_ID = Constants.expoConfig.extra.openai.orgId;
  const OPENAI_MODEL = 'gpt-3.5-turbo'; // Atualizado para modelo mais recente
  const MAX_TOKENS = 1000;

  try {
    let responseMessage = '';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'OpenAI-Organization': OPENAI_ORG_ID
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [{ role: 'user', content: text }], // Formato atualizado para chat completions
        max_tokens: MAX_TOKENS,
      })
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions); // Endpoint atualizado
    const data = await response.json();
    responseMessage = data.choices[0].message.content.trim(); // Formato de resposta atualizado
    
    return responseMessage;
  } catch (error) {
    console.error(error);
    throw error; // Propagar erro para tratamento adequado
  }
};
