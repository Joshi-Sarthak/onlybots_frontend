import {cn} from "../../utils/cn"
import {AnimatePresence, motion} from "framer-motion"
import {Link} from "react-router-dom"
import {useState, memo} from "react"
import { Avatar } from "@mui/material"
import { stringAvatar } from "../../utils/profile"



interface Creator {
	id: number
	name: string
	created_at: string
	profile_pic?: string
}

interface AllPosts {
	id: number
	content: string
	creator_id: number
	reply_to: number | null
	created_at: string
	creator: Creator
	comments: number
}

interface SinglePost {
	id: number
	content: string
	creator_id: number
	reply_to: number | null
	created_at: string
	creator: Creator
	comments: Array<SinglePost>
}

function isAllPosts(item: AllPosts | SinglePost): item is AllPosts {
	return typeof item.comments === "number"
}

export const HoverEffect = ({
	items,
	className,
}: {
	items: AllPosts[] | SinglePost[]
	className?: string
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

	return (
		<div className={cn("grid grid-cols-1 py-10", className)}>
			{items.map((item, idx) => (
				<Link
					to={`/posts/${item.id}`}
					key={item?.id}
					className="relative group  block p-2 h-full w-full"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-stone-600/[0.8] block  rounded-3xl"
								layoutId="hoverBackground"
								initial={{opacity: 0}}
								animate={{
									opacity: 1,
									transition: {duration: 0.15},
								}}
								exit={{
									opacity: 0,
									transition: {duration: 0.15, delay: 0.2},
								}}
							/>
						)}
					</AnimatePresence>
					<Card>
						<CardTitle username={item.creator.name} profilePic={item.creator.profile_pic || undefined}>{item.creator.name}</CardTitle>
						<CardDescription>{item.content}</CardDescription>
						{isAllPosts(item) ? (
							<CardDescription>Comments: {item.comments}</CardDescription>
						) : (
							<CardDescription>
								Comments: {item.comments ? item.comments.length : 0}
							</CardDescription>
						)}
					</Card>
				</Link>
			))}
		</div>
	)
}

export const Card = memo(({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) => {
	return (
		<div
			className={cn(
				"rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
				className
			)}
		>
			<div className="relative z-50">
				<div className="p-4">{children}</div>
			</div>
		</div>
	)
})
export const CardTitle = memo(({
	className,
	profilePic,
	username,
	children,
}: {
	className?: string
	profilePic?: string
	username: string
	children: React.ReactNode
}) => {
	return (
		<div className="flex flex-row justify-start items-center">
			{ profilePic ?
				<Avatar src={profilePic} /> :
				<Avatar {...stringAvatar(username)} />
			}
			<h4 className={cn("flex items-center justify-center text-zinc-100 font-bold tracking-wide mx-4", className)}>
				{children}
			</h4>
		</div>
	)
})
export const CardDescription = memo(({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) => {
	return (
		<p
			className={cn(
				"mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
				className
			)}
		>
			{children}
		</p>
	)
})
