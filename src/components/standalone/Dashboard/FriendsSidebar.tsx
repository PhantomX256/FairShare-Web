function FriendsSidebar() {
	return (
		<section className="space-y-6 text-white">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold">Friends</h2>
				<button className="text-primary text-sm font-bold hover:underline">
					Add
				</button>
			</div>
			<div className="glass-card bg-white/3 border border-white/8 rounded-2xl overflow-hidden divide-y divide-white/5">
				<div className="p-4 flex items-center justify-between hover:bg-white/5 transition-all">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-full relative">
							<img
								className="w-full h-full rounded-full object-cover"
								data-alt="Sarah Jenkins profile"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt6Zm2VoPU2shVKyOscANlbR5QFsRFARrg4AnZZOxzNpWedYMgKFTpysVB2IHLe8knHTBAn034IC12G2pE4FdS7rcoW_Pno7c4YSz5qgxygaPbesHNj-YXHkOIdkog-qY-w3-DUt0DV7-_1PHotGqLQeBTDfmDR1FT1WWNhs7Jh0zfYWBzFf9HcgurKdIcTGQxVWismzuBLMfRRau260VBIw_m_stoHDv5Subz5tjYkLswxQJL1xTBWEW9epDaKOyYdKCCvlMfvQ0"
							/>
							<span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-card-dark"></span>
						</div>
						<div>
							<p className="text-sm font-bold">Sarah Jenkins</p>
							<p className="text-xs text-emerald-500">
								Owes you $250.00
							</p>
						</div>
					</div>
					<button className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
						<span className="material-symbols-outlined text-lg">
							notifications_active
						</span>
					</button>
				</div>
				<div className="p-4 flex items-center justify-between hover:bg-white/5 transition-all">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-full relative">
							<img
								className="w-full h-full rounded-full object-cover"
								data-alt="Mike Chen profile"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7_bq3ZiDocl2hkvWVWhxI6Z2HJK-t2Q0rV_Zt7avaFNYgdK4PBhJr21eV1WxAGsuGor8W_m3P59f-fPzhsFn4u--w3_VDnczw68ZGtlCM7JBUEh4Nl2WayEuvhvpzhmM2lEZTlVT7HH3LWqmB8qGwVPbip7FK4ZCVUugDV21bLoCN7Y0mjB8Xakm4R7yZlD0JVDujBz-5S9SJu7s6C_3JWbpESRi9tnqJF4DgHLfVO0tivs1Thf-knaCx8MZDMwy7-3KLsb11wjA"
							/>
							<span className="absolute bottom-0 right-0 size-2.5 bg-slate-500 rounded-full border-2 border-card-dark"></span>
						</div>
						<div>
							<p className="text-sm font-bold">Mike Chen</p>
							<p className="text-xs text-red-400">
								You owe $12.50
							</p>
						</div>
					</div>
					<button className="size-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-white/10 transition-all">
						<span className="material-symbols-outlined text-lg">
							payments
						</span>
					</button>
				</div>
				<div className="p-4 flex items-center justify-between hover:bg-white/5 transition-all">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-full relative">
							<img
								className="w-full h-full rounded-full object-cover"
								data-alt="Jordan Smith profile"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk2_djuaUxvJx30C3KgIcjqGAet8oyJvulWKIL7ghrglG6P31QgyKkCTUbNkm95JPjd5LYGYVSSGQuIwcDZ0neb0XZWsP2pytmTpAs0DW6sWWe0PI7dfQFaZziB57PvhWsWZO0QD1i0OJ2bKrzTerE5TRwxp1PZjfrmxUdkqMA9GWZ4zAXj6JuQ7MfYc0QyXBo337niNz6Sp2YFlegOq_6YPb37irXiipKAnKrjCsWBlo4Dp9-ruWhcSKzLXHR7rD0FKI9qJoGbyk"
							/>
							<span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-card-dark"></span>
						</div>
						<div>
							<p className="text-sm font-bold">Jordan Smith</p>
							<p className="text-xs text-emerald-500">
								Owes you $45.00
							</p>
						</div>
					</div>
					<button className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
						<span className="material-symbols-outlined text-lg">
							notifications_active
						</span>
					</button>
				</div>
				<div className="p-4 flex items-center justify-between hover:bg-white/5 transition-all">
					<div className="flex items-center gap-3">
						<div className="size-10 rounded-full">
							<img
								className="w-full h-full rounded-full object-cover"
								data-alt="Emily Watson profile"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlDblrXOVv3P7D6mbzA_Et9X3bjQs-jYqPK6A9yQiu7h85wlPvfzNutUSNU61DtEi6Ob8FSh3K2mHO_7zNROv7LOcjv57_PZOzrELDqff38jt_8W7UHCPOHLXDfl_zEdda2m9e7ih0WtwLKG1rgzftWecQ7vo943sokmd3KtQe2_rsJ1UyyGBEnh8gc9FOYwy5J9XlubBZ0F6HXdDpSNk1i0nbvxsiCuAykS7d0OQ8UO1YXu03orBdGONmmd6c_4JDeBtAcE7Qcoo"
							/>
						</div>
						<div>
							<p className="text-sm font-bold">Emily Watson</p>
							<p className="text-xs text-slate-500">Settled up</p>
						</div>
					</div>
					<button className="size-8 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
						<span className="material-symbols-outlined text-lg">
							more_horiz
						</span>
					</button>
				</div>
			</div>
		</section>
	);
}

export default FriendsSidebar;
