import React from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";



const LeavesQuantity = () => {
	// Sample hardcoded data for frontend-only view
	const leavesData = [
		{ date: '2024-08-01', quantity: 50, status: 'Accepted' },
		{ date: '2024-08-05', quantity: 40, status: 'Pending' },
		{ date: '2024-08-10', quantity: 60, status: 'Accepted' },
		{ date: '2024-08-15', quantity: 30, status: 'Rejected' },
	];

	return (
		<div className="flex min-h-screen bg-gray-50">
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
					<h1 className="text-3xl font-bold mb-2">Quota Management</h1>
					<p className="text-gray-500 mb-6">Track your raw tea leaves quota and manage your contributions to the factory.</p>

					{/* Search Bar */}
					<div className="mb-6">
						<input
							type="text"
							placeholder="Search by date or quantity"
							className="w-full px-4 py-3 rounded-lg border bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
						/>
					</div>

					{/* Table */}
					<div className="bg-white rounded-lg shadow border">
						<table className="min-w-full text-left">
							<thead>
								<tr className="border-b">
									<th className="px-6 py-4 text-gray-500 font-semibold">Date</th>
									<th className="px-6 py-4 text-gray-500 font-semibold">Quantity (kg)</th>
									<th className="px-6 py-4 text-gray-500 font-semibold">Status</th>
								</tr>
							</thead>
							<tbody>
								{leavesData.map((row, idx) => (
									<tr key={idx} className="border-b last:border-none">
										<td className="px-6 py-4 text-gray-700">{row.date}</td>
										<td className="px-6 py-4 text-gray-700">{row.quantity}</td>
										<td className="px-6 py-4">
											<span className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium">{row.status}</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</main>
			</div>
		</div>
	);
};

export default LeavesQuantity;
