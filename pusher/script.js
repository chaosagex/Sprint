event = "msg";
secret = '7d70f7639ec7b58c30a0';
key = "448486c547d013582aeb";
app = "1261092";
group="test"
function getMD5(body){
    return CryptoJS.MD5(JSON.stringify(body));
}

function getAuthSignature(md5,timeStamp){
    return CryptoJS.HmacSHA256(`POST\n/apps/${app}/events\nauth_key=${key}&auth_timestamp=${timeStamp}&auth_version=1.0&body_md5=${md5}`,secret);
}

sendMessage = async function () {
    let body = { data: 'lel', name: event, channel: group }
    let timeStamp = Date.now() / 1000;
    let md5 = this.getMD5(body);
    let url = `https://cors.bridged.cc/https://api-eu.pusher.com/apps/${app}/events?body_md5=${md5}&auth_version=1.0&auth_key=${key}&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5, timeStamp)}`;
    let req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
}