import { useSelector } from "react-redux";

export default function Notifications() {
  const notifications = useSelector((state) => state.notification);

  return (
    <div id="notifications">
      <h2>Notifications</h2>
      <div>
        {notifications.length === 0 ? (
          <p className="noData">No notifications to show</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
