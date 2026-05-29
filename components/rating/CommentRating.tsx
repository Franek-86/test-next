"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const CommentRating = ({ comment }: { comment: string }) => {
  const [isTextExpanded, setTextExpanded] = useState(false);
  const toggleExpandedText = () => {
    setTextExpanded(!isTextExpanded);
  };
  const longComment = comment.length > 130;
  const displayComment =
    longComment && !isTextExpanded ? comment.slice(0, 150) : comment;
  return (
    <>
      <div>{displayComment}</div>
      {longComment && (
        <Button
          variant='link'
          className='ps-0 text-muted-foreground'
          onClick={toggleExpandedText}
        >
          {isTextExpanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </>
  );
};

export default CommentRating;
