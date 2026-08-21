import { useState } from 'react';
import Notification from '../components/Notification';
import { sellTicket } from '../services/ticketService';

const SellTicket = () => {
    const [form, setForm] = useState({
        title: '',
        category: 'event',
        price: '',
        eventDate: '',
        eventTime: '',
        location: '',
        seatInfo: '',
        imageData: ''
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const updatedForm = { ...form, [e.target.name]: e.target.value };
        setForm(updatedForm);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setForm({ ...form, imageData: '' });
            return;
        }

        if (file.size > 4 * 1024 * 1024) {
            setError('Image is too large. Please upload an image smaller than 4MB.');
            setForm({ ...form, imageData: '' });
            return;
        }

        setError(null);
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm({ ...form, imageData: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);
        try {
            await sellTicket({
                title: form.title,
                category: form.category,
                price: Number(form.price),
                eventDate: form.eventDate,
                eventTime: form.eventTime,
                location: form.location,
                seatInfo: form.seatInfo,
                imageData: form.imageData
            });
            setMessage('Ticket uploaded successfully. It will be verified before listing.');
            setForm({
                title: '',
                category: 'event',
                price: '',
                eventDate: '',
                eventTime: '',
                location: '',
                seatInfo: '',
                imageData: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to upload ticket');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="form-page">
            <div className="form-card">
                <h2>Sell a ticket</h2>
                <p>Upload your ticket details and wait for verification before listing in the marketplace.</p>
                <Notification message={message} type="success" />
                <Notification message={error} type="error" />
                <form onSubmit={handleSubmit}>
                    <label>
                        Ticket Title
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Avengers: Secret Wars"
                        />
                    </label>

                    <label>
                        Category
                        <select name="category" value={form.category} onChange={handleChange}>
                            <option value="event">Event</option>
                            <option value="movie">Movie</option>
                            <option value="bus">Bus</option>
                        </select>
                    </label>

                    <label>
                        Date
                        <input
                            name="eventDate"
                            type="date"
                            value={form.eventDate}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Time
                        <input
                            name="eventTime"
                            type="time"
                            value={form.eventTime}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Location / Cinema / Route
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="e.g. INOX Cinema, Mumbai or Mumbai to Pune"
                            required
                        />
                    </label>

                    <label>
                        Seat Information (Optional)
                        <input
                            name="seatInfo"
                            value={form.seatInfo}
                            onChange={handleChange}
                            placeholder="e.g. Gold Class - A1-A2 or Sleeper 12A"
                        />
                    </label>

                    <label>
                        Upload Ticket Image
                        <input
                            name="ticketImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>

                    {form.imageData && (
                        <div className="image-upload-preview">
                            <img src={form.imageData} alt="Ticket preview" />
                        </div>
                    )}

                    <label>
                        Price
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                            placeholder="Enter your listing price"
                        />
                    </label>

                    <button type="submit" className="primary-button" disabled={loading}>
                        {loading ? 'Uploading...' : 'Submit Ticket'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SellTicket;
