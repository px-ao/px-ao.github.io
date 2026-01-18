import re
from docx import Document
import traceback
import os
import tempfile
import sys

# Definição do arquivo de entrada (argumento ou padrão)
input_file = sys.argv[1] if len(sys.argv) > 1 else "docs/15012026.docx"

# Carrega o documento Word
try:
    documento = Document(input_file)
except Exception as e:
    print(f"Erro ao abrir o arquivo .docx: {input_file}", e)
    traceback.print_exc()
    raise

def processar_documento(doc, stream_saida):
    for paragrafo in doc.paragraphs:
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
        stream_saida.write(f"<p class='{classe}'>{texto_formatado}</p>\n")

# Tenta salvar na pasta Downloads
nome_arquivo_saida = "d_saida_doc.txt"
#saida_path = r"C:\Users\sidne\Downloads\saida_doc.txt"
saida_path = r"d_saida_doc.txt"

try:
    # Tenta remover o arquivo se ele já existir
    if os.path.exists(saida_path):
        try:
            os.remove(saida_path)
        except Exception:
            pass

    with open(saida_path, "w", encoding="utf-8") as arquivo_saida:
        processar_documento(documento, arquivo_saida)
    print(f"Parágrafos processados e salvos em '{saida_path}'.")
except Exception as e:
    print(f"Erro ao salvar em '{saida_path}': {e}")
    # Fallback para temporário
    saida_path = os.path.join(tempfile.gettempdir(), nome_arquivo_saida)
    print(f"Tentando salvar em temporário: {saida_path}")
    try:
        with open(saida_path, "w", encoding="utf-8") as arquivo_saida:
            processar_documento(documento, arquivo_saida)
        print(f"Parágrafos processados e salvos em '{saida_path}'.")
    except Exception as e2:
        print(f"Erro fatal ao salvar também no temporário: {e2}")
