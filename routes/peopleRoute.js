import express from "express";
import { createpeople, deletePeople, getAllpeople, getOnePeople, updatepeople } from "../controllers/peopleController.js";

const route = express.Router();


route.post("/createpeo", createpeople);
route.get("/getallpeople", getAllpeople);
route.delete("/deletepeo/:id", deletePeople);
route.get("/getonepeople/:id", getOnePeople);
route.put("/updatepeople/:id", updatepeople);



export default route;