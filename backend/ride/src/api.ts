// @ts-nocheck
import express, { application } from "express";
import { calculate } from "./RideCalculator";
import Ride from "./Ride";
import { Driver } from "./Driver";
const app = express();

app.use(express.json());

app.post("/calculate_ride", function (req, res) {
  try {
    const ride = new Ride();
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    res.json({ price });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post("/register_driver", function (req, res) {
  const { name, email, document, carPlate } = req.body;
  try {
    const driver = new Driver(name, email, document, carPlate);
    const response = driver.retornarMotorista();
    res.json(response);
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.listen(() => {
  console.log(`Api rodando na porta ${3000}`);
}, 3000);
