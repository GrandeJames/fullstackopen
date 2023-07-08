const Notification = ({ notification }) => {
  const { message } = notification;
  const { success } = notification;
  return (
    <div
      style={{
        border: `2px solid ${success ? "green" : "red"}`,
        borderRadius: "5px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        color: `${success ? "green" : "red"}`,
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
