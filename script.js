const apiUrl = "https://dragonball-api.com/api/characters?limit=100";
const container = document.getElementById("cards");
const campoBusca = document.getElementById("busca");
const contador = document.getElementById("contador");

let personagens = [];

function normalizar(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const nomesPT = {
  "master roshi": "Mestre Kame",
  "krillin": "Kuririn",
  "freezer": "Freeza",
  "celula": "Cell",
  "launch": "Lunch",
  "majin buu": "Majin Boo",
  "android 13": "Androide 13",
  "android 14": "Androide 14",
  "android 15": "Androide 15",
  "android 16": "Androide 16",
  "android 17": "Androide 17",
  "android 18": "Androide 18",
  "android 19": "Androide 19",
  "android 20 (dr. gero)": "Androide 20 (Dr. Gero)",
  "kibito-shin": "Kibito Kai",
  "vermoudh": "Belmod",
  "marcarita": "Marcarita",
  "grand priest": "Grande Sacerdote",
  "kaio del norte (kaito)": "Kaioh do Norte (Kaito)",
  "kaio del sur": "Kaioh do Sul",
  "kaio del este": "Kaioh do Leste",
  "kaio del oeste": "Kaioh do Oeste",
  "gran kaio": "Grande Kaioh",
  "kaio-shin del este": "Kaioshin do Leste",
  "kaio-shin del norte": "Kaioshin do Norte",
  "kaio-shin del sur": "Kaioshin do Sul",
  "kaio-shin del oeste": "Kaioshin do Oeste",
  "gran kaio-shin": "Grande Kaioshin"
};

const termosPT = {
  "Saiyan": "Saiyajin",
  "Human": "Humano",
  "Namekian": "Namekuseijin",
  "Android": "Androide",
  "Frieza Race": "Raça de Freeza",
  "Army of Frieza": "Exército de Freeza",
  "Z Fighter": "Guerreiro Z",
  "Freelancer": "Autônomo",
  "Villain": "Vilão",
  "Other": "Outros",
  "Majin": "Majin",
  "God": "Deus",
  "Angel": "Anjo",
  "Unknown": "Desconhecida",
  "Jiren Race": "Raça de Jiren",
  "Evil": "Maligno",
  "Nucleico": "Núcleo",
  "Nucleico benigno": "Núcleo benigno",
  "Assistant of Beerus": "Assistente de Bills",
  "Assistant of Vermoud": "Assistente de Vermoud",
  "Pride Troopers": "Tropas do Orgulho"
};

const escalasKi = {
  "million": "milhões",
  "billion": "bilhões",
  "trillion": "trilhões",
  "quadrillion": "quatrilhões",
  "quintillion": "quintilhões",
  "sextillion": "sextilhões",
  "septillion": "septilhões",
  "googolplex": "googolplex"
};

const descricoesPT = {
  "goku": "Protagonista da série, um Saiyajin criado na Terra. Conhecido pelo grande poder e pela personalidade amigável.",
  "vegeta": "Príncipe dos Saiyajins. Começa como vilão, mas acaba se unindo aos Guerreiros Z.",
  "piccolo": "Namekuseijin nascido nos últimos momentos de vida do pai. Torna-se aliado e mentor de Gohan.",
  "bulma": "Cientista genial e criadora do radar do dragão. Amiga de Goku e esposa de Vegeta.",
  "freezer": "Tirano espacial e principal vilão da saga de Freeza.",
  "zarbon": "Um dos subordinados de Freeza e lutador poderoso.",
  "dodoria": "Capanga de Freeza, conhecido pela brutalidade.",
  "ginyu": "Líder das Forças Especiais Ginyu, a elite de mercenários de Freeza.",
  "celula": "Androide criado pelo Dr. Gero a partir das células dos maiores lutadores.",
  "gohan": "Filho de Goku e Chi-Chi, meio Saiyajin com um potencial enorme.",
  "krillin": "Melhor amigo de Goku e guerreiro corajoso. Um dos mais importantes Guerreiros Z.",
  "tenshinhan": "Mestre das artes marciais e membro dos Guerreiros Z.",
  "yamcha": "Ex-bandido do deserto que se tornou lutador e amigo de Goku.",
  "chi-chi": "Esposa de Goku, mãe de Gohan e filha do Rei Fry-pan.",
  "gotenks": "Fusão de Goten e Trunks, feita com a dança da fusão.",
  "trunks": "Filho de Vegeta e Bulma, meio Saiyajin e meio humano.",
  "master roshi": "Mestre das artes marciais e mentor de Goku e Kuririn. Vive na Casa do Kame.",
  "bardock": "Saiyajin de classe baixa e pai de Goku.",
  "launch": "Personagem que muda de personalidade toda vez que espirra.",
  "mr. satan": "Lutador humano famoso por levar o crédito pelas vitórias dos Guerreiros Z.",
  "dende": "Namekuseijin que sucedeu Kami como protetor da Terra.",
  "android 17": "Irmão gêmeo da Androide 18. Era humano antes de ser transformado pelo Dr. Gero.",
  "android 16": "Androide gigante conhecido pelo amor à natureza e à vida.",
  "android 19": "Androide criado pelo Dr. Gero, capaz de absorver energia.",
  "android 20 (dr. gero)": "Cientista louco que criou os androides 17, 18 e 19.",
  "android 13": "Androide perigoso que aparece em um filme da série.",
  "android 14": "Outro androide que aparece no mesmo filme do Androide 13.",
  "android 15": "Outro androide que aparece no mesmo filme do Androide 13.",
  "nail": "Namekuseijin guerreiro que se fundiu com Piccolo para enfrentar Freeza.",
  "raditz": "Irmão mais velho de Goku e um dos poucos Saiyajins que sobreviveram.",
  "babidi": "Mago maligno que controlou Majin Boo e tentou dominar o universo.",
  "majin buu": "Criatura mágica criada por Bibidi, conhecida na forma pura como Boo.",
  "bills": "Deus da Destruição do Universo 7, conhecido por ser temperamental e gostar de comida.",
  "whis": "Anjo que serve de mestre e assistente de Bills.",
  "zeno": "Ser supremo do multiverso, também conhecido como Rei de Tudo.",
  "kibito-shin": "Fusão de Shin e Kibito, feita por meio dos brincos Potara.",
  "jiren": "Poderoso lutador do Universo 11 e um dos oponentes mais temidos do torneio.",
  "toppo": "Líder das Tropas do Orgulho e candidato a Deus da Destruição.",
  "dyspo": "Velocista das Tropas do Orgulho do Universo 11.",
  "marcarita": "Anjo que guia o Universo 11 e serve como assistente de Vermoud.",
  "vermoudh": "Deus da Destruição do Universo 11.",
  "grand priest": "Supervisor do torneio e pai dos anjos. Ministro-chefe dos Omni-Reis.",
  "kaio del norte (kaito)": "Divindade responsável por administrar as galáxias do Norte do Universo 7.",
  "android 18": "Irmã gêmea do Androide 17, humana transformada pelo Dr. Gero. Casa-se com Kuririn.",
  "gogeta": "Fusão de Goku e Vegeta, feita com a dança da fusão.",
  "vegetto": "Fusão de Goku e Vegeta, feita com os brincos Potara. Um dos mais poderosos.",
  "janemba": "Demônio criado a partir das ações malignas de um adolescente.",
  "broly": "Saiyajin com um poder gigantesco e incontrolável.",
  "kaio del sur": "Kaioh responsável por administrar o Sul do Outro Mundo.",
  "kaio del este": "Kaioh do Leste, que só aparece no anime. Gosta de treinar seus alunos.",
  "kaio del oeste": "Rival do Kaioh do Norte e responsável pela galáxia do Oeste.",
  "gran kaio": "O Kaioh de maior importância do Outro Mundo, encarregado de administrar os demais.",
  "kaio-shin del este": "Um dos Kaioshins, divindade que cria a vida em todo o Universo 7.",
  "kaio-shin del norte": "Kaioshin que viveu ao lado dos outros Kaioshins e de Dai Kaioshin.",
  "kaio-shin del sur": "Foi o governante do quadrante sul do universo e o mais poderoso dos Kaioshins.",
  "kaio-shin del oeste": "Kaioshin que foi uma das primeiras a morrer na Terra.",
  "gran kaio-shin": "Kaioshin principal do universo, também conhecido como Sagrado Kaioshin.",
  "kibito": "Ajudante e guarda-costas do Kaioshin do Leste. Especialista em combate."
};

// Cria versões dos dicionários com as chaves normalizadas
const nomesNorm = {};
Object.keys(nomesPT).forEach((k) => (nomesNorm[normalizar(k)] = nomesPT[k]));

const descricoesNorm = {};
Object.keys(descricoesPT).forEach((k) => (descricoesNorm[normalizar(k)] = descricoesPT[k]));

const termosNorm = {};
Object.keys(termosPT).forEach((k) => (termosNorm[normalizar(k)] = termosPT[k]));

function traduzir(termo) {
  return termosNorm[normalizar(termo)] || termo;
}

function nomePT(personagem) {
  return nomesNorm[normalizar(personagem.name)] || personagem.name;
}

function descricaoPT(personagem) {
  return descricoesNorm[normalizar(personagem.name)] || personagem.description || "";
}

function kiPT(ki) {
  if (!ki || ki === "0" || normalizar(ki) === "unknown") {
    return "desconhecido";
  }
  // Exemplo: "102 Billion" -> "102 bilhões"
  const partes = String(ki).trim().split(/\s+/);
  if (partes.length === 2) {
    const escala = escalasKi[partes[1].toLowerCase()];
    if (escala) {
      return `${partes[0]} ${escala}`;
    }
  }
  return ki;
}

async function carregarPersonagens() {
  try {
    container.textContent = "Carregando personagens...";
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const dados = await response.json();
    console.log("Dados recebidos:", dados);

    personagens = dados.items;
    mostrarPersonagens(personagens);
  } catch (erro) {
    container.textContent = "Não foi possível carregar os personagens.";
    console.error("Erro ao consumir a API:", erro.message);
  }
}

function mostrarPersonagens(lista) {
  container.innerHTML = "";
  lista.forEach(criarCard);
  contador.textContent = `${lista.length} personagem(ns) encontrado(s)`;
}

function criarCard(personagem) {
  const card = document.createElement("article");
  card.classList.add("card");

  const coracao = document.createElement("button");
  coracao.classList.add("favorito");
  coracao.textContent = "♡";
  coracao.addEventListener("click", () => {
    const ativo = coracao.classList.toggle("ativo");
    coracao.textContent = ativo ? "♥" : "♡";
  });

  const titulo = document.createElement("h2");
  titulo.textContent = nomePT(personagem);

  const img = document.createElement("img");
  img.src = personagem.image;
  img.alt = nomePT(personagem);

  const raca = document.createElement("p");
  raca.textContent = `Raça: ${traduzir(personagem.race)} | ${traduzir(personagem.affiliation)}`;

  const ki = document.createElement("p");
  ki.classList.add("ki");
  ki.textContent = `Ki: ${kiPT(personagem.ki)}`;

  const descricao = document.createElement("p");
  descricao.classList.add("descricao");
  descricao.textContent = descricaoPT(personagem);

  card.appendChild(coracao);
  card.appendChild(titulo);
  card.appendChild(img);
  card.appendChild(raca);
  card.appendChild(ki);
  card.appendChild(descricao);
  container.appendChild(card);
}

campoBusca.addEventListener("input", () => {
  const termo = normalizar(campoBusca.value);
  const filtrados = personagens.filter((p) =>
    normalizar(nomePT(p)).includes(termo) || normalizar(p.name).includes(termo)
  );
  mostrarPersonagens(filtrados);
});

carregarPersonagens();