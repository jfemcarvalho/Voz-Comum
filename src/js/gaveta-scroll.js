/*
 * Voz Comum — scroll automático dentro da gaveta de detalhe (bloco DetailDrawer).
 *
 * Usado numa Client Action "ScrollGavetaPara(Seletor)" chamada depois de mostrar
 * os comentários (".detalhe__comentarios") ou o formulário de denúncia
 * (".detalhe__denuncia"). O setTimeout espera que o OutSystems desenhe o conteúdo
 * que acabou de ficar visível.
 */
setTimeout(function () {
    var alvo = document.querySelector('.detalhe ' + $parameters.Seletor);
    if (!alvo) { return; }
    var gaveta = alvo.closest('.detalhe');
    if (!gaveta) { return; }

    // posição do alvo dentro da gaveta, com 12px de folga em cima
    var topo = alvo.getBoundingClientRect().top
             - gaveta.getBoundingClientRect().top
             + gaveta.scrollTop - 12;

    gaveta.scrollTo({ top: topo, behavior: 'smooth' });
}, 60);
