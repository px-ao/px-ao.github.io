import re
from docx import Document

# Carrega o documento Word
documento = Document("docs/16052025.docx")

# Abre o arquivo de saída
with open("saida.txt", "w", encoding="utf-8") as arquivo_saida:
    for paragrafo in documento.paragraphs:
        texto = paragrafo.text.strip()
        if not texto:
            continue

        # Verifica estilos de run
        has_bold = any(run.bold for run in paragrafo.runs if run.bold is not None)
        has_italic = any(run.italic for run in paragrafo.runs if run.italic is not None)

        # Decide a classe do parágrafo com prioridade para negrito
        if has_bold:
            classe = "Deus"
        elif has_italic:
            classe = "prece"
        else:
            continue  # Ignora parágrafos sem estilo

        # Aplica destaque a conteúdo entre parênteses
        texto_formatado = re.sub(r"\((.*?)\)", r"<span class='inc'>(\1)</span>", texto)

        # Escreve a linha formatada
        arquivo_saida.write(f"<p class='{classe}'>{texto_formatado}</p>\n")

print("Parágrafos processados e salvos em 'saida.txt'.")
