{
  let $htmlContent = $('#contenidos');
  let $headers = $('#cabeceras');
  let $states = $('#estados');
  let $stateCode = $('#codigo');
  let $url = $('#recurso');
  let $submitRequest = $('#enviar');

  const STATES = ['UNINITIALIZED', 'LOADING', 'LOADED', 'INTERACTIVE', 'COMPLETE'];

  let getRequest = function(){
    $request = $.ajax({
      url: $url.val(),
      method: 'GET',
      beforeSend: function(xhr){
        $states.append('<strong>' + STATES[xhr.readyState] + ':</strong> ' + xhr.readyState + ' <br/>');
      },
      cache: false,
      dataType: 'html',
      xhrFields: {
        onreadystatechange: function(){
          $states.append('<strong>' + STATES[this.readyState] + ':</strong> ' + this.readyState + ' <br/>');
          $stateCode.append(this.status + ': ' + this.statusText + ' <br/>');
        }
      }
    })
    .fail(function( msg ){
      $htmlContent.html('Error, la petición ha fallado');
    })
    .done(function( msg ) {
      $headers.append( $request.getAllResponseHeaders() );
      $htmlContent.text( msg );
    });
  };

  $(function(){
    $url.val(location.href);

    $submitRequest.click( function(event){
      event.preventDefault();
      getRequest();
    });
  })
}
