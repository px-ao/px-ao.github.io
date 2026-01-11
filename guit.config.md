# Footnote Overlay Behavior

## Triggering Notes
- Cada referência dentro do corpo do texto usa `<sup class="notaX">[...]</sup>`, onde `X` corresponde ao identificador da nota em `#notaX` no rodapé.
- Os `sup` possuem comportamento de botão (clique ou teclado) e disparam o painel quando acionados.

## Busca do Conteúdo
- O script lê as classes dos `sup` para descobrir qual ID (`#nota1`, `#nota2`, etc.) deve ser carregado.
- O HTML interno do parágrafo correspondente é injetado em `[data-footnote-content]` sem alterar a marcação original.

## Exibição
- A caixa suspensa é o elemento `.footnote-overlay`, fixo ao final da tela.
- Quando ativa recebe a classe `is-active`, permitindo transição (slide + fade) e liberando interação.
- Possui botão de fechar com `data-footnote-close`, suporte a clique fora do painel e tecla `Esc` para encerrar.

## Acessibilidade
- Os `sup` recebem `role="button"` e `tabindex="0"` para navegação por teclado.
- Ao abrir uma nota, o foco é enviado ao botão de fechar para manter a navegação no painel.
- O container usa `aria-hidden` para sinalizar se está visível, e o script atualiza esse valor dinamicamente.