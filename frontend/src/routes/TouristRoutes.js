import TouristHome from "../pages/tourist/TouristHome";
import TouristProfile from "../pages/tourist/TouristProfile";
import UpcomingActivities from "../pages/tourist/UpcomingActivities";
import PaidActivities from "../pages/tourist/PaidActivities";
import HistoricalPlaces from "../pages/tourist/HistoricalPlaces";
import UpcomingItineraries from "../pages/tourist/UpcomingItineraries";
import PaidItineraries from "../pages/tourist/PaidItineraries";
import TouristProducts from "../pages/tourist/TouristProducts";
import TouristViewProduct from "../pages/tourist/TouristViewProduct";
import PreferenceSelection from "../components/tourist/PreferenceSelection";
import CategorySelection from "../components/tourist/CategorySelection";
import ActivityDetailsPage from "../pages/tourist/ActivityDetails";

const TouristRoutes = [
  { path: "/tourist", element: <TouristHome /> },
  { path: "/upcoming-activities", element: <UpcomingActivities /> },
  { path: "/paid-activities", element: <PaidActivities /> },
  { path: "/tourist-profile/:id", element: <TouristProfile /> },
  { path: "/historical-places", element: <HistoricalPlaces /> },
  { path: "/upcoming-itineraries", element: <UpcomingItineraries /> },
  { path: "/paid-itineraries", element: <PaidItineraries /> },
  { path: "/tourist/view-products", element: <TouristProducts /> },
  { path: "/tourist/select-preferences", element: <PreferenceSelection /> },
  { path: "/tourist/select-categories", element: <CategorySelection /> },
  { path: "/activity/:activityId", element: <ActivityDetailsPage />},
  {
    path: "/tourist/view-products/product/:id",
    element: <TouristViewProduct />,
  },
];

export default TouristRoutes;
