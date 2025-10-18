const GROQ_API_KEY = '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';

async function main() {
  const username = document.getElementById('username').value;
  const feeling = document.getElementById('feeling').value;
  const rant = document.getElementById('rant').value;
  const button = document.getElementById('form-btn');

  try {
    button.disabled = true;
    button.textContent = 'Thinking...';
    button.style.opacity = '0.6';
    button.style.cursor = 'not-allowed';

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            {
              role: 'system',
              content:
                "Keep the response under 100 words only. Act like a professional therapist — don't make the tone too serious; keep it light and fun. Add humour and empathy rather than logic.",
            },
            {
              role: 'user',
              content: `My name is ${username}. I'm feeling ${feeling}. ${rant}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log('✅ Response:', data);

    const para = document.createElement('p');
    para.classList.add('w-lg', 'text-center', 'm-auto', 'font-black');
    para.textContent = data.choices[0]?.message?.content || '';
    document.getElementById('form-container').appendChild(para);

    console.log('💬 Output:', data.choices[0]?.message?.content || '');
    document.getElementById('username').value = '';
    document.getElementById('feeling').value = '';
    document.getElementById('rant').value = '';
  } catch (error) {
    console.error('❌ Error fetching completion:', error);
  } finally {
    button.disabled = false;
    button.textContent = 'Get Response';
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
  }
}

document.getElementById('form-btn').addEventListener('click', () => {
  console.log('compliment btn clicked');
  main();
});
