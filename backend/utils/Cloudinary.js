import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export class Cloudinary {
  static async upload(filepath) {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const rootDir = path.join(__dirname, "..", "..");

      const result = await cloudinary.uploader.upload(filepath, {
        folder: "chat_app",
      });

      if (result) {
        fs.unlink(rootDir + "\\" + filepath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }
          console.log("File deleted successfully");
        });
      }
      return result.secure_url;
    } catch (error) {
      console.log("Error during uploading to cloudinary", error);
    }
  }
}
