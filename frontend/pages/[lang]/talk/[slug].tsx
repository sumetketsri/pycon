/** @jsx jsx */
import { Box, Flex, Grid, Heading, Text } from "@theme-ui/components";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { jsx } from "theme-ui";

import { Article } from "~/components/article";
import { BlogPostIllustration } from "~/components/illustrations/blog-post";
import { MetaTags } from "~/components/meta-tags";
import { SpeakerDetail } from "~/components/speaker-detail";
import { compile } from "~/helpers/markdown";
import { useTalkQuery } from "~/types";

export default () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { data } = useTalkQuery({
    variables: {
      code: process.env.conferenceCode,
      slug,
    },
  });

  if (!data) {
    return null;
  }

  const { talk } = data.conference;

  const description = talk.submission
    ? talk.submission.abstract
    : talk.description;
  const elevatorPitch = talk.submission ? talk.submission.elevatorPitch : null;

  return (
    <Fragment>
      <MetaTags title={talk.title} />

      <Grid
        gap={5}
        sx={{
          mx: "auto",
          px: 3,
          py: 5,
          maxWidth: "container",
          gridTemplateColumns: [null, null, "2fr 1fr"],
        }}
      >
        <Box>
          <Article title={talk.title}>
            {elevatorPitch && <Box>{compile(elevatorPitch).tree}</Box>}

            <Heading as="h2">Abstract</Heading>

            {compile(description).tree}
          </Article>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Flex
            sx={{
              position: "relative",
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <BlogPostIllustration
              sx={{
                width: "80%",
              }}
            />

            <Box
              sx={{
                border: "primary",
                p: 4,
                backgroundColor: "cinderella",
                width: "80%",
                position: "absolute",
                left: 0,
                top: talk.image ? "90%" : "70%",
              }}
            >
              <Text sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="blog.author" />
              </Text>

              <Text>
                {talk.speakers.map(({ fullName }) => fullName).join(" & ")}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Grid>

      <Box sx={{ borderTop: "primary" }} />

      <Grid
        gap={5}
        sx={{
          mx: "auto",
          px: 3,
          py: 5,
          maxWidth: "container",
          gridTemplateColumns: [null, "1fr 2fr"],
        }}
      >
        {talk.speakers.map((speaker) => (
          <SpeakerDetail speaker={speaker} key={speaker.fullName} />
        ))}
      </Grid>
    </Fragment>
  );
};