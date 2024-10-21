import { db } from "@/drizzle/db";
import { categories, posts } from "@/drizzle/schema";
import { tops } from "./schema/tops";

async function seed() {
	await db.insert(categories).values([
		{ name: "Technology", description: "Talks about technology. Any technology" },
		{ name: "Education", description: "Posts about education" },
		{ name: "Science", description: "Science stuff" },
		{ name: "Energy", description: "Renewables, sustainability" },
		{ name: "Agriculture", description: "Reports about agriculture" },
	]);
	
	await db.insert(posts).values([
		{ title: "The rain has a database. It's Drizzle", subtitle: "Drizzle works through summer", content: "Drizzle works with React Hook Form, Zod and Next.js Server Components", categoryId: 1 },
		{ title: "What's more is Whatmore", subtitle: "Whatmore is not gold. More or less", content: "We don't want more. We never want more. That's it. That's where it goes.", categoryId: 3 },
		{ title: "What's cookin' ?", subtitle: "The heat is up. The gas is down", content: "Many ways to deal with the air. The one that flies. With everything we see and don't see. To be see or not be see.", categoryId: 3 },
		{ title: "What's a chicken? That's no chicken", subtitle: "Chicken in the rain. Chicken in the Drizzle", content: "Work more. East less. Eat more chicken. Do more Drizzle." },
		{ title: "Water is gone. The rain stopped", subtitle: "Drizzle goes on. To the 1000th day", content: "We're flooded. The roads are clogged with mud. Slippery", categoryId: 2 },
		{ title: "Drizzle is bad. It floods.", subtitle: "React Hook Form is good", content: "Drizzle is good with Zod. Zod is from Krypton. We never go there. There's never flodd there." }
	]);

	await db.insert(tops).values([
		{ postId: 3 }, { postId: 6 }, { postId: 4 }
	]);
};

seed();
