const Notification = ({ message, type }) => {
    if (!message) {
        return null;
    }
    return <div className={`notification ${type || 'info'}`}>{message}</div>;
};

export default Notification;
