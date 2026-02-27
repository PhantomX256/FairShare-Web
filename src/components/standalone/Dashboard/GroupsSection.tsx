import GroupCard from "./GroupCard.tsx";
import RecentActivitySection from "./RecentActivitySection.tsx";

function GroupsSection() {
    return (
        <section className="xl:col-span-2 text-white space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Active Groups</h2>
                <button className="text-primary text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GroupCard/>
                <div
                    className="border-2 border-dashed border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-all cursor-pointer group">
                    <div
                        className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">add</span>
                    </div>
                    <p className="text-sm font-bold text-slate-500">Create New Group</p>
                </div>
            </div>
            <RecentActivitySection />
        </section>
    );
}

export default GroupsSection;