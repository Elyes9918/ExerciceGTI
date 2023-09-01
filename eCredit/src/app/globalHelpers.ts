export function formatDateToDDMMYYYY(date: Date | string): Date | null {
    // If date is a string, parse it into a Date object
    if (typeof date === 'string') {
      date = new Date(date);
    }
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return null; // Return null for an invalid date
    }
  
    // Get the day, month, and year components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because months are zero-based (0 = January)
    const year = date.getFullYear();
  
    // Create a new Date object with the formatted date
    const formattedDate = new Date(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
  
    return formattedDate;
  }