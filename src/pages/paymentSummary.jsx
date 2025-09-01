import React, { useState, useEffect } from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import NavigationBar from "../components/navigationBar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { FaUserCircle, FaUser as FaUserIcon, FaFileAlt, FaMoneyBillWave, FaCog, FaPlus, FaSearch, FaLeaf, FaChartBar, FaTruck } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const PaymentSummary = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [animatedValues, setAnimatedValues] = useState({ total: 0, average: 0, last: 0 });

	// Sample hardcoded data for frontend-only view (kept from original)
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

	useEffect(() => {
		const duration = 2000;
		const steps = 60;
		const stepDuration = duration / steps;

		let currentStep = 0;
		const timer = setInterval(() => {
			currentStep++;
			const progress = currentStep / steps;
			const easeOutProgress = 1 - Math.pow(1 - progress, 3);

			setAnimatedValues({
				total: Math.floor(paymentStats.total * easeOutProgress),
				average: Math.floor(paymentStats.average * easeOutProgress),
				last: Math.floor(paymentStats.last * easeOutProgress)
			});

			if (currentStep >= steps) {
				clearInterval(timer);
				setAnimatedValues({ total: paymentStats.total, average: paymentStats.average, last: paymentStats.last });
			}
		}, stepDuration);

		return () => clearInterval(timer);
	}, []);

	const svgPoints = paymentTrends.map((pt, idx) => `${20 + idx * 25},${60 - (pt.value - 800) / 15}`).join(' ');

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat('en-LK', {
			style: 'currency',
			currency: 'LKR',
			minimumFractionDigits: 0
		}).format(amount);
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<NavigationBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

			<div className="flex flex-1">
				{/* Sidebar */}
				<div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 transition-transform duration-300 ease-in-out`}>
					<div className="w-80 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-r border-gray-700 h-full">
						<div className="p-6 h-full flex flex-col">
							<div className="flex items-center space-x-4 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
								<div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
									<FaUserCircle className="text-white text-2xl" />
								</div>
								<div>
									<h3 className="text-white font-semibold">Supplier Portal</h3>
									<p className="text-gray-400 text-sm">Tea Leaf Supplier</p>
								</div>
							</div>

							<div className="space-y-2">
											
								<Link 
								to="/" 
								className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
								>
								<FaFileAlt className="text-xl" />
								<span>Home</span>
								</Link>	
								<Link to="/SupplierDashboard" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
									<MdDashboard className="text-xl" />
									<span className="font-medium">Dashboard</span>
								</Link>
								<Link to="/suppliers/transactions" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
									<FaFileAlt className="text-xl" />
									<span>Supply Records</span>
								</Link>
								<Link to="/suppliers/paymentSummary" className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 text-white shadow-md">
									<FaMoneyBillWave className="text-xl" />
									<span>Payment Records</span>
								</Link>
								<Link to="/suppliers/editProfile" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
									<FaUserIcon className="text-xl" />
									<span>Edit Profile</span>
								</Link>
								<Link to="/supplier/settings" className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200">
									<FaCog className="text-xl" />
									<span>Settings</span>
								</Link>
							</div>

							<div className="mt-8">
								<h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 mb-4">Quick Actions</h4>
								<div className="space-y-3">
									<Link to="/supplier/create-supply-recode" className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-800 transition-all duration-200 shadow-lg">
										<FaPlus className="text-lg" />
										<span className="font-medium">New Supply Record</span>
									</Link>
									<button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg">
										<FaSearch className="text-lg" />
										<span className="font-medium">Search Records</span>
									</button>
								</div>
							</div>

							<div className="space-y-4 mt-auto">
								<h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider border-b border-gray-700 pb-2 my-4">Quick Stats</h4>
								<div className="grid grid-cols-1 gap-4">
									<div className="bg-gradient-to-r from-green-600 to-emerald-700 p-4 rounded-xl shadow-lg">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-green-100 text-sm">Monthly Delivery</p>
												<p className="text-white text-2xl font-bold">-- kg</p>
											</div>
											<FaLeaf className="text-green-200 text-2xl" />
										</div>
									</div>

									<div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-blue-100 text-sm">Quality Score</p>
												<p className="text-white text-2xl font-bold">--%</p>
											</div>
											<FaChartBar className="text-blue-200 text-2xl" />
										</div>
									</div>

									<div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-xl shadow-lg">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-purple-100 text-sm">Monthly Revenue</p>
												<p className="text-white text-xl font-bold">Rs. --</p>
											</div>
											<FaMoneyBillWave className="text-purple-200 text-2xl" />
										</div>
									</div>

									<div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-xl shadow-lg">
										<div className="flex items-center justify-between">
											<div>
												<p className="text-orange-100 text-sm">Delivery Rate</p>
												<p className="text-white text-2xl font-bold">--%</p>
											</div>
											<FaTruck className="text-orange-200 text-2xl" />
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>

				{/* Main content */}
				<main className="flex-1 container mx-auto px-4 py-6">

					<div className="text-center mb-6">
						<h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">Payment Summary</h1>
						<p className="text-gray-500">Track your financial performance</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h3 className="text-sm font-medium text-gray-500">Total Amount Paid</h3>
							<p className="text-2xl font-bold text-green-600">{formatCurrency(animatedValues.total)}</p>
							<p className="text-gray-400 text-sm mt-1">Change: <span className="font-medium text-green-500">+{paymentStats.totalChange}%</span></p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h3 className="text-sm font-medium text-gray-500">Average Payment</h3>
							<p className="text-2xl font-bold text-blue-600">{formatCurrency(animatedValues.average)}</p>
							<p className="text-gray-400 text-sm mt-1">Change: <span className="font-medium text-red-500">{paymentStats.averageChange}%</span></p>
						</div>
						<div className="bg-white p-4 rounded-lg shadow-md">
							<h3 className="text-sm font-medium text-gray-500">Last Payment</h3>
							<p className="text-2xl font-bold text-purple-600">{formatCurrency(animatedValues.last)}</p>
							<p className="text-gray-400 text-sm mt-1">Change: <span className="font-medium text-green-500">+{paymentStats.lastChange}%</span></p>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md mb-6">
						<div className="flex items-center justify-between mb-4">
							<div>
								<h2 className="text-xl font-bold text-gray-800">Payment Trends</h2>
								<p className="text-gray-500 text-sm">Monthly payment overview</p>
							</div>
							<div className="text-right">
											<p className="text-xl font-bold text-gray-800">{formatCurrency(paymentStats.total)}</p>
								<p className="text-gray-500 text-sm">Last 12 Months <span className="text-green-500 font-semibold ml-2">+{paymentStats.totalChange}%</span></p>
							</div>
						</div>

						<div className="relative">
							<svg viewBox="0 0 320 80" className="w-full h-36 md:h-44">
								<defs>
									<linearGradient id="chartGradientPS" x1="0%" y1="0%" x2="100%" y2="0%">
										<stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8"/>
										<stop offset="50%" stopColor="#EC4899" stopOpacity="0.6"/>
										<stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8"/>
									</linearGradient>
									<filter id="glowPS">
										<feGaussianBlur stdDeviation="3" result="coloredBlur"/>
										<feMerge>
											<feMergeNode in="coloredBlur"/>
											<feMergeNode in="SourceGraphic"/>
										</feMerge>
									</filter>
								</defs>

								{[20, 35, 50].map(y => (
									<line key={y} x1="20" y1={y} x2="300" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
								))}

								<polyline
									fill="none"
									stroke="url(#chartGradientPS)"
									strokeWidth="3"
									points={svgPoints}
									filter="url(#glowPS)"
								/>

								{paymentTrends.map((pt, idx) => (
									<g key={pt.month}>
										<circle cx={20 + idx * 25} cy={60 - (pt.value - 800) / 15} r="4" fill="url(#chartGradientPS)" />
										<text x={20 + idx * 25} y={75} fontSize="10" fill="#6B7280" textAnchor="middle">{pt.month}</text>
									</g>
								))}
							</svg>
						</div>
					</div>

				</main>
			</div>

			<Footer />
		</div>
	);
};

export default PaymentSummary;