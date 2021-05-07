class DoublylinkedList {

  constructor() {
    this.head = null;    // O head inicia por null, sendo a posição inicial de nossa lista
    this.length = 0;// O length demonstrará a quantidade de elementos constantes em nossa lista
  }

  append(value) {/*O método append incluirá um nó na nossa lista de nós*/
    let newNode = new Node(value);/* Aqui instanciamos um novo objeto do tipo Node, detendo ele trÊs atributos
    O content, o next e o previous. O valor do content será atribuído na inicialização o do next corresponderá ao próximo elemento da lista
    e  o previous ao antecessor*/
    const lastNode = this._lastNode();/* O método lastNode retorna o ultimo nó e será explicado em momento oportuno*/
    if (!lastNode) {/*Se o último nó for null, então estamos no início de nossa lista! O newNode ficará no head*/
      this.head = newNode;
    } else {/* Caso o último nó não seja nulo, o novo nó (newNode) será adicionado ao seu atributo next, integrando o final da fila*/
      lastNode.next = newNode;
      newNode.previous = lastNode;
      /*è importante lembrar de apontar o nosso previous para o ex-ultimo nó, fechando a cadeia*/  
    }
    this.length++;/* Ao incluir um elemento incrementa o nosso contador de nós*/
  }

  insert(position, value) {/*O método insert irá inserir um nó na posição indicada com conteúdo correspondente
    ao valor indicado, no primeiro e no segundo parâmetros respectivamente*/
    const index = position - 1;
    if (index < 0 || index > this.length) {/*Caso a posição indicada seja superior ao número de elementos ou inferior a zero
      não há o que ser feito a não ser lançar um erro*/
      throw new Error('Posição inválida');
    }

    if (this.length === 0 || index === this.length) {/*Não havendo elementos na lista(==0) ou correspondendo o índice ao final 
      da lista. Basta chamar o método append que o problema está resolvido*/
      return this.append(value);
      /*O return irá garantir que o método não prossiga*/
    }

    const newNode = new Node(value);/*Não caindo em nenhuma das situações acima o nó será instanciado, recenbendo como content
    o valor indicado no parâmetro deste método*/
    const current = this._getNodeByIndex(index);/*Para encontrarmos o nó atual pelo índice precisamos do método getNodeByIndex...
    Que será explicara em momento oportuno*/

    if (!current.previous) {/*Nesta hiptótese o nó atual corresponde ao head (início) da lista*/
      this.head = newNode;//O head então receberá o nó
      current.previous = newNode;//O antecessor do nó atual será o novo nó
      newNode.next = current;// e o novo nó apontará para o nó atual fechando a cadeia de nós
    } else if (!current.next) {/*Se o próximo nó do nó atual for null quer dizer que estamos no final da fila*/
      current.next = newNode;//Bom.... O próximo do final irá apontar pro novo nó
      newNode.previous = current;//e.... O antecessor no novo nó irá apontar para o ex-final, fechando a cadeia
    } else {// Não estando nem no início e nem no fim , estaremos no meio!
      newNode.previous = current.previous//Resumindo..... Temos que refazer todos os vínculos do nó encontrado e refazê-los com o novo nó a ser incluído
      newNode.next = current;
      current.previous.next = newNode;
      current.previous = newNode;
    }

    this.length++;//Ao final precisamos incrementar o nosso contador pois um novo nó foi incluído
  }

  remove(value) {/*Responsável por remover o nó pelo valor indicado como argumento*/
    const selected = this._getNodeByValue(value);/*A função getNodeByValue irá retonar o nó cujo content corresponde
    ao valor indicado. Será explicada mais adiante*/
    if (!selected) {/*Caso o nó selecionado corresponda à null quer dizer que não encontramos nó com valor indicado*/
      throw new Error('Valor não encontrado!');
      /*Devemos então lançar um erro*/
    }
    return this._removeNode(selected);/*Este método é responsável por remover o nó indicado e será explicado logo adiante*/
  }

  removeAt(position) {/*Responsável por remover um nó pela posição indicada como argumento*/
    const index = position - 1;
    if (this.size() === 0) {/*Caso o tamanho da função seja 0 então precisamos lançar um erro interrompendo a execução*/
      throw new Error('Lista vazia');
    }
    if (index < 0 || index >= this.length) {
      throw new Error('Posição inválida');
      /*Caso a posição indicada esteja fora do range também devemos lançar um erro, interrompendo a execução do método*/
    }
    const selected = this._getNodeByIndex(index);//Essa função retorna o nó a ser excluído (será explicada mais adiante)
    return this._removeNode(selected);//Essa função remove o nó selecionado para exclusão (será explicada mais adiante)
  }

  size() {
    return this.length;
    /*Este método é responsável por tão somente retornar o tamanho da nossa lista*/
  }

  toString(separator = '-') {/*Esse método já está fartamente explicado no arquivo linkedlist.... Veja lá*/
    let output = '';
    let current = this.head;
    while (current !== null) {
      output += current.content + separator;
      current = current.next;
    }
    return output.substring(0, (output.length - separator.length));
  }

  //private methods

  _lastNode() {
    if (!this.head)//Se o head(cabeça) estiver "desocupada" então a lista está vazia... Nâo teremos ultimo nó
      return null
      //Assim sendo interrompemos a execução do código retornando um null
    let current = this.head;
    while (current.next !== null) {//Aqui fazemos uma iteração em nossa lista, començando pela cabeça (head)
      current = current.next;//Aqui temos o incremento (digamos assim) de nossa iteração, interrompendo ao chegar ao final da lista
    }
    return current;//Pronto! Se current.next é igual a null quer dizer que chegamos ao fim da lista. Basta retornar o current
  }

  _getNodeByIndex(index) {/*Basicamente esse método irá iterar em nossa lista em busca do nó correspondente ao indice informao*/
    let current = this.head, i = 0;/*Partimos da cabeça e com o i igual a 0*/
    while (i != index) {// QUando o índex informado como argumento for igual ao i, teremos encontrado o nosso nó 
      i++;//A cada iteração incrementamos o nosso i
      current = current.next;// A cada iteração o nosso current passa para o próximo da lista
    }
    return current;//Após encontrar o nosso nó basta apresentarmos como retorno do método
  }

  _getNodeByValue(value) {/*Tem um funcionamento similar ao método anterior, tendo como parâmetro de verificação o valor (content) do nó*/
    let current = this.head;/* Iniciamos a iteração da cabeça*/
    while (current && value != current.content) {
      current = current.next;/*Isso garante que a nossa lista seja percorrida*/
    }/*Caso o valor informado como parâmnetro corresponda ao content do nó atual, encontramos o nó pretendido, terminando o while*/
    return current;//Agora basta retornar o nó encontrado
  }
  _removeNode(selected) {
    if (selected.previous == selected.next) {/*A única situação em que o antecessor é o mesmo que o próximo é quando a lista
      Tem apenas um elemento... Neste caso basta esvazia-la fazendo com que a cabeça receba null*/
      this.head = null;
    } else if (!selected.previous) {/*Se o antecessor for null então estamos no início (head) da lista*/
      this.head = selected.next;//A cabeça então deverá apontar para o próximo
      selected.next = null;//E o elemento selecionado deverá ser desvinculado da lista
      this.head.previous = null;//Assim garantimos que o elemento recém empossado como head esteja de fato no início da lista
      //Retirando qualquer elemento que porventura esteja vinculado como antecessor
    } else if (!selected.next) {/*Se o seguinte for null então estaremos no final da fila*/
      selected.previous.next = null;//Bom então basta desvincularmos o antepenúltimo do último (a ser excluído- selecionado)
      selected.previous = null;// e então excluirmos a relação de antecedência com o antepenúltimo (fácil de entender e difícil de explicar....)
    } else {/*Em todo caso não estando nem no início e nem no final estaremos no meio e sinceramente, basta desenhar que vc
      vai entender direitinho como retirar um nó do meio. Tentar explicar vai ficar meio enrrolado*/
      selected.previous.next = null;
      selected.next.previous = null;
      selected.previous.next = selected.next;
      selected.next.previous = selected.previous;
      selected.next = null;
      selected.previous = null;
    }
    this.length--;//Após retirar o elemento basta decrementar o nosso contador de modo que ele reflita a realidade da nossa lista
    //com um elemento a menos
    return selected.content;
  }

}