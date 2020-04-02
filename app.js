// hide preloader
// all the images scripts links have finished loading 


// window event list

eventListeners();
function eventListeners(){
    const ux = new UX() 

    window.addEventListener('load', function(){
        ux.hidepreloader();
    })
    // nav btn
    document.querySelector('.navbtn').addEventListener('click',function(){
        ux.shownav(); 
    })
    // control the video
document.querySelector('.video_switch').addEventListener('click', function(){
    ux.videocontrols()
})
// submit the form
document.querySelector('.order_form').addEventListener('submit',function(event)
{
 event.preventDefault();
 const name = document.querySelector('.input_name').value;
 const lastname = document.querySelector('.input_lastname').value;
 const email = document.querySelector('.input_email').value;
 const contact = document.querySelector('.input_contact').value;
 const address= document.querySelector('.input_address').value;
 const orders = document.querySelector('.input_orders').value;
let value = ux.checkEmpty(name, email, contact, address, orders)
    if(value){
        let customer = new Customer(name, lastname, email, contact, address, orders)
        console.log(customer);
        ux.addCustomer(customer);
        ux.showFeedback('You have successfully Ordered!', "success")
        ux.clearFields()
    }
    else{
        ux.showFeedback('Form is not completely filled',"error")
    }


})
// display model
const links = document.querySelectorAll('.work_item_icon');
links.forEach(function(item){
    item.addEventListener('click',function(event){
        ux.showModel(event)
    })
})
// hide model
document.querySelector('.work_model-close').addEventListener('click', 
function(){
    ux.closeModel()
})


}


// constructor function
function UX(){

}
UX.prototype.hidepreloader = function() {
    document.querySelector('.preloader').style.display = "none";
}
UX.prototype.shownav = function() {
    document.querySelector('.nav').classList.toggle('nav_show')
}
// play/pause video
UX.prototype.videocontrols = function(){
    let btn = document.querySelector('.video_switch_button');
    if(!btn.classList.contains('btn_slide')){
        btn.classList.add('btn_slide')
        document.querySelector('.video__item').pause()
    }
    else{
        btn.classList.remove('btn_slide')
        document.querySelector('.video__item').play()
    }
}
//check for empty values 
UX.prototype.checkEmpty = function(name, lastname, email, contact, address, orders){
    let result;
    if (name ==='' || lastname === '' || email ==='' || contact ==='' || address ==='' || orders ===''){
    
        result = false; 
}
    else{ 
        result = true
    }
    return result;
}
UX.prototype.showFeedback = function(text, type){
    if(type === 'success'){
        let feedBack = document.querySelector('.order_form-feedback');
        feedBack.classList.add('success');
        feedBack.innerText = text;
        this.removeAlert('success');
    }
    else if(type='error'){
let feedBack = document.querySelector('.order_form-feedback');
feedBack.classList.add('error');
feedBack.innerText = text;
this.removeAlert('error');
    }
} 
// remove alert
UX.prototype.removeAlert = function(type){

    setTimeout(function(){
        document.querySelector('.order_form-feedback').classList.remove(type)
    }, 800)
}
// add customer
UX.prototype.addCustomer = function(customer){
    const images = [1,2,3,4];
    let random =Math.floor(Math.random()*images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<img src="../IMAGES/Person${random}.png" alt="Person" class="Person_1">
    <h4 class="Person_1-name">${customer.name}</h4>
    <h4 class="Person_1-lastname">${customer.lastname}</h4>`
    document.querySelector('.order_card-list').appendChild(div)
}
// clear fields
UX.prototype.clearFields = function(){
  document.querySelector('.input_name').value='';
 document.querySelector('.input_lastname').value='';
 document.querySelector('.input_email').value='';
 document.querySelector('.input_contact').value='';
 document.querySelector('.input_address').value='';
 document.querySelector('.input_orders').value='';
}
// show model
UX.prototype.showModel = function(event){
    event.preventDefault();
    if (event.target.parentElement.classList.contains('work_item_icon'));
        let id = event.target.parentElement.dataset.id
        
        const model = document.querySelector('.work_model');
        const modelItem = document.querySelector('.work_model-item');

        model.classList.add('work_model-show');
        modelItem.style.backgroundImage = `url(work${id}.png)`
}
// hide model
UX.prototype.closeModel = function(){
    document.querySelector('.work_model').classList.remove('work_model-show')
}


// customer
function Customer(name, lastname, email, contact, address, orders){
    this.name = name,
    this.lastname = lastname,
    this.email = email,
    this.contact = contact,
    this.address = address,
    this.orders = orders;
}