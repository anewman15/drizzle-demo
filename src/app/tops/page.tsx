import React, { ReactNode } from "react";
import { db } from "@/drizzle/db";

const Tops = async () => {
	const topsList = await db.query.tops.findMany({
		with: {
			post: true,
		}
	});

	return (
		<div className="page">
			<div className="mt-12 mb-6 flex justify-between items-center">
				<h2 className="text-3xl mb-4">All Tops</h2>
			</div>
			<div className="overflow-x-auto">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th>Id</th>
							<th>PostId</th>
							<th>Post Title</th>
							<th className="text-center">Start Date</th>
							<th className="text-center">Expiry Date</th>
						</tr>
					</thead>
					<tbody>
						{
							topsList.map(top => (
								<tr >
									<td>{top?.id}</td>
									<td>{top?.post?.id}</td>
									<td>{top?.post?.title}</td>
									<td>{new String(top?.startDate) as ReactNode}</td>
									<td>{new String(top?.expiryDate) as ReactNode}</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Tops;