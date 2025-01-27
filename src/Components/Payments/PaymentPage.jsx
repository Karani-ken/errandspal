import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PaymentPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const navigate = useNavigate();
    const { planName, price } = location.state || {};
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    // Decode the token to extract the user ID
    useEffect(() => {
        const token = localStorage.getItem("token"); // Replace "token" with your actual token key
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.id); // Assuming the token contains a "userId" field
            } catch (error) {
                console.error("Error decoding token:", error);
                alert("Session expired. Please log in again.");
                navigate("/login");
            }
        } else {
            alert("You are not logged in.");
            navigate("/login");
        }
    }, [navigate]);

    const generateTransactionId = () => {
        const timestamp = Date.now(); // Current timestamp in milliseconds
        const randomString = Math.random().toString(36).substr(2, 9); // Random string with 9 characters
        return `${timestamp}-${randomString}`;
    };
    const transactionId = generateTransactionId();
    const handlePayment = async () => {
        if (!userId) {
            alert("User ID not found. Please log in again.");
            navigate("/login");
            return;
        }

        setIsLoading(true);

        try {
            // Step 1: Initiate Payment
            const paymentResponse = await fetch(`${apiUrl}/api/payments/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    amount: price,
                    paymentMethod: "credit_card",
                    transactionId // Replace with actual logic
                }),
            });

            const paymentData = await paymentResponse.json();

            if (paymentResponse.ok) {
                // Step 2: Save Subscription
                const subscriptionResponse = await fetch(`${apiUrl}/api/subscriptions/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        planName: planName.toLowerCase(),
                        price,
                        startDate: new Date().toISOString(),
                        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), // Example: 1 month later
                    }),
                });

                const subscriptionData = await subscriptionResponse.json();

                if (subscriptionResponse.ok) {
                    alert("Payment and subscription successful! Redirecting...");
                    navigate("/dashboard");
                } else {
                    alert(subscriptionData.message || "Failed to save subscription.");
                }
            } else {
                alert(paymentData.message || "Payment failed.");
            }
        } catch (error) {
            console.error("Error during payment process:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Confirm Payment</h2>
                <p className="text-lg mb-6">
                    You are subscribing to the <strong>{planName}</strong> plan for{" "}
                    <strong>KES {price}</strong>.
                </p>
                <button
                    onClick={handlePayment}
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Pay Now
                </button>
                {isLoading && (
                    <div className="loader-container">
                        <span className="loader"></span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
