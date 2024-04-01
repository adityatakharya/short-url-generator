const shortid = require("shortid");
const urlDatabase = require("../models/urlDatabase")

async function handleGenerateShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const generatedShortID = shortid();

  
    await urlDatabase.create({
      originalURL: body.url,
      shortenedURL: generatedShortID,
      visitHistory: [],
      createdBy: req.user._id,
    });

  return res.redirect("/url");
}

async function handleDecodeShortURL(req, res) {
    const fetchedShortID = req.params.shortID;
    const currURLData = await urlDatabase.findOneAndUpdate(
      {
        shortenedURL: fetchedShortID,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    
    if(!currURLData) return res.status(404).redirect("/error/404");
    return res.redirect(currURLData.originalURL);
}

module.exports = {
  handleGenerateShortURL,
  handleDecodeShortURL,
};