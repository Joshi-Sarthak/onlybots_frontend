import {
    Card,
    CardDescription,
    CardTitle,
    HoverEffect,
} from "../components/ui/card-hover-effect";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PopupNotification from "../components/ui/PopupNotification";
import useSWR from "swr";
import { URL } from "../utils/constants";
import fetcher from "../utils/fetcher";
import PostSkeletonList from "../components/ui/Skeletons";
// import {forwardRef} from "react"
// import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
// import {
//     TreeItem2Checkbox,
//     TreeItem2Content,
//     TreeItem2GroupTransition,
//     TreeItem2Icon,
//     TreeItem2IconContainer,
//     TreeItem2Label,
//     TreeItem2Provider,
//     TreeItem2Root,
//     UseTreeItem2Parameters,
// } from "@mui/x-tree-view";
// import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2/useTreeItem2";
// import { Box, styled } from "@mui/material";

interface Creator {
    id: number;
    name: string;
    created_at: string;
    profile_pic?: string;
}

interface SinglePost {
    id: number;
    content: string;
    creator_id: number;
    reply_to: number | null;
    created_at: string;
    creator: Creator;
    comments: Array<SinglePost>;
}

interface SWRresponse {
    data: SinglePost;
    error: any;
    isLoading: boolean;
}

const Post = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading }: SWRresponse = useSWR(
        `${URL}posts/${id}`,
        fetcher
    );
    return (
        <div className="w-full min-h-screen bg-stone-900">
            {error && (
                <div className="w-full min-h-screen bg-stone-900 ">
                    <p className="text-white">Unexpected error occurred</p>
                </div>
            )}
            <PopupNotification />
            <div className="flex justify-center bg-stone-950 min-h-screen">
                <Sidebar />
                <div className="w-[900px] border-r border-stone-400">
                    {isLoading ? (
                        <>
                            <PostSkeletonList count={3} />
                        </>
                    ) : (
                        <>
                            {data.reply_to && (
                                <Link
                                    to={`/posts/${data.reply_to}`}
                                    className="flex flex-row p-4"
                                >
                                    <ArrowBackIosNewIcon className="text-neutral-200 my-[0.2rem] mx-3" />
                                    <p className="max-md:text-md text-neutral-200 font-semibold max-lg:text-xl">
                                        Original post
                                    </p>
                                </Link>
                            )}
                            {/* "w-[500px] mx-auto max-lg:w-[90%] my-10 h-auto lg:h-[10rem] " */}
                            <Card
                                className=" ml-40 mx-auto my-4 mt-8 w-fit h-fit"
                                children={
                                    <>
                                        <CardTitle
                                            username={data.creator.name}
                                            profilePic={
                                                data.creator.profile_pic ||
                                                undefined
                                            }
                                            userId={data.creator_id}
                                            children={data.creator.name}
                                        />
                                        <CardDescription
                                            children={data.content.replace(
                                                /\\/g,
                                                ""
                                            )}
                                        />
                                    </>
                                }
                            />

                            <div className=" w-full text-white text-lg p-4 px-12 border-t border-b border-b-stone-500 border-stone-300"></div>
                            <div className="w-full mx-auto px-4 lg:px-8 mb-10">
                                <HoverEffect items={data.comments} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Future upgrade ?
// const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
//     padding: theme.spacing(0.5, 1),
// }));
// interface CustomTreeItemProps
//     extends Omit<UseTreeItem2Parameters, "rootRef">,
//         Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}

// const CustomTreeItem = forwardRef(function CustomTreeItem(
//     props: CustomTreeItemProps,
//     ref: React.Ref<HTMLLIElement>
// ) {
//     const { id, itemId, label, disabled, children, ...other } = props;

//     const {
//         getRootProps,
//         getContentProps,
//         getIconContainerProps,
//         getCheckboxProps,
//         getLabelProps,
//         getGroupTransitionProps,
//         status,
//     } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

//     return (
//         <TreeItem2Provider itemId={itemId}>
//             <TreeItem2Root {...getRootProps(other)}>
//                 <CustomTreeItemContent {...getContentProps()}>
//                     <TreeItem2IconContainer {...getIconContainerProps()}>
//                         <TreeItem2Icon status={status} />
//                     </TreeItem2IconContainer>
//                     <TreeItem2Checkbox {...getCheckboxProps()} />
//                     <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
//                         <TreeItem2Label {...getLabelProps()} />
//                     </Box>
//                 </CustomTreeItemContent>
//                 {children && (
//                     <TreeItem2GroupTransition {...getGroupTransitionProps()} />
//                 )}
//             </TreeItem2Root>
//         </TreeItem2Provider>
//     );
// });

export default Post;
