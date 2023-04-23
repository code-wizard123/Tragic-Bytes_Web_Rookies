const paintdiv = document.getElementById('paint-div');
const masondiv = document.getElementById('mason-div');
const plumbdiv = document.getElementById('plumb-div');
const carpentdiv = document.getElementById('carpent-div');
const elecdiv = document.getElementById('elec-div');
const labourdiv = document.getElementById('labour-div');
const housediv = document.getElementById('house-div');
const pestdiv = document.getElementById('pest-div');

const painttxt = document.getElementById('paint-txt');
const masontxt = document.getElementById('mason-txt');
const plumbtxt = document.getElementById('plumb-txt');
const carpenttxt = document.getElementById('carpent-txt');
const electxt = document.getElementById('elec-txt');
const labourtxt = document.getElementById('labour-txt');
const housetxt = document.getElementById('house-txt');
const pesttxt = document.getElementById('pest-txt');

const eventmaker = (div, txt) => {
    div.addEventListener('mouseenter', () => {
        txt.classList.remove('hidden');
    })

    div.addEventListener('mouseleave', () => {
        txt.classList.add('hidden');
    })
}

eventmaker(paintdiv,painttxt)
eventmaker(masondiv,masontxt)
eventmaker(plumbdiv,plumbtxt)
eventmaker(carpentdiv,carpenttxt)
eventmaker(elecdiv,electxt)
eventmaker(labourdiv,labourtxt)
eventmaker(housediv,housetxt)
eventmaker(pestdiv,pesttxt)

const btns = document.getElementsByClassName('divbtn')
const cval = document.getElementById('reqwk')

btns[0].addEventListener('click' , () => {
    cval.value = 'Painting'
})

btns[1].addEventListener('click' , () => {
    cval.value = 'Mason'
})

btns[2].addEventListener('click' , () => {
    cval.value = 'Plumbing'
})

btns[3].addEventListener('click' , () => {
    cval.value = 'Carpentary'
})

btns[4].addEventListener('click' , () => {
    cval.value = 'Electrician'
})

btns[5].addEventListener('click' , () => {
    cval.value = 'Labour Services'
})

btns[6].addEventListener('click' , () => {
    cval.value = 'Housekeeping'
})

btns[7].addEventListener('click' , () => {
    cval.value = 'Pest Control'
})