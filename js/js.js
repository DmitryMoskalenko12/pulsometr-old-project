'Use strict'

window.addEventListener('DOMContentLoaded', ()=> {

  const slides = document.querySelectorAll('.slider__img');
  prev = document.querySelector('.slider__prev');
  next = document.querySelector('.slider__next');

let slideIndex = 1;
slide(slideIndex)

function slide(n) {
  if(n > slides.length){
    slideIndex = 1
  }
  if(n < 1){
    slideIndex = slides.length
  }

  slides.forEach(item=>{
    item.style.display = 'none'
  } 
  )

  slides[slideIndex - 1].style.display = 'block'
  
}

function slidePlus(n) {
  slide(slideIndex += n)
}

prev.addEventListener('click', ()=>{
  slidePlus(-1)
})

next.addEventListener('click', ()=>{
  slidePlus(1)
})  
/* табы */
const wrapper = document.querySelector('.tab__tabwrapper');
      tabs = document.querySelectorAll('.tab__item');
      content = document.querySelectorAll('.tab__wrappercard');
      divintabs = document.querySelectorAll('.click');
      function hideContent() {
        content.forEach(elem=>{
          elem.classList.remove('tab__showtab')
        }) 

        tabs.forEach(elem=>{
          elem.classList.remove('tab__active')
        })
      }

      function showTab(i) {
        content[i].classList.add('tab__showtab')
        tabs[i].classList.add('tab__active')
      }
      

      wrapper.addEventListener('click', (e)=>{
       function universe(selector, variable) {
        if(e.target && e.target.classList.contains(selector)){
          variable.forEach((item, i)=>{
            if(e.target === item){
              hideContent() 
              showTab(i)
            }
          })
         }
       }
       universe('tab__item', tabs);
       universe('click', divintabs)
      })

/* изменение карточек */
const more = document.querySelectorAll('.tab__more');
      prev = document.querySelectorAll('.tab__prev');
      card1 = document.querySelectorAll('.tab__card');
      card2 = document.querySelectorAll('.tab__cardtextdesc');   

      more.forEach((elem, i)=>{
        elem.addEventListener('click', ()=>{  
            card1[i].style.transform = 'translateX(-100%)'
            card2[i].style.transform = 'translateX(-100%)'          
        })
      })
      
      prev.forEach((elem, i)=>{
        elem.addEventListener('click', ()=>{          
            card1[i].style.transform = 'translateX(0%)'
            card2[i].style.transform = 'translateX(100%)'          
        })
      })

/* модальные окна */
const activeButton = document.querySelectorAll('.activeconsultation');
      modal1 = document.querySelector('.modal');
      modalClose = document.querySelector('.modal__close');
      overlay = document.querySelector('.overlay')

      modalOrder = document.querySelector('.modal-order');
      modalOrderclose = document.querySelector('.modal-order__close-order');
      modalOrderactive = document.querySelectorAll('.tab__cardbutton');
      pulsometrDescr = document.querySelectorAll('.tab__cardtitle');
      modalTitle = document.querySelector('.modal-order__title2-order');
      scrolBlock = document.querySelector('.blockscrol');
      scroll1 = scroll()

      function showModal() {
        activeButton.forEach(item=>{
          item.addEventListener('click',()=>{
            modal1.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow ='hidden';
            document.body.style.marginRight=`${scroll1}px`   
          })
        })
      }
      showModal()

      function closeModal() {
        modalClose.addEventListener('click',()=>{
            modal1.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow ='';
            document.body.style.marginRight =`0px`
          })
      }
      closeModal()
      
      function scroll() {
       let result = scrolBlock.offsetWidth - scrolBlock.clientWidth;
       scrolBlock.remove();
       return result
      }
     /* для секции с табами */

     function showModalorder() {
      modalOrderactive.forEach((item, i)=>{
        item.addEventListener('click',()=>{
          modalOrder.style.display = 'block';
          modalTitle.textContent = pulsometrDescr[i].textContent;
          overlay.style.display = 'block';
          document.body.style.overflow ='hidden';
          document.body.style.marginRight=`${scroll1}px`

        })
      })
    }
    showModalorder()
    
    function closeModalorder() {
      modalOrderclose.addEventListener('click',()=>{
        modalOrder.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow ='';
        document.body.style.marginRight =`0px`
        })
    }
    closeModalorder()

    /* делаем запрос на сервер */

const form = document.querySelector('.modal__main');
      sectionForm = document.querySelector('.form__main');
      modalthanks = document.querySelector('.modal-thanks');
      modalClosethanks = document.querySelector('.modal-thanks__close-order');
      orderForm = document.querySelector('.modal-order__main-order');

  modalClosethanks.addEventListener('click', ()=>{
    modalthanks.style.display = 'none';
    overlay.style.display = 'none';
  })

  async function postData (url, data) {
    let res = await fetch(url,{
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: data});
     return await res.json()
  }

  sectionForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(sectionForm);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    postData('http://localhost:3000/postinfo', json)
    .then(()=>{sectionForm.reset()}
  ) 
})
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    postData('http://localhost:3000/postinfo', json)
    .then(()=>{
    modal1.style.display='none';
    modalthanks.style.display='block';
    overlay.style.display = 'block';
    setTimeout(() => {
    modalthanks.style.display='none';
    overlay.style.display = 'none';
    document.body.style.overflow =''
    }, 2000);
    form.reset()
    }
  ) 
})


orderForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const formData = new FormData(orderForm);
  formData.append('order', modalTitle.textContent)
  const json = JSON.stringify(Object.fromEntries(formData.entries()));
  postData('http://localhost:3000/postorder', json)
  .then(()=>{
  modalOrder.style.display='none';
  modalthanks.style.display='block';
  overlay.style.display = 'block';
  setTimeout(() => {
  modalthanks.style.display='none';
  overlay.style.display = 'none';
  document.body.style.overflow =''
  }, 2000);
  orderForm.reset()
  }
) 
})
  
 /* функционал стрелки вверх */
 const arrowToUp = document.querySelector('.circletostart');
 window.addEventListener('scroll', ()=>{
  if(document.documentElement.scrollTop > 2000){
    arrowToUp.style.display ='block';  
  }else{
    arrowToUp.style.display ='none';
  }
 })

 arrowToUp.addEventListener('click',()=>{
  document.documentElement.scrollTop = '0px';
 })
 new WOW().init()

})