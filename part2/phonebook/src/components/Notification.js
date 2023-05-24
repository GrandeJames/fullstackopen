const Notification = ({ message, success }) => {
  const style = {
    color: success ? "green" : "red",
    border: success ? "3px solid darkgreen" : "3px solid darkred",
    padding: 3,
    backgroundColor: "lightgray",
    borderRadius: 5,
  };
  if (message === null) {
    return null;
  }
  return (
    <div className="notification" style={style}>
      {message}
    </div>
  );
};

export default Notification;
