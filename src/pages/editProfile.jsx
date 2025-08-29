import React from "react";

const EditProfile = () => {
		return (
			<div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-3xl font-bold mb-6 text-center text-green-700">Edit Profile</h2>
				<form className="space-y-6">
					<div>
						<label className="block mb-2 font-semibold text-gray-700">Supplier_ID</label>
						<input type="text" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter your Supplier_ID" />
					</div>
					<div>
						<label className="block mb-2 font-semibold text-gray-700">Name</label>
						<input type="text" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter your name" />
					</div>
					<div>
						<label className="block mb-2 font-semibold text-gray-700">Email</label>
						<input type="email" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter your email" />
					</div>
					<div>
						<label className="block mb-2 font-semibold text-gray-700">Contact Number</label>
						<input type="number" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter your contact number" />
					</div>
					<div>
						<label className="block mb-2 font-semibold text-gray-700">Bank Account Number</label>
						<input type="number" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Enter your bank account number" />
					</div>
					<div className="flex justify-center">
						<button type="submit" className="w-30 align-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition">Save Changes</button>
				    </div>
				</form>
			</div>
		);
};

export default EditProfile;
