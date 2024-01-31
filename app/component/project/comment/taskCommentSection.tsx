import React, { useState } from "react";
import CommentCard from "./commentCard";
import TextAreaField from "../../shared/textAreaField";
import { Button } from "antd";

type Props = {
  wrapperStyle: string;
};

const TaskCommentSection = (props: Props) => {
  const user = {
    id: 1,
    firstName: "Bruce",
    lastName: "Wayne",
  };
  const [commentText, setCommentText] = useState();
  return (
    <div
      className={
        props.wrapperStyle +
        " overflow-y-auto h-full max-h-[calc(100vh-200px)] flex flex-col justify-between shadow-md rounded-md"
      }
    >
      <div className="max-h-[calc(100vh-500px)] overflow-y-auto gap-4 flex flex-col">
        <CommentCard
          user={user}
          dateTime={"2024-01-31T17:32:00Z"}
          comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <CommentCard
          user={user}
          dateTime={"2024-01-31T17:32:00Z"}
          comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <CommentCard
          user={user}
          dateTime={"2024-01-31T17:32:00Z"}
          comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <CommentCard
          user={user}
          dateTime={"2024-01-31T17:32:00Z"}
          comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
        <CommentCard
          user={user}
          dateTime={"2024-01-31T17:32:00Z"}
          comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        <CommentCard
          user={user}
          dateTime={"2024-01-31T17:32:00Z"}
          comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
        <CommentCard
          user={user}
          dateTime={"2024-01-31T17:32:00Z"}
          comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        />
        <CommentCard
          user={user}
          dateTime={"2024-01-31T17:32:00Z"}
          comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        />
      </div>
      <div className="flex items-end gap-4">
        <TextAreaField
          title=""
          placeholder="Enter comment"
          value={commentText}
          onChange={() => {}}
          onBlur={() => {}}
          wrapperStyle="!w-[90%]"
          rows={5}
          autoSize={false}
        />
        <Button className="action-button-active">Comment</Button>
      </div>
    </div>
  );
};

export default TaskCommentSection;
