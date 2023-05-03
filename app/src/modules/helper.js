function getCurrentDateFormatted() {
    // Create a new Date object
    const now = new Date();

    // Get the year, month (0-indexed), and day from the Date object
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // Pad the month and day with leading zeros if they are single digit
    const formattedMonth = `${month < 10 ? "0" : ""}${month}`;
    const formattedDay = `${day < 10 ? "0" : ""}${day}`;

    // Combine the year, month, and day with hyphens to form the date string
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    // Return the formatted date string
    return formattedDate;
}

function splitText(text) {
    const length = text.length;
    if (length <= 4096) return [text];
    
    var middle = Math.floor(length/2);
    var how = Math.floor((4096*2-length)/2);
    var cut = text.lastIndexOf('\n', middle-how+1) + 1;
    if (!((cut<4096)&&(length-cut<4096))) cut=middle;
    
    const firstBlock = text.slice(0, cut);
    const lastBlock = text.slice(cut, length);
    return [firstBlock, lastBlock];
  }

  const fetchWithTimeout = async (url, options, timeout = 30000) => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPromise = fetch(url, { ...options, signal });
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
            controller.abort();
            reject(new Error('Request timed out'));
        }, timeout)
    );

    return Promise.race([fetchPromise, timeoutPromise]);
};

module.exports = {
    getCurrentDateFormatted,
    fetchWithTimeout,
    splitText
};
