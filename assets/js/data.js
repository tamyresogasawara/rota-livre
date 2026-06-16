/* Rota Livre — mock data
 * Fonte única de rotas e viajantes consumida por todas as páginas.
 * Imagens via Unsplash (CDN). Conteúdo fictício mas consistente.
 */
(function () {
  const PHOTO = (id, w = 1200) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

  const travelers = [
    {
      id: "joana-prado",
      name: "Joana Prado",
      city: "Curitiba, PR",
      bio: "Geógrafa, caminhante de trilhas longas. Acredita que toda rota começa com uma boa conversa em um café de cidade pequena.",
      avatar: PHOTO("photo-1544005313-94ddf0286df2", 400),
      stats: { routes: 12, regions: 8, followers: 482 },
      badges: ["Pioneira do Cerrado", "10+ rotas", "Mentora"],
      routes: ["chapada-diamantina-vale-pati", "jalapao-7-dias", "serra-cipo-cachoeiras"]
    },
    {
      id: "hideo-tanaka",
      name: "Hideo Tanaka",
      city: "São Paulo, SP",
      bio: "Cicloviajante. Documenta rotas de bicicleta entre cidades históricas. Cozinha em qualquer lugar com um fogareiro.",
      avatar: PHOTO("photo-1500648767791-00dcc994a43e", 400),
      stats: { routes: 9, regions: 5, followers: 311 },
      badges: ["Sobre rodas", "Cronista"],
      routes: ["caminho-ouro-paraty", "aparados-serra-bike"]
    },
    {
      id: "marina-coelho",
      name: "Marina Coelho",
      city: "Salvador, BA",
      bio: "Antropóloga e cozinheira amadora. Anda atrás de festas populares, mercados e mestres de tradição oral.",
      avatar: PHOTO("photo-1531123897727-8f129e1688ce", 400),
      stats: { routes: 7, regions: 4, followers: 268 },
      badges: ["Festas e mercados", "Voz local"],
      routes: ["sao-luis-lencois", "recife-olinda-mestres"]
    },
    {
      id: "rafa-mendes",
      name: "Rafa Mendes",
      city: "Florianópolis, SC",
      bio: "Fotógrafo, surfista e pai de cachorro. Costuma sair de moto procurando ondas e estradas vazias.",
      avatar: PHOTO("photo-1502685104226-ee32379fefbe", 400),
      stats: { routes: 11, regions: 6, followers: 540 },
      badges: ["Sobre duas rodas", "Foto autoral"],
      routes: ["aparados-serra-bike", "rota-litoral-sul"]
    },
    {
      id: "ana-vidal",
      name: "Ana Vidal",
      city: "Belo Horizonte, MG",
      bio: "Bióloga, observadora de aves. Costuma planejar rotas que começam antes do nascer do sol.",
      avatar: PHOTO("photo-1487412720507-e7ab37603c6f", 400),
      stats: { routes: 6, regions: 3, followers: 197 },
      badges: ["Observadora", "Madrugadora"],
      routes: ["serra-cipo-cachoeiras", "serras-mineiras"]
    },
    {
      id: "diego-souza",
      name: "Diego Souza",
      city: "Manaus, AM",
      bio: "Guia de rio, nasceu ouvindo histórias de comunidades ribeirinhas. Acredita em viagens sem pressa.",
      avatar: PHOTO("photo-1492562080023-ab3db95bfbce", 400),
      stats: { routes: 8, regions: 2, followers: 412 },
      badges: ["Águas profundas", "Guia local"],
      routes: ["rio-negro-comunidades", "amazonia-rotas-d-agua"]
    }
  ];

  const routes = [
    {
      id: "chapada-diamantina-vale-pati",
      title: "Vale do Pati: seis dias entre serras",
      region: "Nordeste",
      state: "BA",
      summary: "Considerada uma das travessias mais bonitas do Brasil, atravessa fazendas centenárias, cachoeiras escondidas e morros tabulares.",
      hero: PHOTO("photo-1518684079-3c830dcef090"),
      gallery: [
        PHOTO("photo-1518684079-3c830dcef090"),
        PHOTO("photo-1469474968028-56623f02e42e"),
        PHOTO("photo-1501785888041-af3ef285b470"),
        PHOTO("photo-1464822759023-fed622ff2c3b")
      ],
      duration: "6 dias",
      durationBucket: "long",
      cost: "R$ 1.200 — R$ 1.800",
      difficulty: "Avançado",
      bestSeason: "Abril a outubro",
      tags: ["trekking", "cachoeira", "montanha"],
      author: "joana-prado",
      date: "2025-07-12",
      likes: 184,
      itinerary: [
        { day: 1, title: "Guiné → Cachoeirão", body: "Descida íngreme ao Cachoeirão. Banho e dormida em casa de morador." },
        { day: 2, title: "Cachoeirão → Ruinha", body: "Travessia de planalto, paisagem aberta. Almoço em fazenda histórica." },
        { day: 3, title: "Ruinha → Calçada do Império", body: "Trecho técnico em pedras seculares. Vista para o Vale." },
        { day: 4, title: "Calçada → Castelo", body: "Subida ao mirante do Castelo. Pernoite em casa rural." },
        { day: 5, title: "Castelo → Andaraí", body: "Descida longa por trilha úmida. Banho em rio." },
        { day: 6, title: "Volta a Lençóis", body: "Transfer terrestre e descanso." }
      ],
      tips: [
        "Leve mochila com até 12 kg — você carrega tudo.",
        "Bota com tornozeleira: muitos trechos de pedra solta.",
        "Reserve casas de moradores com antecedência via guia local."
      ]
    },
    {
      id: "jalapao-7-dias",
      title: "Jalapão em sete dias: dunas, fervedouros e cerrado",
      region: "Centro-Oeste",
      state: "TO",
      summary: "Roteiro que combina aventura 4x4 com mergulhos em fervedouros cristalinos e dunas alaranjadas no fim de tarde.",
      hero: PHOTO("photo-1494783367193-149034c05e8f"),
      gallery: [
        PHOTO("photo-1494783367193-149034c05e8f"),
        PHOTO("photo-1500530855697-b586d89ba3ee"),
        PHOTO("photo-1502691876148-a84978e59af8")
      ],
      duration: "7 dias",
      durationBucket: "long",
      cost: "R$ 2.500 — R$ 3.500",
      difficulty: "Intermediário",
      bestSeason: "Maio a setembro",
      tags: ["4x4", "deserto", "águas"],
      author: "joana-prado",
      date: "2025-05-20",
      likes: 221,
      itinerary: [
        { day: 1, title: "Palmas → Mateiros", body: "Estrada de terra. Pernoite em pousada simples." },
        { day: 2, title: "Dunas + Fervedouro do Ceiça", body: "Pôr do sol nas dunas." },
        { day: 3, title: "Cachoeira da Velha + Formiga", body: "Águas verde-azuladas." },
        { day: 4, title: "Pedra Furada + Soninho", body: "Dia inteiro de fervedouros." },
        { day: 5, title: "Comunidade Mumbuca", body: "Visita a artesãs do capim dourado." },
        { day: 6, title: "Serra do Espírito Santo", body: "Mirantes e fim de tarde." },
        { day: 7, title: "Retorno a Palmas", body: "Estrada longa, leve playlist." }
      ],
      tips: [
        "Combine motorista 4x4 local — economiza e gera renda na região.",
        "Capim dourado: compre direto das artesãs em Mumbuca.",
        "Maio e junho têm clima mais ameno."
      ]
    },
    {
      id: "serra-cipo-cachoeiras",
      title: "Serra do Cipó em três dias de cachoeiras",
      region: "Sudeste",
      state: "MG",
      summary: "Trilhas curtas para quem tem fim de semana prolongado e quer encarar quedas d'água sem precisar de guia.",
      hero: PHOTO("photo-1441260038675-7329ab4cc264"),
      gallery: [
        PHOTO("photo-1441260038675-7329ab4cc264"),
        PHOTO("photo-1470770841072-f978cf4d019e"),
        PHOTO("photo-1501785888041-af3ef285b470")
      ],
      duration: "3 dias",
      durationBucket: "short",
      cost: "R$ 600 — R$ 900",
      difficulty: "Iniciante",
      bestSeason: "Abril a setembro",
      tags: ["cachoeira", "fim de semana", "leve"],
      author: "ana-vidal",
      date: "2025-08-03",
      likes: 142,
      itinerary: [
        { day: 1, title: "BH → Cipó + Cachoeira da Farofa", body: "Trilha de 6 km dentro do parque." },
        { day: 2, title: "Cânion das Bandeirinhas", body: "Trekking moderado, almoço de marmita." },
        { day: 3, title: "Cachoeira do Tombadouro", body: "Trilha curta e volta para a capital." }
      ],
      tips: [
        "Entre cedo no parque: filas crescem rápido.",
        "Repelente é essencial."
      ]
    },
    {
      id: "caminho-ouro-paraty",
      title: "Caminho do Ouro: de Paraty à Cunha de bicicleta",
      region: "Sudeste",
      state: "RJ/SP",
      summary: "Subida histórica por pedras seculares, atravessando matas atlânticas até chegar à cidade ceramista de Cunha.",
      hero: PHOTO("photo-1469854523086-cc02fe5d8800"),
      gallery: [
        PHOTO("photo-1469854523086-cc02fe5d8800"),
        PHOTO("photo-1504280390367-361c6d9f38f4"),
        PHOTO("photo-1473773508845-188df298d2d1")
      ],
      duration: "4 dias",
      durationBucket: "medium",
      cost: "R$ 900 — R$ 1.300",
      difficulty: "Avançado",
      bestSeason: "Maio a agosto",
      tags: ["bike", "histórico", "atlântica"],
      author: "hideo-tanaka",
      date: "2025-06-18",
      likes: 167,
      itinerary: [
        { day: 1, title: "Paraty → Penha", body: "Ajuste de bike e ciclo de aclimatação." },
        { day: 2, title: "Início da subida", body: "Pedras seculares do caminho colonial." },
        { day: 3, title: "Topo da serra", body: "Pernoite em pousada rural." },
        { day: 4, title: "Cunha + visitas a ceramistas", body: "Descida tranquila para a cidade." }
      ],
      tips: [
        "Bike com pneus 2.2'' ou mais largos.",
        "Tem trecho que se anda empurrando — não desanime."
      ]
    },
    {
      id: "aparados-serra-bike",
      title: "Aparados da Serra em moto: cânions do sul",
      region: "Sul",
      state: "RS/SC",
      summary: "Roteiro de moto pelos cânions de Itaimbezinho e Fortaleza, com paradas em vinícolas e queijarias da serra.",
      hero: PHOTO("photo-1464822759023-fed622ff2c3b"),
      gallery: [
        PHOTO("photo-1464822759023-fed622ff2c3b"),
        PHOTO("photo-1493673272479-a20888bcee10"),
        PHOTO("photo-1469474968028-56623f02e42e")
      ],
      duration: "5 dias",
      durationBucket: "medium",
      cost: "R$ 1.800 — R$ 2.500",
      difficulty: "Intermediário",
      bestSeason: "Setembro a maio",
      tags: ["moto", "cânion", "estrada"],
      author: "rafa-mendes",
      date: "2025-09-14",
      likes: 203,
      itinerary: [
        { day: 1, title: "Porto Alegre → Cambará do Sul", body: "Subida de serra. Pernoite em pousada de campo." },
        { day: 2, title: "Itaimbezinho", body: "Trilha do vértice e fotos no abismo." },
        { day: 3, title: "Fortaleza", body: "Cânion mais largo do Brasil." },
        { day: 4, title: "Praia Grande → Urubici", body: "Estrada cênica, queijarias." },
        { day: 5, title: "Volta", body: "Café final em São Joaquim." }
      ],
      tips: [
        "Cuidado com névoa no topo dos cânions.",
        "Reserve a trilha do vértice com antecedência."
      ]
    },
    {
      id: "sao-luis-lencois",
      title: "De São Luís a Lençóis Maranhenses: cultura + dunas",
      region: "Nordeste",
      state: "MA",
      summary: "Mistura centro histórico, reggae maranhense e travessia das dunas com pernoites em comunidades.",
      hero: PHOTO("photo-1518509562904-e7ef99cddc85"),
      gallery: [
        PHOTO("photo-1518509562904-e7ef99cddc85"),
        PHOTO("photo-1500530855697-b586d89ba3ee"),
        PHOTO("photo-1502691876148-a84978e59af8")
      ],
      duration: "8 dias",
      durationBucket: "long",
      cost: "R$ 2.200 — R$ 3.200",
      difficulty: "Intermediário",
      bestSeason: "Junho a setembro",
      tags: ["cultural", "dunas", "comunidade"],
      author: "marina-coelho",
      date: "2025-07-30",
      likes: 178,
      itinerary: [
        { day: 1, title: "São Luís histórica", body: "Caminhada pelo centro tombado." },
        { day: 2, title: "Alcântara", body: "Travessia de barco, almoço de peixe." },
        { day: 3, title: "Barreirinhas", body: "Entrada nos Lençóis." },
        { day: 4, title: "Atins", body: "Pernoite no vilarejo." },
        { day: 5, title: "Travessia leste", body: "Quatro dias de caminhada com mochila apoio." }
      ],
      tips: [
        "Calçado leve e meia técnica — você vai entrar muito na água.",
        "Vá entre julho e setembro para encontrar as lagoas cheias."
      ]
    },
    {
      id: "recife-olinda-mestres",
      title: "Recife e Olinda pelos mestres do frevo",
      region: "Nordeste",
      state: "PE",
      summary: "Roteiro urbano de 4 dias com aulas, ensaios abertos e botecos: o coração pernambucano em primeira pessoa.",
      hero: PHOTO("photo-1531123897727-8f129e1688ce"),
      gallery: [
        PHOTO("photo-1531123897727-8f129e1688ce"),
        PHOTO("photo-1505761671935-60b3a7427bad")
      ],
      duration: "4 dias",
      durationBucket: "medium",
      cost: "R$ 1.100 — R$ 1.600",
      difficulty: "Iniciante",
      bestSeason: "Janeiro a março",
      tags: ["cultural", "urbano", "música"],
      author: "marina-coelho",
      date: "2025-02-08",
      likes: 132,
      itinerary: [
        { day: 1, title: "Recife Antigo", body: "Caminhada noturna pelos cais." },
        { day: 2, title: "Olinda", body: "Ensaio do bloco e visita a ateliê de bonecos gigantes." },
        { day: 3, title: "Aula de frevo", body: "Sombrinha, sapato apropriado e fôlego." },
        { day: 4, title: "Mercado de São José", body: "Compras e despedida." }
      ],
      tips: [
        "Vá entre janeiro e março para pegar ensaios.",
        "Compre sombrinha de frevo direto com mestre artesão."
      ]
    },
    {
      id: "rio-negro-comunidades",
      title: "Rio Negro: cinco dias entre comunidades ribeirinhas",
      region: "Norte",
      state: "AM",
      summary: "Barco lento, redes na proa e visita a três comunidades. Sem pressa, sem hotel, sem sinal.",
      hero: PHOTO("photo-1426604966848-d7adac402bff"),
      gallery: [
        PHOTO("photo-1426604966848-d7adac402bff"),
        PHOTO("photo-1500530855697-b586d89ba3ee"),
        PHOTO("photo-1473773508845-188df298d2d1")
      ],
      duration: "5 dias",
      durationBucket: "medium",
      cost: "R$ 1.600 — R$ 2.300",
      difficulty: "Intermediário",
      bestSeason: "Julho a novembro",
      tags: ["rio", "comunidade", "amazônia"],
      author: "diego-souza",
      date: "2025-08-22",
      likes: 156,
      itinerary: [
        { day: 1, title: "Manaus → Novo Airão", body: "Embarque em barco regional." },
        { day: 2, title: "Anavilhanas", body: "Trilha curta na floresta inundada." },
        { day: 3, title: "Comunidade Tumbira", body: "Almoço comunitário e roda de conversa." },
        { day: 4, title: "Pesca tradicional", body: "Aprendizado com pescadores locais." },
        { day: 5, title: "Volta a Manaus", body: "Banho de igarapé antes do retorno." }
      ],
      tips: [
        "Leve rede + mosquiteiro próprio.",
        "Combine a viagem com a comunidade — não chegue sem aviso."
      ]
    },
    {
      id: "serras-mineiras",
      title: "Três serras mineiras em um fim de semana",
      region: "Sudeste",
      state: "MG",
      summary: "Roteiro de carro próprio passando por São Thomé das Letras, Carrancas e Aiuruoca: cachoeiras e céu estrelado.",
      hero: PHOTO("photo-1470770841072-f978cf4d019e"),
      gallery: [
        PHOTO("photo-1470770841072-f978cf4d019e"),
        PHOTO("photo-1441260038675-7329ab4cc264")
      ],
      duration: "3 dias",
      durationBucket: "short",
      cost: "R$ 700 — R$ 1.000",
      difficulty: "Iniciante",
      bestSeason: "Maio a setembro",
      tags: ["carro", "cachoeira", "fim de semana"],
      author: "ana-vidal",
      date: "2025-06-04",
      likes: 98,
      itinerary: [
        { day: 1, title: "São Thomé das Letras", body: "Cachoeira do Flávio e mirantes." },
        { day: 2, title: "Carrancas", body: "Trilha das três cachoeiras." },
        { day: 3, title: "Aiuruoca", body: "Vale do Matutu, retorno." }
      ],
      tips: [
        "Estradas de terra: vá com pneu cheio.",
        "Aiuruoca é frio de noite — leve casaco."
      ]
    },
    {
      id: "rota-litoral-sul",
      title: "Litoral sul catarinense: ondas e estradas vazias",
      region: "Sul",
      state: "SC",
      summary: "Cinco praias entre Garopaba e Praia do Rosa, com paradas para surf, peixe fresco e sunsets nas pedras.",
      hero: PHOTO("photo-1507525428034-b723cf961d3e"),
      gallery: [
        PHOTO("photo-1507525428034-b723cf961d3e"),
        PHOTO("photo-1502685104226-ee32379fefbe")
      ],
      duration: "5 dias",
      durationBucket: "medium",
      cost: "R$ 1.300 — R$ 2.000",
      difficulty: "Iniciante",
      bestSeason: "Outubro a abril",
      tags: ["surf", "praia", "estrada"],
      author: "rafa-mendes",
      date: "2025-11-02",
      likes: 119,
      itinerary: [
        { day: 1, title: "Garopaba", body: "Tarde nas pedras." },
        { day: 2, title: "Silveira", body: "Surf ao amanhecer." },
        { day: 3, title: "Ferrugem", body: "Banho longo, peixe à noite." },
        { day: 4, title: "Praia do Rosa", body: "Mirante do farol." },
        { day: 5, title: "Vermelha + retorno", body: "Despedida sem pressa." }
      ],
      tips: [
        "Reserve pousada com antecedência no verão.",
        "Aluguel de prancha sai em conta na Silveira."
      ]
    },
    {
      id: "amazonia-rotas-d-agua",
      title: "Amazônia em três rios: uma rota lenta",
      region: "Norte",
      state: "AM",
      summary: "Roteiro fluvial de doze dias entre Tefé, Mamirauá e Coari. Para quem quer mergulhar fundo no ritmo do rio.",
      hero: PHOTO("photo-1493673272479-a20888bcee10"),
      gallery: [
        PHOTO("photo-1493673272479-a20888bcee10"),
        PHOTO("photo-1426604966848-d7adac402bff")
      ],
      duration: "12 dias",
      durationBucket: "long",
      cost: "R$ 3.500 — R$ 5.000",
      difficulty: "Avançado",
      bestSeason: "Setembro a dezembro",
      tags: ["rio", "imersão", "comunidade"],
      author: "diego-souza",
      date: "2025-10-18",
      likes: 211,
      itinerary: [
        { day: 1, title: "Manaus → Tefé", body: "Voo regional ou barco lento." },
        { day: 2, title: "Mamirauá", body: "Pousada flutuante." },
        { day: 3, title: "Observação de mamíferos", body: "Boto-vermelho e peixes-boi." },
        { day: 4, title: "Coari", body: "Pequena cidade ribeirinha." }
      ],
      tips: [
        "Vacinação em dia (febre amarela é obrigatória).",
        "Aceite o ritmo do rio: tudo demora."
      ]
    }
  ];

  window.RL = {
    routes,
    travelers,
    getRoute: (id) => routes.find((r) => r.id === id),
    getTraveler: (id) => travelers.find((t) => t.id === id),
    userRoutes() {
      try {
        return JSON.parse(localStorage.getItem("rotaLivre.userRoutes") || "[]");
      } catch (_e) {
        return [];
      }
    },
    allRoutes() {
      return [...this.userRoutes(), ...routes];
    }
  };
})();
