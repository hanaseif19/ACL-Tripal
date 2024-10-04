import React from "react";

const ActivitiesList = ({ activities }) => {
  return (
    <div class="list" >
      {activities.map((activity) => (
        <div class="list-item" key={activity._id}>
            <div class="list-item-header">{activity.title}</div>
            <div class="list-item-attributes">
                <div class="list-item-attribute">{activity.description}</div>
                <div class="list-item-attribute">Date: {new Date(activity.date).toLocaleDateString()}</div>
                <div class="list-item-attribute">Time: {activity.time}</div>
                <div class="list-item-attribute">Location: {activity.location}</div>
                <div class="list-item-attribute">Price: {activity.price}</div>
                <div class="list-item-attribute">Category: {activity.category ? activity.category.Name : "N/A"}</div>
                <div class="list-item-attribute">Tags: {activity.tags.map((tag) => tag.name).join(", ")}</div>
                <div class="list-item-attribute">Special Discounts: {activity.specialDiscounts || "N/A"}</div>
                <div class="list-item-attribute">Booking Open: {activity.isBookingOpen ? "Yes" : "No"}</div> 
            </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesList;
