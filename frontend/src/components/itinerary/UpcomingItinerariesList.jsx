import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Stars from "../common/Stars";
import Pagination from "@/components/activity/Pagination";
import { message } from "antd";
import { getUserData } from "@/api/UserService";
import { bookmarkEvent } from "@/api/TouristService";

import {
  viewUpcomingItineraries,
  getItinerariesByTourGuide,
} from "@/api/ItineraryService";
import { getAdminItineraries } from "@/api/AdminService";
import Spinner from "../common/Spinner";
import {
  getConversionRate,
  getTouristCurrency,
} from "@/api/ExchangeRatesService";

export default function ItinerariesList({
  searchTerm,
  page,
  refItineraryDetails,
  onFirstItineraryId,
}) {
  //#region States
  const [sortOption, setSortOption] = useState("");
  const [ddActives, setDdActives] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const dropDownContainer = useRef();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [userRole, setUserRole] = useState(null);

  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState(itineraries);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itinerariesPerPage = 5;

  const sortOptions = [
    { label: "Price: Low to High", field: "price", order: "asc" },
    { label: "Price: High to Low", field: "price", order: "desc" },
    { label: "Rating: Low to High", field: "ratings", order: "asc" },
    { label: "Rating: High to Low", field: "ratings", order: "desc" },
  ];

  const errorDisplayed = useRef(false);
  const indexOfLastItinerary = currentPage * itinerariesPerPage;
  const indexOfFirstItinerary = indexOfLastItinerary - itinerariesPerPage;
  const currentItineraries = filteredItineraries.slice(
    indexOfFirstItinerary,
    indexOfLastItinerary
  );

  const [currency, setCurrency] = useState("EGP");

  const getExchangeRate = async () => {
    if (currency) {
      try {
        const rate = await getConversionRate(currency);
        setExchangeRate(rate);
      } catch (error) {
        message.error("Failed to fetch exchange rate.");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCurrency = getTouristCurrency();
      setCurrency(newCurrency);
      getExchangeRate();
    }, 1);
    return () => clearInterval(intervalId);
  }, [currency]);

  //#endregion

  //#region useEffect
  useEffect(() => {
  setCurrentPage(1);
  }, [filteredItineraries]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response.data.status === "success") {
          setUserRole(response.data.role);
        } else if (response.data.message === "No token found.") {
          setUserRole("Guest");
        } else {
          if (!errorDisplayed.current) {
            errorDisplayed.current = true;
          }
        }
      } catch (error) {
        if (!errorDisplayed.current) {
          errorDisplayed.current = true;
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchItineraries = async () => {
      setLoading(true);
      try {
        let response;
        if (userRole === "Tourist" || userRole === "Guest") {
          response = await viewUpcomingItineraries();
        } else if (userRole === "Admin") {
          response = await getAdminItineraries();
        } else if (userRole === "Tour Guide") {
          response = await getItinerariesByTourGuide();
        }
        const itinerariesData = Array.isArray(response?.data)
          ? response?.data
          : [];
        setItineraries(itinerariesData);
        setFilteredItineraries(itinerariesData);
      } catch (err) {
        const errorMessage =
          err?.response?.data?.error ||
          err?.message ||
          "Error fetching itineraries.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    if (userRole) {
      fetchItineraries();
    }
  }, [userRole]);

  useEffect(() => {
    const filtered = itineraries.filter((itinerary) => {
      const itineraryStartDate = new Date(itinerary.startDate);
      const itineraryRating = itinerary.averageRating;
      const itineraryPrice = itinerary.price * exchangeRate;
      const itineraryTags = itinerary.tags.map((tag) => tag.toLowerCase());
      const itineraryLanguage = itinerary.language
        ? itinerary.language.toLowerCase()
        : "";

      const isDateValid =
        !startDate ||
        !endDate ||
        (itineraryStartDate >= new Date(startDate.setHours(0, 0, 0, 0)) &&
          itineraryStartDate <= new Date(endDate.setHours(23, 59, 59, 999)));
      const isRatingValid =
        ratingFilter.length === 0 ||
        ratingFilter.some((rating) => itineraryRating >= rating);

      const isLanguageValid =
        !selectedLanguage ||
        itineraryLanguage
          .toLowerCase()
          .startsWith(selectedLanguage.toLowerCase());

      const isPriceValid =
        itineraryPrice >= priceRange[0] && itineraryPrice <= priceRange[1];
      const isSearchValid =
        itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itinerary.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const isCategoryValid =
        selectedCategories.length === 0 ||
        selectedCategories.some(
          (cat) => itineraryTags.includes(cat.toLowerCase()) // Check if any tag matches selected categories
        );

      return (
        isDateValid &&
        isRatingValid &&
        isPriceValid &&
        isSearchValid &&
        isCategoryValid &&
        isLanguageValid
      );
    });

    setFilteredItineraries(filtered);
    setCurrentPage(1);
  }, [
    startDate,
    endDate,
    itineraries,
    ratingFilter,
    selectedCategories,
    priceRange,
    searchTerm,
    exchangeRate,
    selectedLanguage,
  ]);

  useEffect(() => {}, [filteredItineraries]);

  useEffect(() => {
    if (filteredItineraries.length > 0) {
      onFirstItineraryId(filteredItineraries[0]._id);
    }
  }, [filteredItineraries, onFirstItineraryId]);

  const handleSort = (field, order) => {
    const sortedItineraries = [...filteredItineraries].sort((a, b) => {
      let aValue, bValue;

      if (field === "price") {
        aValue = a.price;
        bValue = b.price;
      } else if (field === "ratings") {
        aValue = a.averageRating;
        bValue = b.averageRating;
      }
      return order === "asc" ? aValue - bValue : bValue - aValue;
    });
    setFilteredItineraries(sortedItineraries);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (
        dropDownContainer.current &&
        !dropDownContainer.current.contains(event.target)
      ) {
        setDdActives(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleShare = (link) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this itinerary!",
          url: link,
        })
        .catch(() => {
          message.error("Failed to share");
        });
    } else {
      window.location.href = `mailto:?subject=Check out this itinerary!&body=Check out this link: ${link}`;
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const navigate = useNavigate();
  const handleRedirect = (itineraryId) => {
    if (
      userRole === "Tourist" ||
      userRole === "Admin" ||
      userRole === "Tour Guide"
    )
      navigate(`/itinerary/${itineraryId}`, { state: { page } });
    else navigate(`/itineraries/${itineraryId}`, { state: { page } });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleBookmark = async (eventId, eventType) => {
    try {
      await bookmarkEvent(eventId, eventType);
      message.success("Added Event to Bookmark");
    } catch (error) {
      console.error("Error bookmarking event:", error);
    }
  };
  
  //#endregion
  if (loading) return <Spinner />;
  return (
    <section className="layout-pb-xl">
      <div className="container">
        <div className="row">
          {userRole !== "Admin" && (
            <div className="col-xl-3 col-lg-4">
              {(userRole === "Tourist" ||
                userRole === "Guest" ||
                userRole === "Tour Guide") && (
                <>
                  <div className="lg:d-none">
                    <Sidebar
                      userRole={userRole}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      setRatingFilter={setRatingFilter}
                      setCategoryFilter={setSelectedCategories}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      setLanguageFilter={setSelectedLanguage}
                    />
                  </div>

                  <div className="accordion d-none mb-30 lg:d-flex js-accordion">
                    <div
                      className={`accordion__item col-12 ${
                        sidebarActive ? "is-active" : ""
                      } `}
                    >
                      <button
                        className="accordion__button button -dark-1 bg-light-1 px-25 py-10 border-1 rounded-12"
                        onClick={() => setSidebarActive((pre) => !pre)}
                      >
                        <i className="icon-sort-down mr-10 text-16"></i>
                        Filter
                      </button>

                      <div
                        className="accordion__content"
                        style={sidebarActive ? { maxHeight: "2000px" } : {}}
                      >
                        <div className="pt-20">
                          <Sidebar
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            setRatingFilter={setRatingFilter}
                            setCategoryFilter={setSelectedCategories}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setLanguageFilter={setSelectedLanguage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <div
            className={`col-xl-${userRole === "Admin" ? "12" : "9"} col-lg-${
              userRole === "Admin" ? "12" : "8"
            }`}
          >
            <div className="row y-gap-5 justify-between">
              <div className="col-auto">
                <div>
                  <span>{filteredItineraries?.length} results</span>
                </div>
              </div>

              <div ref={dropDownContainer} className="col-auto">
                <div
                  className={`dropdown -type-2 js-dropdown js-form-dd ${
                    ddActives ? "is-active" : ""
                  } `}
                  data-main-value=""
                >
                  <div
                    className="dropdown__button js-button"
                    onClick={() => setDdActives((pre) => !pre)}
                  >
                    <span>Sort by: </span>
                    <span className="js-title">
                      {sortOption ? sortOption : ""}
                    </span>
                    <i className="icon-chevron-down"></i>
                  </div>

                  <div className="dropdown__menu js-menu-items">
                    {sortOptions.map((elm, i) => (
                      <div
                        onClick={() => {
                          setSortOption(elm.label);
                          handleSort(elm.field, elm.order);
                          setDdActives(false);
                        }}
                        key={i}
                        className="dropdown__item"
                        data-value="fast"
                      >
                        {elm.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="row y-gap-30 pt-30">
              {currentItineraries?.map((elm, i) => (
                <div className="col-12" key={i}>
                  <div className="tourCard -type-2">
                    <div className="tourCard__image">
                      <img
                        src="/img/activities/touristsGroup1.jpg"
                        alt="image"
                        onClick={() => handleRedirect(elm._id)}
                      />

                      {elm.badgeText && (
                        <div className="tourCard__badge">
                          <div className="bg-accent-1 rounded-12 text-white lh-11 text-13 px-15 py-10">
                            {elm.specialDiscounts}
                          </div>
                        </div>
                      )}

                      {elm.featured && (
                        <div className="tourCard__badge">
                          <div className="bg-accent-2 rounded-12 text-white lh-11 text-13 px-15 py-10">
                            FEATURED
                          </div>
                        </div>
                      )}

                      <div
                        className="tourCard__favorite"
                        style={{ display: "flex", gap: "10px" }}
                      >
                        <button
                          className="button -accent-1 size-35 bg-white rounded-full flex-center"
                          onClick={() =>
                            handleShare(
                              `${window.location.origin}/itineraries/${elm._id}`
                            )
                          }
                        >
                          <i className="icon-share text-15"></i>
                        </button>
                        <button className="button -accent-1 size-35 bg-white rounded-full flex-center" onClick={() => handleBookmark(elm._id, "itinerary")}
                        >
                          <i className="icon-heart text-15"></i>
                        </button>
                      </div>
                    </div>

                    <div className="tourCard__content">
                      <h3 className="tourCard__title mt-5">
                        <span>{elm.title}</span>
                      </h3>
                      <div className="d-flex items-center mt-5">
                        <div className="d-flex items-center x-gap-5">
                          <Stars star={elm.averageRating} font={12} />
                        </div>

                        <div className="text-14 ml-10">
                          <span className="fw-500">
                            {elm.averageRating.toFixed(2)}
                          </span>
                          ({elm.totalRatings})
                        </div>
                      </div>

                      <p className="tourCard__text mt-5">
                        {truncateText(elm.description, 50)}
                      </p>
                      <div className="row x-gap-20 y-gap-5 pt-30">
                        {elm.tags?.map((elm2, i2) => (
                          <div key={i2} className="col-auto">
                            <div className="text-14 text-accent-1">{elm2}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="tourCard__info">
                      <div>
                        <div className="d-flex items-center text-14">
                          <i className="icon-calendar mr-10"></i>
                          {formatDate(elm.startDate)}
                        </div>
                        <div className="d-flex items-center text-14">To</div>
                        <div className="d-flex items-center text-14">
                          <i className="icon-calendar mr-10"></i>
                          {formatDate(elm.endDate)}
                        </div>
                        <div className="tourCard__price">
                          {currency} {(elm.price * exchangeRate).toFixed(2)}
                          <div className="d-flex items-center">
                            <span className="text-20 fw-500 ml-5"></span>
                          </div>
                        </div>
                      </div>

                      <button
                        className="button -outline-accent-1 text-accent-1"
                        onClick={() => handleRedirect(elm._id)}
                        ref={i === 0 ? refItineraryDetails : null}
                      >
                        View Details
                        <i className="icon-arrow-top-right ml-10"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-center flex-column mt-60">
              {filteredItineraries?.length > itinerariesPerPage && (
                <Pagination
                  totalItems={filteredItineraries.length}
                  itemsPerPage={itinerariesPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
