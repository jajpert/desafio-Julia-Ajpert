class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const pagamento = ['dinheiro', 'debito', 'credito'];

        if(pagamento.some((atual) => {return atual == metodoDePagamento})) {

            if(!itens.length)
                return "Não há itens no carrinho de compra!";
    
            const cardapio = {
                'cafe': 3,
                'chantily': 1.5,
                'suco': 6.2,
                'sanduiche': 6.5,
                'queijo': 2,
                'salgado': 7.25,
                'combo1': 9.5,
                'combo2': 7.5
            };
            
            let total = 0;
            let extra = [];
            for(const item of itens) {

                const itemSeparado = item.split(',');
                if(cardapio.hasOwnProperty(itemSeparado[0])) {
                    if(itemSeparado[1] == 0) {
                        total = 0
                        break
                    }

                    if(itemSeparado[0] === 'chantily' && !extra.includes('cafe')){
                        extra.push('cafe');
                    }

                    if(itemSeparado[0] === 'queijo' && !extra.includes('sanduiche')){
                        extra.push('sanduiche');
                    }

                    total += cardapio[itemSeparado[0]] * parseInt(itemSeparado[1]);
    
                } else {
                    return "Item inválido!";
                }
            }
            if(total) {
                if(metodoDePagamento == pagamento[0]) {
                    total -= total*0.05;
                } else if(metodoDePagamento == pagamento[2]){
                    total += total*0.03;
                }
            } else {
                return "Quantidade inválida!";
            }
            if(extra.length){
                let verifica;
                extra.forEach(elemento => {
                    verifica = itens.reduce((acumulador, atual) => {
                        return acumulador || atual.includes(elemento);
                    }, false);   
                });

                if(!verifica)
                    return "Item extra não pode ser pedido sem o principal";
            }
            
            return `R$ ${total.toFixed(2).toString().replace('.', ',')}`;    
        } else {
            return "Forma de pagamento inválida!";
        }
    }
}

export { CaixaDaLanchonete };