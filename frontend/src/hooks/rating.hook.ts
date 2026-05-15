import { bootstrapClasses } from '@/utils';
import Swal from 'sweetalert2';

export const useRating = () => {
  const showRatingModal = (title: string): Promise<number> => {
    return Swal.fire({
      title: title,
      customClass: bootstrapClasses,
      html: `
        <div id="star-container" style="font-size: 2rem; cursor: pointer;">
          ${[1, 2, 3, 4, 5].map(i => `<i class="fas fa-star" data-value="${i}" style="color: #ccc;"></i>`).join('')}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Pošalji',
      cancelButtonText: 'Odustani',
      preConfirm: () => {
        const selected = document.querySelector('#star-container .selected') as HTMLElement | null;
        return selected?.getAttribute('data-value') || '0';
      },
      didOpen: () => {
        const stars = document.querySelectorAll('#star-container i');

        stars.forEach((star) => {
          const value = parseInt(star.getAttribute('data-value') || '0', 10);

          star.addEventListener('mouseover', () => {
            stars.forEach((s: any) => {
              const sValue = parseInt(s.getAttribute('data-value') || '0', 10);
              s.style.color = sValue <= value ? '#FFD700' : '#ccc';
            });
          });

          star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
          });
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        return parseInt(result.value, 10);
      }
      return 0;
    });
  };

  return showRatingModal
};
