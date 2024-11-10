import React, { useEffect, useState } from "react";
import { getConversionRate } from "../../api/ExchangeRatesService";
import { message } from "antd";
import { CopyOutlined, ShareAltOutlined,InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HistoricalPlacesList = ({ places = [], curr = "EGP" }) => {
  const [exchangeRate, setExchangeRate] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (curr) {
        try {
          const rate = await getConversionRate(curr);
          setExchangeRate(rate);
        } catch (error) {
          message.error("Failed to fetch exchange rate.");
        }
      }
    };

    fetchExchangeRate();
  }, [curr]);

  const convertPrice = (price) => {
    return (price * exchangeRate).toFixed(2);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        message.success("Link copied to clipboard!");
      })
      .catch((error) => {
        message.error("Failed to copy link");
      });
  };

  const handleShare = (link) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this historical place!",
          url: link,
        })
        .catch((error) => {
          message.error("Failed to share");
        });
    } else {
      window.location.href = `mailto:?subject=Check out this historical place!&body=Check out this link: ${link}`;
    }
  };


  return (
    <div className="list">
      {places.map((place) => (
        <div className="list-item" key={place._id}>
          <div
            className="list-item-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>{place.name}</div>
            <div>
              <CopyOutlined
                onClick={() =>
                  handleCopyLink(
                    `${window.location.origin}/historical-places/${place._id}`
                  )
                }
                style={{ marginRight: "10px", cursor: "pointer" }}
              />
              <ShareAltOutlined
                onClick={() =>
                  handleShare(
                    `${window.location.origin}/historical-places/${place._id}`
                  )
                }
                style={{ cursor: "pointer" }}
              />
              <InfoCircleOutlined 
                                     onClick={() => {
                                        navigate(`/historical-places/${place._id}`, { state: { places } });
                                    }}

                                    style={{ color: 'white', marginRight: '10px', cursor: 'pointer' }}
                                    />
            </div>
          </div>
          <div className="list-item-attributes-image">
            <div className="list-item-attribute-img">
              {/* {place.images && place.images.length > 0 && (
                <img
                  src={place.images[0].url}
                  alt={place.name}
                  style={{ width: "200px" }}
                />
              )} */}
            </div>
            <div className="list-item-attributes">
              <div className="list-item-attribute">{place.description}</div>
              <div className="list-item-attribute">
                Location: {place.location.address}
              </div>
              <div className="list-item-attribute">
                Opening Hours: Weekdays{" "}
                {place.openingHours.weekdays.openingTime} -{" "}
                {place.openingHours.weekdays.closingTime}, Weekends{" "}
                {place.openingHours.weekends.openingTime} -{" "}
                {place.openingHours.weekends.closingTime}
              </div>
              <div className="list-item-attribute">
                Ticket Prices: Foreigner: {curr}{" "}
                {convertPrice(place.ticketPrices.foreigner)}, Native: {curr}{" "}
                {convertPrice(place.ticketPrices.native)}, Student: {curr}{" "}
                {convertPrice(place.ticketPrices.student)}
              </div>
              <div className="list-item-attribute">
                Tags:{" "}
                {place.tags && place.tags.length > 0
                  ? place.tags.map((tag) => tag.name).join(", ")
                  : "N/A"}
              </div>
              <div className="list-item-attribute">
                Duration Tags:{" "}
                {place.historicalPeriod && place.historicalPeriod.length > 0
                  ? place.historicalPeriod.map((tag) => tag.name).join(", ")
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoricalPlacesList;
