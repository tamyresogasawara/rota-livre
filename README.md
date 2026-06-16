# Rota Livre

> Plataforma colaborativa de relatos e rotas de turismo independente no Brasil.

Projeto desenvolvido para a **atividade substitutiva — Global Solutions** (FIAP).

---

## Identificação

- **RM:** _preencher_
- **Nome completo:** _preencher_
- **Link do site publicado:** _preencher após publicar no GitHub Pages, ex.: `https://<usuario>.github.io/rota-livre/`_

---

## O que é

Rota Livre é uma comunidade digital onde viajantes brasileiros publicam **rotas autorais**, **itinerários dia a dia**, **dicas reais** e **fotos** de destinos fora do circuito turístico convencional. O foco é o turismo independente: trekking, cicloviagens, viagens fluviais, roteiros culturais.

### Para quem serve

- Pessoas que viajam sozinhas, em pequenos grupos ou com a família e querem fugir do "pacote pronto".
- Viajantes experientes que querem compartilhar conhecimento e apoiar comunidades locais.
- Iniciantes em busca de roteiros testados e descritos por quem realmente fez.

### Qual problema resolve

Sites de turismo tradicionais privilegiam destinos comerciais e conteúdo patrocinado. Faltam fontes confiáveis, autorais e bem organizadas sobre roteiros independentes. Rota Livre centraliza esses relatos em um espaço com identidade visual coerente, busca, filtros e perfis de viajantes.

---

## Justificativa do tema

A proposta da atividade sugere "plataforma de relatos e rotas de viagem para turismo independente" como uma das inspirações. O tema foi escolhido por três razões:

1. **Relevância**: o turismo independente cresceu fortemente no pós-pandemia e ainda carece de plataformas curadas.
2. **Riqueza visual**: tema permite explorar fotografia de paisagem e tipografia editorial, beneficiando a hierarquia da informação.
3. **Espaço para interatividade**: busca, filtros, favoritos, formulário de publicação e perfis exercitam todos os recursos avaliados (HTML, CSS, JavaScript e acessibilidade).

---

## Decisões de design

### Identidade visual
- **Paleta** _earthy/adventurous_: terracota (`#B5532A`), verde-mata (`#3F6B3A`), off-white areia (`#FAF7F2`), tinta (`#1F2421`). Evoca natureza, caminhos de terra e materiais orgânicos.
- **Logo** tipográfico simples (R + nome), encaixado em selo gradiente terracota → verde.
- **Modo escuro** opcional, respeitando `prefers-color-scheme`.

### Tipografia
- **Fraunces** (display, serifada) para títulos: traz personalidade editorial, sensação de revista de viagem.
- **Inter** (sans-serif) para corpo: alta legibilidade em qualquer tamanho.

### Hierarquia e layout
- Grid de 12 colunas via container `max-width: 1180px`.
- Cards de rota com **media 4:3**, região em maiúsculas, título serifado e metadados secundários menores.
- Heros com overlay escuro garantem contraste das chamadas brancas sobre fotografia.

### Navegação
- Header fixo com link ativo destacado (`aria-current="page"`).
- Menu mobile com `aria-expanded` controlado por JS.
- Breadcrumbs nas páginas internas.
- Footer com links repetidos para reforçar navegação por teclado.

---

## Recursos de acessibilidade

- `lang="pt-BR"`, hierarquia de headings consistente, landmarks (`header`, `nav`, `main`, `footer`).
- **Skip link** "Pular para o conteúdo".
- `:focus-visible` realçado em todo elemento interativo.
- `alt` em todas as imagens informativas; `alt=""` nas decorativas.
- Botões só-ícone com `aria-label`.
- Formulários com `<label>` associado, mensagens de erro vinculadas via `aria-describedby` e `role="alert"`.
- Carrossel suporta navegação por teclado (`←`/`→`) com `aria-roledescription="carrossel"`.
- `@media (prefers-reduced-motion: reduce)` desativa transições.
- Contraste mínimo 4.5:1 no corpo (paleta projetada).

---

## Estrutura do projeto

```
.
├── index.html              # Home
├── explorar.html           # Listagem de rotas + filtros
├── rota.html               # Detalhe (lê ?id=)
├── compartilhar.html       # Formulário de novo relato
├── comunidade.html         # Viajantes
├── perfil.html             # Perfil individual (lê ?user=)
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── data.js         # Mock de rotas e viajantes
│   │   ├── main.js         # Header, tema, toast, favoritos, follows
│   │   ├── home.js
│   │   ├── explorar.js
│   │   ├── rota.js
│   │   ├── compartilhar.js
│   │   └── comunidade.js
│   └── img/                # (livre para uso futuro)
├── README.md
└── .nojekyll
```

---

## Stack

- **HTML5 semântico** + **CSS** (tokens via `:root`, sem build).
- **Tailwind CSS** via CDN para utilitários eventuais.
- **JavaScript** vanilla (módulos IIFE, sem bundler).
- **Lucide icons** via CDN.
- **Google Fonts**: Fraunces + Inter.
- **Persistência**: `localStorage` (favoritos, relatos criados, seguir) — sem backend.

---

## Como rodar localmente

Como é um site 100% estático, basta abrir `index.html` no navegador. Para evitar restrições de `file://` (recomendado):

```bash
# Python
python3 -m http.server 8000
# ou Node
npx serve .
```

Acesse `http://localhost:8000`.

---

## Publicação no GitHub Pages

1. Criar repositório público (sugestão: `rota-livre`).
2. Subir o projeto:
   ```bash
   git init
   git add .
   git commit -m "feat: site Rota Livre"
   git branch -M main
   git remote add origin <url-do-repo>
   git push -u origin main
   ```
3. **Settings → Pages** → Source: `Deploy from branch` → Branch `main` / pasta `/` (root).
4. Aguardar publicação (~1 min). O arquivo `.nojekyll` garante que assets sejam servidos.

---

## Conteúdo fictício

Todos os relatos, viajantes, fotos e estatísticas são fictícios. Imagens são do **Unsplash** sob licença gratuita; ícones de **Lucide** (ISC).

---

## Critérios de avaliação atendidos

| Critério | Onde encontrar |
|---|---|
| Clareza e criatividade na proposta | Home + texto institucional + identidade do nome "Rota Livre". |
| Qualidade do design visual e hierarquia | Sistema de tokens em `styles.css`, tipografia dupla, heros editoriais. |
| Navegação, interatividade e UX | Filtros e busca em `explorar`, carrossel em `rota`, formulário validado em `compartilhar`, favoritos persistentes. |
| Funcionalidade e publicação no GitHub | Site estático sem build, instruções acima. |
| Coerência conceito ↔ execução | Paleta terrosa, fotografias naturais, copy de viajante independente em toda a UI. |
| Recursos de acessibilidade | Seção acima dedicada ao tema. |

---

Feito com café e mochila nas costas.
