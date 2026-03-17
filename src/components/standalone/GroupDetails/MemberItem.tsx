import type { Member } from "../../../lib/types/types.ts";
import { useAuth } from "../../../lib/hooks/context.hooks.ts";

function MemberItem({ member }: { member: Member }) {
	const { user } = useAuth();

	return (
		<>
			<div className="p-4 flex items-center justify-between hover:bg-white/8 transition-all">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full border-2 flex items-center justify-center border-emerald-500/50 p-0.5 bg-primary/20">
						{member.avatar_url ? (
							<img
								alt={`Profile photo of ${member.name}`}
								className="w-full h-full rounded-full object-cover"
								src={member.avatar_url}
							/>
						) : (
							member.name[0].toUpperCase()
						)}
					</div>
					<div>
						<p className="text-sm font-semibold">{`${member.name} ${member.internal_id === user!.internal_id ? "(You)" : ""} ${!member.internal_id ? "(G)" : ""}`}</p>
						<p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
							Is owed
						</p>
					</div>
				</div>
				<p className="text-emerald-500 font-bold text-sm">+$142.30</p>
			</div>
			{/*<div className="p-4 flex items-center justify-between">*/}
			{/*	<div className="flex items-center gap-3">*/}
			{/*		<div className="w-10 h-10 rounded-full border-2 border-red-500/50 p-0.5">*/}
			{/*			<img*/}
			{/*				alt="Sarah"*/}
			{/*				className="w-full h-full rounded-full object-cover"*/}
			{/*				data-alt="Sarah profile picture"*/}
			{/*				src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkdmqj5-RmkGMdl1lLAhrmJuk5zPI_pzKwe7O5OFS1cmnO5HQnsrYduE2ry1Ssm7Le4uaV15aV4PWmW5ISeCX0zgncsl7JLJEapArKnDKO4y6WL1Sl_cih1vPgA8Iq6X-QODrCOzcwG8DVeHvdr5_YM04BM_XczOROiQ6vMNBiVfe0Iygyyx7SUBOO_gpNG9uD3e-bKa_4siRVSMJeCj6Z4mWtI30eZjBZbsR4DAZBp3ngICna0-PhiTS6pnRhTK1Jq-VnTfhv670"*/}
			{/*			/>*/}
			{/*		</div>*/}
			{/*		<div>*/}
			{/*			<p className="text-sm font-semibold">Sarah</p>*/}
			{/*			<p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">*/}
			{/*				Owes*/}
			{/*			</p>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*	<p className="text-red-500 font-bold text-sm">-$25.00</p>*/}
			{/*</div>*/}
		</>
	);
}

export default MemberItem;
