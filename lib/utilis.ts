

export const formatDateToIndonesian = (isoDateString: string) => {
    const date = new Date(isoDateString);
  
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    const timeZone = 'WIB'; 
  
    return `${day} ${month} ${year}, ${hours}:${minutes} ${timeZone}`;
  };
  
 