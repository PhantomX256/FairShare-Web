function GroupDetails() {
	return (
		<main className="flex-1 flex flex-col max-h-screen">
			<header className="h-16 border-b border-brand-border flex items-center justify-between px-8 shrink-0 backdrop-blur-md">
				<h2 className="text-white font-headline font-semibold text-lg">
					Group Details
				</h2>
				<div className="flex items-center gap-4">
					<div className="relative">
						<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
							search
						</span>
						<input
							className="bg-white/5 border-none rounded-full py-1.5 pl-10 pr-4 text-sm text-gray-500 focus:ring-1 focus:ring-brand-primary w-64"
							placeholder="Search transactions..."
							type="text"
						/>
					</div>
					<button className="text-gray-400 hover:text-white transition-colors">
						<span className="material-symbols-outlined">
							notifications
						</span>
					</button>
					<button className="text-gray-400 hover:text-white transition-colors">
						<span className="material-symbols-outlined">
							more_vert
						</span>
					</button>
				</div>
			</header>
			<div className="flex-1 overflow-y-auto p-8">
				<div className="max-w-6xl mx-auto space-y-8">
					<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 glass-card border border-white/8 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
							<div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
							<div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center border border-brand-primary/30 shrink-0">
								<span className="material-symbols-outlined text-primary text-5xl">
									home
								</span>
							</div>
							<div className="flex-1 text-center md:text-left">
								<h1 className="text-4xl font-headline font-bold mb-2">
									Apartment 4B
								</h1>
								<div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
									<span className="bg-white/5 px-3 py-1 rounded-full text-xs font-medium text-gray-400 border border-brand-border uppercase tracking-widest">
										Shared Household
									</span>
									<span className="text-gray-500 text-sm">
										Created Jan 2024
									</span>
								</div>
							</div>
							<div className="shrink-0 flex flex-col items-center md:items-end">
								<p className="text-gray-400 text-xs font-label uppercase tracking-wider mb-1">
									Total Group Balance
								</p>
								<p className="text-4xl font-headline font-bold text-white">
									$1,240.50
								</p>
								<button className="mt-4 bg-brand-primary hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold text-sm transition-all shadow-lg shadow-brand-primary/20">
									Add Expense
								</button>
							</div>
						</div>
						<div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
							<h3 className="font-headline font-semibold text-sm text-gray-400 uppercase tracking-widest mb-4">
								Settle Up
							</h3>
							<div className="space-y-4">
								<div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-brand-border">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs font-bold">
											S
										</div>
										<span className="text-sm">
											Sarah owes Jordan
										</span>
									</div>
									<span className="text-sm font-bold text-brand-primary">
										$25.00
									</span>
								</div>
								<div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-brand-border">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center text-xs font-bold">
											E
										</div>
										<span className="text-sm">
											Emily owes Alex
										</span>
									</div>
									<span className="text-sm font-bold text-brand-primary">
										$112.50
									</span>
								</div>
							</div>
							<button className="mt-6 w-full text-center py-2 text-xs font-bold text-brand-primary border border-brand-primary/30 rounded-lg hover:bg-brand-primary hover:text-white transition-all">
								VIEW ALL SETTLEMENTS
							</button>
						</div>
					</section>
					<div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
						<div className="xl:col-span-8 space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-xl font-headline font-bold">
									Recent Transactions
								</h3>
								<button className="text-brand-primary text-sm font-semibold">
									See all
								</button>
							</div>
							<div className="space-y-3">
								<div className="glass-card p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
											<span className="material-symbols-outlined">
												shopping_cart
											</span>
										</div>
										<div>
											<p className="font-semibold text-white">
												Groceries
											</p>
											<p className="text-xs text-gray-500">
												Paid by{" "}
												<span className="text-gray-300">
													Alex
												</span>{" "}
												• Oct 12, 2024
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-bold text-lg">
											$84.20
										</p>
										<p className="text-[10px] text-gray-500 uppercase tracking-tighter">
											Personal split: $21.05
										</p>
									</div>
								</div>
								<div className="glass-card p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
											<span className="material-symbols-outlined">
												router
											</span>
										</div>
										<div>
											<p className="font-semibold text-white">
												Internet Bill
											</p>
											<p className="text-xs text-gray-500">
												Paid by{" "}
												<span className="text-gray-300">
													Sarah
												</span>{" "}
												• Oct 10, 2024
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-bold text-lg">
											$60.00
										</p>
										<p className="text-[10px] text-gray-500 uppercase tracking-tighter">
											Personal split: $15.00
										</p>
									</div>
								</div>
								<div className="glass-card p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
											<span className="material-symbols-outlined">
												bolt
											</span>
										</div>
										<div>
											<p className="font-semibold text-white">
												Electricity
											</p>
											<p className="text-xs text-gray-500">
												Paid by{" "}
												<span className="text-gray-300">
													Jordan
												</span>{" "}
												• Oct 05, 2024
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-bold text-lg">
											$145.00
										</p>
										<p className="text-[10px] text-gray-500 uppercase tracking-tighter">
											Personal split: $36.25
										</p>
									</div>
								</div>
								<div className="glass-card p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors group">
									<div className="flex items-center gap-4">
										<div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
											<span className="material-symbols-outlined">
												cleaning_services
											</span>
										</div>
										<div>
											<p className="font-semibold text-white">
												Cleaning Supplies
											</p>
											<p className="text-xs text-gray-500">
												Paid by{" "}
												<span className="text-gray-300">
													Emily
												</span>{" "}
												• Oct 02, 2024
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-bold text-lg">
											$32.15
										</p>
										<p className="text-[10px] text-gray-500 uppercase tracking-tighter">
											Personal split: $8.04
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="xl:col-span-4 space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-xl font-headline font-bold">
									Members
								</h3>
								<button className="p-1 text-gray-400 hover:text-white transition-colors">
									<span className="material-symbols-outlined">
										person_add
									</span>
								</button>
							</div>
							<div className="glass-card rounded-2xl overflow-hidden divide-y divide-brand-border">
								<div className="p-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full border-2 border-emerald-500/50 p-0.5">
											<img
												alt="Alex"
												className="w-full h-full rounded-full object-cover"
												data-alt="Alex profile picture"
												src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0uhu8l8qf7CkZNRAhEROOPA1K49f2u6tGresDrAmlC8nlLl2Qa9tyFNSHHXOyLbtvI3KdRPExBJkyUSF6u1tMn0KqvJ89bLkbhF3FUZV8NoSX1RJ3g9guuaq1ESIdiXV9z6h52HqdqMfM0s5rUBbzyep94QU2UcgGOVbOC1IUqRXMdUlFDbD0aYbz0z8IAR1aMGXDulzbMA0EC8uJSSKhum6DGcGafEMiUzLOXva84zKtEvYGQxzuFmcJ82DxBhh7xUpZgOr-Vs8"
											/>
										</div>
										<div>
											<p className="text-sm font-semibold">
												Alex (You)
											</p>
											<p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
												Is owed
											</p>
										</div>
									</div>
									<p className="text-emerald-500 font-bold text-sm">
										+$142.30
									</p>
								</div>
								<div className="p-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full border-2 border-red-500/50 p-0.5">
											<img
												alt="Sarah"
												className="w-full h-full rounded-full object-cover"
												data-alt="Sarah profile picture"
												src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkdmqj5-RmkGMdl1lLAhrmJuk5zPI_pzKwe7O5OFS1cmnO5HQnsrYduE2ry1Ssm7Le4uaV15aV4PWmW5ISeCX0zgncsl7JLJEapArKnDKO4y6WL1Sl_cih1vPgA8Iq6X-QODrCOzcwG8DVeHvdr5_YM04BM_XczOROiQ6vMNBiVfe0Iygyyx7SUBOO_gpNG9uD3e-bKa_4siRVSMJeCj6Z4mWtI30eZjBZbsR4DAZBp3ngICna0-PhiTS6pnRhTK1Jq-VnTfhv670"
											/>
										</div>
										<div>
											<p className="text-sm font-semibold">
												Sarah
											</p>
											<p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
												Owes
											</p>
										</div>
									</div>
									<p className="text-red-500 font-bold text-sm">
										-$25.00
									</p>
								</div>
								<div className="p-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full border-2 border-emerald-500/50 p-0.5">
											<img
												alt="Jordan"
												className="w-full h-full rounded-full object-cover"
												data-alt="Jordan profile picture"
												src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1q2ZFgFEc2qvLgI_bm0nChi2ZirhX1-Z4zcHOHo0vcF__Q6QUBA263-FcvCLTVzIYRoZsn7McDL7n_A5gFX2H32lDIYcLwAiN4SDyIzNgCcIFWs-NQSJdvIkfX6dSuEFS5jfHgY4uDG02rOU5WWREzwSUbl8fdlob2ET8pnHfv_dVg-GxFybuWWq0Y7MF03y6rL60rDYNttiDvkaxNntUEXMorabbXdNwf1Hizxuq3wo0CaFuW0GaJce5KAWuZWEs-giETqY96Yw"
											/>
										</div>
										<div>
											<p className="text-sm font-semibold">
												Jordan
											</p>
											<p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
												Is owed
											</p>
										</div>
									</div>
									<p className="text-emerald-500 font-bold text-sm">
										+$45.50
									</p>
								</div>
								<div className="p-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full border-2 border-red-500/50 p-0.5">
											<img
												alt="Emily"
												className="w-full h-full rounded-full object-cover"
												data-alt="Emily profile picture"
												src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbYELnCyvH39KLGJOo1PtM0UyLBsKHb2Da1sczoyMfFhmQfP9KoUoHr6K5ywMQ9AXXpcpDnaAmu5T0vVwcyHhoX8F_c0VAbxwaLfFaXZfK4rBc2fzXEUrfFs15jS0Sq2BAb1p7lxQgeh0GWSLgT9vmLD7F0hLjenLl6o-yWEUKlufnaVsbP6K4E3U1SREtQBBRyWlAsJsd86_ZBxJ0eVWi5QgYmdypSMQcZD3wAdYNR_XAsMYuoM5BRblvJkyNJ351sHdauhId4Js"
											/>
										</div>
										<div>
											<p className="text-sm font-semibold">
												Emily
											</p>
											<p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
												Owes
											</p>
										</div>
									</div>
									<p className="text-red-500 font-bold text-sm">
										-$162.80
									</p>
								</div>
							</div>
							<div className="glass-card rounded-2xl p-6 bg-linear-to-br from-brand-primary/20 to-transparent">
								<h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-4">
									Quick Stats
								</h4>
								<div className="space-y-4">
									<div className="flex justify-between items-end">
										<p className="text-sm text-gray-400">
											Monthly Spending
										</p>
										<p className="text-xl font-bold">
											$412.00
										</p>
									</div>
									<div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
										<div className="bg-brand-primary h-full w-[65%] rounded-full"></div>
									</div>
									<p className="text-[10px] text-gray-500 text-center">
										You've spent 12% more than last month
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default GroupDetails;
