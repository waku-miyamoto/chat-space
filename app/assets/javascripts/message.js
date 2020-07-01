$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      let html =  
      `<div class="chat-main__chatspace__field">
        <div class="chat-main__chatspace__field__info">
          <div class="chat-main__chatspace__field__info__name">
            ${message.user_name}
          </div>
          <div class="chat-main__chatspace__field__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <p class="Message__content">
            ${message.body}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
      </div>`
  return html;
    } else {
      let html = 
      `<div class="chat-main__chatspace__field">
        <div class="chat-main__chatspace__field__info">
          <div class="chat-main__chatspace__field__info__name">
            ${message.user_name}
          </div>
          <div class="chat-main__chatspace__field__info__date">
            ${message.created_at}
          </div>
        </div>
        
        <div class="message">
          <p class="Message__content">
            ${message.body}
          </p>
        </div>
      </div>`
    return html
    };
  }
  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  .done(function(data){
    let html = buildHTML(data);
    $('.chat-main__chatspace').append(html);
    $('.chat-main__chatspace').animate({ scrollTop: $('.chat-main__chatspace')[0].scrollHeight});      
    $('form')[0].reset();
    $('.submit-btn').prop("disabled", false);
  })
  .fail(function() {
    alert("送信に失敗しました")
  })
  });
});