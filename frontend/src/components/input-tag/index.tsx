/** @jsx jsx */
import { useQuery } from "@apollo/react-hooks";
import { useCallback } from "react";
import { jsx } from "theme-ui";

import { useConference } from "../../context/conference";
import { TagsQuery, TagsQueryVariables } from "../../generated/graphql-backend";
import { Alert } from "../alert";
import { Select } from "../select";
import TAGS_QUERY from "./tags.graphql";

type TagLineProps = {
  tags: string[];
  onTagChange?: (tags: { value: string }[]) => void;
};

export const TagLine: React.SFC<TagLineProps> = ({ tags, onTagChange }) => {
  const onChange = useCallback(newTags => {
    if (onTagChange) {
      onTagChange(newTags || []);
    }
  }, []);
  const { code } = useConference();

  const { loading, error, data } = useQuery<TagsQuery, TagsQueryVariables>(
    TAGS_QUERY,
    {
      variables: {
        conference: code,
      },
    },
  );

  if (loading) {
    return null;
  }

  if (error) {
    return <Alert variant="alert">{error.message}</Alert>;
  }

  const submissionTags = data!
    .submissionTags!.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    })
    .map(t => ({
      value: t.id,
      label: t.name,
    }));

  const value = tags.map(t => submissionTags.find(s => s.value === t)!);

  return (
    <Select
      value={value}
      onChange={onChange}
      isMulti={true}
      name="tags"
      options={submissionTags}
    />
  );
};
