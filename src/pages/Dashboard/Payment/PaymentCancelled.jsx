import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="text-white flex flex-col items-center justify-center py-20">
            <h1 className="text-3xl font-bold">Payment is cancelled</h1>
            <p className="text-lg font-semibold">Please try again</p>
            <Link to="/dashboard/my-profile"><button className="btn btn-primary mt-4">Try Again Now!</button></Link>
        </div>
    );
};

export default PaymentCancelled;