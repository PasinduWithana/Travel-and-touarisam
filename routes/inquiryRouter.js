import express from "express";
import { addInquiry, deleteInquiries, getInquiries, updateInquiry } from "../controllers/inquiryController.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/",addInquiry);
inquiryRouter.get("/",getInquiries);
inquiryRouter.delete("/:id",deleteInquiries);
inquiryRouter.put("/:id",updateInquiry)
export default inquiryRouter;
