import Swal from 'sweetalert2'



export const msgError = (messageText)=>{
Swal.fire(
    '¡Hubo un error!',
    messageText,
    'error'
  )
}
export const warningPassword = (messageText) => {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: `${messageText}`,
    showConfirmButton: false,
    timer: 3000
  })
}
export const logOutMsg = () => {
  Swal.fire({
      imageUrl:'https://img.freepik.com/vector-gratis/cerebro-sombrero-gafas-diciendo-adios-maleta-ilustracion-vectorial-plana_98292-3106.jpg',            
      showConfirmButton: false,      
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: 'Custom image',
      title: 'Fins aviat!',
      timer: 3000
  })
}
export const successLoginSignUp = (messageText)=>{
Swal.fire({
  position: 'center',
  icon: 'success',
  title: `${messageText}`,
  showConfirmButton: false,
  timer: 3000
})
}
export const favoritesMessage = () => {
  Swal.fire({
    position:'center',
    icon: 'warning',
    title: 'Si vols dessar favorits, abans inicia sessió',
    confirmButtonText: '<a href="/login">Login</a>',
    confirmButtonColor: '#9B328B',
    showCancelButton: true,
    cancelButtonText: 'No, gràcies',
    
})
}