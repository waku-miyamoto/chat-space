$(function(){
    
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      let html =  
      `
      <div class="chat-main__chatspace__field" data-message-id=${message.id}>
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
      `
      <div class="chat-main__chatspace__field" data-message-id=${message.id}>
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
  let reloadMessages = function() {
    let last_message_id = $('.chat-main__chatspace__field:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
        // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
        if (messages.length !== 0) {
          //追加するHTMLの入れ物を作る
          let insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          //メッセージが入ったHTMLに、入れ物ごと追加
          $('.chat-main__chatspace').append(insertHTML);
          $('.chat-main__chatspace').animate({ scrollTop: $('.chat-main__chatspace')[0].scrollHeight});
        }
     })
    .fail(function() {
      alert('error');
    });
    };
    setInterval(reloadMessages, 7000);
  });