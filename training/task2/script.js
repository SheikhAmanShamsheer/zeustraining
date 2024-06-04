document.querySelector('.submit').addEventListener('click',()=>{
    var name = document.querySelector('#name');
    var comment = document.querySelector('#comment');
    var radios = document.querySelectorAll('input[name=gender]')
    var con = checkedOrNot(radios);
    if(name.value.length === 0 || comment.value.length === 0 || !con){
        alert("All fields are compulsory")
        if(name.value.length === 0){
            name.focus()
        }else if(comment.value.length === 0){
            comment.focus()
        }else{
            radios[0].focus()
        }
    }else{
        name.value = ''
        comment.value = ''
        for(const radio of radio){
            radio.checked = false
        }
    }
})
var checkedOrNot = (radios) => {
    for (const radio of radios) {
        if(radio.checked){
            return true;
        }
    }
    return false;
}