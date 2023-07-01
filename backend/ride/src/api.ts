// @ts-nocheck
import express, { application } from "express";
import Ride from "./Ride";
import { Driver } from "./Driver";
import { Passenger } from "./Passenger";
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
    const response = driver.returnDriver();
    res.status(201).json(response);
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post("/register_passenger", function (req, res) {
  const { name, email, document } = req.body;
  try {
    const passenger = new Passenger(name, email, document);
    const response = passenger.returnPassenger();
    res.status(201).json(response);
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.listen(3000);
