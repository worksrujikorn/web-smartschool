import Swal from "sweetalert2";

export const onSuccess = (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'success',
        text: message ? message : 'บันทึกสำเร็จ',
        timer: 2000
    })

}

export const onError = (message) => {
    return Swal.fire({
        icon: 'error',
        text: message ? message : 'error : บันทึกไม่สำเร็จ',
        timer: 5000
    })

}

export const onWarning = (message) => {
    return Swal.fire({
        icon: 'warning',
        title: message ? message : 'Something went wrong!',
        timer: 2000
    })
}

export const onAskQuestion = (text,ask1,ask2) => {
    return Swal.fire({
        // title: 'Are you sure?',
        text:text?text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: ask2?ask2:'cancel',
        confirmButtonText: ask1?ask1:'Yes',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            return true
        } else if (result.isDenied) {
            return false
        }
    })
}