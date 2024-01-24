module.exports = {
  disableEmoji: false,
  format: "{type}{scope}: {emoji}{subject}",
  list: [
    "test",
    "feat",
    "fix",
    "chore",
    "docs",
    "refactor",
    "style",
    "ci",
    "perf",
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    "type",
    "scope",
    "subject",
    "body",
    "breaking",
    "issues",
    "lerna",
  ],
  scopes: [],
  types: {
    chore: {
      description: "Mudanças no processo de build ou ferramentas auxiliares",
      emoji: "🤖",
      value: "chore",
    },
    ci: {
      description: "Mudanças relacionadas à CI (Integração Contínua)",
      emoji: "🎡",
      value: "ci",
    },
    docs: {
      description: "Apenas mudanças na documentação",
      emoji: "✏️",
      value: "docs",
    },
    feat: {
      description: "Uma nova funcionalidade",
      emoji: "🎸",
      value: "feat",
    },
    fix: {
      description: "Correção de um bug",
      emoji: "🐛",
      value: "fix",
    },
    perf: {
      description: "Uma mudança de código que melhora o desempenho",
      emoji: "⚡️",
      value: "perf",
    },
    refactor: {
      description:
        "Uma mudança de código que não corrige um bug ou adiciona uma funcionalidade",
      emoji: "💡",
      value: "refactor",
    },
    release: {
      description: "Criar um commit de lançamento",
      emoji: "🏹",
      value: "release",
    },
    style: {
      description:
        "Marcação, espaços em branco, formatação, ponto e vírgula ausente...",
      emoji: "💄",
      value: "style",
    },
    test: {
      description: "Adição de testes ausentes",
      emoji: "💍",
      value: "test",
    },
    messages: {
      type: "Selecione o tipo de mudança que você está commitando:",
      customScope: "Selecione o escopo que essa alteração afeta:",
      subject: "Escreva uma descrição curta e imperativa da mudança:\n",
      body: "Forneça uma descrição mais longa da mudança:\n ",
      breaking:
        "Liste quaisquer mudanças que possam quebrar a compatibilidade:\n",
      footer: "Issues que esse commit resolve, por exemplo, #123:",
      confirmCommit: "Os pacotes que este commit afetou\n",
    },
  },
};
