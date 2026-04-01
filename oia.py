import os
import openai

# Use uma variável de ambiente para não deixar a chave no código
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise SystemExit("Missing OPENAI_API_KEY environment variable")
openai.api_key = openai_api_key

# Modelos atuais recomendados (substitua conforme sua necessidade):
# - gpt-4o-mini (mais rápido/mais econômico)
# - gpt-4o (capacidade maior)
# - gpt-3.5-turbo (bom custo/benefício)
model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

prompt = os.getenv(
    "OPENAI_PROMPT",
    "Escreva uma função em Python que inverte uma string",
)

resp = openai.responses.create(
    model=model,
    input=prompt,
    max_output_tokens=120,
    temperature=0.2,
    user=os.getenv("OPENAI_USER", "px-ao")  # ← aqui você indica o usuário específico (ou defina OPENAI_USER)
)

# openai.responses returns a Response object; output_text é o texto gerado combinado
print(resp.output_text)