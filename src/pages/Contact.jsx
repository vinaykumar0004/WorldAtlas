export const Contact = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formInputData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInputData),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Something went wrong. Try again.");
      console.error(error);
    }
  };

  return (
    <section className="d-flex section-contact">
      <h2 className="container-title">Contact Us</h2>

      <div className="contact-wrapper container">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            name="username"
            required
            autoComplete="off"
          />

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="email"
            required
            autoComplete="off"
          />

          <textarea
            className="form-control"
            rows="10"
            placeholder="Enter your message"
            name="message"
            required
            autoComplete="off"
          ></textarea>

          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
};
