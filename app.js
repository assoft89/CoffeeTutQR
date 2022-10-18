function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }

function tg_send_msg(msg, cb){
    /*
        Получить последние сообщения для бота там есть chat_id
        https://api.telegram.org/botXXX:YYYYY/getUpdates
    */
    var api = "5161957939:AAEk1SFXy9ravEgJbi2iY4V3_UVZeP3kxOM";
    var chat_id = '551416093';
    var url = "https://api.telegram.org/bot"+api+"/sendMessage?chat_id="+chat_id+"&text="+msg;

    ajax(url,'',function(r){
        if (JSON.parse(r).ok == true){
            if (cb){
                cb();
            }
        }
    },function(err){
        console.log(err);
    },5000,"GET");
    

}




function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }

    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    //xmlhttp.setRequestHeader('ASsoft-Context', 'test');

    return xmlhttp;
} /*closing getXmlHttp*/


function ajax(url, params, onResultFunc, onError, timeoutAjax, post) {

    if (typeof post == 'undefined')
    post = 'POST';
     
    var xmlhttp = getXmlHttp();

    //xmlhttp.async= false;

    try {// in IE EDGE not work

        xmlhttp.timeout = 5000;

        if (typeof timeoutAjax !== 'undefined')
            xmlhttp.timeout = timeoutAjax;

    } catch (e) {
    }

    xmlhttp.open(post, url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                onResultFunc(xmlhttp.responseText);
            }

            if (xmlhttp.status === 0) { //no server active
                if (typeof onError !== 'undefined')
                    onError();
            }
        }
    };
}

function send_msg(){
 if (div_msg.value !== ''){
    var name = get_name(getUrlVars().id);

    tg_send_msg("Отзыв:\n " + name + ': ' + div_msg.value, function(){
        div_msg.value = '';
        div_msg.hidden = true;
        bt_send.textContent = 'Спасибо!'; 
    });
 }
if (bt_send.textContent == 'Спасибо!'){
    bt_send.textContent = 'Отправить';
    div_msg.hidden = false;
    div_msg.focus();
}

}

function get_name(id){
    var arr = {
        '1' :   "ТЦ Городок",
        '2' :   "Супер Маркет",
        '3' :   "ТЦ Афганец",
        '4' :   "ТЦ Юность",
        '5' :   "ТЦ Южный",
        '6' :   "Эко Базар",
        '7' :   "Цветы",
        '8' :   "Дом",
        '9' :   "Муравленко 22"

    };

    var res = arr[id];
    return  typeof res == 'undefined' ?  '' : res  ;
}

var vars = getUrlVars();
var name_ta = get_name(vars.id);

if (name_ta !== ''){
    div_id_ta.textContent = name_ta;
    div_id_ta.classList.remove('hide');
}

tg_send_msg("Открыли страницу\n " + JSON.stringify(vars));



