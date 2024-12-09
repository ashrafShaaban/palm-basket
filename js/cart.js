// Initialize EmailJS
emailjs.init("Ahoazfxz1vKgFoIMB"); // Replace with your user ID from EmailJS

// Example array of objects representing cart items
const cartItems = [
  { name: "Laptop", price: "$999", quantity: 1 },
  { name: "Headphones", price: "$199", quantity: 2 },
  { name: "Keyboard", price: "$89", quantity: 1 }
];

function sendEmail() {
    // Convert the array of cart items into a string format
    const cartDetails = cartItems.map(item => 
        `<p><strong>${item.name}</strong> - Price: ${item.price} x Quantity: ${item.quantity}</p>`
    ).join('');

    // Define email parameters
    const emailParams = {
        to_email: "recipient@example.com", // Email to send to
        from_name: "Customer", // From name
        message: JSON.stringify(cartItems,null,2) // The message body with cart details
    };

    // Send the email using EmailJS
    emailjs.send("service_9sz6z6m", "template_dv3sgyx", emailParams)
        .then(response => {
            console.log("Email sent successfully:", response);
            alert("Email sent successfully!");
        })
        .catch(error => {
            console.error("Error sending email:", error);
            alert("Failed to send email.");
        });
}
