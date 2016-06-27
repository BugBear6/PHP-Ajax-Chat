var url = 'server.php';

function updateChat() {

    $.ajax({
        url: url,
        type: 'get',
        data: "last_displayed_chat_id="+$('#last_displayed_chat_id').val(),
        dataType: "json",
        success: function(response, status, http){

            $.each(response, function(index, item){
                $('#chat_box').val( $('#chat_box').val() + item.user_name + ': ' + item.user_comment + '\n' );
                $('#last_displayed_chat_id').val(item.chat_id);
            });
        },
        error: function(http, status, error){
            console.log('An Error Occured. Sorry... ' + error);
        }

    }); // ajax call end

}
// updateChat in time intervals:
setInterval(updateChat, 4000);

function addComment(){

    if( $('#user_name').val().length == 0 ) {
        alert('Please Enter a User Name');
        return false;
    }

    var requestData = $('#last_displayed_chat_id, #user_name, #user_comment').serialize();
    $.ajax({
        url: url,
        type: 'get',
        data: requestData,
        dataType: "json",
        success: function(response, status, http){

            $.each(response, function(index, item){
                $('#chat_box').val( $('#chat_box').val() + item.user_name + ': ' + item.user_comment + '\n' );
                $('#last_displayed_chat_id').val(item.chat_id);
            });

            $('#user_comment').val('');
            $('#user_name').val('');
        },
        error: function(http, status, error){
            console.log('An Error Occured. Sorry... ' + error);
        }

    }); // ajax call end

    return false; // returning false to prevent form from submiting and refreshing the page

}

