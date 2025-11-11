import { Router } from "express";
import { nanoid } from "nanoid";
import UrlModel from "../models/urlModel.js";

const urlRoute = Router();

urlRoute.post("/", async (req, res) => {
  const { clientUrl } = req.body;
  try {
    if (!clientUrl) {
      return res.status(200).json({ message: "URL required!" });
    }

    //check url validity
    try {
      new URL(clientUrl);
    } catch (error) {
      return res.status(400).json({ message: "Enter a valid url!" });
    }

    const shortUrl = nanoid(5);

    await UrlModel.create({
      url: clientUrl,
      shortUrl: shortUrl,
      createdAt: new Date().toDateString(),
    });

    return res.status(201).json({
      shortUrl: `${req.protocol}://${req.hostname}:8000/${shortUrl}`,
      message: "success",
    });
  } catch (error) {
    if (error.message.includes("duplicate")) {
      const url = await UrlModel.findOne({ url: clientUrl });
      return res.status(400).json({
        message: `Duplicate URL! Your shortUrl is: ${req.protocol}://${req.hostname}:8000/${url.shortUrl}`,
      });
    }
  }
});

urlRoute.get("/:shorturl", async (req, res) => {
  console.log("hey");

  const shortUrl = req.params.shorturl;
  console.log(shortUrl);

  const existingUrl = await UrlModel.findOne({ shortUrl });
  console.log(existingUrl);

  if (!existingUrl) {
    return res.status(400).json({ message: "Invalid url!" });
  }

  res.redirect(existingUrl.url);
});

export default urlRoute;
