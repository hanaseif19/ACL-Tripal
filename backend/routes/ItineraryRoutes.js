const express = require('express');
const router = express.Router();
const validateIDs = require("../middleware/IDMiddleware");
const { addRating, getRatings } = require("../controllers/RatingController");
const Itinerary = require("../models/Itinerary");
const ItineraryRating = require("../models/ItineraryRating");

const { createItinerary, getItineraries, updateItinerary, 
    deleteItinerary, viewItineraries, getItineraryRatings, addItineraryComment,
     viewUpcomingItineraries,viewPaidItineraries,
    getItineraryComments,bookItinerary, getTouristItineraries,cancelBooking } = require('../controllers/ItineraryController');

router.post('/itinerary', createItinerary);
router.get('/itinerary', getItineraries);
router.put('/itinerary/:id', updateItinerary);
router.delete('/itinerary/:id', deleteItinerary);
router.get('/itinerary/upcoming/view', viewUpcomingItineraries);
router.get('/itinerary/paid/view', viewPaidItineraries);
router.get('/itinerary/view', viewItineraries);
router.get('/itineraries/booked-itineraries/:touristId', getTouristItineraries);

router.post("/itinerary/:id/ratings", validateIDs(["id", "userID"]), addRating(Itinerary, ItineraryRating, 'itineraryID'));
router.get("/itinerary/:id/ratings", validateIDs(["id"]), getRatings(Itinerary, ItineraryRating, 'itineraryID'));
router.get('/itineraryRatings/:id', getItineraryRatings);
router.post('/itineraries/:itineraryId/book', bookItinerary);
router.post('/itineraries/:itineraryId/cancel', cancelBooking);

module.exports = router;