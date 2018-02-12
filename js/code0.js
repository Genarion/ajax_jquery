{

  (function(){

    let request, $htmlContent, $headers, $states, $stateCode, $url, $submitRequest, initTime;

    let readyStates = ['UNINITIALIZED', 'LOADING', 'LOADED', 'INTERACTIVE', 'COMPLETE'];

    function htmlEntities(str) {
        return decodeURI(encodeURI(str)
            .replace(/%0A/g, '<br/>')
            .replace(/%3C/g, '&lt;')
            .replace(/%3E/g, '&gt;'));
    }

    function initVars(){
         $htmlContent = $('#contenidos');
         $headers = $('#cabeceras');
         $states = $('#estados');
         $stateCode = $('#codigo');
         $url = $('#recurso');
         $submitRequest = $('#enviar');
     }

    function resetVars(){
        $htmlContent.html("");
        $states.html("");
        initTime = new Date();
    }

    function loadContent() {
        resetVars();
        request = $.ajax({
            url: $url.val(),
            cache: false,
            dataType: "html",
            complete: showInfo,
            success: showResponse,
            error: showError,
            xhrFields: {
              onreadystatechange: function(){

                console.log(this.readyState + '     - dos');
              }
            }
        }).then(function( msg ) {
    console.log(msg);
  });
        request.onreadystatechange = function(){ console.log('hola');}
    }

    function showResponse(){
        $htmlContent.html(htmlEntities(request.responseText));
    }

    function showError(){
        $htmlContent.html("Error, la petición ha fallado");
    }

    function showInfo() {
        $states.html("<strong>" + readyStates[request.readyState] + ":</strong> " + request.readyState + " <br/>");
        $headers.html(htmlEntities(request.getAllResponseHeaders()));
        $stateCode.html(request.status + ": " + request.statusText);
    }

    $(function(){
        initVars();
        $url.val(location.href);

        $submitRequest.click( function(ev){
            ev.preventDefault();
            loadContent();
        });
    })
})();
}
