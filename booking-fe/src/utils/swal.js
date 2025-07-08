import Swal from 'sweetalert2';

export const successAlert = (message) => {
  return Swal.fire({
    icon: 'success',
    title: 'Thành công!',
    text: message,
    confirmButtonText: 'OK'
  });
};

export const errorAlert = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Lỗi',
    text: message,
    confirmButtonText: 'OK'
  });
};

export const confirmAlert = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý',
    cancelButtonText: 'Hủy',
  });

  return result.isConfirmed; // ✅ Trả về true/false
};