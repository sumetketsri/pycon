/** @jsx jsx */
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import { Container } from "@theme-ui/components";
import { useContext } from "react";
import { jsx } from "theme-ui";

import { useConference } from "../../context/conference";
import { useCurrentLanguage } from "../../context/language";
import {
  MeSubmissionsQuery,
  MeSubmissionsQueryVariables,
  SendSubmissionMutation,
  SendSubmissionMutationVariables,
} from "../../generated/graphql-backend";
import { CfpForm, CfpFormFields } from "../cfp-form";
import ME_SUBMISSIONS from "./me-submissions.graphql";
import SEND_SUBMISSION from "./send-submission.graphql";

export const Cfp: React.SFC = () => {
  const lang = useCurrentLanguage();
  const { code } = useConference();

  const [sendSubmission, { loading, error, data }] = useMutation<
    SendSubmissionMutation,
    SendSubmissionMutationVariables
  >(SEND_SUBMISSION, {
    update(cache, { data: updateData }) {
      const query = cache.readQuery<
        MeSubmissionsQuery,
        MeSubmissionsQueryVariables
      >({
        query: ME_SUBMISSIONS,
        variables: {
          conference: code,
        },
      });

      if (!query || updateData?.mutationOp.__typename !== "Submission") {
        return;
      }

      cache.writeQuery<MeSubmissionsQuery, MeSubmissionsQueryVariables>({
        query: ME_SUBMISSIONS,
        data: {
          me: {
            ...query.me,
            submissions: [...query.me.submissions, updateData!.mutationOp],
          },
        },
        variables: {
          conference: code,
        },
      });
    },
  });

  const onSubmit = async (input: CfpFormFields) => {
    if (loading) {
      return;
    }

    const response = await sendSubmission({
      variables: {
        input: {
          conference: code,
          title: input.title,
          abstract: input.abstract,
          topic: input.topic,
          languages: input.languages,
          type: input.type,
          duration: input.length,
          elevatorPitch: input.elevatorPitch,
          notes: input.notes,
          audienceLevel: input.audienceLevel,
          tags: input.tags,
          speakerLevel: input.speakerLevel,
          previousTalkVideo: input.previousTalkVideo,
        },
      },
    });

    if (response.data?.mutationOp.__typename === "Submission") {
      const id = response.data.mutationOp.id;
      navigate(`/${lang}/submission/${id}`);
    }
  };

  return (
    <CfpForm
      loading={loading}
      error={error}
      data={data}
      conferenceCode={code}
      onSubmit={onSubmit}
    />
  );
};
