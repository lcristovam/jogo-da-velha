
$(document).ready(function(){
    //Validação do preenchimento
    $("#btn_comecar").click(function(){
        let jog1 = $("input[name=jogador1]").val();
        let jog2 = $("input[name=jogador2]").val();
        
        if( jog1.trim().length > 0 && jog2.trim().length > 0){
            //Começar o jogo
            $(".msg").text("");
            ComecarJogo();
            
        }else{
            $(".msg").text("Nome(s) não preenchido(s)");
        }
    });
});                        
    function ComecarJogo(){
        let contadorClicks = 0;
        
        let interval = setInterval(TempoDecorrido, 500);

        $("table td").click(function(){
            contadorClicks++;
            
            if(contadorClicks <= 9){
                if( contadorClicks %2 == 0){
                    //par
                    $(this).text("O");
                }else{
                    //Impar
                    $(this).text("X");
                }         
            }
            if( VerificarGanhador() == true){
                contadorClicks = 9;
            }
            if (contadorClicks == 9){

                $(".msg").append("<br />  Jogo encerrado");
                clearInterval(interval);
            }
        })
    }
    function VerificarGanhador(){
    let vencedor = [
        //Linhas
        [0, 1, 2], //Vencedor[0]
        [3, 4, 5], //Vencedor[1]
        [6, 7, 8], //Vencedor[2]
        //Colunas
        [0, 3, 6], //Vencedor[3]
        [1, 4, 7], //Vencedor[4]
        [2, 5, 8], //Vencedor[5]
        //Diagonais
        [0, 4, 8], //Vencedor[6]
        [6, 4, 2]  //Vencedor[7]

        //Exemplo de busca
        // vencedor[7][1] = 4
        ];                       
        let X = new Array(9); // X = null , null , null
        let O = new Array(9); // um array de 9 posições vazio
       
       //Aqui iremos passar em cada td e realizar uma função dentro dele
        $("table td").each(function(key, value){
             if( $(this).text() == "X" ){
                 X[key] = key 
                }
             if( $(this).text() == "O" ){
                O[key] = key;
                }
            });
            
           // supondo que marquemos X no primeiro quadrado da esquerda
           // X[0] = 0
           // X = 0, , , , , , , , 
           // se marcarmos X no quadrado do meio
           // X[4] = 4
           // X = 0, , , , 4 , , , , 

         return DefinirGanhador(X, O, vencedor);
}
function DefinirGanhador(X, O, vencedor){
    //Percorre as linhas.
    for(var i = 0; i < vencedor.length; i++){
        contadorX = 0;
        contadorO = 0;

        //Percorre os índices do vencedor
        for(var y = 0; y < vencedor[i].length; y++){
        
                //EX: Se X [O] == vencedor[0]{
                    //contadorX++;
                //}
            if( X[vencedor[i][y]] == vencedor[i][y]){
                // pegando o exemplo que vencedor[7][2] é igual a 2
                // if X[vencedor[7][2]] == vencedor[7][2]
                contadorX++;
                /* Exemplo
                    Se o índice do for igual ao índice do vencedor, soma + 1 para contador X
                    Caso contrário, se apenas 1 indice já não for igual,
                    contador x Zera

                    Objetivo é definir o ganhador a partir da primeira ''trinca'' de números.
                */
            }
            
            if( O[vencedor[i][y]] == vencedor[i][y]){
                contadorO++;
            }
            
        }
            let jog1 = $("input[name=jogador1]").val();
            let jog2 = $("input[name=jogador2]").val();
            if(contadorX == 3){
                $(".msg").text("X - " + jog1 + " Ganhou " );
                return true;
            }
            if( contadorO == 3){
            $(".msg").text("O - " + jog2 + " Ganhou");
                return true;
                }
                } 
} 
let inicioJogo = null;

function TempoDecorrido(){
    if(inicioJogo == null){
        inicioJogo = new Date();
    }
    let dataAtual = new Date();


    let maisum = new Date();


    let timeIni = inicioJogo.getTime();
    let timeAtual = dataAtual.getTime();

    let timeDec = timeAtual - timeIni ;

    let novaData = new Date(timeDec);

    $("#tempo").text(   "Tempo decorrido: " + novaData.getMinutes() + ":" + novaData.getSeconds());

}