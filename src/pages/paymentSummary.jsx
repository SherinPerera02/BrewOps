import React from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";


const PaymentSummary = () => {
	// Sample hardcoded data for frontend-only view
	const paymentStats = {
		total: 12000,
		totalChange: 8.5,
		average: 1000,
		averageChange: -2.1,
		last: 1100,
		lastChange: 3.2
	};
	const paymentTrends = [
		{ month: 'Jan', value: 900 },
		{ month: 'Feb', value: 950 },
		{ month: 'Mar', value: 1000 },
		{ month: 'Apr', value: 1100 },
		{ month: 'May', value: 1200 },
		{ month: 'Jun', value: 1150 },
		{ month: 'Jul', value: 1050 },
		{ month: 'Aug', value: 1200 },
		{ month: 'Sep', value: 1250 },
		{ month: 'Oct', value: 1300 },
		{ month: 'Nov', value: 1350 },
		{ month: 'Dec', value: 1400 }
	];
	const svgPoints = paymentTrends.map((pt, idx) => `${10 + idx * 40},${80 - pt.value / 40}`).join(' ');

	return (
		<div className="flex min-h-screen bg-gray-50 flex-col">
			<div className="flex-1 flex flex-col">
				<div className="flex flex-1">
					{/* Main Content */}
					<div className="flex-1 flex flex-col">
						{/* Top Bar */}
						<header className="flex items-center justify-end px-8 py-4 border-b bg-white">
							<button className="mx-2 text-gray-500 hover:text-gray-700">
								<FaBell size={22} />
							</button>
							<button className="mx-2 text-gray-500 hover:text-gray-700">
								<FaEnvelope size={22} />
							</button>
							<img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" className="w-8 h-8 rounded-full ml-4" />
						</header>

						<main className="flex-1 px-12 py-8">
							<h1 className="text-3xl font-bold mb-8">Payment Summary</h1>
							{/* Summary Cards */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
								<div className="bg-gray-100 rounded-lg p-6 flex flex-col">
									<span className="text-gray-500 font-medium mb-2">Total Amount Paid</span>
									<span className="text-2xl font-bold mb-1">${paymentStats.total.toLocaleString()}</span>
									<span className="text-green-600 font-semibold">+{paymentStats.totalChange}%</span>
								</div>
								<div className="bg-gray-100 rounded-lg p-6 flex flex-col">
									<span className="text-gray-500 font-medium mb-2">Average Payment</span>
									<span className="text-2xl font-bold mb-1">${paymentStats.average.toLocaleString()}</span>
									<span className="text-red-600 font-semibold">{paymentStats.averageChange}%</span>
								</div>
								<div className="bg-gray-100 rounded-lg p-6 flex flex-col">
									<span className="text-gray-500 font-medium mb-2">Last Payment</span>
									<span className="text-2xl font-bold mb-1">${paymentStats.last.toLocaleString()}</span>
									<span className="text-green-600 font-semibold">+{paymentStats.lastChange}%</span>
								</div>
							</div>

							{/* Payment Trends */}
							<h2 className="text-xl font-bold mb-4">Payment Trends</h2>
							<div className="bg-white rounded-lg shadow border p-8 mb-10">
								<div className="mb-4">
									<span className="text-lg font-bold">Payment Trends Over Time</span>
									<div className="text-2xl font-bold mt-2">${paymentStats.total.toLocaleString()}</div>
									<div className="text-gray-500">Last 12 Months <span className="text-green-600 font-semibold">+{paymentStats.totalChange}%</span></div>
								</div>
								{/* Simple SVG Chart */}
								<svg viewBox="0 0 300 80" className="w-full h-20">
									<polyline
										fill="none"
										stroke="#2d3748"
										strokeWidth="3"
										points={svgPoints}
									/>
									{paymentTrends.map((pt, idx) => (
										<text key={pt.month} x={10 + idx * 40} y={75} fontSize="12" fill="#718096">{pt.month}</text>
									))}
								</svg>
							</div>
							{/* Footer */}
							<footer className="flex justify-between items-center px-12 py-6 text-gray-500 text-sm bg-white border-t">
								<div className="flex w-full justify-between">
									<span>Privacy Policy</span>
									<span>@2024 BrewOps. All rights reserved.</span>
									<span>Terms of Service</span>
								</div>
							</footer>
						</main>
					</div>
				</div>
			</div>
		</div>
	);

}
export default PaymentSummary;