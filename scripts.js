const Modal = {
  open() {
    //Abrir modal
    //Adicionar a class active ao modal
    document.querySelector(".modal-overlay").classList.add("active");
    // alert("abri o modal");
  },
  close() {
    //Fechar o modal
    //Remover a class active do modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    description: "Luz",
    amount: -50010,
    date: "23/01/2022",
  },
  {
    description: "Website",
    amount: 600007,
    date: "23/01/2022",
  },
  {
    description: "Internet",
    amount: -20000,
    date: "23/01/2022",
  },
  {
    description: "App",
    amount: 20000,
    date: "23/01/2022",
  },
];

const Transaction = {
  all: transactions,

  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    App.reload();
  },
  // Eu preciso somar as entradas
  // depois eu preciso somar as saídas e
  // remover das entradas o valor das saídas.
  // Assim eu terei o valor total
  incomes() {
    let income = 0;
    // pegar todas as transacoes
    // para cada transacao
    Transaction.all.forEach((transaction) => {
      // se ela for maior que zero
      if (transaction.amount > 0) {
        // somar a uma variavel e retornar a variavel
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;
    // pegar todas as transacoes
    // para cada transacao
    Transaction.all.forEach((transaction) => {
      // se ela for maior que zero
      if (transaction.amount < 0) {
        // somar a uma variavel e retornar a variavel
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    // é incomes + expenses porque
    // ja temos o sinal de negativo
    return Transaction.incomes() + Transaction.expenses();
  },
};

// Eu preciso substituir os dados do HTML
// com os dados do JS as minhas transações do meu
const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);
    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = /*html*/ `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="assets/minus.svg" alt="Remover transação" />
        </td>
        </tr>
    `;
    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    // = Usando expressão regular no replace (RegEx)
    // converte value em String e tudo que não
    // é numero (RegEx), troque por nada, ou seja,
    // tira o sinal
    value = String(value).replace(/\D/g, "");

    // coloca virgula
    value = Number(value) / 100;

    // transforma em moeda - reais
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};
App.init();

Transaction.remove(2);
