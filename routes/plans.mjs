import express from "express";
import Plan from "../models/plan.js";

const router = express.Router();

// Getting all
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one
router.get("/id/:id", async (req, res) => {
  const idValue = req.params.id;
  try {
    const plans = await Plan.find({"_id": idValue});
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting with email
router.get("/email/:email", getPlanByEmail, async (req, res) => {
  try {
    res.json(res.plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Creating one
router.post("/", async (req, res) => {
  const plan = new Plan({
    email: req.body.email,
    name: req.body.name,
    planData: {
      title: req.body.planData.title,
      date: req.body.planData.date,
      description: req.body.planData.description,
      links: req.body.planData.links,
      location: req.body.planData.location,
      isGoogleCalendarEvent: req.body.planData.isGoogleCalendarEvent,
      googleCalendarId: req.body.planData.googleCalendarId,
    },
  });
  try {
    const newPlan = await plan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating one
router.patch("/:id", getPlan, async (req, res) => {
  if (req.body.email != null) {
    res.plan.email = req.body.email;
  }
  if (req.body.name != null) {
    res.plan.name = req.body.name;
  }
  if (req.body.planData != null) {
    res.plan.planData = req.body.planData;
  }
  try {
    const updatedPlan = await res.plan.save();
    res.json(updatedPlan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Deleting one
router.delete("/:id", getPlan, async (req, res) => {
  try {
    await res.plan.deleteOne();
    res.json({ message: "Deleted plan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPlan(req, res, next) {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    return res.status(400).json({ message: "Missing plan id" });
  }

  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      console.log("Plan not found");
      return res.status(404).json({ message: "Cannot find desired plan" });
    }
    res.plan = plan;
    next();
  } catch (err) {
    console.error("Error fetching plan:", err);
    return res.status(500).json({ message: err.message });
  }
}

async function getPlanByEmail(req, res, next) {
  const email = req.params.email;
  if (!email) {
    return res.status(400).json({ message: "Missing email" });
  }
  try {
    const plan = await Plan.find({ email: email });
    if (!plan) {
      return res.status(404).json({ message: "Cannot find desired plan" });
    }

    res.plan = plan;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default router;
