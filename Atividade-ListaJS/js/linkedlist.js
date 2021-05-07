class LinkedList {

  constructor() {
    // O head inicia por null, sendo a posição inicial de nossa lista
    this.head = null;
    this.length = 0; // O length demonstrará a quantidade de elementos constantes em nossa lista
  }

  append(value) { // Pelo método append adicionamos valores a nossa lista
    let newNode = new Node(value); /* Aqui instanciamos um novo objeto do tipo Node, detendo ele dois atributos
    O content e o next. O valor do content será atribuído na inicialização o do next corresponderá ao próximo elemento da lista*/
    if (!this.head) {/* Não havendo nada na cabeça (head == null) não haverá nada na lista, então na cabeça teremos
      O elemento único e inicial da lista*/
      this.head = newNode;
    } else {/* De modo contrário, havendo algum elemento na lista, devemos encontrar o último elemento e faremos isso
      via método last_Node que retornará o último nó da lista*/
      this._lastNode().next = newNode;
    }/* Ao encontrar o último nó, basta que façamos a ligação com o nó a ser inserido, incluindo este no atributo next
    daquele */
    this.length++;
    // Após adicionarmos o nó, teremos que adicionar 1 ao nosso contador (o length)
  }

  insert(position, value) {/*No método insert indicamos o valor e a posição onde será inserido o nó*/
    if (this.length === 0) {/*Antes de nada precisamos verificar se a nossa lista não está vazia, pois caso esteja
      iremos apenas adicionar ligar o novo nó ao head, coisa que o método append já sabe fazer*/
      return this.append(value);
      // O return aqui tem a função de fazer parar o código (caso tenhamos caído nesse if)
    }
    const index = position - 1;/* É bom deixar a posição conforme os índices de um array onde o primeiro é o zero... Isso
    vai facilitar a operação*/
    if (index < 0 || index > this.length) {// Aqui fazemos uma verificação se o índice indicado está dentro do range
      throw new Error('Posição inválida');
      /*Caso o índex seja inferior a zero ou superior a quantidade de elementos, quer dizer que a posição indicada é inválida
      Devendo o código aqui propagar um erro*/
    }
    const newNode = new Node(value);
    //Criamos o nosso nó com o valor fornecido no parâmetro desta função/método
    const [previous, current] = this._getReferencesByIndex(index);
    /* Aqui obtemos o nó anterior e o nó atual em forma de array em retorno da função getReferentesByIndex, fornecendo 
    como argumento o índex(posição) pretendida*/
    newNode.next = current;
    //O current(nó correspondente a posição pretendida) ficará no atributo next do nó recém criado, pulando uma casa para frente.
    if (previous) {/*Quanto ao previus, terei que verificar se é nulo ou não. Caso não seja nulo terei que fazer com
      que o previous aponte para o novo nó (newNode) de modo a fechar a corrente da lista.*/
      previous.next = newNode;
    } else {/* Caso seja nulo, quer dizer que o current corresponde ao início da lista (head) e 
      que o novo nó criado (newNode) deverá ocupar essa posição. A nossa estrutura condicional (if/else) fará essa verificação*/ 
      this.head = newNode;
    }
    this.length++;// Ao final é claro temos que incrementar o nosso contador de nós
  }

  remove(value) {/* O metodo remove é responsável por excluir o nó cujo valor corresponde Àquele fornecido como arqgumento*/
    if (this.length === 0)/*Primeiro temos que verificar se a lista está vazia. Caso esteja não há o que excluir
    então propagamos um erro, interrompendo aqui a execução do método*/
      throw new Error('Lista vazia!');
    const [previous, current] = this._getReferencesByValue(value);/* Aqui capturamos o nó correspondente ao valor informado
    e o seu antecessor. Esse método será explicado logo adiante*/
    if (current === null)/* Caso verificemo que o valor pretendido não corresponda a nenhum nó (null), lançaremos um erro
    interrompendo a execução do método.*/
      throw new Error('Item inexistente!');
    return this._removeNode(previous, current);/* Aqui o métodoremoveNode faz a remoção do nó recebendo como parâmetro, 
    o nó que se deseja remover e o seu antecessor*/
  }


  removeAt(position) {// Esse método remove conforme posição indicada como argumento
    if (this.length === 0)/*Acho que essa parte já foi explicada anteriormente*/
      throw new Error('Lista vazia!');
    const index = position - 1;/*Essa tb*/
    const lastIndex = this.length - 1;/* Ja que estamos trabalhando como se fosse índices de um array, também aqui no length
    teremos que subtrair em 1 o valor de nosso length de modo a refletir a posição do último indice*/
    if (index < 0 || index > lastIndex) {/* é bom verificar se o index informado está dentro das possibilidades....hehhe*/
      throw new Error('Posição inválida');
    }
    const [previous, current] = this._getReferencesByIndex(index);/* Bom.... Acho que já foi dito de forma geral o que 
    esses métodos fazem. Mais adiante traremos mais detalhes*/
    return this._removeNode(previous, current);/*O conteúdo do nó removido é retornado*/
  }

  size() {/*O size irá retornar a quantidade de elementos de nossa lista*/
    return this.length;
  }

  toString(separator = '-') {/* O toString cuidará da apresentação de nossa lista em formato de string*/
    let output = '';/*A mensagem que representará a nossa lista iniciará com uma string vazia*/
    let current = this.head;
    while (current !== null) {/*No while faremos uma iteração em nossa lista*/
      output += current.content + separator;/*Aqui adicionamos ao nosso output o conteúdo de nossos concatenado ao separador"
      current = current.next;/* Aqui temos o "incremento" ...digamos assim.... do nosso iterador*/ 
    }
    return output.substring(0, (output.length - separator.length));/* Ao final extraímos um subconjunto de nosso outpur, indo
    do início ao índex que corresponde ao final subtraída a quantidade de caracteres correspondes ao separador, de modo a excluí-lo
    do final da mensagem*/
  }


  _lastNode() {/* O lastNode retorna o último nó da lista por meio de uma iteração*/
    let current = this.head;
    while (current.next !== null) {
      current = current.next;//Aqui temos o "incremento"(digamos assim) de nosso iterador
    }
    //Enquanto o current.next for diferente de null não estaremos no fim da lista.
    return current;
    //No fim do while teremos chegado ao fim da lista. basta retornar o current
  }

  _getReferencesByIndex(index) {
    // Esse método irá iterar na nossa lista de modo a encontrar o elemento do index informado
    let current = this.head, previous = null, i = 0;
    while (i != index) {// O current(atual) inicia na cabeça(head), o previous portanto será null e o nosso índice marcador será zero
      i++;//Cada vez que atravessamos o while o nosso contador é incrementado
      previous = current;//E aqui a máquina começa a girar assumindo o previus a posição atual
      current = current.next;// e assunmindo a posição atual a próxima da lista
    }// Quanto chegamor no índex indicado no parâmetro dessa função o while pára! Encontramos!!!
    return [previous, current];//Pronto. Basta retornar o nó atual e o seu antecessor!
  }

  _getReferencesByValue(value) {/*Este método irá encontrar um nó e seu antecessor pelo seu conteúdo*/
    let current = this.head, previous = null;
    while (current && value != current.content) {
      previous = current;
      current = current.next;
    }/*A única coisa a diferenciar do método anterior é que a verificação no iterador será na comparação do conteúdo
    Também será verificado se o nó não é nulo. Pois veja se chegarmos a um nó nulo não há nó a ser retornado!*/
    return [previous, current];
    /*Retornamos o conteúdo em array para serem capturados em variáveis em array. */
  }

  _removeNode(previous, current) {/* Esse é o nosso removedor de nós... Só perde pra Nsa Sra Desatadora de Nós. Com todo respeito*/
    if (previous) {/*Primeiro precisamos verificar se estamos no início da lista ou não*/
      previous.next = current.next;
      /*Caso não estejamos no início o nosso antecessor vai ter que apontar para o proximo no nosso atual. dando um pulo*/
    } else {
      this.head = current.next
      /*Ja se o previous for null, estaremos no início da nossa lista e o nosso próximo (nó seguinte) é quem deverá assumir a cabeça*/
    }
    current.next = null;/* Aqui fazemos a separação do nosso excluído de nossa lista! Pega o beco. Tiramos a vinculação.*/
    this.length--;/* Como excluímos um elemento de nossa lista temos que decrementar o nosso contador*/
    return current.content;/*O método retornará o conteúdo do nó excluído e pronto!*/
  }
}