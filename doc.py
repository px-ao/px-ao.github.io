import re
from docx import Document
import traceback
import os
import tempfile
import sys
from docx.oxml import parse_xml
from docx.opc.constants import RELATIONSHIP_TYPE as RT

# Definição do arquivo de entrada (argumento ou padrão)
input_file = sys.argv[1] if len(sys.argv) > 1 else "docs/16042026.docx"
if not os.path.isfile(input_file):
    print(f"Arquivo de entrada não encontrado: {input_file}")
    sys.exit(1)
# Carrega o documento Word
try:
    documento = Document(input_file)
except Exception as e:
    print(f"Erro ao abrir o arquivo .docx: {input_file}", e)
    traceback.print_exc()
    raise

def processar_documento(doc, stream_saida):
    notas = {}  # Dicionário para armazenar notas: id -> texto

    # Primeiro, coletar as notas
    try:
        footnotes_part = None
        for rel in doc.part.rels.values():
            if rel.reltype == RT.FOOTNOTES:
                footnotes_part = rel.target_part
                break
        if footnotes_part:
            footnotes_xml = parse_xml(footnotes_part.blob)
            footnote_elements = footnotes_xml.findall('.//w:footnote', namespaces={'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'})
            for footnote in footnote_elements:
                footnote_id = footnote.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}id')
                if footnote_id and footnote_id != '-1' and footnote_id != '0':  # Ignorar separadores
                    paragraphs = footnote.findall('.//w:p', namespaces={'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'})
                    texto_nota = ''
                    for p in paragraphs:
                        texto_p = ''.join(t.text for t in p.findall('.//w:t', namespaces={'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}) if t.text)
                        if texto_p:
                            texto_nota += texto_p + ' '
                    texto_nota = texto_nota.strip()
                    if texto_nota:
                        notas[footnote_id] = texto_nota
    except Exception as e:
        print(f"Erro ao acessar notas de rodapé: {e}")

    for paragrafo in doc.paragraphs:
        texto = paragrafo.text.strip()
        if not texto:
            continue

        # Substituir referências de footnote [1] por <sup class="nota1">[1]</sup>
        for nota_id in notas:
            texto = re.sub(r'\[' + re.escape(nota_id) + r'\]', f'<sup class="nota{nota_id}" id="idnota{nota_id}">[{nota_id}]</sup>', texto)

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

    # Escrever seção de notas se houver
    if notas:
        stream_saida.write('<span id="nR">Notas de Rodapé:</span>\n<div class="rodape">\n')
        for nota_id, texto in notas.items():
            # Aplica destaque a conteúdo entre parênteses
            texto_formatado = re.sub(r"\((.*?)\)", r"<span class='inc'>(\1)</span>", texto)
            stream_saida.write(f'<p id="nota{nota_id}">{texto_formatado}</p>\n')
        stream_saida.write('</div>\n')

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
