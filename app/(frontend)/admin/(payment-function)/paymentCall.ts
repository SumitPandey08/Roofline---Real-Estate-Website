const paymentCall = async (amount: number) => {
    try {  
        const response = await fetch('/api/payment/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to create payment intent');
        }

        return data.clientSecret;
    } catch (error) {
        console.error('Error in paymentCall:', error);
        throw error;
    }
};

export default paymentCall;