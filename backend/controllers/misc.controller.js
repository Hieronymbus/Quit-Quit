

/// data cache variables ///
let cachedQuote = null;
let lastFetchedTime = null;

/// quote controller ///
export const createQuote = async (req, res) => {
    const now = Date.now();

    // Check if quote is older than 24 hours
    if (!cachedQuote || now - lastFetchedTime > 24 * 60 * 60 * 1000) {
      try {
        const response = await fetch("https://zenquotes.io/api/today");
        const data = await response.json();
        
        // Cache the new quote and update the fetch time
        cachedQuote =  data
        lastFetchedTime = now;
      } catch (err) {
        console.error(err)
        return res.status(500).json({success:false, message: "Failed to fetch quote" });
      }
    } else {

      res.status(200).json({success:true, data: cachedQuote });
    }
  
}