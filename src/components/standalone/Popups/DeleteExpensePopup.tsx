import { usePopup } from "../../../lib/hooks/context.hooks.ts";
import { useDeleteExpense } from "../../../lib/hooks/expense.hooks.ts";
import { useParams } from "react-router-dom";
import Loader from "../../shared/Loader.tsx";

function DeleteExpensePopup() {
	const { deleteExpensePopup, closeDeleteExpensePopup } = usePopup();
	const { expenseId } = useParams();
	const { mutate: deleteExpense, isPending } =
		useDeleteExpense(deleteExpensePopup);

	return (
		<div className="fixed top-0 left-0 flex items-center justify-center backdrop-blur-sm h-screen w-screen z-40 bg-black/30">
			<div className="glass-panel w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
				<div className="px-5 py-3 flex items-center justify-between border-b border-white/5">
					<h2 className="text-xl font-extrabold tracking-tight text-white">
						Delete Expense
					</h2>
					<button
						onClick={closeDeleteExpensePopup}
						disabled={isPending}
						className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors"
					>
						<span className="material-symbols-outlined text-slate-400">
							close
						</span>
					</button>
				</div>
				<div className="px-5 py-3 text-center">
					<p className="text-gray-400 text-lg">
						Are you sure you want to delete this expense?
					</p>
				</div>
				<div className="mx-5 my-3 flex items-center justify-center gap-10">
					<button
						onClick={() => deleteExpense(expenseId!)}
						disabled={isPending}
						className="bg-white/5 px-5 w-30 py-2 border flex items-center justify-center border-white/8 text-white rounded-lg hover:bg-white/8 transition"
					>
						{isPending ? <Loader size={25} /> : "Yes"}
					</button>
					<button
						disabled={isPending}
						onClick={closeDeleteExpensePopup}
						className="bg-white/5 px-5 w-30 py-2 border border-white/8 text-white rounded-lg hover:bg-white/8 transition"
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteExpensePopup;
