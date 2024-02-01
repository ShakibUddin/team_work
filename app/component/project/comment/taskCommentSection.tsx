import React, { useEffect, useState } from "react";
import CommentCard from "./commentCard";
import TextAreaField from "../../shared/textAreaField";
import { Button } from "antd";
import useTaskServices from "@/app/services/useTaskServices";
import useAuthStore from "@/store/authStore/useAuthStore";
import { AuthState } from "@/store/authStore/authStoreTypes";
import { IComment } from "@/app/(protected)/projects/types";

type Props = {
  wrapperStyle: string;
  taskId: number | undefined;
};

const TaskCommentSection = (props: Props) => {
  const { loggedInUser } = useAuthStore((state: AuthState) => state);
  const { fetchAllComments, addComment, comments } = useTaskServices();
  const [commentText, setCommentText] = useState("");

  const handleOnCommentAddSuccess = () => {
    setCommentText("");
    if (props.taskId) {
      fetchAllComments({
        token: loggedInUser?.token || "",
        taskId: props.taskId || 0,
      });
    }
  };

  useEffect(() => {
    if (props.taskId) {
      fetchAllComments({
        token: loggedInUser?.token || "",
        taskId: props.taskId || 0,
      });
    }
  }, [loggedInUser, props.taskId]);

  return (
    <div
      className={
        props.wrapperStyle +
        " overflow-y-auto h-full max-h-[calc(100vh-200px)] flex flex-col justify-between shadow-md rounded-md"
      }
    >
      <div className="max-h-[calc(100vh-380px)] overflow-y-auto gap-4 flex flex-col">
        {comments.map((comment: IComment) => {
          return <CommentCard comment={comment} />;
        })}
      </div>
      <div className="flex items-end gap-4">
        <TextAreaField
          title=""
          placeholder="Enter comment"
          value={commentText}
          onChange={(e) => {
            setCommentText(e.target.value);
          }}
          onBlur={() => {}}
          maxLength={1000}
          showCount
          wrapperStyle="!w-[90%]"
          rows={5}
          autoSize={false}
        />
        <Button
          className="action-button-active"
          disabled={!commentText || commentText.length === 0}
          onClick={() => {
            addComment({
              comment: commentText,
              taskId: props?.taskId || 0,
              userId: loggedInUser?.id || 0,
              token: loggedInUser?.token || "",
              handleOnSuccess: handleOnCommentAddSuccess,
            });
          }}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default TaskCommentSection;
