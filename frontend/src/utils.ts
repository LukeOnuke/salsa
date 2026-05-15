import Swal from "sweetalert2";

export function formatDate(iso: string | null) {
    if (iso == null) return 'N/A'
    return new Date(iso).toLocaleString('sr-RS', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

export function toLocalDatetimeInputString(utcISOString: string) {
    const date = new Date(utcISOString); // e.g., "2025-05-25T19:00:00.000Z"
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
}

export const bootstrapClasses = {
    popup: 'card',
    cancelButton: 'btn btn-danger',
    denyButton: 'btn btn-secondary',
    confirmButton: 'btn btn-primary'
}

export function showError(message: string) {
    Swal.fire({
        title: "Došlo je do greške :(",
        confirmButtonText: 'Uredu',
        text: message,
        icon: "error",
        customClass: bootstrapClasses
    })
}

export function showConfirm(message: string, callback: Function) {
    Swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: 'Da, želim',
        cancelButtonText: 'Ne, odustani',
        icon: "question",
        customClass: bootstrapClasses
    }).then(result => {
        if (result.isConfirmed) {
            callback()
            Swal.fire({
                title: "Uspešno izvršeno",
                confirmButtonText: 'Uredu',
                icon: "success",
                customClass: bootstrapClasses
            })
        }
    })
}