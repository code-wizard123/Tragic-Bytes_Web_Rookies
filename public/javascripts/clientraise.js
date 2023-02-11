const alldiv = document.getElementsByClassName('col-sm')
const hiddiv = document.getElementsByClassName('hidtxt')

// function show(b) {
//     console.log("fire")
//     b.classList.remove('hidden')
// }

for (i = 0; i < 8; i++) {
    console.log(hiddiv[i])
    alldiv[i].addEventListener('mouseenter', () => {
    hiddiv[i].classList.remove('hidden')
          
})
}