import Swal, { SweetAlertResult } from "sweetalert2"

export function TypeAlert(message: string, type: 'success' | 'error' | 'warning' | 'info' | 'question') {
  Swal.fire({
    toast: true,
    icon: type,
    title: message,
    position: 'top',
    showConfirmButton: false,
    timer: 4000,
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
}

export function TypeInfo(message: string, type: 'success' | 'error' | 'warning' | 'info' | 'question') {
  Swal.fire({
    text: message,
    icon: type,
  })
}

let timerInterval: NodeJS.Timeout;

export function Loaded() {
  Swal.fire({
    title: "Auto close alert!",
    html: "I will close in <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading(Swal.getDenyButton());
  
      const timer = Swal.getPopup()?.querySelector("b"); // O '?' é usado para evitar erros caso o elemento seja nulo
      if (timer) {
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`; // Define o conteúdo do elemento
        }, 100);
      }
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result: SweetAlertResult) => {
    // Verifica se o alerta foi fechado pelo timer
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}