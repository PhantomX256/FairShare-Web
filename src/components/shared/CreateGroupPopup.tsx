import { usePopup } from "../../lib/hooks/context.hooks.ts";

function CreateGroupPopup() {
	const { createGroupPopup, closeCreateGroupPopup } = usePopup();

	if (!createGroupPopup) return null;

	return (
		<div className="fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm h-screen w-screen z-40 bg-black/30">
			<div className="glass-panel w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
				<div className="px-8 py-6 flex items-center justify-between border-b border-white/5">
					<h2 className="text-xl font-extrabold tracking-tight text-white">Create New Group</h2>
					<button onClick={closeCreateGroupPopup} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
						<span className="material-symbols-outlined text-slate-400">close</span>
					</button>
				</div>
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					<section className="space-y-6">
						<div>
							<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">Group Name</label>
							<input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600" placeholder="e.g. Weekend Getaway" type="text"/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div>
								<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">Choose Icon</label>
								<div className="grid grid-cols-4 gap-2">
									<button className="aspect-square flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
										<span className="material-symbols-outlined">home</span>
									</button>
									<button className="aspect-square flex items-center justify-center rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 transition-colors">
										<span className="material-symbols-outlined">flight</span>
									</button>
									<button className="aspect-square flex items-center justify-center rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 transition-colors">
										<span className="material-symbols-outlined">restaurant</span>
									</button>
									<button className="aspect-square flex items-center justify-center rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 transition-colors">
										<span className="material-symbols-outlined">fitness_center</span>
									</button>
								</div>
							</div>
							<div>
								<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">Theme Color</label>
								<div className="grid grid-cols-4 gap-2">
									<button className="aspect-square rounded-xl bg-primary ring-2 ring-offset-2 ring-primary ring-offset-[#121214]"></button>
									<button className="aspect-square rounded-xl bg-rose-500"></button>
									<button className="aspect-square rounded-xl bg-emerald-500"></button>
									<button className="aspect-square rounded-xl bg-amber-500"></button>
								</div>
							</div>
						</div>
					</section>
					<section className="space-y-4">
						<div className="flex items-center justify-between px-1">
							<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Select Friends</label>
							<span className="text-[10px] font-medium text-slate-600">3 SELECTED</span>
						</div>
						<div className="relative">
							<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
							<input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600" placeholder="Search your friends..." type="text"/>
						</div>
						<div className="bg-white/5 rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
							<div className="p-4 flex items-center justify-between hover:bg-white/[0.07] transition-all cursor-pointer group">
								<div className="flex items-center gap-3">
									<img className="size-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt6Zm2VoPU2shVKyOscANlbR5QFsRFARrg4AnZZOxzNpWedYMgKFTpysVB2IHLe8knHTBAn034IC12G2pE4FdS7rcoW_Pno7c4YSz5qgxygaPbesHNj-YXHkOIdkog-qY-w3-DUt0DV7-_1PHotGqLQeBTDfmDR1FT1WWNhs7Jh0zfYWBzFf9HcgurKdIcTGQxVWismzuBLMfRRau260VBIw_m_stoHDv5Subz5tjYkLswxQJL1xTBWEW9epDaKOyYdKCCvlMfvQ0"/>
									<div className="flex flex-col">
										<span className="text-sm font-bold text-white">Sarah Jenkins</span>
										<span className="text-[10px] text-slate-500">sarah.j@example.com</span>
									</div>
								</div>
								<div className="size-6 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
									<span className="material-symbols-outlined text-white text-base font-bold">check</span>
								</div>
							</div>
							<div className="p-4 flex items-center justify-between hover:bg-white/[0.07] transition-all cursor-pointer">
								<div className="flex items-center gap-3">
									<img className="size-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7_bq3ZiDocl2hkvWVWhxI6Z2HJK-t2Q0rV_Zt7avaFNYgdK4PBhJr21eV1WxAGsuGor8W_m3P59f-fPzhsFn4u--w3_VDnczw68ZGtlCM7JBUEh4Nl2WayEuvhvpzhmM2lEZTlVT7HH3LWqmB8qGwVPbip7FK4ZCVUugDV21bLoCN7Y0mjB8Xakm4R7yZlD0JVDujBz-5S9SJu7s6C_3JWbpESRi9tnqJF4DgHLfVO0tivs1Thf-knaCx8MZDMwy7-3KLsb11wjA"/>
									<div className="flex flex-col">
										<span className="text-sm font-bold text-white">Mike Chen</span>
										<span className="text-[10px] text-slate-500">mike.c@example.com</span>
									</div>
								</div>
								<div className="size-6 rounded-full border-2 border-white/20"></div>
							</div>
							<div className="p-4 flex items-center justify-between hover:bg-white/[0.07] transition-all cursor-pointer">
								<div className="flex items-center gap-3">
									<img className="size-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk2_djuaUxvJx30C3KgIcjqGAet8oyJvulWKIL7ghrglG6P31QgyKkCTUbNkm95JPjd5LYGYVSSGQuIwcDZ0neb0XZWsP2pytmTpAs0DW6sWWe0PI7dfQFaZziB57PvhWsWZO0QD1i0OJ2bKrzTerE5TRwxp1PZjfrmxUdkqMA9GWZ4zAXj6JuQ7MfYc0QyXBo337niNz6Sp2YFlegOq_6YPb37irXiipKAnKrjCsWBlo4Dp9-ruWhcSKzLXHR7rD0FKI9qJoGbyk"/>
									<div className="flex flex-col">
										<span className="text-sm font-bold text-white">Jordan Smith</span>
										<span className="text-[10px] text-slate-500">jordan.s@example.com</span>
									</div>
								</div>
								<div className="size-6 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
									<span className="material-symbols-outlined text-white text-base font-bold">check</span>
								</div>
							</div>
							<div className="p-4 flex items-center justify-between hover:bg-white/[0.07] transition-all cursor-pointer">
								<div className="flex items-center gap-3">
									<img className="size-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlDblrXOVv3P7D6mbzA_Et9X3bjQs-jYqPK6A9yQiu7h85wlPvfzNutUSNU61DtEi6Ob8FSh3K2mHO_7zNROv7LOcjv57_PZOzrELDqff38jt_8W7UHCPOHLXDfl_zEdda2m9e7ih0WtwLKG1rgzftWecQ7vo943sokmd3KtQe2_rsJ1UyyGBEnh8gc9FOYwy5J9XlubBZ0F6HXdDpSNk1i0nbvxsiCuAykS7d0OQ8UO1YXu03orBdGONmmd6c_4JDeBtAcE7Qcoo"/>
									<div className="flex flex-col">
										<span className="text-sm font-bold text-white">Emily Watson</span>
										<span className="text-[10px] text-slate-500">emily.w@example.com</span>
									</div>
								</div>
								<div className="size-6 rounded-full border-2 border-white/20"></div>
							</div>
						</div>
						<div className="flex flex-col gap-3 pt-2">
							<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 px-1">Or Add Guest</label>
							<div className="flex items-center gap-2">
								<input className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-600" placeholder="Guest name..." type="text"/>
								<button className="bg-white/10 px-5 py-3 rounded-2xl text-sm font-bold border border-white/5 text-white hover:bg-white/20 transition-all">Add Guest</button>
							</div>
						</div>
						<div className="flex flex-wrap gap-2 pt-2">
							<div className="flex items-center gap-2 bg-white/10 border border-white/5 pl-1.5 pr-3 py-1.5 rounded-full">
								<img className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA2AyVYknpQ734SvReAi5b6PLph5Z1DKeTE-XQ-T8f0hAKcTI6CWD9pWP5MbCBdUvCxL8JIDrWIKt7eRt4a7eT4tBntt_u40aQaRBFh9qLpedsUKN3DL7zXbvvOLXLoCcjpTkMaeVNU5FVirdHb1xTWu0fwEgZors3yXlii7HAEnjBuNuv-AkeKHgNAItkmsgzobEo3jc7DZGtQzf-RJj-kGsT67X5Kux_cu7oAX5j8BV_H1qeF2qSeAWuQXeBXBOZRu7xY4DKC_Q"/>
								<span className="text-xs font-bold text-white">You</span>
							</div>
							<div className="flex items-center gap-2 bg-primary/20 border border-primary/30 pl-1.5 pr-2 py-1.5 rounded-full">
								<img className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt6Zm2VoPU2shVKyOscANlbR5QFsRFARrg4AnZZOxzNpWedYMgKFTpysVB2IHLe8knHTBAn034IC12G2pE4FdS7rcoW_Pno7c4YSz5qgxygaPbesHNj-YXHkOIdkog-qY-w3-DUt0DV7-_1PHotGqLQeBTDfmDR1FT1WWNhs7Jh0zfYWBzFf9HcgurKdIcTGQxVWismzuBLMfRRau260VBIw_m_stoHDv5Subz5tjYkLswxQJL1xTBWEW9epDaKOyYdKCCvlMfvQ0"/>
								<span className="text-xs font-bold text-primary">Sarah J.</span>
								<button className="text-primary hover:text-white"><span className="material-symbols-outlined text-[14px]">close</span></button>
							</div>
							<div className="flex items-center gap-2 bg-white/10 border border-white/5 pl-2 pr-2 py-1.5 rounded-full">
								<div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-[9px] font-black tracking-tighter">JD</div>
								<span className="text-xs font-bold text-white">John Doe (G)</span>
								<button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined text-[14px]">close</span></button>
							</div>
						</div>
					</section>
				</div>
				<div className="p-8 bg-white/5 border-t border-white/5">
					<button className="w-full bg-primary hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
						<span className="material-symbols-outlined">group_add</span>
						Create Group
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateGroupPopup;